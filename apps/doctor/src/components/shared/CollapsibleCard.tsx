import React, { memo } from 'react';
import { CollapsibleCardProps } from '../../types/Shared.types';

/**
 * CollapsibleCard - Card with collapsible content
 * 
 * Usage:
 * <CollapsibleCard 
 *   icon="medication"
 *   title={STRING_CONSTANTS.PATIENT_LABELS.CURRENT_MEDICATIONS}
 *   isCollapsed={collapsedSections.medications}
 *   onToggle={() => toggleSection('medications')}
 *   styles={styles}
 * >
 *   {children content}
 * </CollapsibleCard>
 */
export const CollapsibleCard: React.FC<CollapsibleCardProps> = memo(({ 
  icon, 
  title, 
  isCollapsed, 
  onToggle, 
  children, 
  styles 
}) => {
  const iconClassName = [styles.materialIcon, styles.historyIcon].filter(Boolean).join(' ');
  const expandIcon = isCollapsed ? 'expand_more' : 'expand_less';
  
  return (
    <div className={styles.collapsibleCard || styles.card}>
      <button 
        className={styles.cardHeaderButton}
        onClick={onToggle}
        type="button"
      >
        <div className={styles.cardHeaderLeft}>
          <span className={iconClassName}>{icon}</span>
          <h2 className={styles.cardTitle}>{title}</h2>
        </div>
        <span className={styles.materialIcon}>{expandIcon}</span>
      </button>
      {!isCollapsed && (
        <div className={styles.cardContent}>
          {children}
        </div>
      )}
    </div>
  );
});

CollapsibleCard.displayName = 'CollapsibleCard';
