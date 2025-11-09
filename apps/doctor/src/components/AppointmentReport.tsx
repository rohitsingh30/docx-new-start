import React from 'react';
import styles from '../styles/AppointmentReport.module.css';

interface AppointmentReportProps {
  appointmentId: string;
  onBack: () => void;
}

const AppointmentReport: React.FC<AppointmentReportProps> = ({ appointmentId, onBack }) => {
  // Mock data - in real app, fetch based on appointmentId
  const report = {
    date: 'October 15, 2025',
    time: '09:00 AM',
    type: 'Annual Physical',
    patientName: 'Liam Johnson',
    patientId: '#PT-2024-001',
    age: 34,
    gender: 'Male',
    doctor: 'Dr. Sarah Johnson',
    
    vitals: {
      heartRate: '68 bpm',
      bloodPressure: '138/88',
      temperature: '98.4°F',
      weight: '182 lbs',
      respiratoryRate: '16 /min',
      oxygenSaturation: '98%',
    },
    
    chiefComplaint: 'Routine annual checkup, no specific complaints',
    symptoms: ['None reported'],
    diagnosis: 'Patient is in good health. Blood pressure slightly elevated but within acceptable range.',
    
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', timing: 'Morning', duration: '90 days' },
    ],
    
    labTests: ['Complete Blood Count', 'Lipid Panel', 'Hemoglobin A1C'],
    
    notes: 'Patient reports good adherence to current medication regimen. Advised to continue with regular exercise and balanced diet. Monitor blood pressure at home weekly.',
    
    followUp: 'January 15, 2026',
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <span className="material-icons">arrow_back</span>
          Back
        </button>
        <div className={styles.headerActions}>
          <button className={styles.actionBtn} onClick={() => window.print()}>
            <span className="material-icons">print</span>
            Print
          </button>
          <button className={styles.actionBtn}>
            <span className="material-icons">download</span>
            Export PDF
          </button>
        </div>
      </div>

      <div className={styles.report}>
        <div className={styles.reportHeader}>
          <h1>Appointment Report</h1>
          <div className={styles.reportMeta}>
            <span>ID: {appointmentId}</span>
            <span>{report.date} at {report.time}</span>
          </div>
        </div>

        <section className={styles.section}>
          <h2>Patient Information</h2>
          <div className={styles.grid}>
            <div><strong>Name:</strong> {report.patientName}</div>
            <div><strong>Patient ID:</strong> {report.patientId}</div>
            <div><strong>Age:</strong> {report.age}</div>
            <div><strong>Gender:</strong> {report.gender}</div>
            <div><strong>Type:</strong> {report.type}</div>
            <div><strong>Doctor:</strong> {report.doctor}</div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Vital Signs</h2>
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
          <h2>Chief Complaint</h2>
          <p>{report.chiefComplaint}</p>
          {report.symptoms.length > 0 && (
            <>
              <h3>Symptoms</h3>
              <ul>
                {report.symptoms.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}
        </section>

        <section className={styles.section}>
          <h2>Diagnosis & Assessment</h2>
          <p>{report.diagnosis}</p>
        </section>

        {report.medications.length > 0 && (
          <section className={styles.section}>
            <h2>Prescribed Medications</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Timing</th>
                  <th>Duration</th>
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
            <h2>Lab Tests Ordered</h2>
            <ul>
              {report.labTests.map((test, i) => <li key={i}>{test}</li>)}
            </ul>
          </section>
        )}

        <section className={styles.section}>
          <h2>Doctor's Notes</h2>
          <p>{report.notes}</p>
        </section>

        {report.followUp && (
          <section className={styles.section}>
            <h2>Follow-up</h2>
            <p>Next appointment recommended on: <strong>{report.followUp}</strong></p>
          </section>
        )}

        <div className={styles.footer}>
          <div>Attending Physician: {report.doctor}</div>
          <div>Report Generated: {new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentReport;
