import React, { useState, useCallback, useMemo } from 'react';
import styles from '../styles/PatientRecords.module.css';
import { Patient, PatientFormData, PatientRecordsProps } from '../types/Patient.types';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { Gender, BloodType } from '../types/enums';
import PatientCard from './PatientCard';
import PatientForm from './PatientForm';
import EmptyState from './EmptyState';

const PatientRecords: React.FC<PatientRecordsProps> = () => {
  const [patientsList, setPatientsList] = useState<Patient[]>(MOCK_DATA.PATIENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddFormVisible, setIsAddFormVisible] = useState<boolean>(false);
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

  const filteredPatientsList = useMemo(() => {
    if (!searchQuery) return patientsList;
    const query = searchQuery.toLowerCase();
    return patientsList.filter(patient => 
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query) ||
      patient.phoneNumber.includes(query) ||
      patient.bloodType.toLowerCase().includes(query)
    );
  }, [patientsList, searchQuery]);

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
    const newPatient: Patient = {
      id: Date.now().toString(),
      firstName: newPatientData.firstName,
      lastName: newPatientData.lastName,
      dateOfBirth: newPatientData.dateOfBirth,
      gender: newPatientData.gender,
      phoneNumber: newPatientData.phoneNumber,
      email: newPatientData.email,
      address: newPatientData.address,
      bloodType: newPatientData.bloodType,
      allergies: newPatientData.allergies ? newPatientData.allergies.split(',').map(a => a.trim()) : [],
      medications: newPatientData.medications ? newPatientData.medications.split(',').map(m => m.trim()) : [],
      emergencyContact: {
        name: newPatientData.emergencyContactName,
        relationship: newPatientData.emergencyContactRelationship,
        phoneNumber: newPatientData.emergencyContactPhone
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPatientsList(prev => [...prev, newPatient]);
    resetForm();
  }, [newPatientData, resetForm]);

  const handleDeletePatient = useCallback((id: string) => {
    setPatientsList(prev => prev.filter(patient => patient.id !== id));
  }, []);

  return (
    <div className={styles.patientRecords}>
      <div className={styles.recordsHeader}>
        <h2>{STRING_CONSTANTS.LABELS.PATIENTS} Records</h2>
        <button 
          className={styles.addButton}
          onClick={toggleAddForm}
          aria-expanded={isAddFormVisible}
        >
          {isAddFormVisible ? STRING_CONSTANTS.BUTTONS.CANCEL : STRING_CONSTANTS.BUTTONS.ADD_PATIENT}
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder={STRING_CONSTANTS.PLACEHOLDERS.SEARCH_PATIENTS}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label={STRING_CONSTANTS.ARIA_LABELS.SEARCH_PATIENTS}
        />
      </div>

      {isAddFormVisible && (
        <PatientForm
          patientData={newPatientData}
          onSubmit={handleAddPatient}
          onCancel={resetForm}
          onDataChange={updatePatientData}
        />
      )}

      <div className={styles.patientsList}>
        {filteredPatientsList.length === 0 ? (
          searchQuery ? (
            <EmptyState
              icon={STRING_CONSTANTS.ICONS.SEARCH}
              title={STRING_CONSTANTS.EMPTY_STATE.NO_PATIENTS_FOUND_TITLE}
              message={STRING_CONSTANTS.EMPTY_STATE.NO_PATIENTS_FOUND_MESSAGE}
              actionText={STRING_CONSTANTS.BUTTONS.ADD_PATIENT}
              onAction={toggleAddForm}
            />
          ) : (
            <EmptyState
              icon={STRING_CONSTANTS.ICONS.PATIENTS}
              title={STRING_CONSTANTS.EMPTY_STATE.NO_PATIENTS_YET_TITLE}
              message={STRING_CONSTANTS.EMPTY_STATE.NO_PATIENTS_YET_MESSAGE}
              actionText={STRING_CONSTANTS.BUTTONS.ADD_PATIENT}
              onAction={toggleAddForm}
            />
          )
        ) : (
          filteredPatientsList.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onDelete={handleDeletePatient}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PatientRecords;