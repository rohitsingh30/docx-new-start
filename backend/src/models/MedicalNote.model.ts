import mongoose, { Document, Model, Schema } from 'mongoose';
import crypto from 'crypto';

export interface MedicalNoteDocument extends Document {
  id: string;
  patientId: string;
  doctorId: string;
  note: string;
  diagnosis?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const MedicalNoteSchema = new Schema<MedicalNoteDocument>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      index: true,
      unique: true,
    },
    patientId: { type: String, required: true, index: true },
    doctorId: { type: String, required: true, index: true },
    note: { type: String, required: true },
    diagnosis: { type: String, default: null },
  },
  {
    timestamps: true,
    collection: 'medical_notes',
  }
);

export const MedicalNoteModel: Model<MedicalNoteDocument> =
  mongoose.models.MedicalNote ||
  mongoose.model<MedicalNoteDocument>('MedicalNote', MedicalNoteSchema);
