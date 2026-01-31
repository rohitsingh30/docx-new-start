import React, { memo } from 'react';
import { StatCardProps, HistoryCardProps } from '../../types/Shared.types';

/**
 * StatCard - Card with icon header and list of items
 * 
 * Usage:
 * <StatCard 
 *   icon="warning"
 *   title={STRING_CONSTANTS.HISTORY_LABELS.KNOWN_ALLERGIES}
 *   items={['Penicillin (Rash)', 'Pollen (Seasonal)']}
 *   styles={styles}
 * />
 */
export const StatCard: React.FC<StatCardProps> = memo(({ 
  icon, 
  title, 
  items, 
  styles 
}) => {
  const iconClassName = [styles.materialIcon, styles.statCardIcon].filter(Boolean).join(' ');
  
  return (
    <div className={styles.card}>
      <div className={styles.statCard}>
        <div className={styles.statCardHeader}>
          <span className={iconClassName}>{icon}</span>
          <h3 className={styles.statCardTitle}>{title}</h3>
        </div>
      </div>
      <div className={styles.statCardContent}>
        {items.map((item, index) => (
          <div key={index} className={styles.statCardItem}>{item}</div>
        ))}
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

/**
 * HistoryCard - Card for displaying history items (allergies, conditions, etc.)
 * 
 * Usage:
 * <HistoryCard 
 *   icon="warning"
 *   title={STRING_CONSTANTS.HISTORY_LABELS.KNOWN_ALLERGIES}
 *   items={patient.allergies}
 *   emptyMessage={STRING_CONSTANTS.PATIENT_LABELS.NO_KNOWN_ALLERGIES}
 *   styles={styles}
 * />
 */
export const HistoryCard: React.FC<HistoryCardProps> = memo(({ 
  icon, 
  title, 
  items, 
  styles,
  emptyMessage = 'No items' 
}) => {
  return (
    <div className={styles.historyCard}>
      <div className={styles.historyCardHeader}>
        <span className={styles.materialSymbolsIcon}>{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className={styles.historyCardContent}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className={styles.historyItem}>{item}</div>
          ))
        ) : (
          <div className={styles.historyItem}>{emptyMessage}</div>
        )}
      </div>
    </div>
  );
});

HistoryCard.displayName = 'HistoryCard';
