import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponse, get, post } from '../services/api';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { DoctorPatientApi, CreatePatientPayload } from '../types/DoctorApi.types';
import { Patient } from '../types/Patient.types';
import { mapBloodType, mapGender, splitName } from '../utils/apiMappers';

const mapPatient = (patient: DoctorPatientApi): Patient => {
  const { firstName, lastName } = splitName(patient.user?.name);

  return {
    id: patient.id,
    firstName,
    lastName,
    dateOfBirth: patient.dateOfBirth,
    gender: mapGender(patient.user?.gender),
    phoneNumber: patient.user?.phone || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    email: patient.user?.email || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    address: STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    bloodType: mapBloodType(patient.bloodType),
    allergies: patient.allergies || [],
    medications: patient.currentMedications || [],
    emergencyContact: {
      name: patient.emergencyContactName || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
      relationship: STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
      phoneNumber: patient.emergencyContactPhone || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    },
    createdAt: patient.createdAt || new Date().toISOString(),
    updatedAt: patient.updatedAt || new Date().toISOString(),
  };
};

const mapOptimisticPatient = (payload: CreatePatientPayload, id: string): Patient => {
  const { firstName, lastName } = splitName(payload.name);

  return {
    id,
    firstName,
    lastName,
    dateOfBirth: payload.dateOfBirth,
    gender: mapGender(payload.gender),
    phoneNumber: payload.phone || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    email: payload.email,
    address: STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    bloodType: mapBloodType(payload.bloodType),
    allergies: payload.allergies || [],
    medications: payload.currentMedications || [],
    emergencyContact: {
      name: payload.emergencyContactName || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
      relationship: STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
      phoneNumber: payload.emergencyContactPhone || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const usePatientsData = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['doctor', 'patients'],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<Patient[]> => {
      const response = await get<ApiResponse<DoctorPatientApi[]>>('/doctor/patients');
      return response.data.map(mapPatient);
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: CreatePatientPayload): Promise<DoctorPatientApi> => {
      const response = await post<ApiResponse<DoctorPatientApi>>('/doctor/patients', payload);
      return response.data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['doctor', 'patients'] });
      const previous = queryClient.getQueryData<Patient[]>(['doctor', 'patients']) || [];
      const optimisticId = `temp-${Date.now()}`;
      const optimisticPatient = mapOptimisticPatient(payload, optimisticId);

      queryClient.setQueryData<Patient[]>(['doctor', 'patients'], [optimisticPatient, ...previous]);

      return { previous, optimisticId };
    },
    onError: (_error, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['doctor', 'patients'], context.previous);
      }
    },
    onSuccess: (createdPatient, _payload, context) => {
      queryClient.setQueryData<Patient[]>(['doctor', 'patients'], (current = []) => {
        const mapped = mapPatient(createdPatient);
        if (!context?.optimisticId) {
          return [mapped, ...current];
        }

        return current.map((patient) =>
          patient.id === context.optimisticId ? mapped : patient
        );
      });
    },
  });

  return {
    ...query,
    createPatient: mutation,
  };
};
