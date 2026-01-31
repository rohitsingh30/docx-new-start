import { useQuery } from '@tanstack/react-query';
import { get, ApiResponse } from '../services/api';
import { Appointment, DashboardStats } from '../types/Dashboard.types';
import { DoctorAppointmentApi, DoctorDashboardStatsApi } from '../types/DoctorApi.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { mapAppointmentStatus } from '../utils/apiMappers';

const mapAppointment = (item: DoctorAppointmentApi): Appointment => {
  const patientName = item.patient?.user?.name || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE;
  const time = new Date(item.startTime).toLocaleTimeString();

  return {
    id: item.id,
    patientName,
    time,
    status: mapAppointmentStatus(item.status),
    type: item.type,
    duration: item.duration
      ? `${item.duration} ${STRING_CONSTANTS.LABELS.MINUTES_SHORT}`
      : undefined,
  };
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['doctor', 'dashboard', 'stats'],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<DashboardStats> => {
      const response = await get<ApiResponse<DoctorDashboardStatsApi>>('/doctor/stats');
      return {
        totalPatients: response.data.totalPatients,
        appointmentsToday: response.data.todayAppointments,
      };
    },
  });
};

export const useDashboardAppointments = () => {
  return useQuery({
    queryKey: ['doctor', 'dashboard', 'appointments'],
    queryFn: async (): Promise<Appointment[]> => {
      const response = await get<ApiResponse<DoctorAppointmentApi[]>>('/doctor/appointments?upcoming=true');
      return response.data.map(mapAppointment);
    },
  });
};
