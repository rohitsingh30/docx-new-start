import React from 'react';
import styles from '../styles/PatientCard.module.css';
import { PatientCardProps } from '../types/Patient.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { Gender } from '../types/enums';

const PatientCard: React.FC<PatientCardProps> = ({ patient, onViewDetails }) => {
  // Calculate age from date of birth
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(patient.id);
    }
  };

  const getGenderIcon = (gender: string): string => {
    switch (gender) {
      case Gender.MALE:
        return 'male';
      case Gender.FEMALE:
        return 'female';
      default:
        return 'transgender';
    }
  };

  return (
    <div className={styles.patientCard}>
      <div className={styles.patientContent}>
        <div className={styles.patientInfo}>
          <div className={styles.avatar}>
            <span className={styles.materialSymbolsIcon}>person</span>
          </div>
          <div className={styles.patientDetails}>
            <h3 className={styles.patientName}>{patient.firstName} {patient.lastName}</h3>
          </div>
        </div>

        <div className={styles.patientTags}>
          <span className={styles.infoTag}>
            <span className={styles.materialSymbolsIcon}>cake</span>
            {calculateAge(patient.dateOfBirth)} {STRING_CONSTANTS.PATIENT_LABELS.YEARS}
          </span>
          <span className={styles.infoTag}>
            <span className={styles.materialSymbolsIcon}>
              {getGenderIcon(patient.gender)}
            </span>
            {patient.gender}
          </span>
          <span className={styles.infoTag}>
            <span className={styles.materialSymbolsIcon}>call</span>
            {patient.phoneNumber}
          </span>
        </div>

        <div className={styles.patientActions}>
          <button className={styles.viewButton} onClick={handleViewDetails}>
            {STRING_CONSTANTS.BUTTONS.VIEW}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
