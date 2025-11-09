import React, { memo } from 'react';
import styles from '../styles/TopNav.module.css';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { NAVIGATION_CONSTANTS } from '../constants/navigationConstants';

const TopNav: React.FC = memo(() => {
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
            />
          </div>
        </label>
      </div>

      {/* Right: Icons and Avatar */}
      <div className={styles.actionsSection}>
        <button className={styles.iconButton} aria-label={STRING_CONSTANTS.ARIA_LABELS.NOTIFICATIONS}>
          <span className={styles.materialIcon}>notifications</span>
        </button>
        <button className={styles.iconButton} aria-label={STRING_CONSTANTS.ARIA_LABELS.MESSAGES}>
          <span className={styles.materialIcon}>chat_bubble</span>
        </button>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url("${NAVIGATION_CONSTANTS.USER_INFO.avatar}")` }}
          aria-label={`${STRING_CONSTANTS.ARIA_LABELS.AVATAR_OF} ${NAVIGATION_CONSTANTS.USER_INFO.name}`}
        />
      </div>
    </header>
  );
});

TopNav.displayName = 'TopNav';

export default TopNav;
