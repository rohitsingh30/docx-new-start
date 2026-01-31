import React, { memo } from 'react';
import { ActionButtonProps, IconButtonProps } from '../../types/Shared.types';

/**
 * ActionButton - Button with icon and text
 * 
 * Usage:
 * <ActionButton 
 *   icon="schedule"
 *   label={STRING_CONSTANTS.BUTTONS.RESCHEDULE}
 *   onClick={onReschedule}
 *   styles={styles}
 * />
 */
export const ActionButton: React.FC<ActionButtonProps> = memo(({ 
  icon, 
  label, 
  onClick, 
  styles,
  disabled = false 
}) => {
  const iconClassName = [styles.materialIcon, styles.actionIcon].filter(Boolean).join(' ');
  
  return (
    <button 
      className={styles.actionButton} 
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <span className={iconClassName}>{icon}</span>
      <span>{label}</span>
    </button>
  );
});

ActionButton.displayName = 'ActionButton';

/**
 * IconButton - Button with just an icon
 * 
 * Usage:
 * <IconButton 
 *   icon="notifications"
 *   onClick={handleNotifications}
 *   ariaLabel={STRING_CONSTANTS.ARIA_LABELS.NOTIFICATIONS}
 *   styles={styles}
 * />
 */
export const IconButton: React.FC<IconButtonProps> = memo(({ 
  icon, 
  onClick, 
  ariaLabel, 
  styles,
  className 
}) => {
  const buttonClassName = className || styles.iconButton;
  
  return (
    <button 
      className={buttonClassName} 
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      <span className={styles.materialIcon}>{icon}</span>
    </button>
  );
});

IconButton.displayName = 'IconButton';
