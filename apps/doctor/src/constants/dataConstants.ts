// Data-related constants
import { 
  Gender, 
  BloodType, 
  AppointmentStatus,
  EnumHelpers 
} from '../types/enums';

export const DATA_CONSTANTS = {
  GENDER_OPTIONS: EnumHelpers.getGenderValues(),
  BLOOD_TYPES: EnumHelpers.getBloodTypeValues(),
  APPOINTMENT_STATUSES: EnumHelpers.getAppointmentStatusValues(),
} as const;

// Mock data for demonstration
export const MOCK_DATA = {
  PATIENTS: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1985-06-15',
      gender: Gender.MALE,
      phoneNumber: '(555) 123-4567',
      email: 'john.doe@email.com',
      address: '123 Main St, City, State 12345',
      bloodType: BloodType.A_POSITIVE,
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
      gender: Gender.FEMALE,
      phoneNumber: '(555) 234-5678',
      email: 'alice.smith@email.com',
      address: '456 Oak Ave, City, State 12345',
      bloodType: BloodType.A_NEGATIVE,
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
  DASHBOARD_STATS: {
    totalPatients: 12,
    appointmentsToday: 8,
  },

  APPOINTMENTS: [
    {
      id: '1',
      patientName: 'Liam Johnson',
      time: '09:00 AM',
      status: AppointmentStatus.SCHEDULED,
      type: 'General Checkup',
      duration: '30 min',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
    },
    {
      id: '2',
      patientName: 'Olivia Smith',
      time: '09:30 AM',
      status: AppointmentStatus.PENDING,
      type: 'Follow-up',
      duration: '20 min',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    },
    {
      id: '3',
      patientName: 'Noah Williams',
      time: '10:00 AM',
      status: AppointmentStatus.SCHEDULED,
      type: 'Consultation',
      duration: '45 min',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
    },
    {
      id: '4',
      patientName: 'Emma Brown',
      time: '10:30 AM',
      status: AppointmentStatus.CANCELLED,
      type: 'Lab Review',
      duration: '15 min',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
    {
      id: '5',
      patientName: 'James Jones',
      time: '11:00 AM',
      status: AppointmentStatus.SCHEDULED,
      type: 'Physical Exam',
      duration: '40 min',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    },
    {
      id: '6',
      patientName: 'Sophia Davis',
      time: '11:30 AM',
      status: AppointmentStatus.SCHEDULED,
      type: 'Consultation',
      duration: '30 min',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
    },
    {
      id: '7',
      patientName: 'William Miller',
      time: '02:00 PM',
      status: AppointmentStatus.PENDING,
      type: 'Follow-up',
      duration: '25 min',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=William',
    },
    {
      id: '8',
      patientName: 'Isabella Garcia',
      time: '02:30 PM',
      status: AppointmentStatus.SCHEDULED,
      type: 'General Checkup',
      duration: '30 min',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella',
    },
  ],

  // Detailed appointment data
  APPOINTMENT_DETAILS: {
    patient: {
      id: '1',
      name: 'Liam Johnson',
      patientId: '#PT-2024-001',
      age: 34,
      gender: Gender.MALE,
      contact: '+1 (555) 123-4567',
      email: 'liam.johnson@email.com',
      bloodType: BloodType.O_POSITIVE,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
    },
    appointment: {
      id: '1',
      type: 'General Checkup',
      status: AppointmentStatus.SCHEDULED,
      date: 'November 9, 2025',
      time: '09:00 AM',
      duration: '30 minutes',
      room: 'Room 201',
    },
    chiefComplaint: {
      description: 'Patient reports feeling fatigued and experiencing occasional chest discomfort during physical activity.',
      symptoms: ['Fatigue', 'Chest Discomfort', 'Shortness of Breath'],
      duration: 'Symptoms started approximately 2 weeks ago',
    },
    medicalHistory: {
      previousConditions: 'Hypertension (controlled with medication)',
      currentMedications: 'Lisinopril 10mg daily, Aspirin 81mg daily',
      allergies: 'Penicillin',
    },
    vitals: {
      heartRate: '72 bpm',
      bloodPressure: '140/90',
      temperature: '98.6°F',
      weight: '185 lbs',
    },
    notes: '',
    reminder: 'Follow up appointment recommended in 2 weeks to review test results.',
    previousAppointments: [
      {
        id: 'prev-1',
        type: 'Annual Physical',
        date: 'Oct 15, 2025',
      },
      {
        id: 'prev-2',
        type: 'Follow-up Visit',
        date: 'Sep 3, 2025',
      },
      {
        id: 'prev-3',
        type: 'Initial Consultation',
        date: 'Aug 12, 2025',
      },
    ],
  },
  
  // Mock user accounts for authentication
  USERS: [
    {
      id: '1',
      email: 'doctor@docx.com',
      password: 'doctor123', // In production, this would be hashed
      name: 'Dr. Sarah Johnson',
      role: 'doctor',
      doctorId: '1',
    },
    {
      id: '2',
      email: 'admin@docx.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
    },
    {
      id: '3',
      email: 'demo@docx.com',
      password: 'demo123',
      name: 'Dr. Demo',
      role: 'doctor',
    }
  ]
};

// Application-level configuration  
export const APP_CONFIG = {
  APP_NAME: 'Medical Records Dashboard',
  DEFAULT_TAB: 'dashboard' as const,
  MAX_SEARCH_RESULTS: 100,
  CONSULTATION_DURATION_DEFAULT: 30, // minutes,
} as const;
