import React, { memo } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface FormFieldItem {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'password';
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface FormFieldListProps {
  fields: FormFieldItem[];
  values?: Record<string, string | number>;
  onChange?: (name: string, value: string) => void;
  styles: CSSModuleClasses;
}

/**
 * FormFieldList - Renders multiple form fields in a grid
 * 
 * Usage:
 * <FormFieldList 
 *   fields={[
 *     { name: 'firstName', label: STRING_CONSTANTS.SETTINGS_LABELS.FIRST_NAME, defaultValue: 'John' },
 *     { name: 'lastName', label: STRING_CONSTANTS.SETTINGS_LABELS.LAST_NAME, defaultValue: 'Smith' },
 *   ]}
 *   styles={styles}
 * />
 * 
 * With controlled values:
 * <FormFieldList 
 *   fields={[...]}
 *   values={formData}
 *   onChange={(name, value) => setFormData({...formData, [name]: value})}
 *   styles={styles}
 * />
 */
export const FormFieldList: React.FC<FormFieldListProps> = memo(({ 
  fields, 
  values, 
  onChange, 
  styles 
}) => (
  <div className={styles.formGrid}>
    {fields.map((field) => (
      <div key={field.name} className={styles.formGroup}>
        <label>{field.label}</label>
        <input
          type={field.type || 'text'}
          name={field.name}
          placeholder={field.placeholder}
          defaultValue={values ? undefined : field.defaultValue}
          value={values ? values[field.name] || '' : undefined}
          onChange={onChange ? (e) => onChange(field.name, e.target.value) : undefined}
          required={field.required}
          minLength={field.minLength}
          maxLength={field.maxLength}
          pattern={field.pattern}
        />
      </div>
    ))}
  </div>
));

FormFieldList.displayName = 'FormFieldList';

interface SelectFieldItem {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

interface SelectFieldListProps {
  fields: SelectFieldItem[];
  values?: Record<string, string>;
  onChange?: (name: string, value: string) => void;
  styles: CSSModuleClasses;
}

/**
 * SelectFieldList - Renders multiple select fields
 * 
 * Usage:
 * <SelectFieldList 
 *   fields={[
 *     { name: 'gender', options: genderOptions },
 *     { name: 'bloodType', options: bloodTypeOptions },
 *   ]}
 *   values={formData}
 *   onChange={handleChange}
 *   styles={styles}
 * />
 */
export const SelectFieldList: React.FC<SelectFieldListProps> = memo(({ 
  fields, 
  values, 
  onChange, 
  styles 
}) => (
  <>
    {fields.map((field) => (
      <div key={field.name} className={styles.formGroup}>
        {field.label && <label>{field.label}</label>}
        <select
          name={field.name}
          value={values ? values[field.name] || '' : field.defaultValue}
          onChange={onChange ? (e) => onChange(field.name, e.target.value) : undefined}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    ))}
  </>
));

SelectFieldList.displayName = 'SelectFieldList';
