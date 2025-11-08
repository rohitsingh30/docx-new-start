// Doctor-related types and interfaces
import { Specialization, Department, DoctorStatus } from './enums';

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: Specialization;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  department: Department;
  experience: number; // years
  education: string[];
  availableHours: {
    start: string;
    end: string;
  };
  consultationFee: number;
  isActive: boolean;
  status: DoctorStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorFormData {
  firstName: string;
  lastName: string;
  specialization: Specialization | string;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  department: Department | string;
  experience: string;
  education: string;
  availableStart: string;
  availableEnd: string;
  consultationFee: string;
  isActive: boolean;
  status: DoctorStatus;
}

export interface DoctorSearchFilters {
  searchTerm: string;
  specialization?: Specialization;
  department?: Department;
  isActive?: boolean;
  status?: DoctorStatus;
}

// Component Props
export interface DoctorRecordsProps {}

export interface DoctorCardProps {
  doctor: Doctor;
  onDelete: (id: string) => void;
}

export interface DoctorFormProps {
  doctorData: DoctorFormData;
  onDataChange: (field: keyof DoctorFormData, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export type DoctorSortField = 'firstName' | 'lastName' | 'specialization' | 'department' | 'experience' | 'createdAt';
