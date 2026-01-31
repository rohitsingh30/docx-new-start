import React, { memo } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface TabItem {
  id: string;
  icon: string;
  label: string;
  count?: number;
}

interface TabListProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  styles: CSSModuleClasses;
  /** CSS class name for the container */
  containerClass?: string;
  /** CSS class name for active tab */
  activeClass?: string;
}

/**
 * TabList - Renders a list of tab buttons
 * 
 * Usage:
 * <TabList 
 *   tabs={[
 *     { id: 'all', icon: 'list_alt', label: STRING_CONSTANTS.TABS.ALL, count: 10 },
 *     { id: 'today', icon: 'today', label: STRING_CONSTANTS.TABS.TODAY, count: 5 },
 *   ]}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 *   styles={styles}
 * />
 */
export const TabList: React.FC<TabListProps> = memo(({ 
  tabs, 
  activeTab, 
  onTabChange, 
  styles,
  containerClass,
  activeClass
}) => {
  const getTabClass = (tabId: string) => {
    const isActive = activeTab === tabId;
    const activeClassName = activeClass || styles.tabActive || styles.activeTab;
    return isActive ? `${styles.tab} ${activeClassName}` : styles.tab;
  };

  // Find the appropriate icon class - prefer materialIcon, fallback to materialSymbolsIcon
  const getIconClass = () => {
    const classes = [styles.materialIcon, styles.tabIcon].filter(Boolean);
    return classes.length > 0 ? classes.join(' ') : styles.materialSymbolsIcon || '';
  };

  const iconClass = getIconClass();

  return (
    <div className={containerClass || styles.tabsWrapper || styles.tabsContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={getTabClass(tab.id)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('TabList click - tab:', tab.id, 'current activeTab:', activeTab);
            onTabChange(tab.id);
          }}
          type="button"
        >
          {tab.icon && (
            <span className={iconClass}>{tab.icon}</span>
          )}
          {tab.label}
          {tab.count !== undefined && (
            <span className={styles.tabCount}>{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
});

TabList.displayName = 'TabList';

interface SimpleTabItem {
  id: string;
  icon: string;
  label: string;
}

interface SimpleTabListProps {
  tabs: SimpleTabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  styles: CSSModuleClasses;
}

/**
 * SimpleTabList - Renders simple tabs with icon (for Settings, etc.)
 * 
 * Usage:
 * <SimpleTabList 
 *   tabs={[
 *     { id: 'profile', icon: 'person', label: STRING_CONSTANTS.TABS.PROFILE },
 *     { id: 'account', icon: 'lock', label: STRING_CONSTANTS.TABS.ACCOUNT },
 *   ]}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 *   styles={styles}
 * />
 */
export const SimpleTabList: React.FC<SimpleTabListProps> = memo(({ 
  tabs, 
  activeTab, 
  onTabChange, 
  styles 
}) => {
  const getTabClass = (tabId: string) => {
    const isActive = activeTab === tabId;
    return isActive ? `${styles.tab} ${styles.activeTab}` : styles.tab;
  };

  // Use materialIcon if available, fallback to materialSymbolsIcon
  const iconClass = styles.materialIcon || styles.materialSymbolsIcon || '';

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={getTabClass(tab.id)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onTabChange(tab.id);
          }}
          type="button"
        >
          <span className={iconClass}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
});

SimpleTabList.displayName = 'SimpleTabList';
