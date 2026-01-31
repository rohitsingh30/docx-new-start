import React, { memo } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface ActionItem {
  icon: string;
  label: string;
  onClick?: () => void;
}

interface ActionButtonsProps {
  actions: ActionItem[];
  styles: CSSModuleClasses;
  containerClassName?: string;
}

/**
 * ActionButtons - Renders a list of action buttons with icons
 * 
 * Usage:
 * <ActionButtons 
 *   actions={[
 *     { icon: 'schedule', label: STRING_CONSTANTS.BUTTONS.RESCHEDULE, onClick: onReschedule },
 *     { icon: 'play_arrow', label: STRING_CONSTANTS.BUTTONS.START, onClick: onStart },
 *   ]}
 *   styles={styles}
 * />
 */
export const ActionButtons: React.FC<ActionButtonsProps> = memo(({ 
  actions, 
  styles,
  containerClassName 
}) => (
  <div className={containerClassName || styles.appointmentActions || styles.actions}>
    {actions.map((action, index) => (
      <button 
        key={index} 
        className={styles.actionButton} 
        onClick={action.onClick}
      >
        <span className={`${styles.materialIcon} ${styles.actionIcon || ''}`}>{action.icon}</span>
        <span>{action.label}</span>
      </button>
    ))}
  </div>
));

ActionButtons.displayName = 'ActionButtons';

interface StatusBadgeProps {
  status: string;
  label: string;
  className: string;
  styles: CSSModuleClasses;
}

/**
 * StatusBadge - Renders a status badge
 */
export const StatusBadge: React.FC<StatusBadgeProps> = memo(({ 
  label, 
  className 
}) => (
  <span className={className}>{label}</span>
));

StatusBadge.displayName = 'StatusBadge';

interface MedicationItemProps {
  name: string;
  details: string;
  styles: CSSModuleClasses;
}

/**
 * MedicationItem - Single medication item
 */
export const MedicationItem: React.FC<MedicationItemProps> = memo(({ name, details, styles }) => (
  <div className={styles.medItem}>
    <div className={styles.medItemContent}>
      <div className={styles.medItemName}>{name}</div>
      <div className={styles.medItemDetails}>{details}</div>
    </div>
  </div>
));

MedicationItem.displayName = 'MedicationItem';

interface MedicationListProps {
  medications: Array<{ name: string; details: string }>;
  styles: CSSModuleClasses;
}

/**
 * MedicationList - List of medications
 */
export const MedicationList: React.FC<MedicationListProps> = memo(({ medications, styles }) => (
  <div className={styles.medicationsList}>
    {medications.map((med, index) => (
      <MedicationItem key={index} name={med.name} details={med.details} styles={styles} />
    ))}
  </div>
));

MedicationList.displayName = 'MedicationList';

interface AppointmentItemProps {
  date: string;
  type: string;
  onView?: () => void;
  styles: CSSModuleClasses;
}

/**
 * AppointmentListItem - Single appointment item
 */
export const AppointmentListItem: React.FC<AppointmentItemProps> = memo(({ 
  date, 
  type, 
  onView, 
  styles 
}) => (
  <div className={styles.appointmentItem}>
    <span className={styles.appointmentText}>{date} - {type}</span>
    {onView && (
      <button className={styles.viewButton} onClick={onView}>
        <span className={styles.materialIcon}>visibility</span>
        View
      </button>
    )}
  </div>
));

AppointmentListItem.displayName = 'AppointmentListItem';

interface AppointmentListProps {
  appointments: Array<{ id: string; date: string; type: string }>;
  onViewAppointment?: (id: string) => void;
  styles: CSSModuleClasses;
}

/**
 * AppointmentList - List of previous appointments
 */
export const AppointmentList: React.FC<AppointmentListProps> = memo(({ 
  appointments, 
  onViewAppointment, 
  styles 
}) => (
  <div className={styles.appointmentsList}>
    {appointments.map((appt) => (
      <AppointmentListItem
        key={appt.id}
        date={appt.date}
        type={appt.type}
        onView={onViewAppointment ? () => onViewAppointment(appt.id) : undefined}
        styles={styles}
      />
    ))}
  </div>
));

AppointmentList.displayName = 'AppointmentList';

interface SymptomTagsProps {
  label: string;
  symptoms: string[];
  styles: CSSModuleClasses;
}

/**
 * SymptomTags - Display symptoms as tags
 */
export const SymptomTags: React.FC<SymptomTagsProps> = memo(({ label, symptoms, styles }) => (
  <div className={styles.symptomSection}>
    <span className={styles.symptomsLabel}>{label}:</span>
    <div className={styles.symptomsList}>
      {symptoms.map((symptom, index) => (
        <span key={index} className={styles.symptomTag}>{symptom}</span>
      ))}
    </div>
  </div>
));

SymptomTags.displayName = 'SymptomTags';

interface DurationDisplayProps {
  label: string;
  value: string;
  styles: CSSModuleClasses;
}

/**
 * DurationDisplay - Display duration info
 */
export const DurationDisplay: React.FC<DurationDisplayProps> = memo(({ label, value, styles }) => (
  <div className={styles.durationSection}>
    <span className={styles.durationLabel}>{label}:</span>
    <span className={styles.durationText}>{value}</span>
  </div>
));

DurationDisplay.displayName = 'DurationDisplay';
