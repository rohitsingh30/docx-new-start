import { COLORS } from '../colors/colors';

/**
 * Generates CSS custom properties (variables) from the COLORS object
 * This ensures color consistency between TypeScript and CSS
 */
export const generateCSSVariables = (): string => {
  const cssVariables: string[] = [
    '/* Auto-generated CSS variables from colors.ts */',
    ':root {'
  ];

  // Convert COLORS object to CSS variables
  Object.entries(COLORS).forEach(([key, value]) => {
    // Convert camelCase and UPPER_CASE to kebab-case for CSS variables
    const cssVarName = key
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/_/g, '-');
    cssVariables.push(`  --color-${cssVarName}: ${value};`);
  });

  cssVariables.push('}');
  return cssVariables.join('\n');
};

/**
 * Get a CSS variable reference for a color
 * @param colorKey - The key from the COLORS object
 * @returns CSS variable reference
 */
export const getCSSVariable = (colorKey: keyof typeof COLORS): string => {
  const cssVarName = colorKey
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/_/g, '-');
  return `var(--color-${cssVarName})`;
};

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
