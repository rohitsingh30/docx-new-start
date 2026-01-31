import React, { memo, useState } from 'react';
import styles from '../styles/TopNav.module.css';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { NAVIGATION_CONSTANTS } from '../constants/navigationConstants';
import { TopNavProps } from '../types/TopNav.types';

const TopNav: React.FC<TopNavProps> = memo(({ 
  onNotifications,
  onMessages,
  onProfile,
  onSearch,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <header className={styles.topNav}>
      {/* Left: Logo */}
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <span className={styles.materialIcon}>medical_services</span>
        </div>
        <h2 className={styles.logoText}>{STRING_CONSTANTS.LABELS.APP_NAME}</h2>
      </div>

      {/* Center: Search Bar */}
      <div className={styles.searchSection}>
        <label className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchIcon}>
              <span className={styles.materialIcon}>search</span>
            </div>
            <input
              className={styles.searchInput}
              placeholder={STRING_CONSTANTS.PLACEHOLDERS.SEARCH_PATIENTS_APPOINTMENTS}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </div>
        </label>
      </div>

      {/* Right: Icons and Avatar */}
      <div className={styles.actionsSection}>
        <button 
          className={styles.iconButton} 
          aria-label={STRING_CONSTANTS.ARIA_LABELS.NOTIFICATIONS}
          onClick={onNotifications}
          type="button"
        >
          <span className={styles.materialIcon}>notifications</span>
        </button>
        <button 
          className={styles.iconButton} 
          aria-label={STRING_CONSTANTS.ARIA_LABELS.MESSAGES}
          onClick={onMessages}
          type="button"
        >
          <span className={styles.materialIcon}>chat_bubble</span>
        </button>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url("${NAVIGATION_CONSTANTS.USER_INFO.avatar}")` }}
          aria-label={`${STRING_CONSTANTS.ARIA_LABELS.AVATAR_OF} ${NAVIGATION_CONSTANTS.USER_INFO.name}`}
          role="button"
          tabIndex={0}
          onClick={onProfile}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (onProfile) {
                onProfile();
              }
            }
          }}
        />
      </div>
    </header>
  );
});

TopNav.displayName = 'TopNav';

export default TopNav;
