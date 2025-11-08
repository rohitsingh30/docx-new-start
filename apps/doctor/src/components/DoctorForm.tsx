import React from 'react';
import styles from '../styles/DoctorForm.module.css';
import { DoctorFormProps } from '../types/Doctor.types';
import { DATA_CONSTANTS } from '../constants/dataConstants';
import { FORM_CONSTANTS } from '../constants/formConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';

const DoctorForm: React.FC<DoctorFormProps> = ({ 
  doctorData, 
  onSubmit, 
  onCancel, 
  onDataChange 
}) => {
  return (
    <form className={styles.addForm} onSubmit={onSubmit}>
      <h3>Add New Doctor</h3>
      <div className={styles.formGrid}>
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.FIRST_NAME}
          value={doctorData.firstName}
          onChange={(e) => onDataChange('firstName', e.target.value)}
          required
          minLength={FORM_CONSTANTS.VALIDATION.MIN_NAME_LENGTH}
          maxLength={FORM_CONSTANTS.VALIDATION.MAX_NAME_LENGTH}
        />
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.LAST_NAME}
          value={doctorData.lastName}
          onChange={(e) => onDataChange('lastName', e.target.value)}
          required
          minLength={FORM_CONSTANTS.VALIDATION.MIN_NAME_LENGTH}
          maxLength={FORM_CONSTANTS.VALIDATION.MAX_NAME_LENGTH}
        />
        <select
          value={doctorData.specialization}
          onChange={(e) => onDataChange('specialization', e.target.value)}
          required
        >
          <option value="">Select Specialization</option>
          {DATA_CONSTANTS.SPECIALIZATIONS.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
        <select
          value={doctorData.department}
          onChange={(e) => onDataChange('department', e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {DATA_CONSTANTS.DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.LICENSE_NUMBER}
          value={doctorData.licenseNumber}
          onChange={(e) => onDataChange('licenseNumber', e.target.value)}
          required
          minLength={FORM_CONSTANTS.VALIDATION.MIN_LICENSE_LENGTH}
        />
        <input
          type="tel"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.PHONE}
          value={doctorData.phoneNumber}
          onChange={(e) => onDataChange('phoneNumber', e.target.value)}
          required
          pattern={FORM_CONSTANTS.VALIDATION.PHONE_PATTERN}
        />
        <input
          type="email"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.EMAIL}
          value={doctorData.email}
          onChange={(e) => onDataChange('email', e.target.value)}
          required
        />
        <input
          type="number"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.EXPERIENCE}
          value={doctorData.experience}
          onChange={(e) => onDataChange('experience', e.target.value)}
          required
          min={FORM_CONSTANTS.VALIDATION.MIN_EXPERIENCE}
          max={FORM_CONSTANTS.VALIDATION.MAX_EXPERIENCE}
        />
        <input
          type="number"
          placeholder={FORM_CONSTANTS.PLACEHOLDERS.CONSULTATION_FEE}
          value={doctorData.consultationFee}
          onChange={(e) => onDataChange('consultationFee', e.target.value)}
          required
          min={FORM_CONSTANTS.VALIDATION.MIN_CONSULTATION_FEE}
          max={FORM_CONSTANTS.VALIDATION.MAX_CONSULTATION_FEE}
        />
      </div>
      
      <div className={styles.formRow}>
        <div>
          <label htmlFor="startTime">Available Start Time</label>
          <input
            id="startTime"
            type="time"
            value={doctorData.availableStart}
            onChange={(e) => onDataChange('availableStart', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime">Available End Time</label>
          <input
            id="endTime"
            type="time"
            value={doctorData.availableEnd}
            onChange={(e) => onDataChange('availableEnd', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className={styles.checkboxGroup}>
        <input
          type="checkbox"
          checked={doctorData.isActive}
          onChange={(e) => onDataChange('isActive', e.target.checked)}
          id="activeStatus"
        />
        <label htmlFor="activeStatus">Active Status</label>
      </div>
      
      <textarea
        placeholder={STRING_CONSTANTS.PLACEHOLDERS.EDUCATION_ONE_PER_LINE}
        value={doctorData.education}
        onChange={(e) => onDataChange('education', e.target.value)}
        required
        rows={3}
      />
      <div className={styles.formActions}>
        <button type="submit">{STRING_CONSTANTS.BUTTONS.ADD_DOCTOR}</button>
        <button type="button" onClick={onCancel}>{STRING_CONSTANTS.BUTTONS.CANCEL}</button>
      </div>
    </form>
  );
};

export default DoctorForm;
