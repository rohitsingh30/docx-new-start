import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';
import { AppointmentModel, DoctorModel, PatientModel, UserModel } from '../models';
import { DoctorData, UserData } from '../types/mongo.types';

const mapById = <T extends { id: string }>(items: T[]): Map<string, T> => {
  return new Map(items.map((item) => [item.id, item]));
};

/**
 * Get all doctors
 */
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors: DoctorData[] = await DoctorModel.find().sort({ createdAt: -1 }).lean();
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
    console.error('Get all doctors error:', error);
    return errorResponse(res, 500, 'Failed to fetch doctors');
  }
};

/**
 * Get system analytics
 */
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    const [totalDoctors, totalPatients, totalAppointments, todayAppointments] = await Promise.all([
      DoctorModel.countDocuments(),
      PatientModel.countDocuments(),
      AppointmentModel.countDocuments(),
      AppointmentModel.countDocuments({
        date: { $gte: start, $lt: end },
      }),
    ]);

    const grouped: Array<{ _id: string; count: number }> = await AppointmentModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const appointmentsByStatus = grouped.map((item) => ({
      status: item._id,
      _count: { _all: item.count },
    }));

    return successResponse(res, {
      totalDoctors,
      totalPatients,
      totalAppointments,
      todayAppointments,
      appointmentsByStatus,
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    return errorResponse(res, 500, 'Failed to fetch analytics');
  }
};
