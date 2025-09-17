import React, { useState } from 'react';
import styles from '../styles/DoctorCard.module.css';
import { DoctorCardProps } from '../types/Doctor.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeleteClick = () => {
    if (window.confirm(STRING_CONSTANTS.MESSAGES.CONFIRM_DELETE)) {
      onDelete(doctor.id);
    }
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.doctorCard} ${doctor.isActive ? styles.activeCard : styles.inactiveCard} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.doctorCardHeader} onClick={toggleExpansion}>
        <div className={styles.headerLeft}>
          <h3>Dr. {doctor.firstName} {doctor.lastName}</h3>
          <span className={styles.doctorId}>ID: {doctor.id}</span>
        </div>
        <div className={styles.headerRight}>
          <div className={`${styles.statusBadge} ${doctor.isActive ? styles.statusActive : styles.statusInactive}`}>
            <span className={styles.statusDot}></span>
            {doctor.isActive ? 'Available' : 'Unavailable'}
          </div>
          <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
            ▾
          </span>
          <button 
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick();
            }}
            aria-label={`Delete doctor ${doctor.firstName} ${doctor.lastName}`}
          >
            {STRING_CONSTANTS.BUTTONS.DELETE}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className={styles.doctorCardBody}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>Specialization</strong>
              <span className={styles.specialization}>{doctor.specialization}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Department</strong>
              <span>{doctor.department}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>License Number</strong>
              <span className={styles.license}>{doctor.licenseNumber}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Phone</strong>
              <span>{doctor.phoneNumber}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Email</strong>
              <span>{doctor.email}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Experience</strong>
              <span className={styles.experience}>{doctor.experience} years</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Consultation Fee</strong>
              <span className={styles.fee}>${doctor.consultationFee}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Available Hours</strong>
              <span className={styles.hours}>{doctor.availableHours.start} - {doctor.availableHours.end}</span>
            </div>
            {doctor.education.length > 0 && (
              <div className={styles.infoItem}>
                <strong>Education</strong>
                <div className={styles.educationList}>
                  {doctor.education.map((edu, index) => (
                    <span key={index} className={styles.educationItem}>{edu}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
