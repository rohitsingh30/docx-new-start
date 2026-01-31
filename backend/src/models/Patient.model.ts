import mongoose, { Document, Model, Schema } from 'mongoose';
import crypto from 'crypto';
import { BloodType } from '../types/enums';

export interface PatientDocument extends Document {
  id: string;
  userId: string;
  createdByDoctorId?: string | null;
  dateOfBirth: Date;
  bloodType?: BloodType | null;
  allergies: string[];
  currentMedications: string[];
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema<PatientDocument>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      index: true,
      unique: true,
    },
    userId: { type: String, required: true, unique: true, index: true },
    createdByDoctorId: { type: String, default: null, index: true },
    dateOfBirth: { type: Date, required: true },
    bloodType: {
      type: String,
      enum: Object.values(BloodType),
      default: null,
    },
    allergies: { type: [String], default: [] },
    currentMedications: { type: [String], default: [] },
    emergencyContactName: { type: String, default: null },
    emergencyContactPhone: { type: String, default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: 'patients',
  }
);

export const PatientModel: Model<PatientDocument> =
  mongoose.models.Patient || mongoose.model<PatientDocument>('Patient', PatientSchema);
