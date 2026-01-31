import React, { memo } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface StatItemWithIcon {
  icon: string;
  value: string | number;
  label: string;
  prefix?: string;
}

interface StatsGridWithIconProps {
  items: StatItemWithIcon[];
  styles: CSSModuleClasses;
}

/**
 * StatsGridWithIcon - Renders a grid of stat cards with icon, value, and label
 * 
 * Usage:
 * <StatsGridWithIcon 
 *   items={[
 *     { icon: 'attach_money', value: stats.totalRevenue, label: STRING_CONSTANTS.LABELS.TOTAL_REVENUE, prefix: '$' },
 *   ]}
 *   styles={styles}
 * />
 */
export const StatsGridWithIcon: React.FC<StatsGridWithIconProps> = memo(({ items, styles }) => (
  <div className={styles.statsGrid}>
    {items.map((item, index) => (
      <div key={index} className={styles.statCard}>
        <span className={styles.materialIcon}>{item.icon}</span>
        <div>
          <div className={styles.statValue}>
            {item.prefix}{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
          </div>
          <div className={styles.statLabel}>{item.label}</div>
        </div>
      </div>
    ))}
  </div>
));

StatsGridWithIcon.displayName = 'StatsGridWithIcon';

interface SimpleStatItem {
  title: string;
  value: string | number;
}

interface StatsGridProps {
  stats: SimpleStatItem[];
  styles: CSSModuleClasses;
}

/**
 * StatsGrid - Renders a simple grid of stat cards with title and value
 * 
 * Usage:
 * <StatsGrid 
 *   stats={[
 *     { title: STRING_CONSTANTS.LABELS.TOTAL_PATIENTS_TODAY, value: dashboardStats.totalPatients },
 *   ]}
 *   styles={styles}
 * />
 */
export const StatsGrid: React.FC<StatsGridProps> = memo(({ stats, styles }) => (
  <div className={styles.statsGrid}>
    {stats.map((stat, index) => (
      <div key={index} className={styles.statCard}>
        <p className={styles.statTitle}>{stat.title}</p>
        <p className={styles.statValue}>{stat.value}</p>
      </div>
    ))}
  </div>
));

StatsGrid.displayName = 'StatsGrid';
