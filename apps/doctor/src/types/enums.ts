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
 * Gender values from backend
 */
export enum ApiGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
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
 * Blood type values from backend
 */
export enum ApiBloodType {
  A_POSITIVE = 'A_POSITIVE',
  A_NEGATIVE = 'A_NEGATIVE',
  B_POSITIVE = 'B_POSITIVE',
  B_NEGATIVE = 'B_NEGATIVE',
  AB_POSITIVE = 'AB_POSITIVE',
  AB_NEGATIVE = 'AB_NEGATIVE',
  O_POSITIVE = 'O_POSITIVE',
  O_NEGATIVE = 'O_NEGATIVE'
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
 * Appointment status values from backend
 */
export enum ApiAppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
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
 * Appointment filter tabs
 */
export enum AppointmentFilterTab {
  ALL = 'all',
  TODAY = 'today',
  UPCOMING = 'upcoming',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

/**
 * Appointment sort types
 */
export enum AppointmentSortType {
  TIME = 'time',
  PATIENT_NAME = 'patientName',
  STATUS = 'status',
  TYPE = 'type'
}

/**
 * Navigation sections for the left pane
 */
export enum NavigationSection {
  MAIN = 'main',
  MANAGEMENT = 'management',
  SETTINGS = 'settings'
}

/**
 * Patient sort fields
 */
export enum PatientSortField {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  DATE_OF_BIRTH = 'dateOfBirth',
  CREATED_AT = 'createdAt'
}

/**
 * Dashboard tabs
 */
export enum DashboardTab {
  OVERVIEW = 'overview',
  ANALYTICS = 'analytics',
  REPORTS = 'reports'
}

/**
 * Chart types for data visualization
 */
export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  DOUGHNUT = 'doughnut'
}

/**
 * Main application tab types
 */
export enum TabType {
  DASHBOARD = 'dashboard',
  PATIENTS = 'patients',
  APPOINTMENTS = 'appointments',
  INVOICES = 'invoices',
  NOTIFICATIONS = 'notifications',
  SETTINGS = 'settings'
}

/**
 * Patient detail page tabs
 */
export enum PatientTab {
  OVERVIEW = 'overview',
  MEDICAL_HISTORY = 'medical-history'
}

/**
 * Settings page tabs
 */
export enum SettingsTab {
  PROFILE = 'profile',
  ACCOUNT = 'account',
  PREFERENCES = 'preferences'
}

/**
 * Consultation tabs
 */
export enum ConsultationTab {
  MEDICAL_HISTORY = 'medical-history',
  SYMPTOMS = 'symptoms',
  TREATMENT = 'treatment',
  FOLLOWUP = 'followup'
}

/**
 * Theme modes
 */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
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
