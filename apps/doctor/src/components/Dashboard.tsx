import React from 'react';
import styles from '../styles/Dashboard.module.css';
import { DashboardStats, DashboardProps, StatCardProps, Appointment } from '../types/Dashboard.types';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { AppointmentStatus } from '../types/enums';

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className={styles.statCard}>
    <p className={styles.statTitle}>{title}</p>
    <p className={styles.statValue}>{value}</p>
  </div>
);

const getStatusClassName = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
      return styles.statusActive;
    case AppointmentStatus.PENDING:
      return styles.statusPending;
    case AppointmentStatus.CANCELLED:
      return styles.statusCancelled;
    case AppointmentStatus.COMPLETED:
      return styles.statusCompleted;
    case AppointmentStatus.NO_SHOW:
      return styles.statusPending;
    default:
      return styles.statusActive;
  }
};

const getStatusLabel = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
      return STRING_CONSTANTS.STATUS_LABELS.ACTIVE;
    case AppointmentStatus.PENDING:
      return STRING_CONSTANTS.STATUS_LABELS.PENDING;
    case AppointmentStatus.CANCELLED:
      return STRING_CONSTANTS.STATUS_LABELS.CANCELLED;
    case AppointmentStatus.COMPLETED:
      return STRING_CONSTANTS.STATUS_LABELS.COMPLETED;
    case AppointmentStatus.NO_SHOW:
      return STRING_CONSTANTS.STATUS_LABELS.PENDING;
    default:
      return status;
  }
};

const Dashboard: React.FC<DashboardProps> = () => {
  // Mock data for demonstration - in a real app, this would come from API
  const dashboardStats: DashboardStats = MOCK_DATA.DASHBOARD_STATS;
  const appointments: Appointment[] = MOCK_DATA.APPOINTMENTS;

  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{STRING_CONSTANTS.LABELS.TODAY_SCHEDULE}</h1>
        <div className={styles.headerActions}>
          <button className={styles.primaryButton}>
            <span className={styles.buttonIcon}>+</span>
            <span>{STRING_CONSTANTS.LABELS.ADD_MEDICAL_NOTE}</span>
          </button>
          <button className={styles.primaryButton}>
            {STRING_CONSTANTS.LABELS.VIEW_ALL_PATIENTS}
          </button>
        </div>
      </div>
    
      <div className={styles.statsGrid}>
        <StatCard 
          title={STRING_CONSTANTS.LABELS.TOTAL_PATIENTS_TODAY} 
          value={dashboardStats.totalPatients} 
        />
        <StatCard 
          title={STRING_CONSTANTS.LABELS.APPOINTMENTS} 
          value={dashboardStats.appointmentsToday} 
        />
        <StatCard 
          title={STRING_CONSTANTS.LABELS.PENDING_TASKS} 
          value={3} 
        />
      </div>

      <div className={styles.appointmentsSection}>
        <h2 className={styles.sectionTitle}>{STRING_CONSTANTS.LABELS.UPCOMING_APPOINTMENTS}</h2>
        <div className={styles.appointmentsCardsContainer}>
          <div className={styles.appointmentsCards}>
            {appointments.map((appointment) => (
              <div key={appointment.id} className={styles.appointmentCard}>
                <div className={styles.appointmentCardHeader}>
                  <div className={styles.appointmentAvatar}>
                    {appointment.avatar ? (
                      <img 
                        src={appointment.avatar} 
                        alt={appointment.patientName}
                        className={styles.avatarImage}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {appointment.patientName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className={styles.appointmentInfo}>
                    <h3 className={styles.appointmentPatientName}>{appointment.patientName}</h3>
                    <p className={styles.appointmentType}>{appointment.type || STRING_CONSTANTS.LABELS.CONSULTATION}</p>
                  </div>
                </div>
                <div className={styles.appointmentDetails}>
                  <div className={styles.appointmentDetailRow}>
                    <span className={styles.materialIcon}>schedule</span>
                    <span className={styles.appointmentTime}>{appointment.time}</span>
                  </div>
                  <div className={styles.appointmentDetailRow}>
                    <span className={styles.materialIcon}>timer</span>
                    <span className={styles.appointmentDuration}>{appointment.duration || STRING_CONSTANTS.LABELS.DURATION_30_MIN}</span>
                  </div>
                </div>
                <div className={styles.appointmentCardFooter}>
                  <span className={getStatusClassName(appointment.status)}>
                    {getStatusLabel(appointment.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
