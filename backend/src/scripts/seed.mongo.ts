import dotenv from 'dotenv';
import { connectMongo, disconnectMongo } from '../config/mongoose';
import { hashPassword } from '../utils/password';
import {
  AppointmentModel,
  ConsultationModel,
  DoctorModel,
  MedicalNoteModel,
  MedicalRecordModel,
  PatientModel,
  PrescriptionModel,
  UserModel,
  VitalsModel,
} from '../models';
import {
  AppointmentStatus,
  BloodType,
  DoctorStatus,
  Gender,
  UserRole,
} from '../types/enums';

dotenv.config();

const seed = async () => {
  await connectMongo();

  await Promise.all([
    PrescriptionModel.deleteMany({}),
    ConsultationModel.deleteMany({}),
    VitalsModel.deleteMany({}),
    MedicalNoteModel.deleteMany({}),
    MedicalRecordModel.deleteMany({}),
    AppointmentModel.deleteMany({}),
    PatientModel.deleteMany({}),
    DoctorModel.deleteMany({}),
    UserModel.deleteMany({}),
  ]);

  const hashedPassword = await hashPassword('demo123');

  const doctorUser = await UserModel.create({
    email: 'doctor@docx.com',
    password: hashedPassword,
    name: 'Dr. Sarah Johnson',
    role: UserRole.DOCTOR,
    gender: Gender.FEMALE,
    phone: '+1 (555) 100-0001',
  });

  const doctor = await DoctorModel.create({
    userId: doctorUser.id,
    specialization: 'General Medicine',
    licenseNumber: 'MD-2024-001',
    status: DoctorStatus.ACTIVE,
  });

  const patientUser1 = await UserModel.create({
    email: 'patient@docx.com',
    password: hashedPassword,
    name: 'John Doe',
    role: UserRole.PATIENT,
    gender: Gender.MALE,
    phone: '+1 (555) 200-0001',
  });

  const patient1 = await PatientModel.create({
    userId: patientUser1.id,
    dateOfBirth: new Date('1990-05-15'),
    bloodType: BloodType.O_POSITIVE,
    allergies: ['Penicillin'],
    currentMedications: ['Aspirin'],
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+1 (555) 200-0002',
  });

  const patientUser2 = await UserModel.create({
    email: 'emma@docx.com',
    password: hashedPassword,
    name: 'Emma Wilson',
    role: UserRole.PATIENT,
    gender: Gender.FEMALE,
    phone: '+1 (555) 200-0003',
  });

  const patient2 = await PatientModel.create({
    userId: patientUser2.id,
    dateOfBirth: new Date('1995-08-22'),
    bloodType: BloodType.A_POSITIVE,
    allergies: [],
    currentMedications: [],
  });

  await UserModel.create({
    email: 'admin@docx.com',
    password: hashedPassword,
    name: 'Admin User',
    role: UserRole.ADMIN,
    gender: Gender.OTHER,
    phone: '+1 (555) 300-0001',
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  await AppointmentModel.create({
    doctorId: doctor.id,
    patientId: patient1.id,
    date: tomorrow,
    startTime: tomorrow,
    endTime: new Date(tomorrow.getTime() + 30 * 60000),
    duration: 30,
    type: 'General Checkup',
    status: AppointmentStatus.SCHEDULED,
    room: 'Room 201',
  });

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(14, 0, 0, 0);

  await AppointmentModel.create({
    doctorId: doctor.id,
    patientId: patient2.id,
    date: nextWeek,
    startTime: nextWeek,
    endTime: new Date(nextWeek.getTime() + 45 * 60000),
    duration: 45,
    type: 'Follow-up Visit',
    status: AppointmentStatus.SCHEDULED,
    room: 'Room 203',
  });

  await MedicalRecordModel.create({
    patientId: patient1.id,
    title: 'Blood Test Results',
    type: 'Lab',
    description: 'Complete blood count - all values within normal range',
    recordDate: new Date('2024-11-01'),
  });

  await MedicalNoteModel.create({
    patientId: patient1.id,
    doctorId: doctor.id,
    note: 'Patient shows good overall health. Blood pressure slightly elevated. Recommended lifestyle modifications.',
    diagnosis: 'Mild Hypertension',
  });

  await VitalsModel.create({
    patientId: patient1.id,
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 98.6,
    weight: 70,
    height: 175,
    spo2: 98,
    recordedById: doctorUser.id,
  });

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  await VitalsModel.create({
    patientId: patient1.id,
    heartRate: 78,
    bloodPressure: '125/82',
    temperature: 99.1,
    weight: 70.5,
    height: 175,
    spo2: 97,
    recordedById: doctorUser.id,
    recordedAt: weekAgo,
  });

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 3);
  pastDate.setHours(11, 0, 0, 0);

  const pastAppointment = await AppointmentModel.create({
    doctorId: doctor.id,
    patientId: patient1.id,
    date: pastDate,
    startTime: pastDate,
    endTime: new Date(pastDate.getTime() + 30 * 60000),
    duration: 30,
    type: 'General Checkup',
    status: AppointmentStatus.COMPLETED,
    room: 'Room 201',
  });

  const consultation = await ConsultationModel.create({
    appointmentId: pastAppointment.id,
    symptoms: [
      { name: 'Headache', duration: '2 days', severity: 'moderate' },
      { name: 'Fatigue', duration: '1 week', severity: 'mild' },
    ],
    diagnosis: 'Tension Headache with mild dehydration',
    notes: 'Patient reports stress at work. Advised rest and hydration.',
    icdCode: 'G44.2',
  });

  await PrescriptionModel.create({
    consultationId: consultation.id,
    medicines: [
      {
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '5 days',
        instructions: 'Take after food',
      },
      {
        name: 'ORS Packets',
        dosage: '1 packet',
        frequency: 'Three times daily',
        duration: '3 days',
        instructions: 'Dissolve in 200ml water',
      },
    ],
    advice: 'Drink plenty of water. Avoid screen time before bed. Follow up if symptoms persist.',
    followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const today = new Date();
  today.setHours(9, 0, 0, 0);

  await AppointmentModel.create({
    doctorId: doctor.id,
    patientId: patient1.id,
    date: today,
    startTime: new Date(today.getTime() + 2 * 60 * 60000),
    endTime: new Date(today.getTime() + 2.5 * 60 * 60000),
    duration: 30,
    type: 'Follow-up',
    status: AppointmentStatus.SCHEDULED,
    room: 'Room 201',
  });

  await AppointmentModel.create({
    doctorId: doctor.id,
    patientId: patient2.id,
    date: today,
    startTime: new Date(today.getTime() + 4 * 60 * 60000),
    endTime: new Date(today.getTime() + 4.5 * 60 * 60000),
    duration: 30,
    type: 'New Patient',
    status: AppointmentStatus.CONFIRMED,
    room: 'Room 202',
  });
};

seed()
  .then(async () => {
    await disconnectMongo();
  })
  .catch(async (error) => {
    console.error('❌ Seeding failed:', error);
    await disconnectMongo();
    process.exit(1);
  });
