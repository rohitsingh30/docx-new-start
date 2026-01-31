import React, { memo } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface MedicationFormData {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
}

interface MedicationFormFieldConfig {
  field: keyof Omit<MedicationFormData, 'id'>;
  label: string;
  placeholder: string;
  required?: boolean;
}

interface MedicationFormProps {
  medication: MedicationFormData;
  onFieldChange: (field: keyof MedicationFormData, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  title?: string;
  fieldConfigs: MedicationFormFieldConfig[];
  styles: CSSModuleClasses;
}

/**
 * MedicationForm - Form for adding/editing medications
 */
export const MedicationForm: React.FC<MedicationFormProps> = memo(({ 
  medication, 
  onFieldChange, 
  onSave, 
  onCancel, 
  title = 'Add Medication',
  fieldConfigs,
  styles 
}) => (
  <div className={styles.medForm}>
    <div className={styles.medFormHeader}>
      <h3 className={styles.medFormTitle}>{title}</h3>
    </div>
    <div className={styles.medFormGrid}>
      {fieldConfigs.map(config => (
        <div key={config.field} className={styles.medFormField}>
          <label className={styles.medFormLabel}>
            {config.label}{config.required && ' *'}
          </label>
          <input
            type="text"
            className={styles.input}
            value={medication[config.field]}
            onChange={(e) => onFieldChange(config.field, e.target.value)}
            placeholder={config.placeholder}
          />
        </div>
      ))}
    </div>
    <div className={styles.medFormActions}>
      <button className={styles.medFormCancel} onClick={onCancel}>
        Cancel
      </button>
      <button className={styles.medFormSave} onClick={onSave}>
        Save Medication
      </button>
    </div>
  </div>
));

MedicationForm.displayName = 'MedicationForm';

interface PrescriptionItemProps {
  name: string;
  details: string;
  onEdit?: () => void;
  onRemove?: () => void;
  styles: CSSModuleClasses;
}

/**
 * PrescriptionItem - Single prescription/medication item with actions
 */
export const PrescriptionItem: React.FC<PrescriptionItemProps> = memo(({ 
  name, 
  details, 
  onEdit, 
  onRemove, 
  styles 
}) => (
  <div className={styles.medItem}>
    <div className={styles.medItemContent} onClick={onEdit}>
      <div className={styles.medItemName}>{name}</div>
      <div className={styles.medItemDetails}>{details}</div>
    </div>
    {onEdit && (
      <button className={styles.medItemEdit} onClick={onEdit}>
        <span className={styles.materialIcon}>edit</span>
      </button>
    )}
    {onRemove && (
      <button className={styles.medItemRemove} onClick={onRemove}>
        <span className={styles.materialIcon}>delete</span>
      </button>
    )}
  </div>
));

PrescriptionItem.displayName = 'PrescriptionItem';

interface PrescriptionListProps {
  items: Array<{ id: string; name: string; details: string }>;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  styles: CSSModuleClasses;
}

/**
 * PrescriptionList - List of prescription items
 */
export const PrescriptionList: React.FC<PrescriptionListProps> = memo(({ 
  items, 
  onEdit, 
  onRemove, 
  styles 
}) => (
  <div className={styles.prescriptionList}>
    {items.map(item => (
      <PrescriptionItem
        key={item.id}
        name={item.name}
        details={item.details}
        onEdit={onEdit ? () => onEdit(item.id) : undefined}
        onRemove={onRemove ? () => onRemove(item.id) : undefined}
        styles={styles}
      />
    ))}
  </div>
));

PrescriptionList.displayName = 'PrescriptionList';

interface LabTestListProps {
  tests: Array<{ id: string; name: string; details: string }>;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  styles: CSSModuleClasses;
}

/**
 * LabTestList - List of lab tests
 */
export const LabTestList: React.FC<LabTestListProps> = memo(({ 
  tests, 
  onEdit, 
  onRemove, 
  styles 
}) => (
  <div className={styles.prescriptionList}>
    {tests.map(test => (
      <PrescriptionItem
        key={test.id}
        name={test.name}
        details={test.details}
        onEdit={onEdit ? () => onEdit(test.id) : undefined}
        onRemove={onRemove ? () => onRemove(test.id) : undefined}
        styles={styles}
      />
    ))}
  </div>
));

LabTestList.displayName = 'LabTestList';
