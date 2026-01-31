import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AppointmentStatus, UserRole } from '../types/enums';
import { successResponse, errorResponse } from '../utils/response';
import { hashPassword } from '../utils/password';
import {
  AppointmentModel,
  ConsultationModel,
  DoctorModel,
  MedicalNoteModel,
  MedicalRecordModel,
  PatientModel,
  PrescriptionModel,
  UserModel,
  VitalsModel,
} from '../models';
import {
  AppointmentData,
  ConsultationData,
  DoctorData,
  MedicalNoteData,
  MedicalRecordData,
  PatientData,
  PrescriptionData,
  UserData,
  VitalsData,
} from '../types/mongo.types';

const toDateRange = (dateValue: string) => {
  const startDate = new Date(dateValue);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  return { startDate, endDate };
};

const mapById = <T extends { id: string }>(items: T[]): Map<string, T> => {
  return new Map(items.map((item) => [item.id, item]));
};

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const [
      patientIds,
      todayAppointments,
      pendingAppointments,
      completedToday,
      upcomingThisWeek,
    ] = await Promise.all([
      AppointmentModel.distinct('patientId', { doctorId, deletedAt: null }),
      AppointmentModel.countDocuments({
        doctorId,
        date: { $gte: today, $lt: tomorrow },
        deletedAt: null,
      }),
      AppointmentModel.countDocuments({
        doctorId,
        status: { $in: [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED] },
        deletedAt: null,
      }),
      AppointmentModel.countDocuments({
        doctorId,
        status: AppointmentStatus.COMPLETED,
        date: { $gte: today, $lt: tomorrow },
        deletedAt: null,
      }),
      AppointmentModel.countDocuments({
        doctorId,
        date: { $gte: today, $lt: weekEnd },
        status: { $in: [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED] },
        deletedAt: null,
      }),
    ]);

    return successResponse(res, {
      totalPatients: patientIds.length,
      todayAppointments,
      pendingAppointments,
      completedToday,
      upcomingThisWeek,
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return errorResponse(res, 500, 'Failed to fetch dashboard stats');
  }
};

/**
 * Get doctor's appointments
 */
export const getMyAppointments = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const { status, date, upcoming } = req.query;
    const query: Record<string, unknown> = { doctorId, deletedAt: null };

    if (status) {
      query.status = status;
    }

    if (date) {
      const { startDate, endDate } = toDateRange(date as string);
      query.date = { $gte: startDate, $lt: endDate };
    }

    if (upcoming === 'true') {
      const now = new Date();
      query.date = { $gte: now };
      query.status = { $in: [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED] };
    }

    const appointments: AppointmentData[] = await AppointmentModel.find(query)
      .sort({ startTime: 1 })
      .lean();

    const patientIds = Array.from(new Set(appointments.map((appt) => appt.patientId)));
    const appointmentIds = appointments.map((appt) => appt.id);

    const patients: PatientData[] = await PatientModel.find({
      id: { $in: patientIds },
      deletedAt: null,
    }).lean();
    const consultations: ConsultationData[] = await ConsultationModel.find({
      appointmentId: { $in: appointmentIds },
    }).lean();

    const userIds = patients.map((patient) => patient.userId);
    const users: UserData[] = await UserModel.find({ id: { $in: userIds } })
      .select('id name email phone gender')
      .lean();

    const consultationIds = consultations.map((consultation) => consultation.id);
    const prescriptions: PrescriptionData[] = await PrescriptionModel.find({
      consultationId: { $in: consultationIds },
    }).lean();

    const patientMap = mapById(patients);
    const userMap = mapById(users);
    const consultationByAppointment = new Map(
      consultations.map((consultation) => [consultation.appointmentId, consultation])
    );
    const prescriptionByConsultation = new Map(
      prescriptions.map((prescription) => [prescription.consultationId, prescription])
    );

    const response = appointments.map((appointment) => {
      const patient = patientMap.get(appointment.patientId);
      const user = patient ? userMap.get(patient.userId) : undefined;
      const consultation = consultationByAppointment.get(appointment.id) || null;
      const prescription = consultation
        ? prescriptionByConsultation.get(consultation.id) || null
        : null;

      return {
        ...appointment,
        patient: patient ? { ...patient, user } : null,
        consultation: consultation ? { ...consultation, prescription } : null,
      };
    });

    return successResponse(res, response);
  } catch (error) {
    console.error('Get appointments error:', error);
    return errorResponse(res, 500, 'Failed to fetch appointments');
  }
};

/**
 * Get single appointment by ID
 */
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;
    const { appointmentId } = req.params;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const appointment: AppointmentData | null = await AppointmentModel.findOne({
      id: appointmentId,
      doctorId,
      deletedAt: null,
    }).lean();

    if (!appointment) {
      return errorResponse(res, 404, 'Appointment not found');
    }

    const patient: PatientData | null = await PatientModel.findOne({
      id: appointment.patientId,
      deletedAt: null,
    }).lean();
    const consultation: ConsultationData | null = await ConsultationModel.findOne({
      appointmentId: appointment.id,
    }).lean();

    const user: UserData | null = patient
      ? await UserModel.findOne({ id: patient.userId })
          .select('id name email phone gender')
          .lean()
      : null;

    const vitals: VitalsData[] = await VitalsModel.find({ patientId: appointment.patientId })
      .sort({ recordedAt: -1 })
      .limit(5)
      .lean();

    const recordedByIds = vitals.map((vital) => vital.recordedById);
    const recordedByUsers: UserData[] = await UserModel.find({ id: { $in: recordedByIds } })
      .select('id name')
      .lean();
    const recordedByMap = mapById(recordedByUsers);

    const vitalsWithUsers = vitals.map((vital) => ({
      ...vital,
      recordedBy: recordedByMap.get(vital.recordedById)
        ? { name: recordedByMap.get(vital.recordedById)?.name }
        : null,
    }));

    const prescription: PrescriptionData | null = consultation
      ? await PrescriptionModel.findOne({ consultationId: consultation.id }).lean()
      : null;

    return successResponse(res, {
      ...appointment,
      patient: patient ? { ...patient, user, vitals: vitalsWithUsers } : null,
      consultation: consultation ? { ...consultation, prescription } : null,
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    return errorResponse(res, 500, 'Failed to fetch appointment');
  }
};

/**
 * Create new appointment
 */
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;
    const { patientId, date, startTime, duration, type, room, notes } = req.body;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    if (!patientId || !date || !startTime || !duration || !type) {
      return errorResponse(res, 400, 'Missing required fields: patientId, date, startTime, duration, type');
    }

    const patient: PatientData | null = await PatientModel.findOne({
      id: patientId,
      deletedAt: null,
    }).lean();

    if (!patient) {
      return errorResponse(res, 404, 'Patient not found');
    }

    const appointmentDate = new Date(date);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + Number(duration) * 60000);

    const conflict: AppointmentData | null = await AppointmentModel.findOne({
      doctorId,
      deletedAt: null,
      status: { $nin: [AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW] },
      $or: [
        { startTime: { $lte: start }, endTime: { $gt: start } },
        { startTime: { $lt: end }, endTime: { $gte: end } },
        { startTime: { $gte: start }, endTime: { $lte: end } },
      ],
    }).lean();

    if (conflict) {
      return errorResponse(res, 409, 'Time slot conflicts with existing appointment');
    }

    const appointment = await AppointmentModel.create({
      doctorId,
      patientId,
      date: appointmentDate,
      startTime: start,
      endTime: end,
      duration: Number(duration),
      type,
      room: room || null,
      notes: notes || null,
      status: AppointmentStatus.SCHEDULED,
    });

    const patientUser: UserData | null = await UserModel.findOne({ id: patient.userId })
      .select('id name email phone')
      .lean();

    return successResponse(
      res,
      {
        ...appointment.toObject(),
        patient: { ...patient, user: patientUser },
      },
      201
    );
  } catch (error) {
    console.error('Create appointment error:', error);
    return errorResponse(res, 500, 'Failed to create appointment');
  }
};

/**
 * Update appointment (reschedule)
 */
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;
    const { appointmentId } = req.params;
    const { date, startTime, duration, room, notes, type } = req.body;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const existing: AppointmentData | null = await AppointmentModel.findOne({
      id: appointmentId,
      doctorId,
      deletedAt: null,
    }).lean();

    if (!existing) {
      return errorResponse(res, 404, 'Appointment not found');
    }

    const updateData: Record<string, unknown> = {};

    if (date) updateData.date = new Date(date);
    if (startTime) {
      const start = new Date(startTime);
      const dur = Number(duration || existing.duration);
      updateData.startTime = start;
      updateData.endTime = new Date(start.getTime() + dur * 60000);
    }
    if (duration) updateData.duration = Number(duration);
    if (room !== undefined) updateData.room = room;
    if (notes !== undefined) updateData.notes = notes;
    if (type) updateData.type = type;

    await AppointmentModel.updateOne({ id: appointmentId }, { $set: updateData });

    const appointment: AppointmentData | null = await AppointmentModel.findOne({ id: appointmentId }).lean();

    if (!appointment) {
      return errorResponse(res, 404, 'Appointment not found');
    }

    const patient: PatientData | null = await PatientModel.findOne({ id: appointment.patientId }).lean();
    const patientUser: UserData | null = patient
      ? await UserModel.findOne({ id: patient.userId })
          .select('id name email phone')
          .lean()
      : null;

    return successResponse(res, {
      ...appointment,
      patient: patient ? { ...patient, user: patientUser } : null,
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    return errorResponse(res, 500, 'Failed to update appointment');
  }
};

/**
 * Cancel appointment (soft delete)
 */
export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;
    const { appointmentId } = req.params;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const existing: AppointmentData | null = await AppointmentModel.findOne({
      id: appointmentId,
      doctorId,
      deletedAt: null,
    }).lean();

    if (!existing) {
      return errorResponse(res, 404, 'Appointment not found');
    }

    await AppointmentModel.updateOne(
      { id: appointmentId },
      { $set: { status: AppointmentStatus.CANCELLED, deletedAt: new Date() } }
    );

    return successResponse(res, { message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    return errorResponse(res, 500, 'Failed to cancel appointment');
  }
};

/**
 * Get doctor's patients (unique patients from appointments)
 */
export const getMyPatients = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const patientIds = await AppointmentModel.distinct('patientId', { doctorId });
    const patients: PatientData[] = await PatientModel.find({
      deletedAt: null,
      $or: [{ id: { $in: patientIds } }, { createdByDoctorId: doctorId }],
    }).lean();
    const userIds = patients.map((patient) => patient.userId);
    const users: UserData[] = await UserModel.find({ id: { $in: userIds } })
      .select('id name email phone gender')
      .lean();

    const userMap = mapById(users);

    const response = patients.map((patient) => ({
      ...patient,
      user: userMap.get(patient.userId) || null,
    }));

    return successResponse(res, response);
  } catch (error) {
    console.error('Get patients error:', error);
    return errorResponse(res, 500, 'Failed to fetch patients');
  }
};

/**
 * Get patient details
 */
export const getPatientDetails = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;
    const { patientId } = req.params;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const patient: PatientData | null = await PatientModel.findOne({ id: patientId }).lean();

    if (!patient) {
      return errorResponse(res, 404, 'Patient not found');
    }

    const appointment: AppointmentData | null = await AppointmentModel.findOne({
      doctorId,
      patientId,
    }).lean();

    if (!appointment && patient.createdByDoctorId !== doctorId) {
      return errorResponse(res, 403, 'Access denied to this patient');
    }

    const user: UserData | null = await UserModel.findOne({ id: patient.userId })
      .select('id name email phone gender')
      .lean();
    const medicalRecords: MedicalRecordData[] = await MedicalRecordModel.find({ patientId })
      .sort({ recordDate: -1 })
      .lean();
    const medicalNotes: MedicalNoteData[] = await MedicalNoteModel.find({ patientId })
      .sort({ createdAt: -1 })
      .lean();
    const appointments: AppointmentData[] = await AppointmentModel.find({ doctorId, patientId })
      .sort({ date: -1 })
      .lean();

    const doctorIds = medicalNotes.map((note) => note.doctorId);
    const doctors: DoctorData[] = await DoctorModel.find({ id: { $in: doctorIds } }).lean();
    const doctorUserIds = doctors.map((doctor) => doctor.userId);
    const doctorUsers: UserData[] = await UserModel.find({ id: { $in: doctorUserIds } })
      .select('id name')
      .lean();

    const doctorMap = mapById(doctors);
    const doctorUserMap = mapById(doctorUsers);

    const notesWithDoctors = medicalNotes.map((note) => {
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

    return successResponse(res, {
      ...patient,
      user,
      medicalRecords,
      medicalNotes: notesWithDoctors,
      appointments,
    });
  } catch (error) {
    console.error('Get patient details error:', error);
    return errorResponse(res, 500, 'Failed to fetch patient details');
  }
};

/**
 * Add medical note for patient
 */
export const addMedicalNote = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;
    const { patientId } = req.params;
    const { note, diagnosis } = req.body;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    if (!note || note.trim().length === 0) {
      return errorResponse(res, 400, 'Note is required');
    }

    const appointment = await AppointmentModel.findOne({
      doctorId,
      patientId,
    }).lean();

    if (!appointment) {
      return errorResponse(res, 403, 'Access denied to this patient');
    }

    const medicalNote = await MedicalNoteModel.create({
      doctorId,
      patientId,
      note,
      diagnosis: diagnosis || null,
    });

    const doctor = await DoctorModel.findOne({ id: doctorId }).lean();
    const doctorUser = doctor
      ? await UserModel.findOne({ id: doctor.userId })
          .select('id name')
          .lean()
      : null;

    return successResponse(
      res,
      {
        ...medicalNote.toObject(),
        doctor: doctor
          ? {
              ...doctor,
              user: doctorUser ? { name: doctorUser.name } : null,
            }
          : null,
      },
      201
    );
  } catch (error) {
    console.error('Add medical note error:', error);
    return errorResponse(res, 500, 'Failed to add medical note');
  }
};

/**
 * Update appointment status
 */
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;
    const { appointmentId } = req.params;
    const { status, notes } = req.body;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    if (!status) {
      return errorResponse(res, 400, 'Status is required');
    }

    const appointment = await AppointmentModel.findOne({ id: appointmentId }).lean();

    if (!appointment) {
      return errorResponse(res, 404, 'Appointment not found');
    }

    if (appointment.doctorId !== doctorId) {
      return errorResponse(res, 403, 'Access denied to this appointment');
    }

    await AppointmentModel.updateOne(
      { id: appointmentId },
      { $set: { status, notes: notes || appointment.notes } }
    );

    const updatedAppointment = await AppointmentModel.findOne({ id: appointmentId }).lean();

    if (!updatedAppointment) {
      return errorResponse(res, 404, 'Appointment not found');
    }

    const patient = await PatientModel.findOne({ id: updatedAppointment.patientId }).lean();
    const patientUser = patient
      ? await UserModel.findOne({ id: patient.userId })
          .select('id name email phone')
          .lean()
      : null;

    return successResponse(res, {
      ...updatedAppointment,
      patient: patient ? { ...patient, user: patientUser } : null,
    });
  } catch (error) {
    console.error('Update appointment status error:', error);
    return errorResponse(res, 500, 'Failed to update appointment');
  }
};

/**
 * Create new patient
 */
export const createPatient = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();

  try {
    const doctorId = req.user?.doctorId;
    const {
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      bloodType,
      allergies,
      currentMedications,
      emergencyContactName,
      emergencyContactPhone,
    } = req.body;

    if (!doctorId) {
      await session.endSession();
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    if (!name || !email || !gender || !dateOfBirth) {
      await session.endSession();
      return errorResponse(res, 400, 'Missing required fields: name, email, gender, dateOfBirth');
    }

    const existingUser = await UserModel.findOne({ email }).lean();

    if (existingUser) {
      await session.endSession();
      return errorResponse(res, 409, 'A user with this email already exists');
    }

    let patientResult: Record<string, unknown> | null = null;

    await session.withTransaction(async () => {
      const [user] = await UserModel.create(
        [
          {
            email,
            password: await hashPassword('patient123'),
            name,
            role: UserRole.PATIENT,
            gender,
            phone: phone || null,
          },
        ],
        { session }
      );

      const [patient] = await PatientModel.create(
        [
          {
            userId: user.id,
            createdByDoctorId: doctorId,
            dateOfBirth: new Date(dateOfBirth),
            bloodType: bloodType || null,
            allergies: allergies || [],
            currentMedications: currentMedications || [],
            emergencyContactName: emergencyContactName || null,
            emergencyContactPhone: emergencyContactPhone || null,
          },
        ],
        { session }
      );

      patientResult = {
        ...patient.toObject(),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
        },
      };
    });

    await session.endSession();

    if (!patientResult) {
      return errorResponse(res, 500, 'Failed to create patient');
    }

    return successResponse(res, patientResult, 201);
  } catch (error) {
    await session.endSession();
    console.error('Create patient error:', error);
    return errorResponse(res, 500, 'Failed to create patient');
  }
};

/**
 * Update patient info
 */
export const updatePatient = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();

  try {
    const doctorId = req.user?.doctorId;
    const { patientId } = req.params;
    const {
      name,
      phone,
      dateOfBirth,
      bloodType,
      allergies,
      currentMedications,
      emergencyContactName,
      emergencyContactPhone,
    } = req.body;

    if (!doctorId) {
      await session.endSession();
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const existing = await PatientModel.findOne({ id: patientId, deletedAt: null }).lean();

    if (!existing) {
      await session.endSession();
      return errorResponse(res, 404, 'Patient not found');
    }

    let updatedPatient: Record<string, unknown> | null = null;

    await session.withTransaction(async () => {
      if (name || phone !== undefined) {
        await UserModel.updateOne(
          { id: existing.userId },
          { $set: { ...(name && { name }), ...(phone !== undefined && { phone }) } },
          { session }
        );
      }

      const updated = await PatientModel.findOneAndUpdate(
        { id: patientId },
        {
          $set: {
            ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
            ...(bloodType !== undefined && { bloodType }),
            ...(allergies && { allergies }),
            ...(currentMedications && { currentMedications }),
            ...(emergencyContactName !== undefined && { emergencyContactName }),
            ...(emergencyContactPhone !== undefined && { emergencyContactPhone }),
          },
        },
        { new: true, session }
      ).lean();

      const user = await UserModel.findOne({ id: existing.userId })
        .select('id name email phone gender')
        .lean();

      updatedPatient = updated
        ? {
            ...updated,
            user,
          }
        : null;
    });

    await session.endSession();

    if (!updatedPatient) {
      return errorResponse(res, 500, 'Failed to update patient');
    }

    return successResponse(res, updatedPatient);
  } catch (error) {
    await session.endSession();
    console.error('Update patient error:', error);
    return errorResponse(res, 500, 'Failed to update patient');
  }
};

/**
 * Get patient vitals history
 */
export const getPatientVitals = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;
    const { patientId } = req.params;
    const { limit } = req.query;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const appointment: AppointmentData | null = await AppointmentModel.findOne({
      doctorId,
      patientId,
    }).lean();

    if (!appointment) {
      return errorResponse(res, 403, 'Access denied to this patient');
    }

    const vitals: VitalsData[] = await VitalsModel.find({ patientId })
      .sort({ recordedAt: -1 })
      .limit(limit ? parseInt(limit as string, 10) : 20)
      .lean();

    const recordedByIds = vitals.map((vital) => vital.recordedById);
    const users: UserData[] = await UserModel.find({ id: { $in: recordedByIds } })
      .select('id name')
      .lean();
    const userMap = mapById(users);

    const response = vitals.map((vital) => ({
      ...vital,
      recordedBy: userMap.get(vital.recordedById)
        ? { name: userMap.get(vital.recordedById)?.name }
        : null,
    }));

    return successResponse(res, response);
  } catch (error) {
    console.error('Get patient vitals error:', error);
    return errorResponse(res, 500, 'Failed to fetch vitals');
  }
};

/**
 * Add patient vitals
 */
export const addPatientVitals = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const doctorId = req.user?.doctorId;
    const { patientId } = req.params;
    const { heartRate, bloodPressure, temperature, weight, height, spo2 } = req.body;

    if (!doctorId || !userId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const appointment: AppointmentData | null = await AppointmentModel.findOne({
      doctorId,
      patientId,
    }).lean();

    if (!appointment) {
      return errorResponse(res, 403, 'Access denied to this patient');
    }

    if (!heartRate && !bloodPressure && !temperature && !weight && !height && !spo2) {
      return errorResponse(res, 400, 'At least one vital measurement is required');
    }

    const vitals = await VitalsModel.create({
      patientId,
      heartRate: heartRate || null,
      bloodPressure: bloodPressure || null,
      temperature: temperature || null,
      weight: weight || null,
      height: height || null,
      spo2: spo2 || null,
      recordedById: userId,
    });

    const recordedBy: UserData | null = await UserModel.findOne({ id: userId })
      .select('id name')
      .lean();

    return successResponse(
      res,
      {
        ...vitals.toObject(),
        recordedBy: recordedBy ? { name: recordedBy.name } : null,
      },
      201
    );
  } catch (error) {
    console.error('Add patient vitals error:', error);
    return errorResponse(res, 500, 'Failed to add vitals');
  }
};

/**
 * Get patient consultation history
 */
export const getPatientConsultations = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.doctorId;
    const { patientId } = req.params;

    if (!doctorId) {
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    const appointments: AppointmentData[] = await AppointmentModel.find({
      patientId,
      doctorId,
      deletedAt: null,
    }).lean();

    const appointmentIds = appointments.map((appointment) => appointment.id);
    const consultations: ConsultationData[] = await ConsultationModel.find({
      appointmentId: { $in: appointmentIds },
    })
      .sort({ createdAt: -1 })
      .lean();

    const consultationIds = consultations.map((consultation) => consultation.id);
    const prescriptions: PrescriptionData[] = await PrescriptionModel.find({
      consultationId: { $in: consultationIds },
    }).lean();

    const appointmentMap = mapById(appointments);
    const prescriptionMap = new Map(
      prescriptions.map((prescription) => [prescription.consultationId, prescription])
    );

    const response = consultations.map((consultation) => {
      const appointment = appointmentMap.get(consultation.appointmentId);

      return {
        ...consultation,
        appointment: appointment
          ? { date: appointment.date, type: appointment.type }
          : null,
        prescription: prescriptionMap.get(consultation.id) || null,
      };
    });

    return successResponse(res, response);
  } catch (error) {
    console.error('Get patient consultations error:', error);
    return errorResponse(res, 500, 'Failed to fetch consultations');
  }
};

/**
 * Save consultation (complete appointment)
 */
export const saveConsultation = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();

  try {
    const doctorId = req.user?.doctorId;
    const {
      appointmentId,
      symptoms,
      diagnosis,
      notes,
      icdCode,
      medicines,
      advice,
      followUpDate,
    } = req.body;

    if (!doctorId) {
      await session.endSession();
      return errorResponse(res, 400, 'Doctor ID not found');
    }

    if (!appointmentId || !symptoms || !diagnosis) {
      await session.endSession();
      return errorResponse(res, 400, 'Missing required fields: appointmentId, symptoms, diagnosis');
    }

    const appointment: AppointmentData | null = await AppointmentModel.findOne({
      id: appointmentId,
      doctorId,
      deletedAt: null,
    }).lean();

    if (!appointment) {
      await session.endSession();
      return errorResponse(res, 404, 'Appointment not found');
    }

    const existingConsultation: ConsultationData | null = await ConsultationModel.findOne({
      appointmentId,
    }).lean();

    if (existingConsultation) {
      await session.endSession();
      return errorResponse(res, 409, 'Consultation already exists for this appointment');
    }

    let result: Record<string, unknown> | null = null;

    await session.withTransaction(async () => {
      const [consultation] = await ConsultationModel.create(
        [
          {
            appointmentId,
            symptoms,
            diagnosis,
            notes: notes || null,
            icdCode: icdCode || null,
          },
        ],
        { session }
      );

      let prescription: PrescriptionData | null = null;
      if (Array.isArray(medicines) && medicines.length > 0) {
        const [created] = await PrescriptionModel.create(
          [
            {
              consultationId: consultation.id,
              medicines,
              advice: advice || null,
              followUpDate: followUpDate ? new Date(followUpDate) : null,
            },
          ],
          { session }
        );
        prescription = created.toObject() as PrescriptionData;
      }

      await AppointmentModel.updateOne(
        { id: appointmentId },
        { $set: { status: AppointmentStatus.COMPLETED } },
        { session }
      );

      result = {
        ...consultation.toObject(),
        prescription,
      };
    });

    await session.endSession();

    if (!result) {
      return errorResponse(res, 500, 'Failed to save consultation');
    }

    return successResponse(res, result, 201);
  } catch (error) {
    await session.endSession();
    console.error('Save consultation error:', error);
    return errorResponse(res, 500, 'Failed to save consultation');
  }
};
