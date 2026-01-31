import { Request, Response } from 'express';
import { AppointmentStatus, DoctorStatus } from '../types/enums';
import { successResponse, errorResponse } from '../utils/response';
import {
  AppointmentModel,
  DoctorModel,
  MedicalNoteModel,
  MedicalRecordModel,
  UserModel,
} from '../models';
import {
  AppointmentData,
  DoctorData,
  MedicalNoteData,
  MedicalRecordData,
  UserData,
} from '../types/mongo.types';

const mapById = <T extends { id: string }>(items: T[]): Map<string, T> => {
  return new Map(items.map((item) => [item.id, item]));
};

/**
 * Get patient's appointments
 */
export const getMyAppointments = async (req: Request, res: Response) => {
  try {
    const patientId = req.user?.patientId;

    if (!patientId) {
      return errorResponse(res, 400, 'Patient ID not found');
    }

    const { status } = req.query;
    const query: Record<string, unknown> = { patientId };

    if (status) {
      query.status = status;
    }

    const appointments: AppointmentData[] = await AppointmentModel.find(query)
      .sort({ startTime: 1 })
      .lean();

    const doctorIds = appointments.map((appt) => appt.doctorId);
    const doctors: DoctorData[] = await DoctorModel.find({ id: { $in: doctorIds } }).lean();
    const doctorUserIds = doctors.map((doctor) => doctor.userId);
    const doctorUsers: UserData[] = await UserModel.find({ id: { $in: doctorUserIds } })
      .select('id name email phone')
      .lean();

    const doctorMap = mapById(doctors);
    const doctorUserMap = mapById(doctorUsers);

    const response = appointments.map((appointment) => {
      const doctor = doctorMap.get(appointment.doctorId);
      const doctorUser = doctor ? doctorUserMap.get(doctor.userId) : null;

      return {
        ...appointment,
        doctor: doctor
          ? {
              ...doctor,
              user: doctorUser || null,
            }
          : null,
      };
    });

    return successResponse(res, response);
  } catch (error) {
    console.error('Get appointments error:', error);
    return errorResponse(res, 500, 'Failed to fetch appointments');
  }
};

/**
 * Get available doctors
 */
export const getDoctors = async (req: Request, res: Response) => {
  try {
    const { specialization } = req.query;
    const query: Record<string, unknown> = {
      status: DoctorStatus.ACTIVE,
    };

    if (specialization) {
      query.specialization = { $regex: specialization as string, $options: 'i' };
    }

    const doctors: DoctorData[] = await DoctorModel.find(query).lean();
    const doctorUserIds = doctors.map((doctor) => doctor.userId);
    const doctorUsers: UserData[] = await UserModel.find({ id: { $in: doctorUserIds } })
      .select('id name email phone gender')
      .lean();

    const doctorUserMap = mapById(doctorUsers);

    const response = doctors.map((doctor) => ({
      ...doctor,
      user: doctorUserMap.get(doctor.userId) || null,
    }));

    return successResponse(res, response);
  } catch (error) {
    console.error('Get doctors error:', error);
    return errorResponse(res, 500, 'Failed to fetch doctors');
  }
};

/**
 * Book an appointment
 */
export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const patientId = req.user?.patientId;
    const { doctorId, date, startTime, duration, type } = req.body;

    if (!patientId) {
      return errorResponse(res, 400, 'Patient ID not found');
    }

    if (!doctorId || !date || !startTime || !duration || !type) {
      return errorResponse(res, 400, 'Missing required fields');
    }

    const doctor: DoctorData | null = await DoctorModel.findOne({ id: doctorId }).lean();

    if (!doctor) {
      return errorResponse(res, 404, 'Doctor not found');
    }

    if (doctor.status !== DoctorStatus.ACTIVE) {
      return errorResponse(res, 400, 'Doctor is not available');
    }

    const start = new Date(startTime);
    const end = new Date(start.getTime() + Number(duration) * 60000);

    const conflict: AppointmentData | null = await AppointmentModel.findOne({
      doctorId,
      startTime: { $lt: end },
      endTime: { $gt: start },
      status: { $nin: [AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW] },
    }).lean();

    if (conflict) {
      return errorResponse(res, 409, 'Time slot is not available');
    }

    const appointment = await AppointmentModel.create({
      doctorId,
      patientId,
      date: new Date(date),
      startTime: start,
      endTime: end,
      duration: Number(duration),
      type,
      status: AppointmentStatus.SCHEDULED,
    });

    const doctorUser: UserData | null = await UserModel.findOne({ id: doctor.userId })
      .select('id name email phone')
      .lean();

    return successResponse(
      res,
      {
        ...appointment.toObject(),
        doctor: {
          ...doctor,
          user: doctorUser || null,
        },
      },
      201
    );
  } catch (error) {
    console.error('Book appointment error:', error);
    return errorResponse(res, 500, 'Failed to book appointment');
  }
};

/**
 * Cancel appointment
 */
export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const patientId = req.user?.patientId;
    const { appointmentId } = req.params;

    if (!patientId) {
      return errorResponse(res, 400, 'Patient ID not found');
    }

    const appointment: AppointmentData | null = await AppointmentModel.findOne({ id: appointmentId }).lean();

    if (!appointment) {
      return errorResponse(res, 404, 'Appointment not found');
    }

    if (appointment.patientId !== patientId) {
      return errorResponse(res, 403, 'Access denied to this appointment');
    }

    if (
      appointment.status === AppointmentStatus.COMPLETED ||
      appointment.status === AppointmentStatus.CANCELLED
    ) {
      return errorResponse(res, 400, 'Cannot cancel this appointment');
    }

    await AppointmentModel.updateOne(
      { id: appointmentId },
      { $set: { status: AppointmentStatus.CANCELLED } }
    );

    const updatedAppointment: AppointmentData | null = await AppointmentModel.findOne({ id: appointmentId }).lean();

    if (!updatedAppointment) {
      return errorResponse(res, 404, 'Appointment not found');
    }

    const doctor: DoctorData | null = await DoctorModel.findOne({ id: updatedAppointment.doctorId }).lean();
    const doctorUser: UserData | null = doctor
      ? await UserModel.findOne({ id: doctor.userId })
          .select('id name')
          .lean()
      : null;

    return successResponse(res, {
      ...updatedAppointment,
      doctor: doctor
        ? {
            ...doctor,
            user: doctorUser ? { name: doctorUser.name } : null,
          }
        : null,
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    return errorResponse(res, 500, 'Failed to cancel appointment');
  }
};

/**
 * Get patient's medical records
 */
export const getMyMedicalRecords = async (req: Request, res: Response) => {
  try {
    const patientId = req.user?.patientId;

    if (!patientId) {
      return errorResponse(res, 400, 'Patient ID not found');
    }

    const records: MedicalRecordData[] = await MedicalRecordModel.find({ patientId })
      .sort({ recordDate: -1 })
      .lean();

    return successResponse(res, records);
  } catch (error) {
    console.error('Get medical records error:', error);
    return errorResponse(res, 500, 'Failed to fetch medical records');
  }
};

/**
 * Get patient's medical notes
 */
export const getMyMedicalNotes = async (req: Request, res: Response) => {
  try {
    const patientId = req.user?.patientId;

    if (!patientId) {
      return errorResponse(res, 400, 'Patient ID not found');
    }

    const notes: MedicalNoteData[] = await MedicalNoteModel.find({ patientId })
      .sort({ createdAt: -1 })
      .lean();

    const doctorIds = notes.map((note) => note.doctorId);
    const doctors: DoctorData[] = await DoctorModel.find({ id: { $in: doctorIds } }).lean();
    const doctorUserIds = doctors.map((doctor) => doctor.userId);
    const doctorUsers: UserData[] = await UserModel.find({ id: { $in: doctorUserIds } })
      .select('id name')
      .lean();

    const doctorMap = mapById(doctors);
    const doctorUserMap = mapById(doctorUsers);

    const response = notes.map((note) => {
      const doctor = doctorMap.get(note.doctorId);
      const doctorUser = doctor ? doctorUserMap.get(doctor.userId) : null;

      return {
        ...note,
        doctor: doctor
          ? {
              ...doctor,
              user: doctorUser ? { name: doctorUser.name } : null,
            }
          : null,
      };
    });

    return successResponse(res, response);
  } catch (error) {
    console.error('Get medical notes error:', error);
    return errorResponse(res, 500, 'Failed to fetch medical notes');
  }
};
