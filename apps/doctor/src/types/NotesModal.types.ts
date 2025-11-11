// NotesModal component types
export interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (notes: string) => void;
  currentNotes?: string;
}
