import React, { memo, ReactNode } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface CardProps {
  title: string;
  children: ReactNode;
  styles: CSSModuleClasses;
  headerActions?: ReactNode;
}

/**
 * Card - A card container with header and content
 */
export const Card: React.FC<CardProps> = memo(({ title, children, styles, headerActions }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>{title}</h2>
      {headerActions}
    </div>
    {children}
  </div>
));

Card.displayName = 'Card';

interface CardWithGridProps {
  title: string;
  items: Array<{ label: string; value: ReactNode; valueClassName?: string }>;
  styles: CSSModuleClasses;
  gridClassName?: string;
  children?: ReactNode;
}

/**
 * CardWithGrid - A card with a grid of detail rows
 */
export const CardWithGrid: React.FC<CardWithGridProps> = memo(({ 
  title, 
  items, 
  styles, 
  gridClassName,
  children 
}) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>{title}</h2>
    </div>
    <div className={gridClassName || styles.detailGrid || styles.appointmentGrid}>
      {items.map((item, index) => (
        <div key={index} className={styles.detailRow}>
          <span className={styles.detailLabel}>{item.label}</span>
          <span className={item.valueClassName || styles.detailValue}>{item.value}</span>
        </div>
      ))}
    </div>
    {children}
  </div>
));

CardWithGrid.displayName = 'CardWithGrid';

interface CollapsibleCardProps {
  icon: string;
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  children: ReactNode;
  styles: CSSModuleClasses;
}

/**
 * CollapsibleCardWithIcon - A card that can be collapsed/expanded with an icon
 */
export const CollapsibleCardWithIcon: React.FC<CollapsibleCardProps> = memo(({ 
  icon, 
  title, 
  isCollapsed, 
  onToggle, 
  children, 
  styles 
}) => (
  <div className={styles.card}>
    <button className={styles.cardHeaderButton} onClick={onToggle}>
      <div className={styles.cardHeaderLeft}>
        <span className={`${styles.materialIcon} ${styles.historyIcon || ''}`}>{icon}</span>
        <h2 className={styles.cardTitle}>{title}</h2>
      </div>
      <span className={styles.materialIcon}>
        {isCollapsed ? 'expand_more' : 'expand_less'}
      </span>
    </button>
    {!isCollapsed && <div className={styles.cardContent}>{children}</div>}
  </div>
));

CollapsibleCardWithIcon.displayName = 'CollapsibleCardWithIcon';
