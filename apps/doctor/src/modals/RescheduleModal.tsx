import React, { useState } from 'react';
import Modal from './Modal';
import styles from '../styles/modals/RescheduleModal.module.css';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { RescheduleModalProps } from '../types/RescheduleModal.types';

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
            <span className={styles.materialIcon}>calendar_today</span>
            {STRING_CONSTANTS.MODAL_LABELS.NEW_DATE}
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
            <span className={styles.materialIcon}>schedule</span>
            {STRING_CONSTANTS.MODAL_LABELS.NEW_TIME}
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
            {STRING_CONSTANTS.MODAL_LABELS.CONFIRM_RESCHEDULE}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RescheduleModal;
