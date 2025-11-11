// Patient-related types and interfaces
import { Gender, BloodType } from './enums';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  address: string;
  bloodType: BloodType;
  allergies: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  address: string;
  bloodType: BloodType;
  allergies: string;
  medications: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
}

export interface PatientSearchFilters {
  searchTerm: string;
  gender?: Gender;
  bloodType?: BloodType;
}

// Component Props
export interface PatientRecordsProps {
  onPatientClick?: (patientId: string) => void;
}

export interface PatientCardProps {
  patient: Patient;
  onDelete: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export interface PatientFormProps {
  patientData: PatientFormData;
  onDataChange: (field: keyof PatientFormData, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}
