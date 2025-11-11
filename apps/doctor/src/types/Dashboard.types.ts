// Dashboard-related types and interfaces
import { AppointmentStatus } from './enums';

export interface DashboardStats {
  totalPatients: number;
  appointmentsToday: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  status: AppointmentStatus;
  type?: string;
  duration?: string;
  avatar?: string;
}

export interface RecentActivity {
  id: string;
  type: 'patient' | 'doctor' | 'appointment';
  title: string;
  description: string;
  timestamp: string;
}

export interface StatCard {
  label: string;
  value: number;
  icon?: string;
  color?: string;
}

export interface DashboardProps {
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  onAppointmentClick?: (appointmentId: string) => void;
}

export interface StatCardProps {
  title: string;
  value: number;
}
