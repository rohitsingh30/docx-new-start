import React, { memo } from 'react';
import { MOCK_DATA } from '../../constants/dataConstants';
import { STRING_CONSTANTS } from '../../constants/stringConstants';
import { CSSModuleClasses } from '../../types/Common.types';

interface PatientHistoryData {
  allergies?: string[];
  familyHistory?: string[];
  surgeries?: string[];
  lifestyle?: string[];
  conditions?: string[];
}

interface PatientHistoryGridProps {
  data?: PatientHistoryData;
  styles: CSSModuleClasses;
  /** Use 'statCard' variant for AppointmentDetails/Consultation, 'historyCard' for PatientDetails */
  variant?: 'statCard' | 'historyCard';
}

/**
 * PatientHistoryGrid - Renders all patient history cards in a grid
 * 
 * Simple usage with default mock data:
 * <PatientHistoryGrid styles={styles} />
 * 
 * With custom patient data:
 * <PatientHistoryGrid data={patient.history} styles={styles} />
 * 
 * For PatientDetails (different CSS classes):
 * <PatientHistoryGrid data={patient.history} styles={styles} variant="historyCard" />
 */
export const PatientHistoryGrid: React.FC<PatientHistoryGridProps> = memo(({ 
  data = MOCK_DATA.DEFAULT_PATIENT_HISTORY,
  styles,
  variant = 'statCard'
}) => {
  const historyLabels = STRING_CONSTANTS.HISTORY_LABELS as Record<string, string>;
  
  const renderStatCardVariant = () => (
    <div className={styles.historyCardsGrid}>
      {MOCK_DATA.PATIENT_HISTORY_CONFIG.map(({ key, icon, titleKey }) => {
        const items = data[key as keyof PatientHistoryData] || [];
        return (
          <div key={key} className={styles.card}>
            <div className={styles.statCard}>
              <div className={styles.statCardHeader}>
                <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>{icon}</span>
                <h3 className={styles.statCardTitle}>{historyLabels[titleKey]}</h3>
              </div>
            </div>
            <div className={styles.statCardContent}>
              {items.map((item, index) => (
                <div key={index} className={styles.statCardItem}>{item}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderHistoryCardVariant = () => (
    <div className={styles.historyCardsGrid}>
      {MOCK_DATA.PATIENT_HISTORY_CONFIG.map(({ key, icon, titleKey }) => {
        const items = data[key as keyof PatientHistoryData] || [];
        return (
          <div key={key} className={styles.historyCard}>
            <div className={styles.historyCardHeader}>
              <span className={styles.materialSymbolsIcon}>{icon}</span>
              <h3>{historyLabels[titleKey]}</h3>
            </div>
            <div className={styles.historyCardContent}>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <div key={index} className={styles.historyItem}>{item}</div>
                ))
              ) : (
                <div className={styles.historyItem}>No items</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return variant === 'historyCard' ? renderHistoryCardVariant() : renderStatCardVariant();
});

PatientHistoryGrid.displayName = 'PatientHistoryGrid';
