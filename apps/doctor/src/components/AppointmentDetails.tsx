import React, { useState } from 'react';
import styles from '../styles/AppointmentDetails.module.css';
import { AppointmentDetailsProps } from '../types/AppointmentDetails.types';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { getStatusClassName, getStatusLabel } from '../utils/statusUtils';
import { AppointmentTab } from '../types/enums';
import { 
  DetailsList, 
  VitalsSection, 
  PatientHistoryGrid, 
  SimpleTabList,
  Card,
  CardWithGrid,
  CollapsibleCardWithIcon,
  ActionButtons,
  MedicationList,
  AppointmentList,
  SymptomTags,
  DurationDisplay,
  PageHeader
} from './shared';

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

  const handleVitalChange = (field: string, value: string) => {
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
        <Card title={STRING_CONSTANTS.LABELS.PATIENT_INFORMATION} styles={styles}>
          <div className={styles.patientInfo}>
            <div className={styles.patientAvatar}>
              <img src={appointmentData.patient.avatar} alt={appointmentData.patient.name} />
            </div>
            <div className={styles.patientDetails}>
              <DetailsList 
                items={[
                  { label: STRING_CONSTANTS.LABELS.PATIENT_NAME, value: appointmentData.patient.name },
                  { label: STRING_CONSTANTS.LABELS.PATIENT_ID, value: appointmentData.patient.patientId },
                  { label: STRING_CONSTANTS.LABELS.AGE_GENDER, value: `${appointmentData.patient.age} / ${appointmentData.patient.gender}` },
                  { label: STRING_CONSTANTS.LABELS.BLOOD_TYPE, value: appointmentData.patient.bloodType },
                ]}
                styles={styles}
              />
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
            <VitalsSection data={vitalsData} isEditing={isEditingVitals} onChange={handleVitalChange} styles={styles} />
          </div>
        </Card>

        {/* Appointment Details */}
        <CardWithGrid 
          title={STRING_CONSTANTS.LABELS.APPOINTMENT_DETAILS}
          items={[
            { label: STRING_CONSTANTS.LABELS.APPOINTMENT_TYPE, value: appointmentData.appointment.type },
            { 
              label: STRING_CONSTANTS.LABELS.STATUS, 
              value: getStatusLabel(appointmentData.appointment.status),
              valueClassName: `${styles.statusBadge} ${getStatusClassName(appointmentData.appointment.status, styles)}`
            },
            { label: STRING_CONSTANTS.LABELS.DATE, value: appointmentData.appointment.date },
            { label: STRING_CONSTANTS.LABELS.TIME, value: appointmentData.appointment.time },
            { label: STRING_CONSTANTS.LABELS.DURATION, value: appointmentData.appointment.duration },
            { label: STRING_CONSTANTS.LABELS.ROOM, value: appointmentData.appointment.room },
          ]}
          gridClassName={styles.appointmentGrid}
          styles={styles}
        >
          <ActionButtons 
            actions={[
              { icon: 'schedule', label: STRING_CONSTANTS.BUTTONS.RESCHEDULE, onClick: onReschedule },
              { icon: 'play_arrow', label: STRING_CONSTANTS.BUTTONS.START_APPOINTMENT, onClick: onStart },
              { icon: 'cancel', label: STRING_CONSTANTS.BUTTONS.CANCEL_APPOINTMENT, onClick: onCancel },
              { icon: 'note_add', label: STRING_CONSTANTS.BUTTONS.ADD_NOTES, onClick: onAddNotes },
            ]}
            styles={styles}
          />
        </CardWithGrid>
      </div>

      {/* Chief Complaint */}
      <Card title={STRING_CONSTANTS.LABELS.CHIEF_COMPLAINT} styles={styles}>
        <p className={styles.complaintDescription}>{appointmentData.chiefComplaint.description}</p>
        <SymptomTags 
          label={STRING_CONSTANTS.LABELS.SYMPTOMS}
          symptoms={appointmentData.chiefComplaint.symptoms}
          styles={styles}
        />
        <DurationDisplay 
          label={STRING_CONSTANTS.LABELS.DURATION}
          value={appointmentData.chiefComplaint.duration}
          styles={styles}
        />
      </Card>
    </div>
  );

  const renderMedicalHistoryTab = () => (
    <div className={styles.tabContent}>
      {/* History Cards Grid - Single function call */}
      <PatientHistoryGrid styles={styles} />

      {/* Current Medications */}
      <CollapsibleCardWithIcon 
        icon="medication"
        title={STRING_CONSTANTS.LABELS.CURRENT_MEDICATIONS}
        isCollapsed={collapsedSections.currentMedications}
        onToggle={() => toggleSection('currentMedications')}
        styles={styles}
      >
        <MedicationList 
          medications={[
            { name: 'Metformin 500mg', details: '500mg • Twice daily • After meals • 30 days' },
            { name: 'Lisinopril 10mg', details: '10mg • Once daily • Morning • 30 days' },
            { name: 'Aspirin 81mg', details: '81mg • Once daily • Morning • Ongoing' },
          ]}
          styles={styles}
        />
      </CollapsibleCardWithIcon>

      {/* Previous Appointments */}
      <CollapsibleCardWithIcon 
        icon="event_note"
        title={STRING_CONSTANTS.LABELS.PREVIOUS_APPOINTMENTS}
        isCollapsed={collapsedSections.previousAppointments}
        onToggle={() => toggleSection('previousAppointments')}
        styles={styles}
      >
        <AppointmentList 
          appointments={appointmentData.previousAppointments}
          onViewAppointment={onViewPreviousAppointment}
          styles={styles}
        />
      </CollapsibleCardWithIcon>
    </div>
  );

  return (
    <div className={styles.appointmentDetailsContainer}>
      {/* Header with Back Button */}
      <PageHeader 
        title={STRING_CONSTANTS.LABELS.APPOINTMENT_DETAILS}
        subtitle={`${appointmentData.patient.name} • ${appointmentData.appointment.date} at ${appointmentData.appointment.time}`}
        onBack={onBack}
        styles={styles}
      />

      {/* Tabs Navigation */}
      <SimpleTabList 
        tabs={[
          { id: AppointmentTab.OVERVIEW, icon: 'dashboard', label: STRING_CONSTANTS.TABS.OVERVIEW },
          { id: AppointmentTab.MEDICAL_HISTORY, icon: 'medical_information', label: STRING_CONSTANTS.TABS.MEDICAL_HISTORY },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as AppointmentTab)}
        styles={styles}
      />

      {/* Tab Content */}
      <div className={styles.content}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AppointmentDetails;
