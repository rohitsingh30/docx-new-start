import React, { useState } from 'react';
import styles from '../styles/AppointmentDetails.module.css';
import { AppointmentDetailsProps } from '../types/AppointmentDetails.types';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { getStatusClassName, getStatusLabel } from '../utils/statusUtils';
import { AppointmentTab } from '../types/enums';

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointmentId,
  onBack,
  onEdit,
  onCancel,
  onStart,
  onComplete,
  onReschedule,
  onViewRecords,
  onCreatePrescription,
  onOrderLabTests,
  onUpdateVitals,
  onSaveNotes,
  onAddNotes,
  onViewPreviousAppointment,
}) => {
  // Get appointment details from mock data
  const appointmentData = MOCK_DATA.APPOINTMENT_DETAILS;
  const [activeTab, setActiveTab] = useState<AppointmentTab>(AppointmentTab.OVERVIEW);
  const [isEditingVitals, setIsEditingVitals] = useState(false);
  const [vitalsData, setVitalsData] = useState({
    heartRate: appointmentData.vitals.heartRate,
    bloodPressure: appointmentData.vitals.bloodPressure,
    temperature: appointmentData.vitals.temperature,
    weight: appointmentData.vitals.weight,
  });
  const [collapsedSections, setCollapsedSections] = useState({
    currentMedications: true,
    previousAppointments: true,
  });

  const toggleSection = (section: 'currentMedications' | 'previousAppointments') => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleEditVitals = () => {
    setIsEditingVitals(true);
  };

  const handleCancelEdit = () => {
    setIsEditingVitals(false);
    // Reset to original values
    setVitalsData({
      heartRate: appointmentData.vitals.heartRate,
      bloodPressure: appointmentData.vitals.bloodPressure,
      temperature: appointmentData.vitals.temperature,
      weight: appointmentData.vitals.weight,
    });
  };

  const handleSaveVitals = () => {
    if (onUpdateVitals) {
      onUpdateVitals(vitalsData);
    }
    setIsEditingVitals(false);
    console.log('Vitals saved:', vitalsData);
  };

  const handleVitalChange = (field: keyof typeof vitalsData, value: string) => {
    setVitalsData(prev => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case AppointmentTab.OVERVIEW:
        return renderOverviewTab();
      case AppointmentTab.MEDICAL_HISTORY:
        return renderMedicalHistoryTab();
      default:
        return renderOverviewTab();
    }
  };

  const renderOverviewTab = () => (
    <div className={styles.tabContent}>
      {/* Patient Info & Appointment Details in 2 columns */}
      <div className={styles.overviewGrid}>
        {/* Patient Information */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.PATIENT_INFORMATION}</h2>
          </div>
          <div className={styles.patientInfo}>
            <div className={styles.patientAvatar}>
              <img src={appointmentData.patient.avatar} alt={appointmentData.patient.name} />
            </div>
            <div className={styles.patientDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.PATIENT_NAME}</span>
                <span className={styles.detailValue}>{appointmentData.patient.name}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.PATIENT_ID}</span>
                <span className={styles.detailValue}>{appointmentData.patient.patientId}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.AGE_GENDER}</span>
                <span className={styles.detailValue}>{appointmentData.patient.age} / {appointmentData.patient.gender}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.BLOOD_TYPE}</span>
                <span className={styles.detailValue}>{appointmentData.patient.bloodType}</span>
              </div>
            </div>
          </div>
          
          {/* Vitals in Patient Info */}
          <div className={styles.vitalsSection}>
            <div className={styles.vitalsSectionHeader}>
              <h3 className={styles.sectionTitle}>{STRING_CONSTANTS.LABELS.RECENT_VITALS}</h3>
              {!isEditingVitals ? (
                <button className={styles.updateVitalsButtonInline} onClick={handleEditVitals}>
                  <span className={`${styles.materialIcon} ${styles.buttonIcon}`}>edit</span>
                  {STRING_CONSTANTS.BUTTONS.UPDATE_VITALS}
                </button>
              ) : (
                <div className={styles.vitalsEditActions}>
                  <button className={styles.saveButton} onClick={handleSaveVitals}>
                    <span className={`${styles.materialIcon} ${styles.buttonIcon}`}>check</span>
                    {STRING_CONSTANTS.BUTTONS.SAVE}
                  </button>
                  <button className={styles.cancelButton} onClick={handleCancelEdit}>
                    <span className={`${styles.materialIcon} ${styles.buttonIcon}`}>close</span>
                    {STRING_CONSTANTS.BUTTONS.CANCEL}
                  </button>
                </div>
              )}
            </div>
            {!isEditingVitals ? (
              <div className={styles.vitalsCompact}>
                <div className={styles.vitalCompactItem}>
                  <span className={`${styles.materialIcon} ${styles.vitalCompactIcon}`}>favorite</span>
                  <div className={styles.vitalCompactInfo}>
                    <span className={styles.vitalCompactLabel}>{STRING_CONSTANTS.LABELS.HEART_RATE}</span>
                    <span className={styles.vitalCompactValue}>{vitalsData.heartRate}</span>
                  </div>
                </div>
                <div className={styles.vitalCompactItem}>
                  <span className={`${styles.materialIcon} ${styles.vitalCompactIcon}`}>monitor_heart</span>
                  <div className={styles.vitalCompactInfo}>
                    <span className={styles.vitalCompactLabel}>{STRING_CONSTANTS.LABELS.BLOOD_PRESSURE}</span>
                    <span className={styles.vitalCompactValue}>{vitalsData.bloodPressure}</span>
                  </div>
                </div>
                <div className={styles.vitalCompactItem}>
                  <span className={`${styles.materialIcon} ${styles.vitalCompactIcon}`}>thermostat</span>
                  <div className={styles.vitalCompactInfo}>
                    <span className={styles.vitalCompactLabel}>{STRING_CONSTANTS.LABELS.TEMPERATURE}</span>
                    <span className={styles.vitalCompactValue}>{vitalsData.temperature}</span>
                  </div>
                </div>
                <div className={styles.vitalCompactItem}>
                  <span className={`${styles.materialIcon} ${styles.vitalCompactIcon}`}>scale</span>
                  <div className={styles.vitalCompactInfo}>
                    <span className={styles.vitalCompactLabel}>{STRING_CONSTANTS.LABELS.WEIGHT}</span>
                    <span className={styles.vitalCompactValue}>{vitalsData.weight}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.vitalsEditForm}>
                <div className={styles.vitalEditItem}>
                  <label className={styles.vitalEditLabel}>
                    <span className={`${styles.materialIcon} ${styles.vitalEditIcon}`}>favorite</span>
                    {STRING_CONSTANTS.LABELS.HEART_RATE}
                  </label>
                  <input
                    type="text"
                    className={styles.vitalEditInput}
                    value={vitalsData.heartRate}
                    onChange={(e) => handleVitalChange('heartRate', e.target.value)}
                    placeholder="e.g., 72 bpm"
                  />
                </div>
                <div className={styles.vitalEditItem}>
                  <label className={styles.vitalEditLabel}>
                    <span className={`${styles.materialIcon} ${styles.vitalEditIcon}`}>monitor_heart</span>
                    {STRING_CONSTANTS.LABELS.BLOOD_PRESSURE}
                  </label>
                  <input
                    type="text"
                    className={styles.vitalEditInput}
                    value={vitalsData.bloodPressure}
                    onChange={(e) => handleVitalChange('bloodPressure', e.target.value)}
                    placeholder="e.g., 120/80 mmHg"
                  />
                </div>
                <div className={styles.vitalEditItem}>
                  <label className={styles.vitalEditLabel}>
                    <span className={`${styles.materialIcon} ${styles.vitalEditIcon}`}>thermostat</span>
                    {STRING_CONSTANTS.LABELS.TEMPERATURE}
                  </label>
                  <input
                    type="text"
                    className={styles.vitalEditInput}
                    value={vitalsData.temperature}
                    onChange={(e) => handleVitalChange('temperature', e.target.value)}
                    placeholder="e.g., 98.6°F"
                  />
                </div>
                <div className={styles.vitalEditItem}>
                  <label className={styles.vitalEditLabel}>
                    <span className={`${styles.materialIcon} ${styles.vitalEditIcon}`}>scale</span>
                    {STRING_CONSTANTS.LABELS.WEIGHT}
                  </label>
                  <input
                    type="text"
                    className={styles.vitalEditInput}
                    value={vitalsData.weight}
                    onChange={(e) => handleVitalChange('weight', e.target.value)}
                    placeholder="e.g., 70 kg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Appointment Details */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.APPOINTMENT_DETAILS}</h2>
          </div>
          <div className={styles.appointmentGrid}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.APPOINTMENT_TYPE}</span>
              <span className={styles.detailValue}>{appointmentData.appointment.type}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.STATUS}</span>
              <span className={`${styles.statusBadge} ${getStatusClassName(appointmentData.appointment.status, styles)}`}>
                {getStatusLabel(appointmentData.appointment.status)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.DATE}</span>
              <span className={styles.detailValue}>{appointmentData.appointment.date}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.TIME}</span>
              <span className={styles.detailValue}>{appointmentData.appointment.time}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.DURATION}</span>
              <span className={styles.detailValue}>{appointmentData.appointment.duration}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.ROOM}</span>
              <span className={styles.detailValue}>{appointmentData.appointment.room}</span>
            </div>
          </div>
          
          {/* Actions in Appointment Details */}
          <div className={styles.appointmentActions}>
            <button className={styles.actionButton} onClick={onReschedule}>
              <span className={`${styles.materialIcon} ${styles.actionIcon}`}>schedule</span>
              <span>{STRING_CONSTANTS.BUTTONS.RESCHEDULE}</span>
            </button>
            <button className={styles.actionButton} onClick={onStart}>
              <span className={`${styles.materialIcon} ${styles.actionIcon}`}>play_arrow</span>
              <span>{STRING_CONSTANTS.BUTTONS.START_APPOINTMENT}</span>
            </button>
            <button className={styles.actionButton} onClick={onCancel}>
              <span className={`${styles.materialIcon} ${styles.actionIcon}`}>cancel</span>
              <span>{STRING_CONSTANTS.BUTTONS.CANCEL_APPOINTMENT}</span>
            </button>
            <button className={styles.actionButton} onClick={onAddNotes}>
              <span className={`${styles.materialIcon} ${styles.actionIcon}`}>note_add</span>
              <span>{STRING_CONSTANTS.BUTTONS.ADD_NOTES}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chief Complaint */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.CHIEF_COMPLAINT}</h2>
        </div>
        <p className={styles.complaintDescription}>{appointmentData.chiefComplaint.description}</p>
        <div className={styles.symptomSection}>
          <span className={styles.symptomsLabel}>{STRING_CONSTANTS.LABELS.SYMPTOMS}:</span>
          <div className={styles.symptomsList}>
            {appointmentData.chiefComplaint.symptoms.map((symptom, index) => (
              <span key={index} className={styles.symptomTag}>{symptom}</span>
            ))}
          </div>
        </div>
        <div className={styles.durationSection}>
          <span className={styles.durationLabel}>{STRING_CONSTANTS.LABELS.DURATION}:</span>
          <span className={styles.durationText}>{appointmentData.chiefComplaint.duration}</span>
        </div>
      </div>
    </div>
  );

  const renderMedicalHistoryTab = () => (
    <div className={styles.tabContent}>
      {/* History Cards Grid */}
      <div className={styles.historyCardsGrid}>
        {/* Allergies */}
        <div className={styles.card}>
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>warning</span>
              <h3 className={styles.statCardTitle}>Known Allergies</h3>
            </div>
          </div>
          <div className={styles.statCardContent}>
            <div className={styles.statCardItem}>Penicillin (Rash)</div>
            <div className={styles.statCardItem}>Pollen (Seasonal)</div>
          </div>
        </div>

        {/* Family History */}
        <div className={styles.card}>
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>family_restroom</span>
              <h3 className={styles.statCardTitle}>Family History</h3>
            </div>
          </div>
          <div className={styles.statCardContent}>
            <div className={styles.statCardItem}>Father: Heart Disease</div>
            <div className={styles.statCardItem}>Mother: Diabetes</div>
          </div>
        </div>

        {/* Surgical History */}
        <div className={styles.card}>
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>surgical</span>
              <h3 className={styles.statCardTitle}>Past Surgeries</h3>
            </div>
          </div>
          <div className={styles.statCardContent}>
            <div className={styles.statCardItem}>Appendectomy (2015)</div>
          </div>
        </div>

        {/* Social History */}
        <div className={styles.card}>
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>groups</span>
              <h3 className={styles.statCardTitle}>Lifestyle & Habits</h3>
            </div>
          </div>
          <div className={styles.statCardContent}>
            <div className={styles.statCardItem}>Non-smoker</div>
            <div className={styles.statCardItem}>Occasional alcohol use</div>
            <div className={styles.statCardItem}>Regular exercise (3x/week)</div>
          </div>
        </div>

        {/* Previous Conditions */}
        <div className={styles.card}>
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>medical_information</span>
              <h3 className={styles.statCardTitle}>Previous Conditions</h3>
            </div>
          </div>
          <div className={styles.statCardContent}>
            <div className={styles.statCardItem}>Hypertension (Diagnosed 2020)</div>
            <div className={styles.statCardItem}>Type 2 Diabetes (Diagnosed 2018)</div>
            <div className={styles.statCardItem}>Seasonal Allergies</div>
          </div>
        </div>
      </div>

      {/* Current Medications */}
      <div className={styles.card}>
        <button 
          className={styles.cardHeaderButton}
          onClick={() => toggleSection('currentMedications')}
        >
          <div className={styles.cardHeaderLeft}>
            <span className={`${styles.materialIcon} ${styles.historyIcon}`}>medication</span>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.CURRENT_MEDICATIONS}</h2>
          </div>
          <span className={styles.materialIcon}>
            {collapsedSections.currentMedications ? 'expand_more' : 'expand_less'}
          </span>
        </button>
        {!collapsedSections.currentMedications && (
          <div className={styles.cardContent}>
            <div className={styles.medicationsList}>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>Metformin 500mg</div>
                  <div className={styles.medItemDetails}>
                    500mg • Twice daily • After meals • 30 days
                  </div>
                </div>
              </div>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>Lisinopril 10mg</div>
                  <div className={styles.medItemDetails}>
                    10mg • Once daily • Morning • 30 days
                  </div>
                </div>
              </div>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>Aspirin 81mg</div>
                  <div className={styles.medItemDetails}>
                    81mg • Once daily • Morning • Ongoing
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Previous Appointments */}
      <div className={styles.card}>
        <button 
          className={styles.cardHeaderButton}
          onClick={() => toggleSection('previousAppointments')}
        >
          <div className={styles.cardHeaderLeft}>
            <span className={`${styles.materialIcon} ${styles.historyIcon}`}>event_note</span>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.PREVIOUS_APPOINTMENTS}</h2>
          </div>
          <span className={styles.materialIcon}>
            {collapsedSections.previousAppointments ? 'expand_more' : 'expand_less'}
          </span>
        </button>
        {!collapsedSections.previousAppointments && (
          <div className={styles.cardContent}>
            <div className={styles.appointmentsList}>
              {appointmentData.previousAppointments.map((prevAppt) => (
                <div key={prevAppt.id} className={styles.appointmentItem}>
                  <span className={styles.appointmentText}>
                    {prevAppt.date} - {prevAppt.type}
                  </span>
                  <button 
                    className={styles.viewButton}
                    onClick={() => onViewPreviousAppointment && onViewPreviousAppointment(prevAppt.id)}
                  >
                    <span className={styles.materialIcon}>visibility</span>
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.appointmentDetailsContainer}>
      {/* Header with Back Button */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={handleBackClick}>
            <span className={`${styles.materialIcon} ${styles.backIcon}`}>arrow_back</span>
          </button>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>{STRING_CONSTANTS.LABELS.APPOINTMENT_DETAILS}</h1>
            <p className={styles.pageSubtitle}>
              {appointmentData.patient.name} • {appointmentData.appointment.date} at {appointmentData.appointment.time}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${activeTab === AppointmentTab.OVERVIEW ? styles.tabActive : ''}`}
          onClick={() => setActiveTab(AppointmentTab.OVERVIEW)}
        >
          <span className={`${styles.materialIcon} ${styles.tabIcon}`}>dashboard</span>
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === AppointmentTab.MEDICAL_HISTORY ? styles.tabActive : ''}`}
          onClick={() => setActiveTab(AppointmentTab.MEDICAL_HISTORY)}
        >
          <span className={`${styles.materialIcon} ${styles.tabIcon}`}>medical_information</span>
          Medical History
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.content}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AppointmentDetails;
