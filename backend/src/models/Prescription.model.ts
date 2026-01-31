import mongoose, { Document, Model, Schema } from 'mongoose';
import crypto from 'crypto';

export interface PrescriptionDocument extends Document {
  id: string;
  consultationId: string;
  medicines: unknown;
  advice?: string | null;
  followUpDate?: Date | null;
  pdfUrl?: string | null;
  createdAt: Date;
}

const PrescriptionSchema = new Schema<PrescriptionDocument>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      index: true,
      unique: true,
    },
    consultationId: { type: String, required: true, unique: true, index: true },
    medicines: { type: Schema.Types.Mixed, required: true },
    advice: { type: String, default: null },
    followUpDate: { type: Date, default: null },
    pdfUrl: { type: String, default: null },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'prescriptions',
  }
);

export const PrescriptionModel: Model<PrescriptionDocument> =
  mongoose.models.Prescription ||
  mongoose.model<PrescriptionDocument>('Prescription', PrescriptionSchema);
