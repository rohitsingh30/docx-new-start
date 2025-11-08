import React, { useState, useCallback, useMemo } from 'react';
import styles from '../styles/DoctorRecords.module.css';
import { Doctor, DoctorFormData, DoctorRecordsProps } from '../types/Doctor.types';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { FORM_CONSTANTS } from '../constants/formConstants';
import DoctorCard from './DoctorCard';
import DoctorForm from './DoctorForm';
import EmptyState from './EmptyState';

const DoctorRecords: React.FC<DoctorRecordsProps> = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DATA.DOCTORS);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newDoctor, setNewDoctor] = useState<DoctorFormData>({
    firstName: '',
    lastName: '',
    specialization: '',
    licenseNumber: '',
    phoneNumber: '',
    email: '',
    department: '',
    experience: '',
    education: '',
    availableStart: '09:00',
    availableEnd: '17:00',
    consultationFee: '',
    isActive: true
  });

  const filteredDoctors = useMemo(() => {
    if (!searchTerm) return doctors;
    const query = searchTerm.toLowerCase();
    return doctors.filter(doctor =>
      doctor.firstName.toLowerCase().includes(query) ||
      doctor.lastName.toLowerCase().includes(query) ||
      doctor.specialization.toLowerCase().includes(query) ||
      doctor.department.toLowerCase().includes(query) ||
      doctor.email.toLowerCase().includes(query)
    );
  }, [doctors, searchTerm]);

  const updateDoctorData = useCallback((field: keyof DoctorFormData, value: string | boolean) => {
    setNewDoctor(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setNewDoctor({
      firstName: '',
      lastName: '',
      specialization: '',
      licenseNumber: '',
      phoneNumber: '',
      email: '',
      department: '',
      experience: '',
      education: '',
      availableStart: '09:00',
      availableEnd: '17:00',
      consultationFee: '',
      isActive: true
    });
    setShowAddForm(false);
  }, []);

  const handleAddDoctor = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const doctorToAdd: Doctor = {
      id: Date.now().toString(),
      firstName: newDoctor.firstName,
      lastName: newDoctor.lastName,
      specialization: newDoctor.specialization,
      licenseNumber: newDoctor.licenseNumber,
      phoneNumber: newDoctor.phoneNumber,
      email: newDoctor.email,
      department: newDoctor.department,
      experience: parseInt(newDoctor.experience),
      education: newDoctor.education ? newDoctor.education.split('\\n').filter(edu => edu.trim()) : [],
      availableHours: {
        start: newDoctor.availableStart,
        end: newDoctor.availableEnd
      },
      consultationFee: parseFloat(newDoctor.consultationFee),
      isActive: newDoctor.isActive,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setDoctors(prev => [...prev, doctorToAdd]);
    resetForm();
  }, [newDoctor, resetForm]);

  const handleDeleteDoctor = useCallback((id: string) => {
    setDoctors(prev => prev.filter(doctor => doctor.id !== id));
  }, []);

  const toggleAddForm = useCallback(() => {
    setShowAddForm(prev => !prev);
  }, []);

  return (
    <div className={styles.doctorRecords}>
      <div className={styles.recordsHeader}>
        <h2>{STRING_CONSTANTS.LABELS.DOCTORS} Records</h2>
        <button 
          className={styles.addButton}
          onClick={toggleAddForm}
          aria-expanded={showAddForm}
        >
          {showAddForm ? STRING_CONSTANTS.BUTTONS.CANCEL : STRING_CONSTANTS.BUTTONS.ADD_DOCTOR}
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.SEARCH_DOCTORS}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search doctors"
        />
      </div>

      {showAddForm && (
        <DoctorForm
          doctorData={newDoctor}
          onSubmit={handleAddDoctor}
          onCancel={resetForm}
          onDataChange={updateDoctorData}
        />
      )}

      <div className={styles.doctorsList}>
        {filteredDoctors.length === 0 ? (
          searchTerm ? (
            <EmptyState
              icon="🔍"
              title="No Doctors Found"
              message={`No doctors match "${searchTerm}". Try adjusting your search terms or add a new doctor.`}
              actionText={STRING_CONSTANTS.BUTTONS.ADD_DOCTOR}
              onAction={toggleAddForm}
            />
          ) : (
            <EmptyState
              icon="👨‍⚕️"
              title="No Doctors Yet"
              message="Build your medical team by adding doctors. Track their specializations, availability, and contact information all in one place."
              actionText={STRING_CONSTANTS.BUTTONS.ADD_DOCTOR}
              onAction={toggleAddForm}
            />
          )
        ) : (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onDelete={handleDeleteDoctor}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorRecords;