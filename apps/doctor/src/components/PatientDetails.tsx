import React, { useState, useMemo } from 'react';
import styles from '../styles/PatientDetails.module.css';
import { PatientDetailsProps } from '../types/PatientDetails.types';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { PatientTab, Gender } from '../types/enums';
import { 
  InfoList, 
  PatientHistoryGrid, 
  SimpleTabList,
  CollapsibleCardWithIcon,
  MedicationList,
  AppointmentList,
  PageHeader
} from './shared';

const PatientDetails: React.FC<PatientDetailsProps> = ({ 
  patientId, 
  onBack,
  onScheduleAppointment,
  onEditPatient,
}) => {
  // Get patient from mock data
  const patient = useMemo(() => {
    return MOCK_DATA.PATIENTS.find(p => p.id === patientId) || MOCK_DATA.PATIENTS[0];
  }, [patientId]);

  const [, setIsEditing] = useState(false);
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
    if (onEditPatient) {
      onEditPatient();
    }
  };

  const handleScheduleAppointment = () => {
    if (onScheduleAppointment) {
      onScheduleAppointment();
    }
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
      <PageHeader 
        title={`${patient.firstName} ${patient.lastName}`}
        subtitle={`${calculateAge(patient.dateOfBirth)}y, ${patient.gender} • ${patient.bloodType}`}
        onBack={handleBackClick}
        rightContent={
          <div className={styles.headerActions}>
            <button className={styles.actionButton} onClick={handleScheduleAppointment} type="button">
              <span className={styles.materialSymbolsIcon}>calendar_today</span>
              {STRING_CONSTANTS.BUTTONS.SCHEDULE_APPOINTMENT}
            </button>
            <button className={styles.editButton} onClick={handleEditClick}>
              <span className={styles.materialSymbolsIcon}>edit</span>
              {STRING_CONSTANTS.BUTTONS.EDIT_PATIENT}
            </button>
          </div>
        }
        styles={styles}
      />

      {/* Tabs */}
      <SimpleTabList 
        tabs={[
          { id: PatientTab.OVERVIEW, icon: 'overview', label: STRING_CONSTANTS.TABS.OVERVIEW },
          { id: PatientTab.MEDICAL_HISTORY, icon: 'medical_information', label: STRING_CONSTANTS.TABS.MEDICAL_HISTORY },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as PatientTab)}
        styles={styles}
      />

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {activeTab === PatientTab.OVERVIEW && (
          <>
        {/* Overview Cards Grid */}
        <div className={styles.overviewGrid}>
          {/* Personal Information Card */}
          <div className={styles.overviewCard}>
            <div className={styles.overviewCardHeader}>
              <span className={styles.materialSymbolsIcon}>person</span>
              <h3>{STRING_CONSTANTS.LABELS.PERSONAL_INFORMATION}</h3>
            </div>
            <div className={styles.personalInfoContent}>
              <div className={styles.profilePhotoSection}>
                <div className={styles.profilePhoto}>
                  <span className={styles.materialSymbolsIcon}>person</span>
                </div>
              </div>
              <div className={styles.personalInfoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>
                    <span className={styles.materialSymbolsIcon}>badge</span>
                    {STRING_CONSTANTS.PATIENT_LABELS.FULL_NAME}
                  </span>
                  <span className={styles.infoValue}>{patient.firstName} {patient.lastName}</span>
                </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className={styles.materialSymbolsIcon}>cake</span>
                  {STRING_CONSTANTS.PATIENT_LABELS.DATE_OF_BIRTH}
                </span>
                <span className={styles.infoValue}>{formatDate(patient.dateOfBirth)} ({calculateAge(patient.dateOfBirth)} {STRING_CONSTANTS.PATIENT_LABELS.YEARS})</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className={styles.materialSymbolsIcon}>
                    {patient.gender === Gender.MALE ? 'male' : patient.gender === Gender.FEMALE ? 'female' : 'transgender'}
                  </span>
                  {STRING_CONSTANTS.PATIENT_LABELS.GENDER}
                </span>
                <span className={styles.infoValue}>{patient.gender}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <span className={styles.materialSymbolsIcon}>water_drop</span>
                  {STRING_CONSTANTS.PATIENT_LABELS.BLOOD_TYPE}
                </span>
                <span className={`${styles.infoValue} ${styles.bloodTypeBadge}`}>{patient.bloodType}</span>
              </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className={styles.overviewCard}>
            <div className={styles.overviewCardHeader}>
              <span className={styles.materialSymbolsIcon}>contact_phone</span>
              <h3>{STRING_CONSTANTS.LABELS.CONTACT_INFORMATION}</h3>
            </div>
            <div className={`${styles.overviewCardContent} ${styles.threeColumnContent}`}>
              <InfoList 
                items={[
                  { icon: 'call', label: STRING_CONSTANTS.PATIENT_LABELS.PHONE_NUMBER, value: patient.phoneNumber },
                  { icon: 'email', label: STRING_CONSTANTS.PATIENT_LABELS.EMAIL_ADDRESS, value: patient.email },
                  { icon: 'home', label: STRING_CONSTANTS.PATIENT_LABELS.ADDRESS, value: patient.address },
                ]}
                styles={styles}
              />
            </div>
          </div>

          {/* Emergency Contact Card */}
          <div className={styles.overviewCard}>
            <div className={styles.overviewCardHeader}>
              <span className={styles.materialSymbolsIcon}>emergency</span>
              <h3>{STRING_CONSTANTS.LABELS.EMERGENCY_CONTACT_LABEL}</h3>
            </div>
            <div className={`${styles.overviewCardContent} ${styles.threeColumnContent}`}>
              <InfoList 
                items={[
                  { icon: 'person', label: STRING_CONSTANTS.PATIENT_LABELS.NAME, value: patient.emergencyContact.name },
                  { icon: 'family_restroom', label: STRING_CONSTANTS.PATIENT_LABELS.RELATIONSHIP, value: patient.emergencyContact.relationship },
                  { icon: 'call', label: STRING_CONSTANTS.PATIENT_LABELS.PHONE_NUMBER, value: patient.emergencyContact.phoneNumber },
                ]}
                styles={styles}
              />
            </div>
          </div>
        </div>
          </>
        )}

        {activeTab === PatientTab.MEDICAL_HISTORY && (
          <>
            {/* History Cards Grid - Single function call */}
            <PatientHistoryGrid 
              data={{
                allergies: patient.allergies,
                familyHistory: MOCK_DATA.DEFAULT_PATIENT_HISTORY.familyHistory as unknown as string[],
                surgeries: MOCK_DATA.DEFAULT_PATIENT_HISTORY.surgeries as unknown as string[],
                lifestyle: MOCK_DATA.DEFAULT_PATIENT_HISTORY.lifestyle as unknown as string[],
                conditions: MOCK_DATA.DEFAULT_PATIENT_HISTORY.conditions as unknown as string[],
              }}
              styles={styles}
              variant="historyCard"
            />

            {/* Current Medications */}
            <CollapsibleCardWithIcon 
              icon="medication"
              title={STRING_CONSTANTS.PATIENT_LABELS.CURRENT_MEDICATIONS}
              isCollapsed={collapsedSections.currentMedications}
              onToggle={() => toggleSection('currentMedications')}
              styles={styles}
            >
              <MedicationList 
                medications={patient.medications.length > 0 
                  ? patient.medications.map(med => ({ name: med, details: STRING_CONSTANTS.PATIENT_LABELS.DOSAGE_DETAILS }))
                  : [{ name: STRING_CONSTANTS.PATIENT_LABELS.NO_CURRENT_MEDICATIONS, details: '' }]
                }
                styles={styles}
              />
            </CollapsibleCardWithIcon>

            {/* Previous Appointments */}
            <CollapsibleCardWithIcon 
              icon="event_note"
              title={STRING_CONSTANTS.PATIENT_LABELS.PREVIOUS_APPOINTMENTS}
              isCollapsed={collapsedSections.previousAppointments}
              onToggle={() => toggleSection('previousAppointments')}
              styles={styles}
            >
              <AppointmentList 
                appointments={[
                  { id: '1', date: 'Nov 1, 2024', type: 'Routine Checkup' },
                  { id: '2', date: 'Oct 15, 2024', type: 'Follow-up' },
                  { id: '3', date: 'Sep 20, 2024', type: 'Blood Test Review' },
                ]}
                styles={styles}
              />
            </CollapsibleCardWithIcon>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
