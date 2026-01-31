import React from 'react';
import styles from '../styles/LeftPane.module.css';
import { LeftPaneProps, NavigationItem } from '../types/LeftPane.types';
import { NAVIGATION_CONSTANTS } from '../constants/navigationConstants';
import { useAuth } from '../contexts/AuthContext';
import { STRING_CONSTANTS } from '../constants/stringConstants';

const NavigationItemComponent: React.FC<{ 
  item: NavigationItem; 
  isActive: boolean; 
  onClick: (id: string) => void;
}> = ({ item, isActive, onClick }) => {
  const navItemClass = isActive 
    ? `${styles.navItem} ${styles.active}` 
    : styles.navItem;
  
  return (
    <a 
      href="#"
      className={navItemClass}
      onClick={(e) => {
        e.preventDefault();
        onClick(item.id);
      }}
    >
      <span className={styles.materialIcon}>{item.icon}</span>
      <p className={styles.navLabel}>{item.label}</p>
    </a>
  );
};

const LeftPane: React.FC<LeftPaneProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const navigationItems = NAVIGATION_CONSTANTS.MAIN_NAVIGATION;
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className={styles.leftPane}>
      <div className={styles.topSection}>
        {/* Navigation */}
        <nav className={styles.navigation}>
          {navigationItems.map((item: NavigationItem) => (
            <NavigationItemComponent
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={onSectionChange}
            />
          ))}
        </nav>
      </div>
      
      {/* Logout Button */}
      <div className={styles.bottomSection}>
        <button 
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          <span className={styles.materialIcon}>logout</span>
          <span>{STRING_CONSTANTS.BUTTONS.LOGOUT}</span>
        </button>
      </div>
    </aside>
  );
};

export default LeftPane;
