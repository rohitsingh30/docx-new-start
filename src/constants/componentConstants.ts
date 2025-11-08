// Component-specific constants
export const COMPONENT_CONSTANTS = {
  TABS: {
    DASHBOARD: 'dashboard',
    PATIENTS: 'patients',
    DOCTORS: 'doctors',
  },
  NAVIGATION: {
    DEFAULT_TAB: 'dashboard' as const,
  },
  BREAKPOINTS: {
    MOBILE: '768px',
    TABLET: '1024px',
    DESKTOP: '1200px',
  },
  SPACING: {
    SMALL: '0.5rem',
    MEDIUM: '1rem',
    LARGE: '1.5rem',
    EXTRA_LARGE: '2rem',
  },
  SEARCH: {
    MAX_RESULTS: 100,
  },
} as const;
