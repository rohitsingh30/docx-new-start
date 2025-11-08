import React from 'react';
import styles from '../styles/LeftPane.module.css';
import { LeftPaneProps, NavigationItem } from '../types/LeftPane.types';
import { NAVIGATION_CONSTANTS } from '../constants/navigationConstants';

const NavigationItemComponent: React.FC<{ 
  item: NavigationItem; 
  isActive: boolean; 
  onClick: (id: string) => void;
}> = ({ item, isActive, onClick }) => (
  <div 
    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
    onClick={() => onClick(item.id)}
  >
    <span className={styles.navIcon}>{item.icon}</span>
    <span className={styles.navLabel}>{item.label}</span>
  </div>
);

const LeftPane: React.FC<LeftPaneProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const navigationItems = NAVIGATION_CONSTANTS.MAIN_NAVIGATION;

  return (
    <div className={styles.leftPane}>
      <div className={styles.header}>
        <h2>{NAVIGATION_CONSTANTS.APP_TITLE}</h2>
        <p className={styles.subtitle}>{NAVIGATION_CONSTANTS.APP_SUBTITLE}</p>
      </div>
      
      <nav className={styles.navigation}>
        <div className={styles.navSection}>
          <h3 className={styles.sectionTitle}>{NAVIGATION_CONSTANTS.SECTION_TITLES.MAIN}</h3>
          {navigationItems.map((item: NavigationItem) => (
            <NavigationItemComponent
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={onSectionChange}
            />
          ))}
        </div>

        <div className={styles.navSection}>
          <h3 className={styles.sectionTitle}>{NAVIGATION_CONSTANTS.SECTION_TITLES.MANAGEMENT}</h3>
          {NAVIGATION_CONSTANTS.MANAGEMENT_NAVIGATION.map((item: NavigationItem) => (
            <NavigationItemComponent
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={onSectionChange}
            />
          ))}
        </div>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {NAVIGATION_CONSTANTS.USER_INFO.initials}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{NAVIGATION_CONSTANTS.USER_INFO.name}</span>
            <span className={styles.userRole}>{NAVIGATION_CONSTANTS.USER_INFO.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
