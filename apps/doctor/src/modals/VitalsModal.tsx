import React, { useState } from 'react';
import Modal from './Modal';
import styles from '../styles/modals/VitalsModal.module.css';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { VitalsModalProps, VitalsData } from '../types/VitalsModal.types';

const VitalsModal: React.FC<VitalsModalProps> = ({ isOpen, onClose, onSave, currentVitals }) => {
  const [vitals, setVitals] = useState<VitalsData>(
    currentVitals || {
      heartRate: '',
      bloodPressure: '',
      temperature: '',
      weight: '',
    }
  );

  const handleChange = (field: keyof VitalsData, value: string) => {
    setVitals(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(vitals);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={STRING_CONSTANTS.BUTTONS.UPDATE_VITALS}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className={styles.materialIcon}>favorite</span>
            {STRING_CONSTANTS.LABELS.HEART_RATE}
          </label>
          <input
            type="text"
            className={styles.input}
            value={vitals.heartRate}
            onChange={(e) => handleChange('heartRate', e.target.value)}
            placeholder={STRING_CONSTANTS.PLACEHOLDERS.HEART_RATE}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className={styles.materialIcon}>monitor_heart</span>
            {STRING_CONSTANTS.LABELS.BLOOD_PRESSURE}
          </label>
          <input
            type="text"
            className={styles.input}
            value={vitals.bloodPressure}
            onChange={(e) => handleChange('bloodPressure', e.target.value)}
            placeholder={STRING_CONSTANTS.PLACEHOLDERS.BLOOD_PRESSURE}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className={styles.materialIcon}>thermostat</span>
            {STRING_CONSTANTS.LABELS.TEMPERATURE}
          </label>
          <input
            type="text"
            className={styles.input}
            value={vitals.temperature}
            onChange={(e) => handleChange('temperature', e.target.value)}
            placeholder={STRING_CONSTANTS.PLACEHOLDERS.TEMPERATURE}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className={styles.materialIcon}>scale</span>
            {STRING_CONSTANTS.LABELS.WEIGHT}
          </label>
          <input
            type="text"
            className={styles.input}
            value={vitals.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder={STRING_CONSTANTS.PLACEHOLDERS.WEIGHT}
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

export default VitalsModal;
