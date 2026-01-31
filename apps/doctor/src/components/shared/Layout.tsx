import React, { memo, ReactNode } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  rightContent?: ReactNode;
  styles: CSSModuleClasses;
}

/**
 * PageHeader - Consistent page header with optional back button
 * 
 * Usage:
 * <PageHeader 
 *   title={STRING_CONSTANTS.LABELS.APPOINTMENT_DETAILS}
 *   subtitle={`${patient.name} • ${date} at ${time}`}
 *   onBack={handleBack}
 *   showBackButton={true}
 *   styles={styles}
 * />
 */
export const PageHeader: React.FC<PageHeaderProps> = memo(({ 
  title, 
  subtitle, 
  onBack,
  showBackButton = true,
  rightContent,
  styles 
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        {showBackButton && (
          <button className={styles.backButton} onClick={handleBack}>
            <span className={`${styles.materialIcon} ${styles.backIcon}`}>arrow_back</span>
          </button>
        )}
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>{title}</h1>
          {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
        </div>
      </div>
      {rightContent && <div className={styles.headerRight}>{rightContent}</div>}
    </div>
  );
});

PageHeader.displayName = 'PageHeader';

interface SectionHeaderProps {
  icon?: string;
  title: string;
  rightContent?: ReactNode;
  styles: CSSModuleClasses;
}

/**
 * SectionHeader - Section header with optional icon
 */
export const SectionHeader: React.FC<SectionHeaderProps> = memo(({ 
  icon, 
  title, 
  rightContent, 
  styles 
}) => (
  <div className={styles.sectionHeader || styles.cardHeader}>
    <div className={styles.sectionHeaderLeft || styles.headerLeft}>
      {icon && <span className={`${styles.materialIcon} ${styles.sectionIcon || ''}`}>{icon}</span>}
      <h3 className={styles.sectionTitle}>{title}</h3>
    </div>
    {rightContent && <div className={styles.sectionHeaderRight || styles.headerRight}>{rightContent}</div>}
  </div>
));

SectionHeader.displayName = 'SectionHeader';

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
  styles: CSSModuleClasses;
}

/**
 * ContentWrapper - Wrapper for page content area
 */
export const ContentWrapper: React.FC<ContentWrapperProps> = memo(({ 
  children, 
  className, 
  styles 
}) => (
  <div className={className || styles.content}>
    {children}
  </div>
));

ContentWrapper.displayName = 'ContentWrapper';

interface TabContentWrapperProps {
  children: ReactNode;
  styles: CSSModuleClasses;
}

/**
 * TabContentWrapper - Wrapper for tab content
 */
export const TabContentWrapper: React.FC<TabContentWrapperProps> = memo(({ children, styles }) => (
  <div className={styles.tabContent}>
    {children}
  </div>
));

TabContentWrapper.displayName = 'TabContentWrapper';

interface GridWrapperProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
  styles: CSSModuleClasses;
}

/**
 * GridWrapper - Flexible grid container
 */
export const GridWrapper: React.FC<GridWrapperProps> = memo(({ 
  children, 
  columns, 
  className, 
  styles 
}) => {
  const gridClassName = className || 
    (columns === 2 ? styles.twoColumnGrid : 
     columns === 3 ? styles.threeColumnGrid : 
     columns === 4 ? styles.fourColumnGrid : 
     styles.overviewGrid || styles.grid);
  
  return <div className={gridClassName}>{children}</div>;
});

GridWrapper.displayName = 'GridWrapper';
