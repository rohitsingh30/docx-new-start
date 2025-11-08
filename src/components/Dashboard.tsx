import React from 'react';
import styles from '../styles/Dashboard.module.css';
import { Patient } from '../types/Patient.types';
import { Doctor } from '../types/Doctor.types';
import { DashboardStats, DashboardProps, StatCardProps } from '../types/Dashboard.types';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className={styles.statCard}>
    <h3>{title}</h3>
    <p className={styles.statNumber}>{value}</p>
  </div>
);

const RecentPatientItem: React.FC<{ patient: Patient }> = ({ patient }) => (
  <div className={styles.recentItem}>
    <h4>{patient.firstName} {patient.lastName}</h4>
    <p>Blood Type: {patient.bloodType}</p>
    <p>Phone: {patient.phoneNumber}</p>
  </div>
);

const RecentDoctorItem: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
  <div className={styles.recentItem}>
    <h4>{doctor.firstName} {doctor.lastName}</h4>
    <p>Specialization: {doctor.specialization}</p>
    <p>Experience: {doctor.experience} years</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = () => {
  // Mock data for demonstration - in a real app, this would come from API
  const dashboardStats: DashboardStats = MOCK_DATA.DASHBOARD_STATS;

  const recentPatients: Patient[] = [...MOCK_DATA.PATIENTS];

  const recentDoctors: Doctor[] = [...MOCK_DATA.DOCTORS];

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard Overview</h2>
    
      <div className={styles.statsGrid}>
        <StatCard title={STRING_CONSTANTS.LABELS.TOTAL_PATIENTS} value={dashboardStats.totalPatients} />
        <StatCard title={STRING_CONSTANTS.LABELS.TOTAL_DOCTORS} value={dashboardStats.totalDoctors} />
        <StatCard title={STRING_CONSTANTS.LABELS.APPOINTMENTS_TODAY} value={dashboardStats.appointmentsToday} />
        <StatCard title={STRING_CONSTANTS.LABELS.ACTIVE_DOCTORS} value={dashboardStats.activeDoctors} />
      </div>

      <div className={styles.recentSection}>
        <section className={styles.recentPatients}>
          <h3>{STRING_CONSTANTS.LABELS.RECENT_PATIENTS}</h3>
          <div className={styles.recentList}>
            {recentPatients.map((patient) => (
              <RecentPatientItem key={patient.id} patient={patient} />
            ))}
          </div>
        </section>

        <section className={styles.recentDoctors}>
          <h3>{STRING_CONSTANTS.LABELS.RECENT_DOCTORS}</h3>
          <div className={styles.recentList}>
            {recentDoctors.map((doctor) => (
              <RecentDoctorItem key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
