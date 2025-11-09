import React, { useState } from 'react';
import Modal from './Modal';
import styles from '../styles/modals/NotesModal.module.css';
import { STRING_CONSTANTS } from '../constants/stringConstants';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (notes: string) => void;
  currentNotes?: string;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, onSave, currentNotes }) => {
  const [notes, setNotes] = useState(currentNotes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(notes);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={STRING_CONSTANTS.BUTTONS.ADD_NOTES}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            {STRING_CONSTANTS.LABELS.APPOINTMENT_NOTES}
          </label>
          <textarea
            className={styles.textarea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={STRING_CONSTANTS.PLACEHOLDERS.ADD_APPOINTMENT_NOTES}
            rows={10}
            required
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            {STRING_CONSTANTS.BUTTONS.CANCEL}
          </button>
          <button type="submit" className={styles.saveButton}>
            {STRING_CONSTANTS.BUTTONS.SAVE}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NotesModal;
