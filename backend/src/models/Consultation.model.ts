import mongoose, { Document, Model, Schema } from 'mongoose';
import crypto from 'crypto';

export interface ConsultationDocument extends Document {
  id: string;
  appointmentId: string;
  symptoms: unknown;
  diagnosis: string;
  notes?: string | null;
  icdCode?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<ConsultationDocument>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      index: true,
      unique: true,
    },
    appointmentId: { type: String, required: true, unique: true, index: true },
    symptoms: { type: Schema.Types.Mixed, required: true },
    diagnosis: { type: String, required: true },
    notes: { type: String, default: null },
    icdCode: { type: String, default: null },
  },
  {
    timestamps: true,
    collection: 'consultations',
  }
);

export const ConsultationModel: Model<ConsultationDocument> =
  mongoose.models.Consultation ||
  mongoose.model<ConsultationDocument>('Consultation', ConsultationSchema);
