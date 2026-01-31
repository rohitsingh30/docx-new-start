export interface TopNavProps {
  onNotifications?: () => void;
  onMessages?: () => void;
  onProfile?: () => void;
  onSearch?: (query: string) => void;
}
