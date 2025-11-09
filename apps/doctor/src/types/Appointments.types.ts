// Appointments-related types and interfaces
import { AppointmentStatus } from './enums';

export interface AppointmentListItem {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: string;
  duration: string;
  room?: string;
  avatar: string;
}

export interface AppointmentsProps {
  onAppointmentClick?: (appointmentId: string) => void;
  onNewAppointment?: () => void;
  onEditAppointment?: (appointmentId: string) => void;
  onCancelAppointment?: (appointmentId: string) => void;
}

export type AppointmentFilterTab = 'all' | 'today' | 'upcoming' | 'completed' | 'cancelled';
export type AppointmentSortType = 'time' | 'patientName' | 'status' | 'type';
export type AppointmentViewMode = 'list' | 'grid';
