import React, { useState, useMemo } from 'react';
import styles from '../styles/PatientDetails.module.css';
import { PatientDetailsProps } from '../types/PatientDetails.types';
import { MOCK_DATA } from '../constants/dataConstants';

enum PatientTab {
  OVERVIEW = 'overview',
  MEDICAL_HISTORY = 'medical-history',
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId, onBack }) => {
  // Get patient from mock data
  const patient = useMemo(() => {
    return MOCK_DATA.PATIENTS.find(p => p.id === patientId) || MOCK_DATA.PATIENTS[0];
  }, [patientId]);

  const [_isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<PatientTab>(PatientTab.OVERVIEW);
  const [collapsedSections, setCollapsedSections] = useState({
    currentMedications: false,
    previousAppointments: false,
  });

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

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

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    console.log('Edit patient:', patient.id);
    // TODO: Implement edit functionality
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={styles.patientDetails}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={handleBackClick}>
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <h1 className={styles.pageTitle}>Patient Details</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton}>
            <span className="material-symbols-outlined">calendar_today</span>
            Schedule Appointment
          </button>
          <button className={styles.editButton} onClick={handleEditClick}>
            <span className="material-symbols-outlined">edit</span>
            Edit Patient
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${activeTab === PatientTab.OVERVIEW ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(PatientTab.OVERVIEW)}
        >
          <span className="material-symbols-outlined">overview</span>
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === PatientTab.MEDICAL_HISTORY ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(PatientTab.MEDICAL_HISTORY)}
        >
          <span className="material-symbols-outlined">medical_information</span>
          Medical History
        </button>
      </div>

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {activeTab === PatientTab.OVERVIEW && (
          <>
        {/* Overview Cards Grid */}
        <div className={styles.overviewGrid}>
          {/* Personal Information Card */}
          <div className={styles.overviewCard}>
            <div className={styles.overviewCardHeader}>
              <span className="material-symbols-outlined">person</span>
              <h3>Personal Information</h3>
            </div>
            <div className={styles.personalInfoContent}>
              <div className={styles.profilePhotoSection}>
                <div className={styles.profilePhoto}>
                  <span className="material-symbols-outlined">person</span>
                </div>
              </div>
              <div className={styles.personalInfoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>
                    <span className="material-symbols-outlined">badge</span>
                    Full Name
                  </span>
                  <span className={styles.infoValue}>{patient.firstName} {patient.lastName}</span>
                </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className="material-symbols-outlined">cake</span>
                  Date of Birth
                </span>
                <span className={styles.infoValue}>{formatDate(patient.dateOfBirth)} ({calculateAge(patient.dateOfBirth)} years)</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className="material-symbols-outlined">
                    {patient.gender === 'Male' ? 'male' : patient.gender === 'Female' ? 'female' : 'transgender'}
                  </span>
                  Gender
                </span>
                <span className={styles.infoValue}>{patient.gender}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className="material-symbols-outlined">water_drop</span>
                  Blood Type
                </span>
                <span className={`${styles.infoValue} ${styles.bloodTypeBadge}`}>{patient.bloodType}</span>
              </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className={styles.overviewCard}>
            <div className={styles.overviewCardHeader}>
              <span className="material-symbols-outlined">contact_phone</span>
              <h3>Contact Information</h3>
            </div>
            <div className={`${styles.overviewCardContent} ${styles.threeColumnContent}`}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className="material-symbols-outlined">call</span>
                  Phone Number
                </span>
                <span className={styles.infoValue}>{patient.phoneNumber}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className="material-symbols-outlined">email</span>
                  Email Address
                </span>
                <span className={styles.infoValue}>{patient.email}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className="material-symbols-outlined">home</span>
                  Address
                </span>
                <span className={styles.infoValue}>{patient.address}</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact Card */}
          <div className={styles.overviewCard}>
            <div className={styles.overviewCardHeader}>
              <span className="material-symbols-outlined">emergency</span>
              <h3>Emergency Contact</h3>
            </div>
            <div className={`${styles.overviewCardContent} ${styles.threeColumnContent}`}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className="material-symbols-outlined">person</span>
                  Name
                </span>
                <span className={styles.infoValue}>{patient.emergencyContact.name}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className="material-symbols-outlined">family_restroom</span>
                  Relationship
                </span>
                <span className={styles.infoValue}>{patient.emergencyContact.relationship}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className="material-symbols-outlined">call</span>
                  Phone Number
                </span>
                <span className={styles.infoValue}>{patient.emergencyContact.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>
          </>
        )}

        {activeTab === PatientTab.MEDICAL_HISTORY && (
          <>
            {/* History Cards Grid */}
            <div className={styles.historyCardsGrid}>
              {/* Allergies */}
              <div className={styles.historyCard}>
                <div className={styles.historyCardHeader}>
                  <span className="material-symbols-outlined">warning</span>
                  <h3>Known Allergies</h3>
                </div>
                <div className={styles.historyCardContent}>
                  {patient.allergies.length > 0 ? (
                    patient.allergies.map((allergy, index) => (
                      <div key={index} className={styles.historyItem}>{allergy}</div>
                    ))
                  ) : (
                    <div className={styles.historyItem}>No known allergies</div>
                  )}
                </div>
              </div>

              {/* Family History */}
              <div className={styles.historyCard}>
                <div className={styles.historyCardHeader}>
                  <span className="material-symbols-outlined">family_restroom</span>
                  <h3>Family History</h3>
                </div>
                <div className={styles.historyCardContent}>
                  <div className={styles.historyItem}>Father: Heart Disease</div>
                  <div className={styles.historyItem}>Mother: Diabetes</div>
                </div>
              </div>

              {/* Surgical History */}
              <div className={styles.historyCard}>
                <div className={styles.historyCardHeader}>
                  <span className="material-symbols-outlined">surgical</span>
                  <h3>Past Surgeries</h3>
                </div>
                <div className={styles.historyCardContent}>
                  <div className={styles.historyItem}>Appendectomy (2015)</div>
                </div>
              </div>

              {/* Social History */}
              <div className={styles.historyCard}>
                <div className={styles.historyCardHeader}>
                  <span className="material-symbols-outlined">groups</span>
                  <h3>Lifestyle & Habits</h3>
                </div>
                <div className={styles.historyCardContent}>
                  <div className={styles.historyItem}>Non-smoker</div>
                  <div className={styles.historyItem}>Occasional alcohol use</div>
                  <div className={styles.historyItem}>Regular exercise (3x/week)</div>
                </div>
              </div>

              {/* Previous Conditions */}
              <div className={styles.historyCard}>
                <div className={styles.historyCardHeader}>
                  <span className="material-symbols-outlined">medical_information</span>
                  <h3>Previous Conditions</h3>
                </div>
                <div className={styles.historyCardContent}>
                  <div className={styles.historyItem}>Hypertension (Diagnosed 2020)</div>
                  <div className={styles.historyItem}>Type 2 Diabetes (Diagnosed 2018)</div>
                  <div className={styles.historyItem}>Seasonal Allergies</div>
                </div>
              </div>
            </div>

            {/* Current Medications */}
            <div className={styles.collapsibleCard}>
              <button 
                className={styles.cardHeaderButton}
                onClick={() => toggleSection('currentMedications')}
              >
                <div className={styles.cardHeaderLeft}>
                  <span className="material-symbols-outlined">medication</span>
                  <h2>Current Medications</h2>
                </div>
                <span className="material-symbols-outlined">
                  {collapsedSections.currentMedications ? 'expand_more' : 'expand_less'}
                </span>
              </button>
              {!collapsedSections.currentMedications && (
                <div className={styles.cardContent}>
                  <div className={styles.medicationsList}>
                    {patient.medications.length > 0 ? (
                      patient.medications.map((medication, index) => (
                        <div key={index} className={styles.medItem}>
                          <div className={styles.medItemContent}>
                            <div className={styles.medItemName}>{medication}</div>
                            <div className={styles.medItemDetails}>
                              Dosage and frequency details would go here
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={styles.medItem}>
                        <div className={styles.medItemContent}>
                          <div className={styles.medItemName}>No current medications</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Previous Appointments */}
            <div className={styles.collapsibleCard}>
              <button 
                className={styles.cardHeaderButton}
                onClick={() => toggleSection('previousAppointments')}
              >
                <div className={styles.cardHeaderLeft}>
                  <span className="material-symbols-outlined">event_note</span>
                  <h2>Previous Appointments</h2>
                </div>
                <span className="material-symbols-outlined">
                  {collapsedSections.previousAppointments ? 'expand_more' : 'expand_less'}
                </span>
              </button>
              {!collapsedSections.previousAppointments && (
                <div className={styles.cardContent}>
                  <div className={styles.appointmentsList}>
                    <div className={styles.appointmentItem}>
                      <span className={styles.appointmentText}>Nov 1, 2024 - Routine Checkup</span>
                      <button className={styles.viewButton}>
                        <span className="material-symbols-outlined">visibility</span>
                        View
                      </button>
                    </div>
                    <div className={styles.appointmentItem}>
                      <span className={styles.appointmentText}>Oct 15, 2024 - Follow-up</span>
                      <button className={styles.viewButton}>
                        <span className="material-symbols-outlined">visibility</span>
                        View
                      </button>
                    </div>
                    <div className={styles.appointmentItem}>
                      <span className={styles.appointmentText}>Sep 20, 2024 - Blood Test Review</span>
                      <button className={styles.viewButton}>
                        <span className="material-symbols-outlined">visibility</span>
                        View
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
