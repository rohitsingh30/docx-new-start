import React, { memo } from 'react';
import { FormFieldProps } from '../../types/Shared.types';

/**
 * FormField - Reusable form field with label
 * 
 * Usage:
 * <FormField 
 *   label={STRING_CONSTANTS.SETTINGS_LABELS.FIRST_NAME}
 *   type="text"
 *   value={formData.firstName}
 *   onChange={(value) => handleChange('firstName', value)}
 *   styles={styles}
 * />
 */
export const FormField: React.FC<FormFieldProps> = memo(({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  styles 
}) => {
  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
});

FormField.displayName = 'FormField';
