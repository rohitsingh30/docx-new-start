// VitalsModal component types
export interface VitalsData {
  heartRate: string;
  bloodPressure: string;
  temperature: string;
  weight: string;
}

export interface VitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vitals: VitalsData) => void;
  currentVitals?: VitalsData;
}
