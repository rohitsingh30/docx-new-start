import React, { memo } from 'react';
import { InfoRowProps, DetailRowProps } from '../../types/Shared.types';

/**
 * InfoRow - Display a label/value pair with optional icon
 * 
 * Usage:
 * <InfoRow 
 *   icon="badge"
 *   label={STRING_CONSTANTS.PATIENT_LABELS.FULL_NAME}
 *   value={patient.name}
 *   styles={styles}
 * />
 */
export const InfoRow: React.FC<InfoRowProps> = memo(({ 
  label, 
  value, 
  icon, 
  styles 
}) => {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoLabel}>
        {icon && <span className={styles.materialSymbolsIcon}>{icon}</span>}
        {label}
      </span>
      <span className={styles.infoValue}>{value}</span>
    </div>
  );
});

InfoRow.displayName = 'InfoRow';

/**
 * DetailRow - Simple label/value pair without icon
 * 
 * Usage:
 * <DetailRow 
 *   label={STRING_CONSTANTS.LABELS.PATIENT_NAME}
 *   value={patient.name}
 *   styles={styles}
 * />
 */
export const DetailRow: React.FC<DetailRowProps> = memo(({ 
  label, 
  value, 
  styles 
}) => {
  return (
    <div className={styles.detailRow}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue}>{value}</span>
    </div>
  );
});

DetailRow.displayName = 'DetailRow';
