import {
  AppointmentStatus,
  BloodType,
  DoctorStatus,
  Gender,
  UserRole,
} from './enums';

export interface UserData {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  gender: Gender;
  phone?: string | null;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DoctorData {
  id: string;
  userId: string;
  specialization: string;
  licenseNumber: string;
  status: DoctorStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PatientData {
  id: string;
  userId: string;
  createdByDoctorId?: string | null;
  dateOfBirth: Date;
  bloodType?: BloodType | null;
  allergies: string[];
  currentMedications: string[];
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppointmentData {
  id: string;
  doctorId: string;
  patientId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  type: string;
  status: AppointmentStatus;
  room?: string | null;
  notes?: string | null;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConsultationData {
  id: string;
  appointmentId: string;
  symptoms: unknown;
  diagnosis: string;
  notes?: string | null;
  icdCode?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PrescriptionData {
  id: string;
  consultationId: string;
  medicines: unknown;
  advice?: string | null;
  followUpDate?: Date | null;
  pdfUrl?: string | null;
  createdAt?: Date;
}

export interface VitalsData {
  id: string;
  patientId: string;
  heartRate?: number | null;
  bloodPressure?: string | null;
  temperature?: number | null;
  weight?: number | null;
  height?: number | null;
  spo2?: number | null;
  recordedById: string;
  recordedAt: Date;
}

export interface MedicalNoteData {
  id: string;
  patientId: string;
  doctorId: string;
  note: string;
  diagnosis?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MedicalRecordData {
  id: string;
  patientId: string;
  title: string;
  type: string;
  description?: string | null;
  fileUrl?: string | null;
  recordDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
