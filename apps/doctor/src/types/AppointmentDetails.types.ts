// Appointment Details related types and interfaces
import { AppointmentStatus, BloodType, Gender } from './enums';

export interface AppointmentDetailsPatient {
  id: string;
  name: string;
  patientId: string;
  age: number;
  gender: Gender;
  contact: string;
  email: string;
  bloodType: BloodType;
  avatar: string;
}

export interface AppointmentDetailsInfo {
  id: string;
  type: string;
  status: AppointmentStatus;
  date: string;
  time: string;
  duration: string;
  room: string;
}

export interface ChiefComplaint {
  description: string;
  symptoms: string[];
  duration: string;
}

export interface MedicalHistorySummary {
  previousConditions: string;
  currentMedications: string;
  allergies: string;
}

export interface Vitals {
  heartRate: string;
  bloodPressure: string;
  temperature: string;
  weight: string;
}

export interface PreviousAppointment {
  id: string;
  type: string;
  date: string;
}

export interface AppointmentDetails {
  patient: AppointmentDetailsPatient;
  appointment: AppointmentDetailsInfo;
  chiefComplaint: ChiefComplaint;
  medicalHistory: MedicalHistorySummary;
  vitals: Vitals;
  notes: string;
  reminder?: string;
  previousAppointments: PreviousAppointment[];
}

export interface AppointmentDetailsProps {
  appointmentId?: string;
  onBack?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  onReschedule?: () => void;
  onViewRecords?: () => void;
  onCreatePrescription?: () => void;
  onOrderLabTests?: () => void;
  onUpdateVitals?: () => void;
  onSaveNotes?: (notes: string) => void;
}
