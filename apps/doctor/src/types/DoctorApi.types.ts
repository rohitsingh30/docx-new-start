import { ApiAppointmentStatus, ApiBloodType, ApiGender } from './enums';

export interface DoctorDashboardStatsApi {
  totalPatients: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedToday: number;
  upcomingThisWeek: number;
}

export interface DoctorAppointmentApi {
  id: string;
  date: string;
  startTime: string;
  duration: number;
  type: string;
  status: ApiAppointmentStatus;
  patient: {
    id: string;
    user?: {
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      gender?: ApiGender | null;
    } | null;
  } | null;
}

export interface DoctorPatientApi {
  id: string;
  userId: string;
  dateOfBirth: string;
  bloodType?: ApiBloodType | null;
  allergies: string[];
  currentMedications: string[];
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    gender?: ApiGender | null;
  } | null;
}

export interface CreatePatientPayload {
  name: string;
  email: string;
  phone?: string;
  gender: ApiGender;
  dateOfBirth: string;
  bloodType?: ApiBloodType;
  allergies?: string[];
  currentMedications?: string[];
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}
