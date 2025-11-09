import { COLORS } from '../colors/colors';

/**
 * Generate CSS variables as a style object for React components
 */
export const getCSSVariablesAsStyle = (): Record<string, string> => {
  const styles: Record<string, string> = {};
  
  Object.entries(COLORS).forEach(([key, value]) => {
    const cssVarName = key
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/_/g, '-');
    styles[`--color-${cssVarName}`] = value;
  });
  
  return styles;
};
