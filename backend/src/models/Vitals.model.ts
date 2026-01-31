import mongoose, { Document, Model, Schema } from 'mongoose';
import crypto from 'crypto';

export interface VitalsDocument extends Document {
  id: string;
  patientId: string;
  heartRate?: number | null;
  bloodPressure?: string | null;
  temperature?: number | null;
  weight?: number | null;
  height?: number | null;
  spo2?: number | null;
  recordedById: string;
  recordedAt: Date;
}

const VitalsSchema = new Schema<VitalsDocument>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      index: true,
      unique: true,
    },
    patientId: { type: String, required: true, index: true },
    heartRate: { type: Number, default: null },
    bloodPressure: { type: String, default: null },
    temperature: { type: Number, default: null },
    weight: { type: Number, default: null },
    height: { type: Number, default: null },
    spo2: { type: Number, default: null },
    recordedById: { type: String, required: true, index: true },
    recordedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
    collection: 'vitals',
  }
);

export const VitalsModel: Model<VitalsDocument> =
  mongoose.models.Vitals || mongoose.model<VitalsDocument>('Vitals', VitalsSchema);
