// Dashboard-related types and interfaces
export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  activeDoctors: number;
  appointmentsToday: number;
}

export interface RecentActivity {
  id: string;
  type: 'patient' | 'doctor' | 'appointment';
  title: string;
  description: string;
  timestamp: string;
}

export interface StatCard {
  label: string;
  value: number;
  icon?: string;
  color?: string;
}

export interface DashboardProps {
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

export interface StatCardProps {
  title: string;
  value: number;
}

export type DashboardTab = 'overview' | 'analytics' | 'reports';
export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut';
export type TabType = 'dashboard' | 'patients' | 'doctors';
