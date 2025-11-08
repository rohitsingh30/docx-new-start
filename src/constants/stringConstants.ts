// String constants and messages
export const STRING_CONSTANTS = {
  BUTTONS: {
    ADD_PATIENT: 'Add Patient',
    ADD_DOCTOR: 'Add Doctor',
    EDIT: 'Edit',
    DELETE: 'Delete',
    SAVE: 'Save',
    CANCEL: 'Cancel',
    SEARCH: 'Search',
    CLEAR: 'Clear',
    VIEW_ALL: 'View All',
    SUBMIT: 'Submit',
  },
  LABELS: {
    DASHBOARD: 'Dashboard',
    PATIENTS: 'Patients',
    DOCTORS: 'Doctors',
    RECENT_PATIENTS: 'Recent Patients',
    RECENT_DOCTORS: 'Recent Doctors',
    TOTAL_PATIENTS: 'Total Patients',
    TOTAL_DOCTORS: 'Total Doctors',
    ACTIVE_DOCTORS: 'Active Doctors',
    APPOINTMENTS_TODAY: 'Appointments Today',
  },
  MESSAGES: {
    NO_PATIENTS: 'No patients found',
    NO_DOCTORS: 'No doctors found',
    LOADING: 'Loading...',
    SUCCESS_SAVE: 'Successfully saved',
    SUCCESS_DELETE: 'Successfully deleted',
    CONFIRM_DELETE: 'Are you sure you want to delete this record?',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  NAME_TOO_SHORT: 'Name must be at least 2 characters',
  NAME_TOO_LONG: 'Name must be no more than 50 characters',
  INVALID_EXPERIENCE: 'Experience must be between 0 and 50 years',
  INVALID_FEE: 'Consultation fee must be between $0 and $10000',
  GENERIC_ERROR: 'An error occurred. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
} as const;
