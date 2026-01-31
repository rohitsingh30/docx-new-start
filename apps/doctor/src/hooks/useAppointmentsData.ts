import { useQuery } from '@tanstack/react-query';
import { get, ApiResponse } from '../services/api';
import { AppointmentListItem } from '../types/Appointments.types';
import { DoctorAppointmentApi } from '../types/DoctorApi.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { mapAppointmentStatus } from '../utils/apiMappers';

const mapAppointment = (item: DoctorAppointmentApi): AppointmentListItem => {
  const patientName = item.patient?.user?.name || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE;
  const time = new Date(item.startTime).toLocaleTimeString();

  return {
    id: item.id,
    patientName,
    date: new Date(item.date).toLocaleDateString(),
    time,
    status: mapAppointmentStatus(item.status),
    type: item.type,
    duration: item.duration
      ? `${item.duration} ${STRING_CONSTANTS.LABELS.MINUTES_SHORT}`
      : STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    room: STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    avatar: STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
  };
};

export const useAppointmentsData = () => {
  return useQuery({
    queryKey: ['doctor', 'appointments'],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<AppointmentListItem[]> => {
      const response = await get<ApiResponse<DoctorAppointmentApi[]>>('/doctor/appointments');
      return response.data.map(mapAppointment);
    },
  });
};
