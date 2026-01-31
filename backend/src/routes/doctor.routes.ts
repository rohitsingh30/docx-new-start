import express from 'express';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../types/enums';
import {
  getDashboardStats,
  getMyAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  updateAppointmentStatus,
  getMyPatients,
  getPatientDetails,
  createPatient,
  updatePatient,
  addMedicalNote,
  getPatientVitals,
  addPatientVitals,
  getPatientConsultations,
  saveConsultation,
} from '../controllers/doctor.mongo.controller';

const router = express.Router();

// All routes require authentication + DOCTOR role
router.use(authenticate);
router.use(authorize(UserRole.DOCTOR));

// Dashboard
router.get('/stats', getDashboardStats);

// Appointments
router.get('/appointments', getMyAppointments);
router.get('/appointments/:appointmentId', getAppointmentById);
router.post('/appointments', createAppointment);
router.patch('/appointments/:appointmentId', updateAppointment);
router.patch('/appointments/:appointmentId/status', updateAppointmentStatus);
router.delete('/appointments/:appointmentId', cancelAppointment);

// Patients
router.get('/patients', getMyPatients);
router.get('/patients/:patientId', getPatientDetails);
router.post('/patients', createPatient);
router.patch('/patients/:patientId', updatePatient);

// Patient sub-resources
router.get('/patients/:patientId/vitals', getPatientVitals);
router.post('/patients/:patientId/vitals', addPatientVitals);
router.get('/patients/:patientId/consultations', getPatientConsultations);
router.post('/patients/:patientId/notes', addMedicalNote);

// Consultations
router.post('/consultations', saveConsultation);

export default router;
