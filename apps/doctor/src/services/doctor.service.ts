/**
 * Doctor Service - Handles all doctor-related API calls
 * 
 * Features:
 * - Get doctor's appointments
 * - Get doctor's patients
 * - Get patient details
 * - Add medical notes
 * - Update appointment status
 */

import { get, post, patch, ApiResponse } from './api';
import { AppointmentStatus } from '../types/enums';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: string;
  reason: string;
  notes?: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    email: string;
    bloodType?: string;
  };
  doctor: {
    id: string;
    specialization: string;
  };
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  address?: string;
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
}

export interface PatientDetails extends Patient {
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  medicalNotes: MedicalNote[];
}

export interface MedicalRecord {
  id: string;
  recordType: string;
  date: string;
  description: string;
  fileUrl?: string;
  notes?: string;
}

export interface MedicalNote {
  id: string;
  noteType: string;
  content: string;
  createdAt: string;
  doctor: {
    id: string;
    user: {
      name: string;
    };
  };
}

export interface GetAppointmentsParams {
  status?: AppointmentStatus;
  date?: string;
}

export interface AddMedicalNoteRequest {
  patientId: string;
  appointmentId: string;
  noteType: string;
  content: string;
}

export interface UpdateAppointmentStatusRequest {
  status: AppointmentStatus;
}

/**
 * Get doctor's appointments
 */
export const getMyAppointments = async (
  params?: GetAppointmentsParams
): Promise<Appointment[]> => {
  let endpoint = '/doctor/appointments';
  
  // Build query string
  const queryParams: string[] = [];
  if (params?.status) {
    queryParams.push(`status=${params.status}`);
  }
  if (params?.date) {
    queryParams.push(`date=${params.date}`);
  }
  
  if (queryParams.length > 0) {
    endpoint += `?${queryParams.join('&')}`;
  }

  const response = await get<ApiResponse<Appointment[]>>(endpoint);
  return response.data;
};

/**
 * Get doctor's patients
 */
export const getMyPatients = async (): Promise<Patient[]> => {
  const response = await get<ApiResponse<Patient[]>>('/doctor/patients');
  return response.data;
};

/**
 * Get patient details with full medical history
 */
export const getPatientDetails = async (patientId: string): Promise<PatientDetails> => {
  const response = await get<ApiResponse<PatientDetails>>(`/doctor/patients/${patientId}`);
  return response.data;
};

/**
 * Add medical note for a patient
 */
export const addMedicalNote = async (data: AddMedicalNoteRequest): Promise<MedicalNote> => {
  const response = await post<ApiResponse<MedicalNote>>('/doctor/notes', data);
  return response.data;
};

/**
 * Update appointment status
 */
export const updateAppointmentStatus = async (
  appointmentId: string,
  data: UpdateAppointmentStatusRequest
): Promise<Appointment> => {
  const response = await patch<ApiResponse<Appointment>>(
    `/doctor/appointments/${appointmentId}/status`,
    data
  );
  return response.data;
};

const doctorService = {
  getMyAppointments,
  getMyPatients,
  getPatientDetails,
  addMedicalNote,
  updateAppointmentStatus,
};

export default doctorService;
