// Color Palette for Medical Records Dashboard
export const COLORS = {
  // Primary Colors
  PRIMARY: '#2c3e50',
  PRIMARY_LIGHT: '#34495e',
  PRIMARY_DARK: '#1a252f',

  // Secondary Colors
  SECONDARY: '#3498db',
  SECONDARY_LIGHT: '#5dade2',
  SECONDARY_DARK: '#2980b9',

  // Status Colors
  SUCCESS: '#27ae60',
  SUCCESS_LIGHT: '#2ecc71',
  SUCCESS_DARK: '#229954',

  WARNING: '#f39c12',
  WARNING_LIGHT: '#f4d03f',
  WARNING_DARK: '#e67e22',

  DANGER: '#e74c3c',
  DANGER_LIGHT: '#ec7063',
  DANGER_DARK: '#c0392b',

  INFO: '#17a2b8',
  INFO_LIGHT: '#5bc0de',
  INFO_DARK: '#138496',

  // Neutral Colors
  WHITE: '#ffffff',
  BLACK: '#000000',
  
  // Gray Scale
  GRAY_50: '#f8f9fa',
  GRAY_100: '#f1f3f4',
  GRAY_200: '#e9ecef',
  GRAY_300: '#dee2e6',
  GRAY_400: '#ced4da',
  GRAY_500: '#adb5bd',
  GRAY_600: '#868e96',
  GRAY_700: '#495057',
  GRAY_800: '#343a40',
  GRAY_900: '#212529',

  // Legacy naming for compatibility
  LIGHT_GRAY: '#ecf0f1',
  DARK_GRAY: '#7f8c8d',
  BACKGROUND: '#f5f5f5',

  // Semantic Colors
  TEXT_PRIMARY: '#2c3e50',
  TEXT_SECONDARY: '#7f8c8d',
  TEXT_MUTED: '#95a5a6',
  TEXT_LIGHT: '#ffffff',

  // Border Colors
  BORDER_LIGHT: '#ecf0f1',
  BORDER_DEFAULT: '#dee2e6',
  BORDER_DARK: '#ced4da',

  // Background Colors
  BG_PRIMARY: '#ffffff',
  BG_SECONDARY: '#f8f9fa',
  BG_LIGHT: '#f5f5f5',
  BG_DARK: '#2c3e50',

  // Hover and Focus States
  HOVER_LIGHT: 'rgba(255, 255, 255, 0.1)',
  HOVER_DARK: 'rgba(0, 0, 0, 0.05)',
  FOCUS_RING: 'rgba(52, 152, 219, 0.3)',

  // Medical-specific Colors
  BLOOD_TYPE: '#c0392b',
  MEDICAL_EMERGENCY: '#e74c3c',
  APPOINTMENT_SCHEDULED: '#3498db',
  APPOINTMENT_COMPLETED: '#27ae60',
  APPOINTMENT_CANCELLED: '#e74c3c',
  DOCTOR_ACTIVE: '#27ae60',
  DOCTOR_INACTIVE: '#95a5a6',
} as const;

// Color utility functions
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const lightenColor = (color: string, amount: number): string => {
  // Simple color lightening function
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = (num >> 16) + amount;
  const g = ((num >> 8) & 0x00FF) + amount;
  const b = (num & 0x0000FF) + amount;
  
  return '#' + (0x1000000 + (r < 255 ? r < 1 ? 0 : r : 255) * 0x10000 +
    (g < 255 ? g < 1 ? 0 : g : 255) * 0x100 +
    (b < 255 ? b < 1 ? 0 : b : 255)).toString(16).slice(1);
};

export const darkenColor = (color: string, amount: number): string => {
  return lightenColor(color, -amount);
};
