import React, { useState } from 'react';
import styles from '../styles/AppointmentDetails.module.css';
import { AppointmentDetailsProps } from '../types/AppointmentDetails.types';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { getStatusClassName, getStatusLabel } from '../utils/statusUtils';

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointmentId,
  onBack,
  onEdit,
  onCancel,
  onComplete,
  onReschedule,
  onViewRecords,
  onCreatePrescription,
  onOrderLabTests,
  onUpdateVitals,
  onSaveNotes,
}) => {
  // Get appointment details from mock data
  const appointmentData = MOCK_DATA.APPOINTMENT_DETAILS;
  const [notes, setNotes] = useState(appointmentData.notes);

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleSaveNotes = () => {
    if (onSaveNotes) {
      onSaveNotes(notes);
    }
  };

  return (
    <div className={styles.appointmentDetailsContainer}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={handleBackClick}>
        <span className={`${styles.materialIcon} ${styles.backIcon}`}>arrow_back</span>
        <span>{STRING_CONSTANTS.BUTTONS.BACK_TO_APPOINTMENTS}</span>
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>{STRING_CONSTANTS.LABELS.APPOINTMENT_DETAILS}</h1>
          <p>{STRING_CONSTANTS.LABELS.APPOINTMENT_DETAILS_SUBTITLE}</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.editButton} onClick={onEdit}>
            <span className={`${styles.materialIcon} ${styles.buttonIcon}`}>edit</span>
            <span>{STRING_CONSTANTS.BUTTONS.EDIT}</span>
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            <span className={`${styles.materialIcon} ${styles.buttonIcon}`}>cancel</span>
            <span>{STRING_CONSTANTS.BUTTONS.CANCEL_APPOINTMENT}</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Patient Information Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.PATIENT_INFORMATION}</h2>
            <div className={styles.patientInfo}>
              <div className={styles.patientAvatar}>
                <img src={appointmentData.patient.avatar} alt={appointmentData.patient.name} />
              </div>
              <div className={styles.patientDetails}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.PATIENT_NAME}</p>
                  <p className={styles.detailValue}>{appointmentData.patient.name}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.PATIENT_ID}</p>
                  <p className={styles.detailValue}>{appointmentData.patient.patientId}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.AGE_GENDER}</p>
                  <p className={styles.detailValue}>{appointmentData.patient.age} / {appointmentData.patient.gender}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.CONTACT}</p>
                  <p className={styles.detailValue}>{appointmentData.patient.contact}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.EMAIL}</p>
                  <p className={styles.detailValue}>{appointmentData.patient.email}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.BLOOD_TYPE}</p>
                  <p className={styles.detailValue}>{appointmentData.patient.bloodType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.APPOINTMENT_DETAILS}</h2>
            <div className={styles.appointmentGrid}>
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.APPOINTMENT_TYPE}</p>
                <p className={styles.detailValue}>{appointmentData.appointment.type}</p>
              </div>
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.STATUS}</p>
                <span className={`${styles.statusBadge} ${getStatusClassName(appointmentData.appointment.status, styles)}`}>
                  {getStatusLabel(appointmentData.appointment.status)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.DATE}</p>
                <p className={styles.detailValue}>{appointmentData.appointment.date}</p>
              </div>
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.TIME}</p>
                <p className={styles.detailValue}>{appointmentData.appointment.time}</p>
              </div>
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.DURATION}</p>
                <p className={styles.detailValue}>{appointmentData.appointment.duration}</p>
              </div>
              <div className={styles.detailItem}>
                <p className={styles.detailLabel}>{STRING_CONSTANTS.LABELS.ROOM}</p>
                <p className={styles.detailValue}>{appointmentData.appointment.room}</p>
              </div>
            </div>
          </div>

          {/* Chief Complaint & Symptoms */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.CHIEF_COMPLAINT}</h2>
            <p className={styles.complaintDescription}>{appointmentData.chiefComplaint.description}</p>
            <div>
              <p className={styles.symptomsLabel}>{STRING_CONSTANTS.LABELS.SYMPTOMS}</p>
              <div className={styles.symptomsList}>
                {appointmentData.chiefComplaint.symptoms.map((symptom, index) => (
                  <span key={index} className={styles.symptomTag}>{symptom}</span>
                ))}
              </div>
            </div>
            <div>
              <p className={styles.durationLabel}>{STRING_CONSTANTS.LABELS.DURATION}</p>
              <p className={styles.durationText}>{appointmentData.chiefComplaint.duration}</p>
            </div>
          </div>

          {/* Medical History Summary */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.MEDICAL_HISTORY_SUMMARY}</h2>
            <div className={styles.historyItem}>
              <span className={`${styles.materialIcon} ${styles.historyIcon}`}>history</span>
              <div className={styles.historyContent}>
                <p className={styles.historyLabel}>{STRING_CONSTANTS.LABELS.PREVIOUS_CONDITIONS}</p>
                <p className={styles.historyValue}>{appointmentData.medicalHistory.previousConditions}</p>
              </div>
            </div>
            <div className={styles.historyItem}>
              <span className={`${styles.materialIcon} ${styles.historyIcon}`}>medication</span>
              <div className={styles.historyContent}>
                <p className={styles.historyLabel}>{STRING_CONSTANTS.LABELS.CURRENT_MEDICATIONS}</p>
                <p className={styles.historyValue}>{appointmentData.medicalHistory.currentMedications}</p>
              </div>
            </div>
            <div className={styles.historyItem}>
              <span className={`${styles.materialIcon} ${styles.historyIcon}`}>warning</span>
              <div className={styles.historyContent}>
                <p className={styles.historyLabel}>{STRING_CONSTANTS.LABELS.ALLERGIES}</p>
                <p className={styles.historyValue}>{appointmentData.medicalHistory.allergies}</p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.APPOINTMENT_NOTES}</h2>
            <textarea
              className={styles.notesTextarea}
              placeholder={STRING_CONSTANTS.PLACEHOLDERS.ADD_APPOINTMENT_NOTES}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className={styles.notesActions}>
              <button className={styles.saveNotesButton} onClick={handleSaveNotes}>
                {STRING_CONSTANTS.BUTTONS.SAVE_NOTES}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Quick Actions Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.QUICK_ACTIONS}</h2>
            <div className={styles.actionsList}>
              <button className={styles.actionButton} onClick={onComplete}>
                <span className={`${styles.materialIcon} ${styles.actionIcon}`}>check_circle</span>
                <span>{STRING_CONSTANTS.BUTTONS.MARK_COMPLETE}</span>
              </button>
              <button className={styles.actionButton} onClick={onReschedule}>
                <span className={`${styles.materialIcon} ${styles.actionIcon}`}>schedule</span>
                <span>{STRING_CONSTANTS.BUTTONS.RESCHEDULE}</span>
              </button>
              <button className={styles.actionButton} onClick={onViewRecords}>
                <span className={`${styles.materialIcon} ${styles.actionIcon}`}>description</span>
                <span>{STRING_CONSTANTS.BUTTONS.VIEW_MEDICAL_RECORDS}</span>
              </button>
              <button className={styles.actionButton} onClick={onCreatePrescription}>
                <span className={`${styles.materialIcon} ${styles.actionIcon}`}>prescription</span>
                <span>{STRING_CONSTANTS.BUTTONS.CREATE_PRESCRIPTION}</span>
              </button>
              <button className={styles.actionButton} onClick={onOrderLabTests}>
                <span className={`${styles.materialIcon} ${styles.actionIcon}`}>lab_profile</span>
                <span>{STRING_CONSTANTS.BUTTONS.ORDER_LAB_TESTS}</span>
              </button>
            </div>
          </div>

          {/* Vitals Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.RECENT_VITALS}</h2>
            <div className={styles.vitalsList}>
              <div className={styles.vitalItem}>
                <div className={styles.vitalLabel}>
                  <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>favorite</span>
                  <span className={styles.vitalText}>{STRING_CONSTANTS.LABELS.HEART_RATE}</span>
                </div>
                <span className={styles.vitalValue}>{appointmentData.vitals.heartRate}</span>
              </div>
              <div className={styles.vitalItem}>
                <div className={styles.vitalLabel}>
                  <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>monitor_heart</span>
                  <span className={styles.vitalText}>{STRING_CONSTANTS.LABELS.BLOOD_PRESSURE}</span>
                </div>
                <span className={styles.vitalValue}>{appointmentData.vitals.bloodPressure}</span>
              </div>
              <div className={styles.vitalItem}>
                <div className={styles.vitalLabel}>
                  <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>thermostat</span>
                  <span className={styles.vitalText}>{STRING_CONSTANTS.LABELS.TEMPERATURE}</span>
                </div>
                <span className={styles.vitalValue}>{appointmentData.vitals.temperature}</span>
              </div>
              <div className={styles.vitalItem}>
                <div className={styles.vitalLabel}>
                  <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>scale</span>
                  <span className={styles.vitalText}>{STRING_CONSTANTS.LABELS.WEIGHT}</span>
                </div>
                <span className={styles.vitalValue}>{appointmentData.vitals.weight}</span>
              </div>
            </div>
            <button className={styles.updateVitalsButton} onClick={onUpdateVitals}>
              {STRING_CONSTANTS.BUTTONS.UPDATE_VITALS}
            </button>
          </div>

          {/* Reminder Card */}
          {appointmentData.reminder && (
            <div className={styles.reminderCard}>
              <div className={styles.reminderContent}>
                <span className={`${styles.materialIcon} ${styles.reminderIcon}`}>info</span>
                <div className={styles.reminderText}>
                  <h3 className={styles.reminderTitle}>{STRING_CONSTANTS.LABELS.REMINDER}</h3>
                  <p className={styles.reminderDescription}>{appointmentData.reminder}</p>
                </div>
              </div>
            </div>
          )}

          {/* Previous Appointments */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.PREVIOUS_APPOINTMENTS}</h2>
            <div className={styles.previousAppointmentsList}>
              {appointmentData.previousAppointments.map((appointment) => (
                <div key={appointment.id} className={styles.previousAppointmentItem}>
                  <div className={styles.previousAppointmentInfo}>
                    <p className={styles.previousAppointmentType}>{appointment.type}</p>
                    <p className={styles.previousAppointmentDate}>{appointment.date}</p>
                  </div>
                  <button className={styles.viewButton}>View</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
