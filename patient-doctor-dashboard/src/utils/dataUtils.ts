// Data manipulation and processing utilities
import { Patient } from '../types/Patient.types';
import { Doctor } from '../types/Doctor.types';

export const filterPatients = (patients: Patient[], searchTerm: string): Patient[] => {
  if (!searchTerm.trim()) return patients;
  
  const term = searchTerm.toLowerCase();
  return patients.filter(patient => 
    patient.firstName.toLowerCase().includes(term) ||
    patient.lastName.toLowerCase().includes(term) ||
    patient.email.toLowerCase().includes(term) ||
    patient.phoneNumber.includes(term)
  );
};

export const filterDoctors = (doctors: Doctor[], searchTerm: string): Doctor[] => {
  if (!searchTerm.trim()) return doctors;
  
  const term = searchTerm.toLowerCase();
  return doctors.filter(doctor => 
    doctor.firstName.toLowerCase().includes(term) ||
    doctor.lastName.toLowerCase().includes(term) ||
    doctor.specialization.toLowerCase().includes(term) ||
    doctor.department.toLowerCase().includes(term) ||
    doctor.email.toLowerCase().includes(term)
  );
};

export const sortData = <T>(data: T[], field: keyof T, direction: 'asc' | 'desc'): T[] => {
  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.localeCompare(bVal);
      return direction === 'asc' ? comparison : -comparison;
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};
