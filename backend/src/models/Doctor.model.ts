import mongoose, { Document, Model, Schema } from 'mongoose';
import crypto from 'crypto';
import { DoctorStatus } from '../types/enums';

export interface DoctorDocument extends Document {
  id: string;
  userId: string;
  specialization: string;
  licenseNumber: string;
  status: DoctorStatus;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema = new Schema<DoctorDocument>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      index: true,
      unique: true,
    },
    userId: { type: String, required: true, unique: true, index: true },
    specialization: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: Object.values(DoctorStatus),
      default: DoctorStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    collection: 'doctors',
  }
);

export const DoctorModel: Model<DoctorDocument> =
  mongoose.models.Doctor || mongoose.model<DoctorDocument>('Doctor', DoctorSchema);
