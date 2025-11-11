// RescheduleModal component types
export interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: string, newTime: string) => void;
  currentDate?: string;
  currentTime?: string;
}
