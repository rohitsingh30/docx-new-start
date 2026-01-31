// Types for consultation/appointment session

export interface ConsultationProps {
  appointmentId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  appointmentType: string;
  onComplete: (report: ConsultationReport) => void;
  onCancel: () => void;
}

export interface ConsultationReport {
  vitals: VitalsData;
  chiefComplaint: string;
  symptoms: string[];
  diagnosis: string;
  medications: Medication[];
  labTests: string[];
  followUpDate: string;
  notes: string;
}

export interface VitalsData {
  heartRate: string;
  bloodPressure: string;
  temperature: string;
  weight: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  [key: string]: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
}
