import React from 'react';
import styles from '../styles/Dashboard.module.css';
import { DashboardStats, DashboardProps, Appointment } from '../types/Dashboard.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { getStatusClassName, getStatusLabel } from '../utils/statusUtils';
import { StatsGrid } from './shared';
import { useDashboardAppointments, useDashboardStats } from '../hooks/useDashboardData';

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onClick }) => (
  <div 
    className={styles.appointmentCard}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    }}
  >
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
      <span className={getStatusClassName(appointment.status, styles)}>
        {getStatusLabel(appointment.status)}
      </span>
    </div>
  </div>
);

interface AppointmentCardsListProps {
  appointments: Appointment[];
  onAppointmentClick: (id: string) => void;
}

const AppointmentCardsList: React.FC<AppointmentCardsListProps> = ({ appointments, onAppointmentClick }) => (
  <div className={styles.appointmentsCards}>
    {appointments.map((appointment) => (
      <AppointmentCard
        key={appointment.id}
        appointment={appointment}
        onClick={() => onAppointmentClick(appointment.id)}
      />
    ))}
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ 
  onAppointmentClick,
  onAddMedicalNote,
  onViewAllPatients,
}) => {
  const { data: statsData } = useDashboardStats();
  const { data: appointmentsData } = useDashboardAppointments();

  const dashboardStats: DashboardStats = statsData || {
    totalPatients: 0,
    appointmentsToday: 0,
  };
  const appointments: Appointment[] = appointmentsData || [];

  const handleAppointmentClick = (appointmentId: string) => {
    if (onAppointmentClick) {
      onAppointmentClick(appointmentId);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{STRING_CONSTANTS.LABELS.TODAY_SCHEDULE}</h1>
        <div className={styles.headerActions}>
          <button 
            className={styles.primaryButton}
            onClick={onAddMedicalNote}
            type="button"
          >
            <span className={styles.buttonIcon}>+</span>
            <span>{STRING_CONSTANTS.LABELS.ADD_MEDICAL_NOTE}</span>
          </button>
          <button 
            className={styles.primaryButton}
            onClick={onViewAllPatients}
            type="button"
          >
            {STRING_CONSTANTS.LABELS.VIEW_ALL_PATIENTS}
          </button>
        </div>
      </div>
    
      <div className={styles.statsContainer}>
        <StatsGrid 
          stats={[
            { title: STRING_CONSTANTS.LABELS.TOTAL_PATIENTS_TODAY, value: dashboardStats.totalPatients },
            { title: STRING_CONSTANTS.LABELS.APPOINTMENTS, value: dashboardStats.appointmentsToday },
            { title: STRING_CONSTANTS.LABELS.PENDING_TASKS, value: 3 },
          ]}
          styles={styles}
        />
      </div>

      <div className={styles.appointmentsSection}>
        <h2 className={styles.sectionTitle}>{STRING_CONSTANTS.LABELS.UPCOMING_APPOINTMENTS}</h2>
        <div className={styles.appointmentsCardsContainer}>
          <AppointmentCardsList 
            appointments={appointments}
            onAppointmentClick={handleAppointmentClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
