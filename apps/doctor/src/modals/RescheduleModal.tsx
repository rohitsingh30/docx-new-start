import React, { useState } from 'react';
import Modal from './Modal';
import styles from '../styles/modals/RescheduleModal.module.css';
import { STRING_CONSTANTS } from '../constants/stringConstants';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: string, newTime: string) => void;
  currentDate?: string;
  currentTime?: string;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  currentDate, 
  currentTime 
}) => {
  const [date, setDate] = useState(currentDate || '');
  const [time, setTime] = useState(currentTime || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(date, time);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={STRING_CONSTANTS.BUTTONS.RESCHEDULE}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className="material-symbols-outlined">calendar_today</span>
            New Date
          </label>
          <input
            type="date"
            className={styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className="material-symbols-outlined">schedule</span>
            New Time
          </label>
          <input
            type="time"
            className={styles.input}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            {STRING_CONSTANTS.BUTTONS.CANCEL}
          </button>
          <button type="submit" className={styles.saveButton}>
            Confirm Reschedule
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RescheduleModal;
