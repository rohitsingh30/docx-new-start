import React, { useState } from 'react';
import styles from '../styles/PatientCard.module.css';
import { PatientCardProps } from '../types/Patient.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';

const PatientCard: React.FC<PatientCardProps> = ({ patient, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeleteClick = () => {
    if (window.confirm(STRING_CONSTANTS.MESSAGES.CONFIRM_DELETE)) {
      onDelete(patient.id);
    }
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.patientCard} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.patientCardHeader} onClick={toggleExpansion}>
        <div className={styles.headerLeft}>
          <h3>{patient.firstName} {patient.lastName}</h3>
          <span className={styles.patientId}>ID: {patient.id}</span>
        </div>
        <div className={styles.headerRight}>
          <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
            ▾
          </span>
          <button 
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick();
            }}
            aria-label={`Delete patient ${patient.firstName} ${patient.lastName}`}
          >
            {STRING_CONSTANTS.BUTTONS.DELETE}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className={styles.patientCardBody}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>Date of Birth</strong>
              <span>{patient.dateOfBirth}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Gender</strong>
              <span>{patient.gender}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Phone</strong>
              <span>{patient.phoneNumber}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Email</strong>
              <span>{patient.email}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Blood Type</strong>
              <span className={styles.bloodType}>{patient.bloodType}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Address</strong>
              <span>{patient.address}</span>
            </div>
            {patient.allergies.length > 0 && (
              <div className={styles.infoItem}>
                <strong>Allergies</strong>
                <span className={styles.allergies}>{patient.allergies.join(', ')}</span>
              </div>
            )}
            {patient.medications.length > 0 && (
              <div className={styles.infoItem}>
                <strong>Medications</strong>
                <span className={styles.medications}>{patient.medications.join(', ')}</span>
              </div>
            )}
            <div className={styles.infoItem}>
              <strong>Emergency Contact</strong>
              <span>
                {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                <br />
                {patient.emergencyContact.phoneNumber}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
