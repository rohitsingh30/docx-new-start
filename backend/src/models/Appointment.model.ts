import mongoose, { Document, Model, Schema } from 'mongoose';
import crypto from 'crypto';
import { AppointmentStatus } from '../types/enums';

export interface AppointmentDocument extends Document {
  id: string;
  doctorId: string;
  patientId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  type: string;
  status: AppointmentStatus;
  room?: string | null;
  notes?: string | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<AppointmentDocument>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      index: true,
      unique: true,
    },
    doctorId: { type: String, required: true, index: true },
    patientId: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    type: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.SCHEDULED,
    },
    room: { type: String, default: null },
    notes: { type: String, default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: 'appointments',
  }
);

AppointmentSchema.index({ doctorId: 1, date: 1 });
AppointmentSchema.index({ patientId: 1, date: 1 });

export const AppointmentModel: Model<AppointmentDocument> =
  mongoose.models.Appointment ||
  mongoose.model<AppointmentDocument>('Appointment', AppointmentSchema);
