// Patient Details page types
import { Patient } from './Patient.types';

export interface PatientDetailsProps {
  patientId?: string;
  onBack?: () => void;
}

export interface PatientDetailsState {
  patient: Patient | null;
  isLoading: boolean;
  isEditing: boolean;
  error: string | null;
}

export interface PatientInfoSection {
  title: string;
  icon: string;
  fields: PatientInfoField[];
}

export interface PatientInfoField {
  label: string;
  value: string | string[];
  icon?: string;
  type?: 'text' | 'email' | 'phone' | 'date' | 'tag' | 'tags';
}
