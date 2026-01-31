import React, { useState, useCallback } from 'react';
import styles from '../styles/PatientRecords.module.css';
import { PatientFormData, PatientRecordsProps } from '../types/Patient.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { DATA_CONSTANTS } from '../constants/dataConstants';
import { Gender, BloodType } from '../types/enums';
import PatientCard from './PatientCard';
import PatientForm from './PatientForm';
import EmptyState from './EmptyState';
import { usePatientsData } from '../hooks/usePatientsData';
import { mapBloodTypeToApi, mapGenderToApi } from '../utils/apiMappers';
import { CreatePatientPayload } from '../types/DoctorApi.types';

const buildCreatePatientPayload = (formData: PatientFormData): CreatePatientPayload => {
  return {
    name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    phone: formData.phoneNumber || undefined,
    gender: mapGenderToApi(formData.gender),
    dateOfBirth: formData.dateOfBirth,
    bloodType: mapBloodTypeToApi(formData.bloodType),
    allergies: formData.allergies
      ? formData.allergies.split(',').map((allergy) => allergy.trim()).filter(Boolean)
      : [],
    currentMedications: formData.medications
      ? formData.medications.split(',').map((medication) => medication.trim()).filter(Boolean)
      : [],
    emergencyContactName: formData.emergencyContactName || undefined,
    emergencyContactPhone: formData.emergencyContactPhone || undefined,
  };
};

const PatientRecords: React.FC<PatientRecordsProps> = ({ onPatientClick }) => {
  const { data: patientsList = [], isLoading, createPatient } = usePatientsData();
  const [isAddFormVisible, setIsAddFormVisible] = useState<boolean>(false);
  const isDev = process.env.NODE_ENV === STRING_CONSTANTS.MESSAGES.ENV_DEVELOPMENT;
  const devShortcutLabels = [
    STRING_CONSTANTS.BUTTONS.DEV_ADD_PATIENT_ONE,
    STRING_CONSTANTS.BUTTONS.DEV_ADD_PATIENT_TWO,
    STRING_CONSTANTS.BUTTONS.DEV_ADD_PATIENT_THREE,
  ];
  const [newPatientData, setNewPatientData] = useState<PatientFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: Gender.MALE,
    phoneNumber: '',
    email: '',
    address: '',
    bloodType: BloodType.A_POSITIVE,
    allergies: '',
    medications: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: ''
  });

  const updatePatientData = useCallback((field: keyof PatientFormData, value: string) => {
    setNewPatientData(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleAddForm = useCallback(() => {
    setIsAddFormVisible(prev => !prev);
  }, []);

  const resetForm = useCallback(() => {
    setNewPatientData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: Gender.MALE,
      phoneNumber: '',
      email: '',
      address: '',
      bloodType: BloodType.A_POSITIVE,
      allergies: '',
      medications: '',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: ''
    });
    setIsAddFormVisible(false);
  }, []);

  const handleAddPatient = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = buildCreatePatientPayload(newPatientData);

    createPatient.mutate(payload, {
      onSuccess: () => resetForm(),
    });
  }, [createPatient, newPatientData, resetForm]);

  const handleShortcutAddPatient = useCallback((shortcut: PatientFormData) => {
    const [localPart, domainPart] = shortcut.email.split(STRING_CONSTANTS.SEPARATORS.AT);
    const uniqueEmail = `${localPart}${STRING_CONSTANTS.SEPARATORS.PLUS}${Date.now()}${STRING_CONSTANTS.SEPARATORS.AT}${domainPart}`;
    createPatient.mutate(buildCreatePatientPayload({
      ...shortcut,
      email: uniqueEmail,
    }));
  }, [createPatient]);

  const handleDeletePatient = useCallback((_id: string) => {}, []);

  return (
    <div className={styles.patientRecords}>
      <div className={styles.recordsHeader}>
        <h1 className={styles.pageTitle}>{STRING_CONSTANTS.LABELS.PATIENT_RECORDS}</h1>
        <button 
          className={styles.addButton}
          onClick={toggleAddForm}
          aria-expanded={isAddFormVisible}
        >
          {isAddFormVisible ? STRING_CONSTANTS.BUTTONS.CANCEL : STRING_CONSTANTS.BUTTONS.ADD_PATIENT}
        </button>
      </div>

      {isDev && (
        <div className={styles.devShortcuts}>
          <div className={styles.devShortcutsTitle}>{STRING_CONSTANTS.LABELS.DEV_SHORTCUTS}</div>
          <div className={styles.devShortcutsButtons}>
            {DATA_CONSTANTS.DEV_PATIENT_SHORTCUTS.map((shortcut, index) => (
              <button
                key={shortcut.email}
                className={styles.devShortcutButton}
                onClick={() => handleShortcutAddPatient(shortcut)}
              >
                {devShortcutLabels[index] || STRING_CONSTANTS.BUTTONS.ADD_PATIENT}
              </button>
            ))}
          </div>
        </div>
      )}

      {isAddFormVisible && (
        <PatientForm
          patientData={newPatientData}
          onSubmit={handleAddPatient}
          onCancel={resetForm}
          onDataChange={updatePatientData}
        />
      )}

      <div className={styles.patientsList}>
        {!isLoading && patientsList.length === 0 ? (
          <EmptyState
            icon={STRING_CONSTANTS.ICONS.PATIENTS}
            title={STRING_CONSTANTS.EMPTY_STATE.NO_PATIENTS_YET_TITLE}
            message={STRING_CONSTANTS.EMPTY_STATE.NO_PATIENTS_YET_MESSAGE}
            actionText={STRING_CONSTANTS.BUTTONS.ADD_PATIENT}
            onAction={toggleAddForm}
          />
        ) : (
          patientsList.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onDelete={handleDeletePatient}
              onViewDetails={onPatientClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PatientRecords;