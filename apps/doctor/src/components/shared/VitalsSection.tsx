import React, { memo } from 'react';
import { MOCK_DATA } from '../../constants/dataConstants';
import { STRING_CONSTANTS } from '../../constants/stringConstants';
import { CSSModuleClasses } from '../../types/Common.types';

export interface VitalsData {
  heartRate: string;
  bloodPressure: string;
  temperature: string;
  weight: string;
  respiratoryRate?: string;
  oxygenSaturation?: string;
  [key: string]: string | undefined;
}

type VitalsVariant = 'default' | 'compact' | 'extended';

interface VitalsDisplayProps {
  data: VitalsData;
  styles: CSSModuleClasses;
  variant?: VitalsVariant;
}

interface VitalsEditProps {
  data: VitalsData;
  onChange: (key: string, value: string) => void;
  styles: CSSModuleClasses;
  variant?: VitalsVariant;
}

const getVitalsConfig = (variant: VitalsVariant) => {
  return variant === 'extended' 
    ? MOCK_DATA.VITALS_CONFIG_EXTENDED 
    : MOCK_DATA.VITALS_CONFIG;
};

/**
 * VitalsDisplay - Renders vitals in compact display mode
 * 
 * Usage:
 * <VitalsDisplay data={vitalsData} styles={styles} />
 * <VitalsDisplay data={vitalsData} styles={styles} variant="extended" />
 */
export const VitalsDisplay: React.FC<VitalsDisplayProps> = memo(({ data, styles, variant = 'default' }) => {
  const labels = STRING_CONSTANTS.LABELS as Record<string, string>;
  const config = getVitalsConfig(variant);
  
  // Check which CSS class pattern to use
  const useCompactVariant = variant === 'compact' || variant === 'extended';
  
  return (
    <div className={useCompactVariant ? styles.vitalsRow : styles.vitalsCompact}>
      {config.map(({ key, icon, labelKey, shortLabel }) => {
        const value = data[key] || '—';
        
        if (useCompactVariant) {
          return (
            <div key={key} className={styles.vitalItemCompact} title={labels[labelKey]}>
              <span className={`${styles.materialIcon} ${styles.vitalIconCompact}`}>{icon}</span>
              <div className={styles.vitalInfoCompact}>
                <span className={styles.vitalLabelCompact}>{shortLabel}</span>
                <span className={styles.vitalValueCompact}>{value}</span>
              </div>
            </div>
          );
        }
        
        return (
          <div key={key} className={styles.vitalCompactItem}>
            <span className={`${styles.materialIcon} ${styles.vitalCompactIcon}`}>{icon}</span>
            <div className={styles.vitalCompactInfo}>
              <span className={styles.vitalCompactLabel}>{labels[labelKey]}</span>
              <span className={styles.vitalCompactValue}>{value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
});

VitalsDisplay.displayName = 'VitalsDisplay';

/**
 * VitalsEdit - Renders vitals in editable form mode
 * 
 * Usage:
 * <VitalsEdit data={vitalsData} onChange={handleVitalChange} styles={styles} />
 */
export const VitalsEdit: React.FC<VitalsEditProps> = memo(({ data, onChange, styles, variant = 'default' }) => {
  const labels = STRING_CONSTANTS.LABELS as Record<string, string>;
  const placeholders = STRING_CONSTANTS.PLACEHOLDERS as Record<string, string>;
  const config = getVitalsConfig(variant);
  
  // Check which CSS class pattern to use  
  const useGridVariant = variant === 'compact' || variant === 'extended';
  
  return (
    <div className={useGridVariant ? styles.vitalsGrid : styles.vitalsEditForm}>
      {config.map(({ key, icon, labelKey, placeholderKey }) => {
        const value = data[key] || '';
        
        if (useGridVariant) {
          return (
            <div key={key} className={styles.vitalInput}>
              <label className={styles.vitalLabel}>
                <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>{icon}</span>
                {labels[labelKey]}
              </label>
              <input
                type="text"
                className={styles.input}
                value={value}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholders[placeholderKey]}
              />
            </div>
          );
        }
        
        return (
          <div key={key} className={styles.vitalEditItem}>
            <label className={styles.vitalEditLabel}>
              <span className={`${styles.materialIcon} ${styles.vitalEditIcon}`}>{icon}</span>
              {labels[labelKey]}
            </label>
            <input
              type="text"
              className={styles.vitalEditInput}
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholders[placeholderKey]}
            />
          </div>
        );
      })}
    </div>
  );
});

VitalsEdit.displayName = 'VitalsEdit';

interface VitalsSectionProps {
  data: VitalsData;
  isEditing: boolean;
  onChange: (key: string, value: string) => void;
  styles: CSSModuleClasses;
  variant?: VitalsVariant;
}

/**
 * VitalsSection - Toggleable vitals display/edit section
 * 
 * Usage:
 * <VitalsSection 
 *   data={vitalsData} 
 *   isEditing={isEditingVitals} 
 *   onChange={handleVitalChange} 
 *   styles={styles} 
 * />
 * 
 * For consultation with 6 vitals:
 * <VitalsSection 
 *   data={vitalsData} 
 *   isEditing={isEditingVitals} 
 *   onChange={handleVitalChange} 
 *   styles={styles}
 *   variant="extended" 
 * />
 */
export const VitalsSection: React.FC<VitalsSectionProps> = memo(({ 
  data, 
  isEditing, 
  onChange, 
  styles,
  variant = 'default'
}) => {
  return isEditing 
    ? <VitalsEdit data={data} onChange={onChange} styles={styles} variant={variant} />
    : <VitalsDisplay data={data} styles={styles} variant={variant} />;
});

VitalsSection.displayName = 'VitalsSection';
