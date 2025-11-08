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
 * Doctor status
 */
export enum DoctorStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive'
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
 * Medical specializations
 */
export enum Specialization {
  CARDIOLOGY = 'Cardiology',
  NEUROLOGY = 'Neurology',
  ORTHOPEDICS = 'Orthopedics',
  PEDIATRICS = 'Pediatrics',
  DERMATOLOGY = 'Dermatology',
  PSYCHIATRY = 'Psychiatry',
  ONCOLOGY = 'Oncology',
  EMERGENCY_MEDICINE = 'Emergency Medicine',
  FAMILY_MEDICINE = 'Family Medicine',
  INTERNAL_MEDICINE = 'Internal Medicine'
}

/**
 * Hospital departments
 */
export enum Department {
  CARDIOLOGY = 'Cardiology',
  NEUROLOGY = 'Neurology',
  ORTHOPEDICS = 'Orthopedics',
  PEDIATRICS = 'Pediatrics',
  EMERGENCY = 'Emergency',
  SURGERY = 'Surgery',
  RADIOLOGY = 'Radiology',
  LABORATORY = 'Laboratory',
  PHARMACY = 'Pharmacy',
  ADMINISTRATION = 'Administration'
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
 * Helper functions to get enum values as arrays
 */
export const EnumHelpers = {
  getGenderValues: (): string[] => Object.values(Gender),
  getBloodTypeValues: (): string[] => Object.values(BloodType),
  getDoctorStatusValues: (): string[] => Object.values(DoctorStatus),
  getAppointmentStatusValues: (): string[] => Object.values(AppointmentStatus),
  getSpecializationValues: (): string[] => Object.values(Specialization),
  getDepartmentValues: (): string[] => Object.values(Department),
  getSortDirectionValues: (): string[] => Object.values(SortDirection),
  getUserRoleValues: (): string[] => Object.values(UserRole),
  getEntityStatusValues: (): string[] => Object.values(EntityStatus),
};
