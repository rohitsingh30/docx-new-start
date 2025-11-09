import React, { memo } from 'react';
import styles from '../styles/EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = memo(({ 
  title, 
  message, 
  actionText, 
  onAction, 
  icon = '📋' 
}) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateIcon}>
        {icon}
      </div>
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      <p className={styles.emptyStateMessage}>{message}</p>
      {actionText && onAction && (
        <button 
          className={styles.emptyStateAction}
          onClick={onAction}
        >
          {actionText}
        </button>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
