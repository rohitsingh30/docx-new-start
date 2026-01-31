export interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  detail?: string;
}

export interface ActionModalState {
  title: string;
  message: string;
  detail?: string;
}
