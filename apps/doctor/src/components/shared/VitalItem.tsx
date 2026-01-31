import React, { memo } from 'react';
import { VitalItemProps } from '../../types/Shared.types';

/**
 * VitalItem - Display a single vital sign with icon, label, and value
 * 
 * Usage:
 * <VitalItem 
 *   icon="favorite" 
 *   label={STRING_CONSTANTS.LABELS.HEART_RATE}
 *   value={vitalsData.heartRate}
 *   styles={styles}
 * />
 */
export const VitalItem: React.FC<VitalItemProps> = memo(({ 
  icon, 
  label, 
  value, 
  styles 
}) => {
  const iconClassName = [styles.materialIcon, styles.vitalCompactIcon].filter(Boolean).join(' ');
  
  return (
    <div className={styles.vitalCompactItem}>
      <span className={iconClassName}>{icon}</span>
      <div className={styles.vitalCompactInfo}>
        <span className={styles.vitalCompactLabel}>{label}</span>
        <span className={styles.vitalCompactValue}>{value}</span>
      </div>
    </div>
  );
});

VitalItem.displayName = 'VitalItem';
