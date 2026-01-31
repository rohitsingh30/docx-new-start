import express from 'express';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../types/enums';
import {
  getMyAppointments,
  getDoctors,
  bookAppointment,
  cancelAppointment,
  getMyMedicalRecords,
  getMyMedicalNotes,
} from '../controllers/patient.mongo.controller';

const router = express.Router();

// All routes require authentication + PATIENT role
router.use(authenticate);
router.use(authorize(UserRole.PATIENT));

// Patient endpoints
router.get('/appointments', getMyAppointments);
router.get('/doctors', getDoctors);
router.post('/appointments', bookAppointment);
router.delete('/appointments/:appointmentId', cancelAppointment);
router.get('/medical-records', getMyMedicalRecords);
router.get('/medical-notes', getMyMedicalNotes);

export default router;
