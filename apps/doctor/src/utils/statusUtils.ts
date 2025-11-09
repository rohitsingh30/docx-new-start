// Status utility functions
import { AppointmentStatus } from '../types/enums';
import { STRING_CONSTANTS } from '../constants/stringConstants';

/**
 * Get the CSS class name for an appointment status
 */
export const getStatusClassName = (status: AppointmentStatus, styles: Record<string, string>): string => {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
      return styles.statusActive || styles.statusScheduled || '';
    case AppointmentStatus.PENDING:
      return styles.statusPending || '';
    case AppointmentStatus.CANCELLED:
      return styles.statusCancelled || '';
    case AppointmentStatus.COMPLETED:
      return styles.statusCompleted || '';
    case AppointmentStatus.NO_SHOW:
      return styles.statusPending || '';
    default:
      return styles.statusActive || styles.statusScheduled || '';
  }
};

/**
 * Get the display label for an appointment status
 */
export const getStatusLabel = (status: AppointmentStatus): string => {
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
      return STRING_CONSTANTS.STATUS_LABELS.NO_SHOW;
    default:
      return status;
  }
};
