import { NavigationItem, UserInfo } from '../types/LeftPane.types';

// Navigation constants for left pane
export const NAVIGATION_CONSTANTS = {
  APP_TITLE: 'MedCare',
  APP_SUBTITLE: 'Patient & Doctor Management',
  
  SECTION_TITLES: {
    MAIN: 'Main Navigation',
    MANAGEMENT: 'Management',
    SETTINGS: 'Settings',
  },

  MAIN_NAVIGATION: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/',
    },
  ] as NavigationItem[],

  MANAGEMENT_NAVIGATION: [
    {
      id: 'patients',
      label: 'Patients',
      icon: '👥',
      path: '/patients',
    },
    {
      id: 'doctors',
      label: 'Doctors',
      icon: '👨‍⚕️',
      path: '/doctors',
    },
  ] as NavigationItem[],

  USER_INFO: {
    name: 'Dr. Admin',
    role: 'System Administrator',
    initials: 'DA',
    avatar: '',
  } as UserInfo,
} as const;