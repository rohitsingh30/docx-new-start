import React, { memo } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface DetailItem {
  label: string;
  value: string | React.ReactNode;
}

interface DetailsListProps {
  items: DetailItem[];
  styles: CSSModuleClasses;
}

/**
 * DetailsList - Renders multiple label/value pairs
 * 
 * Usage:
 * <DetailsList 
 *   items={[
 *     { label: STRING_CONSTANTS.LABELS.DATE, value: appointment.date },
 *     { label: STRING_CONSTANTS.LABELS.TIME, value: appointment.time },
 *   ]}
 *   styles={styles}
 * />
 */
export const DetailsList: React.FC<DetailsListProps> = memo(({ items, styles }) => (
  <>
    {items.map((item, index) => (
      <div key={index} className={styles.detailRow}>
        <span className={styles.detailLabel}>{item.label}</span>
        <span className={styles.detailValue}>{item.value}</span>
      </div>
    ))}
  </>
));

DetailsList.displayName = 'DetailsList';

interface InfoItem {
  icon?: string;
  label: string;
  value: string | React.ReactNode;
  valueClassName?: string;
}

interface InfoListProps {
  items: InfoItem[];
  styles: CSSModuleClasses;
}

/**
 * InfoList - Renders multiple info rows with optional icons
 * 
 * Usage:
 * <InfoList 
 *   items={[
 *     { icon: 'badge', label: STRING_CONSTANTS.PATIENT_LABELS.FULL_NAME, value: patient.name },
 *     { icon: 'cake', label: STRING_CONSTANTS.PATIENT_LABELS.DATE_OF_BIRTH, value: patient.dob },
 *   ]}
 *   styles={styles}
 * />
 */
export const InfoList: React.FC<InfoListProps> = memo(({ items, styles }) => (
  <>
    {items.map((item, index) => (
      <div key={index} className={styles.infoRow}>
        <span className={styles.infoLabel}>
          {item.icon && <span className={styles.materialSymbolsIcon}>{item.icon}</span>}
          {item.label}
        </span>
        <span className={item.valueClassName ? `${styles.infoValue} ${item.valueClassName}` : styles.infoValue}>
          {item.value}
        </span>
      </div>
    ))}
  </>
));

InfoList.displayName = 'InfoList';
