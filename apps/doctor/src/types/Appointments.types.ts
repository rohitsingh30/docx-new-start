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
  patientAge?: number;
  patientGender?: string;
}

export interface AppointmentsProps {
  onAppointmentClick?: (appointmentId: string) => void;
  onNewAppointment?: () => void;
  onEditAppointment?: (appointmentId: string) => void;
  onCancelAppointment?: (appointmentId: string) => void;
}

export enum AppointmentViewMode {
  LIST = 'list',
  GRID = 'grid'
}
