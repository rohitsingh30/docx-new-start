// LeftPane component types and interfaces
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: NavigationItem[];
}

export interface LeftPaneProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export interface UserInfo {
  name: string;
  role: string;
  initials: string;
  avatar?: string;
}
