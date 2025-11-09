// Enums for type-safe string constants across the Doctor app

/**
 * Gender options for patients
 */
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

/**
 * Blood type options
 */
export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-'
}

/**
 * Appointment status
 */
export enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  NO_SHOW = 'No-Show'
}

/**
 * Sort direction
 */
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

/**
 * User roles (for future use)
 */
export enum UserRole {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  ADMIN = 'admin'
}

/**
 * Generic status for entities
 */
export enum EntityStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  DELETED = 'deleted'
}

/**
 * Authentication status
 */
export enum AuthStatus {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  LOADING = 'loading'
}

/**
 * Form field types for validation
 */
export enum FormFieldType {
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  TEXTAREA = 'textarea'
}

/**
 * Appointment details tab options
 */
export enum AppointmentTab {
  OVERVIEW = 'overview',
  MEDICAL_HISTORY = 'medical_history'
}

/**
 * Helper functions to get enum values as arrays
 */
export const EnumHelpers = {
  getGenderValues: (): string[] => Object.values(Gender),
  getBloodTypeValues: (): string[] => Object.values(BloodType),
  getAppointmentStatusValues: (): string[] => Object.values(AppointmentStatus),
  getSortDirectionValues: (): string[] => Object.values(SortDirection),
  getUserRoleValues: (): string[] => Object.values(UserRole),
  getEntityStatusValues: (): string[] => Object.values(EntityStatus),
};
