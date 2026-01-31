import mongoose, { Document, Model, Schema } from 'mongoose';
import crypto from 'crypto';

export interface MedicalRecordDocument extends Document {
  id: string;
  patientId: string;
  title: string;
  type: string;
  description?: string | null;
  fileUrl?: string | null;
  recordDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MedicalRecordSchema = new Schema<MedicalRecordDocument>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      index: true,
      unique: true,
    },
    patientId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, default: null },
    fileUrl: { type: String, default: null },
    recordDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    collection: 'medical_records',
  }
);

export const MedicalRecordModel: Model<MedicalRecordDocument> =
  mongoose.models.MedicalRecord ||
  mongoose.model<MedicalRecordDocument>('MedicalRecord', MedicalRecordSchema);
