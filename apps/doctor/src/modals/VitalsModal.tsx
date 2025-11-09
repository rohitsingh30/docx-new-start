import React, { useState } from 'react';
import Modal from './Modal';
import styles from '../styles/modals/VitalsModal.module.css';
import { STRING_CONSTANTS } from '../constants/stringConstants';

interface VitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vitals: VitalsData) => void;
  currentVitals?: VitalsData;
}

export interface VitalsData {
  heartRate: string;
  bloodPressure: string;
  temperature: string;
  weight: string;
}

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
            <span className="material-symbols-outlined">favorite</span>
            {STRING_CONSTANTS.LABELS.HEART_RATE}
          </label>
          <input
            type="text"
            className={styles.input}
            value={vitals.heartRate}
            onChange={(e) => handleChange('heartRate', e.target.value)}
            placeholder="e.g., 72 bpm"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className="material-symbols-outlined">monitor_heart</span>
            {STRING_CONSTANTS.LABELS.BLOOD_PRESSURE}
          </label>
          <input
            type="text"
            className={styles.input}
            value={vitals.bloodPressure}
            onChange={(e) => handleChange('bloodPressure', e.target.value)}
            placeholder="e.g., 120/80 mmHg"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className="material-symbols-outlined">thermostat</span>
            {STRING_CONSTANTS.LABELS.TEMPERATURE}
          </label>
          <input
            type="text"
            className={styles.input}
            value={vitals.temperature}
            onChange={(e) => handleChange('temperature', e.target.value)}
            placeholder="e.g., 98.6°F"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className="material-symbols-outlined">scale</span>
            {STRING_CONSTANTS.LABELS.WEIGHT}
          </label>
          <input
            type="text"
            className={styles.input}
            value={vitals.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder="e.g., 150 lbs"
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
