// Data-related constants
export const DATA_CONSTANTS = {
  GENDER_OPTIONS: ['Male', 'Female', 'Other'] as const,
  BLOOD_TYPES: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const,
  APPOINTMENT_STATUSES: ['Scheduled', 'Completed', 'Cancelled', 'No-Show'] as const,
  SPECIALIZATIONS: [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'Psychiatry',
    'Oncology',
    'Emergency Medicine',
    'Family Medicine',
    'Internal Medicine',
  ] as const,
  DEPARTMENTS: [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Emergency',
    'Surgery',
    'Radiology',
    'Laboratory',
    'Pharmacy',
    'Administration',
  ] as const,
  DOCTOR_STATUSES: ['Active', 'Inactive'] as const,
} as const;

// Mock data for demonstration
export const MOCK_DATA = {
  PATIENTS: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1985-06-15',
      gender: 'Male' as const,
      phoneNumber: '(555) 123-4567',
      email: 'john.doe@email.com',
      address: '123 Main St, City, State 12345',
      bloodType: DATA_CONSTANTS.BLOOD_TYPES[0], // A+
      allergies: ['Penicillin'],
      medications: ['Aspirin'],
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phoneNumber: '(555) 987-6543'
      },
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      firstName: 'Alice',
      lastName: 'Smith',
      dateOfBirth: '1990-03-22',
      gender: 'Female' as const,
      phoneNumber: '(555) 234-5678',
      email: 'alice.smith@email.com',
      address: '456 Oak Ave, City, State 12345',
      bloodType: DATA_CONSTANTS.BLOOD_TYPES[1], // A-
      allergies: ['Shellfish'],
      medications: ['Vitamin D'],
      emergencyContact: {
        name: 'Bob Smith',
        relationship: 'Brother',
        phoneNumber: '(555) 876-5432'
      },
      createdAt: '2024-01-20T11:30:00Z',
      updatedAt: '2024-01-20T11:30:00Z'
    }
  ],
  DOCTORS: [
    {
      id: '1',
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      specialization: DATA_CONSTANTS.SPECIALIZATIONS[0], // Cardiology
      licenseNumber: 'MD12345',
      phoneNumber: '(555) 234-5678',
      email: 'sarah.johnson@hospital.com',
      department: DATA_CONSTANTS.DEPARTMENTS[0], // Cardiology
      experience: 8,
      education: ['MD from Harvard Medical School', 'Residency at Johns Hopkins'],
      availableHours: {
        start: '09:00',
        end: '17:00'
      },
      consultationFee: 250,
      isActive: true,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '2',
      firstName: 'Dr. Michael',
      lastName: 'Chen',
      specialization: DATA_CONSTANTS.SPECIALIZATIONS[1], // Neurology
      licenseNumber: 'MD67890',
      phoneNumber: '(555) 345-6789',
      email: 'michael.chen@hospital.com',
      department: DATA_CONSTANTS.DEPARTMENTS[1], // Neurology
      experience: 12,
      education: ['MD from Stanford Medical School', 'Fellowship in Neurosurgery'],
      availableHours: {
        start: '08:00',
        end: '18:00'
      },
      consultationFee: 300,
      isActive: true,
      createdAt: '2024-01-12T14:00:00Z',
      updatedAt: '2024-01-12T14:00:00Z'
    }
  ],
  DASHBOARD_STATS: {
    totalPatients: 145,
    totalDoctors: 12,
    activeDoctors: 10,
    appointmentsToday: 8,
  }
};

// Application-level configuration  
export const APP_CONFIG = {
  APP_NAME: 'Medical Records Dashboard',
  DEFAULT_TAB: 'dashboard' as const,
  MAX_SEARCH_RESULTS: 100,
  CONSULTATION_DURATION_DEFAULT: 30, // minutes,
} as const;
