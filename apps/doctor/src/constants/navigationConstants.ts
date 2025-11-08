import { NavigationItem, UserInfo } from '../types/LeftPane.types';

// Navigation constants for left pane
export const NAVIGATION_CONSTANTS = {
  APP_TITLE: 'DocX',
  APP_SUBTITLE: '',
  
  SECTION_TITLES: {
    MAIN: '',
    MANAGEMENT: '',
    SETTINGS: '',
  },

  MAIN_NAVIGATION: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'grid_view',
      path: '/',
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: 'group',
      path: '/patients',
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: 'calendar_month',
      path: '/appointments',
    },
    {
      id: 'medical-records',
      label: 'Medical Records',
      icon: 'folder_shared',
      path: '/medical-records',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      path: '/settings',
    },
  ] as NavigationItem[],

  MANAGEMENT_NAVIGATION: [] as NavigationItem[],

  USER_INFO: {
    name: 'Dr. Emily Carter',
    role: 'Cardiologist',
    initials: 'EC',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYXHqqDd47gxyLh8AiyqIJ_Z0xJcVkl2Fl8QGWc5a943QfFtR51JhxIOMk-yS0_x-bWxs1Q2w0nhpAoErhOKOpNc-KaWUvjGU0Am3HTgLsmpyUlrQwfVAQmzYVogoFt-gaDFSiY2mL1BH0EVX8mxxJI7nqIp_tsVdoXvJtnqYimXSri6lkaGgTVu1wBSV2a5p3t8K7ACXcaeZ1KD3GH2fziFPPXfUzWsmYAeNxqP6hjxyskUhbYwrT9z8pAJwBHXIzkyjElnuTog',
  } as UserInfo,
} as const;