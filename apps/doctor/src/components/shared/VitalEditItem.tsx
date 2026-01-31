import React, { memo } from 'react';
import { VitalEditItemProps } from '../../types/Shared.types';

/**
 * VitalEditItem - Editable vital sign input
 * 
 * Usage:
 * <VitalEditItem 
 *   icon="favorite"
 *   label={STRING_CONSTANTS.LABELS.HEART_RATE}
 *   value={vitalsData.heartRate}
 *   placeholder={STRING_CONSTANTS.PLACEHOLDERS.HEART_RATE}
 *   onChange={(value) => handleVitalChange('heartRate', value)}
 *   styles={styles}
 * />
 */
export const VitalEditItem: React.FC<VitalEditItemProps> = memo(({ 
  icon, 
  label, 
  value, 
  placeholder, 
  onChange, 
  styles 
}) => {
  const iconClassName = [styles.materialIcon, styles.vitalEditIcon].filter(Boolean).join(' ');
  
  return (
    <div className={styles.vitalEditItem}>
      <label className={styles.vitalEditLabel}>
        <span className={iconClassName}>{icon}</span>
        {label}
      </label>
      <input
        type="text"
        className={styles.vitalEditInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
});

VitalEditItem.displayName = 'VitalEditItem';
