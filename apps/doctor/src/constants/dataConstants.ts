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
  DEV_PATIENT_SHORTCUTS: [
    {
      firstName: 'Devon',
      lastName: 'Lane',
      dateOfBirth: '1992-02-12',
      gender: Gender.FEMALE,
      phoneNumber: '(555) 410-0021',
      email: 'devon.lane@docx.dev',
      address: '12 Bay Street',
      bloodType: BloodType.A_POSITIVE,
      allergies: 'Peanuts',
      medications: 'Vitamin D',
      emergencyContactName: 'Riley Lane',
      emergencyContactRelationship: 'Sibling',
      emergencyContactPhone: '(555) 410-0022',
    },
    {
      firstName: 'Jordan',
      lastName: 'Nguyen',
      dateOfBirth: '1987-09-06',
      gender: Gender.MALE,
      phoneNumber: '(555) 410-0031',
      email: 'jordan.nguyen@docx.dev',
      address: '48 North Road',
      bloodType: BloodType.O_NEGATIVE,
      allergies: 'Latex',
      medications: 'Metformin',
      emergencyContactName: 'Avery Nguyen',
      emergencyContactRelationship: 'Partner',
      emergencyContactPhone: '(555) 410-0032',
    },
    {
      firstName: 'Avery',
      lastName: 'Patel',
      dateOfBirth: '1998-04-21',
      gender: Gender.OTHER,
      phoneNumber: '(555) 410-0041',
      email: 'avery.patel@docx.dev',
      address: '90 Market Lane',
      bloodType: BloodType.B_POSITIVE,
      allergies: 'Pollen',
      medications: 'Ibuprofen',
      emergencyContactName: 'Sam Patel',
      emergencyContactRelationship: 'Parent',
      emergencyContactPhone: '(555) 410-0042',
    },
  ],
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
  DOCTORS: [
    {
      id: '1',
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      specialization: 'Cardiology',
      licenseNumber: 'MD12345',
      phoneNumber: '(555) 234-5678',
      email: 'sarah.johnson@hospital.com',
      department: 'Cardiology',
      experience: 8,
      education: ['MD from Harvard Medical School', 'Residency at Johns Hopkins'],
      availableHours: {
        start: '09:00',
        end: '17:00'
      },
      consultationFee: 250,
      isActive: true,
      status: 'Active',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '2',
      firstName: 'Dr. Michael',
      lastName: 'Chen',
      specialization: 'Neurology',
      licenseNumber: 'MD67890',
      phoneNumber: '(555) 345-6789',
      email: 'michael.chen@hospital.com',
      department: 'Neurology',
      experience: 12,
      education: ['MD from Stanford Medical School', 'Fellowship in Neurosurgery'],
      availableHours: {
        start: '08:00',
        end: '18:00'
      },
      consultationFee: 300,
      isActive: true,
      status: 'Active',
      createdAt: '2024-01-12T09:00:00Z',
      updatedAt: '2024-01-12T09:00:00Z'
    }
  ],

  // Appointments list for dashboard and appointments page
  APPOINTMENTS: [
    {
      id: '1',
      patientName: 'Liam Johnson',
      patientAge: 34,
      patientGender: Gender.MALE,
      date: 'November 9, 2025',
      time: '09:00 AM',
      type: 'General Checkup',
      status: AppointmentStatus.SCHEDULED,
      duration: '30 minutes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
    },
    {
      id: '2',
      patientName: 'Emma Wilson',
      patientAge: 28,
      patientGender: Gender.FEMALE,
      date: 'November 9, 2025',
      time: '10:00 AM',
      type: 'Follow-up Visit',
      status: AppointmentStatus.SCHEDULED,
      duration: '20 minutes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
    {
      id: '3',
      patientName: 'Noah Brown',
      patientAge: 45,
      patientGender: Gender.MALE,
      date: 'November 9, 2025',
      time: '11:30 AM',
      type: 'Consultation',
      status: AppointmentStatus.SCHEDULED,
      duration: '45 minutes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
    },
    {
      id: '4',
      patientName: 'Olivia Davis',
      patientAge: 52,
      patientGender: Gender.FEMALE,
      date: 'November 9, 2025',
      time: '02:00 PM',
      type: 'Lab Results Review',
      status: AppointmentStatus.COMPLETED,
      duration: '15 minutes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    },
    {
      id: '5',
      patientName: 'James Martinez',
      patientAge: 39,
      patientGender: Gender.MALE,
      date: 'November 10, 2025',
      time: '09:30 AM',
      type: 'Physical Examination',
      status: AppointmentStatus.SCHEDULED,
      duration: '40 minutes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    },
    {
      id: '6',
      patientName: 'Sophia Anderson',
      patientAge: 31,
      patientGender: Gender.FEMALE,
      date: 'November 10, 2025',
      time: '11:00 AM',
      type: 'Follow-up Visit',
      status: AppointmentStatus.SCHEDULED,
      duration: '25 minutes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
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
      respiratoryRate: '16 /min',
      oxygenSaturation: '98%',
    },
    diagnosis: 'Patient is in good health. Blood pressure slightly elevated but within acceptable range.',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        timing: 'Morning',
        duration: '90 days',
      },
    ],
    labTests: ['Complete Blood Count', 'Lipid Panel', 'Hemoglobin A1C'],
    doctorNotes: 'Patient reports good adherence to current medication regimen. Advised to continue with regular exercise and balanced diet. Monitor blood pressure at home weekly.',
    followUpDate: 'January 15, 2026',
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

  DASHBOARD_STATS: {
    totalPatients: 145,
    totalDoctors: 12,
    activeDoctors: 10,
    appointmentsToday: 8,
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
  ],

  // Invoice data
  INVOICES: [
    { id: 'INV-001', patient: 'Liam Johnson', date: 'Nov 9, 2025', amount: 350, status: 'Paid' },
    { id: 'INV-002', patient: 'Emma Wilson', date: 'Nov 9, 2025', amount: 200, status: 'Pending' },
    { id: 'INV-003', patient: 'Noah Brown', date: 'Nov 8, 2025', amount: 450, status: 'Pending' },
    { id: 'INV-004', patient: 'Olivia Davis', date: 'Nov 2, 2025', amount: 150, status: 'Overdue' },
  ],

  INVOICE_STATS: {
    totalRevenue: 8750,
    pending: 1250,
    invoicesThisMonth: 12,
    paidInvoices: 8,
  },

  INVOICE_DETAIL: {
    id: 'INV-001',
    date: 'November 9, 2025',
    dueDate: 'November 16, 2025',
    patient: 'Liam Johnson',
    patientId: '#PT-2024-001',
    appointmentDate: 'November 9, 2025',
    appointmentType: 'General Checkup',
    items: [
      { description: 'General Consultation', qty: 1, price: 150, total: 150 },
      { description: 'Blood Pressure Check', qty: 1, price: 50, total: 50 },
      { description: 'Complete Blood Count (CBC)', qty: 1, price: 100, total: 100 },
      { description: 'Lipid Panel', qty: 1, price: 75, total: 75 },
    ],
    subtotal: 375,
    discount: 25,
    tax: 0,
    total: 350,
    status: 'Paid',
  },

  // Consultation quick-add options
  COMMON_SYMPTOMS: ['Fever', 'Cough', 'Headache', 'Fatigue', 'Nausea', 'Chest Pain'],
  COMMON_TESTS: ['CBC', 'Blood Sugar', 'Lipid Profile', 'ECG', 'X-Ray', 'Urine Test'],
  COMMON_MEDICINES: ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Azithromycin', 'Omeprazole', 'Metformin'],

  // Patient History Card Configurations (for rendering history grids)
  PATIENT_HISTORY_CONFIG: [
    { key: 'allergies', icon: 'warning', titleKey: 'KNOWN_ALLERGIES' },
    { key: 'familyHistory', icon: 'family_restroom', titleKey: 'FAMILY_HISTORY' },
    { key: 'surgeries', icon: 'surgical', titleKey: 'PAST_SURGERIES' },
    { key: 'lifestyle', icon: 'groups', titleKey: 'LIFESTYLE_HABITS' },
    { key: 'conditions', icon: 'medical_information', titleKey: 'PREVIOUS_CONDITIONS' },
  ] as const,

  // Default patient history data (mock)
  DEFAULT_PATIENT_HISTORY: {
    allergies: ['Penicillin (Rash)', 'Pollen (Seasonal)'],
    familyHistory: ['Father: Heart Disease', 'Mother: Diabetes'],
    surgeries: ['Appendectomy (2015)'],
    lifestyle: ['Non-smoker', 'Occasional alcohol use', 'Regular exercise (3x/week)'],
    conditions: ['Hypertension (Diagnosed 2020)', 'Type 2 Diabetes (Diagnosed 2018)', 'Seasonal Allergies'],
  } as const,

  // Vitals configuration (for rendering vitals display/edit)
  VITALS_CONFIG: [
    { key: 'heartRate', icon: 'favorite', labelKey: 'HEART_RATE', placeholderKey: 'HEART_RATE', shortLabel: 'HR' },
    { key: 'bloodPressure', icon: 'monitor_heart', labelKey: 'BLOOD_PRESSURE', placeholderKey: 'BLOOD_PRESSURE', shortLabel: 'BP' },
    { key: 'temperature', icon: 'thermostat', labelKey: 'TEMPERATURE', placeholderKey: 'TEMPERATURE', shortLabel: 'Temp' },
    { key: 'weight', icon: 'scale', labelKey: 'WEIGHT', placeholderKey: 'WEIGHT', shortLabel: 'Weight' },
  ] as const,

  // Extended vitals configuration (for consultation with 6 vitals)
  VITALS_CONFIG_EXTENDED: [
    { key: 'heartRate', icon: 'favorite', labelKey: 'HEART_RATE', placeholderKey: 'HEART_RATE', shortLabel: 'HR' },
    { key: 'bloodPressure', icon: 'monitor_heart', labelKey: 'BLOOD_PRESSURE', placeholderKey: 'BLOOD_PRESSURE', shortLabel: 'BP' },
    { key: 'temperature', icon: 'thermostat', labelKey: 'TEMPERATURE', placeholderKey: 'TEMPERATURE', shortLabel: 'Temp' },
    { key: 'weight', icon: 'scale', labelKey: 'WEIGHT', placeholderKey: 'WEIGHT', shortLabel: 'Weight' },
    { key: 'respiratoryRate', icon: 'air', labelKey: 'RESPIRATORY_RATE', placeholderKey: 'RESPIRATORY_RATE', shortLabel: 'RR' },
    { key: 'oxygenSaturation', icon: 'bloodtype', labelKey: 'OXYGEN_SATURATION', placeholderKey: 'OXYGEN_SATURATION', shortLabel: 'SpO₂' },
  ] as const,
};

// Application-level configuration  
export const APP_CONFIG = {
  APP_NAME: 'Medical Records Dashboard',
  DEFAULT_TAB: 'dashboard' as const,
  MAX_SEARCH_RESULTS: 100,
  CONSULTATION_DURATION_DEFAULT: 30, // minutes,
} as const;
