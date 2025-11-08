// Doctor-related types and interfaces
export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  department: string;
  experience: number; // years
  education: string[];
  availableHours: {
    start: string;
    end: string;
  };
  consultationFee: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorFormData {
  firstName: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  department: string;
  experience: string;
  education: string;
  availableStart: string;
  availableEnd: string;
  consultationFee: string;
  isActive: boolean;
}

export interface DoctorSearchFilters {
  searchTerm: string;
  specialization?: string;
  department?: string;
  isActive?: boolean;
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
export type DoctorStatus = 'Active' | 'Inactive';
