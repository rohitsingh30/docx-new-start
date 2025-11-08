import React from 'react';
import styles from '../styles/PatientForm.module.css';
import { PatientFormProps } from '../types/Patient.types';
import { DATA_CONSTANTS } from '../constants/dataConstants';
import { FORM_CONSTANTS } from '../constants/formConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';

const PatientForm: React.FC<PatientFormProps> = ({ 
  patientData, 
  onSubmit, 
  onCancel, 
  onDataChange 
}) => {
  return (
    <form className={styles.addForm} onSubmit={onSubmit}>
      <h3>Add New Patient</h3>
      <div className={styles.formGrid}>
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.FIRST_NAME}
          value={patientData.firstName}
          onChange={(e) => onDataChange('firstName', e.target.value)}
          required
          minLength={FORM_CONSTANTS.VALIDATION.MIN_NAME_LENGTH}
          maxLength={FORM_CONSTANTS.VALIDATION.MAX_NAME_LENGTH}
        />
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.LAST_NAME}
          value={patientData.lastName}
          onChange={(e) => onDataChange('lastName', e.target.value)}
          required
          minLength={FORM_CONSTANTS.VALIDATION.MIN_NAME_LENGTH}
          maxLength={FORM_CONSTANTS.VALIDATION.MAX_NAME_LENGTH}
        />
        <input
          type="date"
          placeholder={STRING_CONSTANTS.PLACEHOLDERS.DATE_OF_BIRTH}
          value={patientData.dateOfBirth}
          onChange={(e) => onDataChange('dateOfBirth', e.target.value)}
          required
        />
        <select
          value={patientData.gender}
          onChange={(e) => onDataChange('gender', e.target.value)}
          required
        >
          {DATA_CONSTANTS.GENDER_OPTIONS.map((gender) => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
        <input
          type="tel"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.PHONE}
          value={patientData.phoneNumber}
          onChange={(e) => onDataChange('phoneNumber', e.target.value)}
          required
        />
        <input
          type="email"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.EMAIL}
          value={patientData.email}
          onChange={(e) => onDataChange('email', e.target.value)}
          required
        />
        <select
          value={patientData.bloodType}
          onChange={(e) => onDataChange('bloodType', e.target.value)}
          required
        >
          <option value="">Select Blood Type</option>
          {DATA_CONSTANTS.BLOOD_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.ALLERGIES}
          value={patientData.allergies}
          onChange={(e) => onDataChange('allergies', e.target.value)}
        />
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.MEDICATIONS}
          value={patientData.medications}
          onChange={(e) => onDataChange('medications', e.target.value)}
        />
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.EMERGENCY_CONTACT_NAME}
          value={patientData.emergencyContactName}
          onChange={(e) => onDataChange('emergencyContactName', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.EMERGENCY_CONTACT_RELATIONSHIP}
          value={patientData.emergencyContactRelationship}
          onChange={(e) => onDataChange('emergencyContactRelationship', e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.EMERGENCY_CONTACT_PHONE}
          value={patientData.emergencyContactPhone}
          onChange={(e) => onDataChange('emergencyContactPhone', e.target.value)}
          required
          pattern={FORM_CONSTANTS.VALIDATION.PHONE_PATTERN}
        />
      </div>
      <textarea
        placeholder={FORM_CONSTANTS.PLACEHOLDERS.ADDRESS}
        value={patientData.address}
        onChange={(e) => onDataChange('address', e.target.value)}
        required
        rows={3}
      />
      <div className={styles.formActions}>
        <button type="submit">{STRING_CONSTANTS.BUTTONS.ADD_PATIENT}</button>
        <button type="button" onClick={onCancel}>{STRING_CONSTANTS.BUTTONS.CANCEL}</button>
      </div>
    </form>
  );
};

export default PatientForm;
