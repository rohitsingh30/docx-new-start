import React, { memo, ReactNode } from 'react';
import { CSSModuleClasses } from '../../types/Common.types';

interface SettingCardProps {
  icon: string;
  title: string;
  children: ReactNode;
  headerAction?: ReactNode;
  styles: CSSModuleClasses;
}

/**
 * SettingCard - Card container for settings sections
 */
export const SettingCard: React.FC<SettingCardProps> = memo(({ 
  icon, 
  title, 
  children, 
  headerAction,
  styles 
}) => (
  <div className={styles.settingCard}>
    <div className={styles.settingCardHeader}>
      <span className={styles.materialSymbolsIcon}>{icon}</span>
      <h3>{title}</h3>
      {headerAction}
    </div>
    <div className={styles.settingCardContent}>
      {children}
    </div>
  </div>
));

SettingCard.displayName = 'SettingCard';

interface ToggleSettingProps {
  label: string;
  description?: string;
  icon?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  styles: CSSModuleClasses;
}

/**
 * ToggleSetting - Toggle switch with label and optional description
 */
export const ToggleSetting: React.FC<ToggleSettingProps> = memo(({ 
  label, 
  description, 
  icon,
  checked, 
  onChange, 
  styles 
}) => (
  <div className={styles.toggleSettingCompact}>
    {icon ? (
      <div className={styles.toggleHeader}>
        <span className={styles.materialSymbolsIcon}>{icon}</span>
        <div className={styles.toggleTextContent}>
          <h4>{label}</h4>
          {description && <p>{description}</p>}
        </div>
      </div>
    ) : (
      <div className={styles.toggleInfo}>
        <h4>{label}</h4>
        {description && <p>{description}</p>}
      </div>
    )}
    <label className={styles.toggle}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={styles.toggleSlider}></span>
    </label>
  </div>
));

ToggleSetting.displayName = 'ToggleSetting';

interface ToggleSettingListProps {
  settings: Array<{
    id: string;
    label: string;
    description?: string;
    icon?: string;
    checked?: boolean;
  }>;
  onChange?: (id: string, checked: boolean) => void;
  styles: CSSModuleClasses;
}

/**
 * ToggleSettingList - List of toggle settings
 */
export const ToggleSettingList: React.FC<ToggleSettingListProps> = memo(({ 
  settings, 
  onChange, 
  styles 
}) => (
  <>
    {settings.map(setting => (
      <ToggleSetting
        key={setting.id}
        label={setting.label}
        description={setting.description}
        icon={setting.icon}
        checked={setting.checked}
        onChange={(checked) => onChange?.(setting.id, checked)}
        styles={styles}
      />
    ))}
  </>
));

ToggleSettingList.displayName = 'ToggleSettingList';

interface SessionItemProps {
  icon: string;
  deviceName: string;
  location: string;
  isCurrent?: boolean;
  onRevoke?: () => void;
  styles: CSSModuleClasses;
}

/**
 * SessionItem - Active session display item
 */
export const SessionItem: React.FC<SessionItemProps> = memo(({ 
  icon, 
  deviceName, 
  location, 
  isCurrent, 
  onRevoke, 
  styles 
}) => (
  <div className={styles.sessionItem}>
    <div className={styles.sessionInfo}>
      <span className={styles.materialSymbolsIcon}>{icon}</span>
      <div>
        <h4>{deviceName}</h4>
        <p>{location}</p>
      </div>
    </div>
    {isCurrent ? (
      <span className={styles.currentBadge}>Current</span>
    ) : (
      <button className={styles.dangerButton} onClick={onRevoke}>Revoke</button>
    )}
  </div>
));

SessionItem.displayName = 'SessionItem';

interface SessionListProps {
  sessions: Array<{
    id: string;
    icon: string;
    deviceName: string;
    location: string;
    isCurrent?: boolean;
  }>;
  onRevoke?: (id: string) => void;
  styles: CSSModuleClasses;
}

/**
 * SessionList - List of active sessions
 */
export const SessionList: React.FC<SessionListProps> = memo(({ 
  sessions, 
  onRevoke, 
  styles 
}) => (
  <div className={styles.sessionList}>
    {sessions.map(session => (
      <SessionItem
        key={session.id}
        icon={session.icon}
        deviceName={session.deviceName}
        location={session.location}
        isCurrent={session.isCurrent}
        onRevoke={onRevoke ? () => onRevoke(session.id) : undefined}
        styles={styles}
      />
    ))}
  </div>
));

SessionList.displayName = 'SessionList';

interface SelectFieldProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  styles: CSSModuleClasses;
}

/**
 * SelectField - Dropdown select field
 */
export const SelectField: React.FC<SelectFieldProps> = memo(({ 
  label, 
  options, 
  value, 
  onChange, 
  styles 
}) => (
  <div className={styles.formGroup}>
    <label>{label}</label>
    <select value={value} onChange={(e) => onChange?.(e.target.value)}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
));

SelectField.displayName = 'SelectField';
