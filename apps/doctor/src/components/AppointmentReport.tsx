import React from 'react';
import styles from '../styles/AppointmentReport.module.css';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { Gender } from '../types/enums';
import { AppointmentReportProps } from '../types/AppointmentReport.types';
import { PageHeader } from './shared';

const AppointmentReport: React.FC<AppointmentReportProps> = ({ appointmentId, onBack, onCreateInvoice }) => {
  const appointmentData = MOCK_DATA.APPOINTMENT_DETAILS;
  
  const report = {
    date: appointmentData.appointment.date,
    time: appointmentData.appointment.time,
    type: appointmentData.appointment.type,
    patientName: appointmentData.patient.name,
    patientId: appointmentData.patient.patientId,
    age: appointmentData.patient.age,
    gender: appointmentData.patient.gender === Gender.MALE ? STRING_CONSTANTS.LABELS.MALE : STRING_CONSTANTS.LABELS.FEMALE,
    doctor: STRING_CONSTANTS.LABELS.DOCTOR_NAME,
    vitals: appointmentData.vitals,
    chiefComplaint: appointmentData.chiefComplaint.description,
    symptoms: appointmentData.chiefComplaint.symptoms,
    diagnosis: appointmentData.diagnosis || STRING_CONSTANTS.LABELS.NO_DIAGNOSIS,
    medications: appointmentData.medications || [],
    labTests: appointmentData.labTests || [],
    notes: appointmentData.doctorNotes || STRING_CONSTANTS.LABELS.NO_NOTES,
    followUp: appointmentData.followUpDate || STRING_CONSTANTS.LABELS.NO_FOLLOW_UP,
  };

  return (
    <div className={styles.container}>
      <PageHeader 
        title={STRING_CONSTANTS.LABELS.APPOINTMENT_REPORT}
        subtitle={`${report.patientName} • ${report.date} at ${report.time}`}
        onBack={onBack}
        rightContent={
          <div className={styles.headerActions}>
            {onCreateInvoice && (
              <button className={styles.actionBtn} onClick={onCreateInvoice}>
                <span className={styles.materialIcon}>receipt</span>
                {STRING_CONSTANTS.BUTTONS.NEW_INVOICE}
              </button>
            )}
            <button className={styles.actionBtn} onClick={() => window.print()}>
              <span className={styles.materialIcon}>print</span>
              {STRING_CONSTANTS.BUTTONS.PRINT}
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.materialIcon}>download</span>
              {STRING_CONSTANTS.BUTTONS.EXPORT_PDF}
            </button>
          </div>
        }
        styles={styles}
      />

      <div className={styles.report}>
        <div className={styles.reportHeader}>
          <h1>{STRING_CONSTANTS.LABELS.APPOINTMENT_REPORT}</h1>
          <div className={styles.reportMeta}>
            <span>{STRING_CONSTANTS.LABELS.ID_PREFIX} {appointmentId}</span>
            <span>{report.date} {STRING_CONSTANTS.LABELS.AT} {report.time}</span>
          </div>
        </div>

        <section className={styles.section}>
          <h2>{STRING_CONSTANTS.LABELS.PATIENT_INFORMATION}</h2>
          <div className={styles.grid}>
            <div><strong>{STRING_CONSTANTS.LABELS.NAME_LABEL}</strong> {report.patientName}</div>
            <div><strong>{STRING_CONSTANTS.LABELS.PATIENT_ID}</strong> {report.patientId}</div>
            <div><strong>{STRING_CONSTANTS.LABELS.AGE_LABEL}</strong> {report.age}</div>
            <div><strong>{STRING_CONSTANTS.LABELS.GENDER_LABEL}</strong> {report.gender}</div>
            <div><strong>{STRING_CONSTANTS.LABELS.TYPE_LABEL}</strong> {report.type}</div>
            <div><strong>{STRING_CONSTANTS.LABELS.DOCTOR_LABEL}</strong> {report.doctor}</div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>{STRING_CONSTANTS.LABELS.VITAL_SIGNS}</h2>
          <div className={styles.vitalsGrid}>
            {Object.entries(report.vitals).map(([key, value]) => (
              <div key={key} className={styles.vitalCard}>
                <div className={styles.vitalLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className={styles.vitalValue}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>{STRING_CONSTANTS.LABELS.CHIEF_COMPLAINT}</h2>
          <p>{report.chiefComplaint}</p>
          {report.symptoms.length > 0 && (
            <>
              <h3>{STRING_CONSTANTS.LABELS.SYMPTOMS}</h3>
              <ul>
                {report.symptoms.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}
        </section>

        <section className={styles.section}>
          <h2>{STRING_CONSTANTS.LABELS.DIAGNOSIS_ASSESSMENT}</h2>
          <p>{report.diagnosis}</p>
        </section>

        {report.medications.length > 0 && (
          <section className={styles.section}>
            <h2>{STRING_CONSTANTS.LABELS.PRESCRIBED_MEDICATIONS}</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{STRING_CONSTANTS.LABELS.MEDICATION_HEADER}</th>
                  <th>{STRING_CONSTANTS.LABELS.DOSAGE_HEADER}</th>
                  <th>{STRING_CONSTANTS.LABELS.FREQUENCY_HEADER}</th>
                  <th>{STRING_CONSTANTS.LABELS.TIMING_HEADER}</th>
                  <th>{STRING_CONSTANTS.LABELS.DURATION_HEADER}</th>
                </tr>
              </thead>
              <tbody>
                {report.medications.map((med, i) => (
                  <tr key={i}>
                    <td>{med.name}</td>
                    <td>{med.dosage}</td>
                    <td>{med.frequency}</td>
                    <td>{med.timing}</td>
                    <td>{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {report.labTests.length > 0 && (
          <section className={styles.section}>
            <h2>{STRING_CONSTANTS.LABELS.LAB_TESTS_ORDERED}</h2>
            <ul>
              {report.labTests.map((test, i) => <li key={i}>{test}</li>)}
            </ul>
          </section>
        )}

        <section className={styles.section}>
          <h2>{STRING_CONSTANTS.LABELS.DOCTORS_NOTES}</h2>
          <p>{report.notes}</p>
        </section>

        {report.followUp && (
          <section className={styles.section}>
            <h2>{STRING_CONSTANTS.LABELS.FOLLOW_UP_TITLE}</h2>
            <p>{STRING_CONSTANTS.LABELS.NEXT_APPOINTMENT_RECOMMENDED} <strong>{report.followUp}</strong></p>
          </section>
        )}

        <div className={styles.footer}>
          <div>{STRING_CONSTANTS.LABELS.ATTENDING_PHYSICIAN} {report.doctor}</div>
          <div>{STRING_CONSTANTS.LABELS.REPORT_GENERATED} {new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentReport;
