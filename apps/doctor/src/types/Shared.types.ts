/**
 * Shared component types for reusable UI elements
 */

import { CSSModuleClasses } from './Common.types';

/**
 * VitalItem - Display a single vital sign with icon, label, and value
 */
export interface VitalItemProps {
  icon: string;
  label: string;
  value: string;
  styles: CSSModuleClasses;
}

/**
 * InfoRow - Display a label/value pair, optionally with an icon
 */
export interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
  icon?: string;
  styles: CSSModuleClasses;
}

/**
 * DetailRow - Simple label/value pair without icon
 */
export interface DetailRowProps {
  label: string;
  value: string | React.ReactNode;
  styles: CSSModuleClasses;
}

/**
 * StatCard - Card with icon header and list of items
 */
export interface StatCardProps {
  icon: string;
  title: string;
  items: string[];
  styles: CSSModuleClasses;
}

/**
 * ActionButton - Button with icon and text
 */
export interface ActionButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
  styles: CSSModuleClasses;
  disabled?: boolean;
}

/**
 * HistoryCard - Card for displaying history items (allergies, conditions, etc.)
 */
export interface HistoryCardProps {
  icon: string;
  title: string;
  items: string[];
  styles: CSSModuleClasses;
  emptyMessage?: string;
}

/**
 * CollapsibleCard - Card with collapsible content
 */
export interface CollapsibleCardProps {
  icon: string;
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  styles: CSSModuleClasses;
}

/**
 * VitalEditItem - Editable vital sign input
 */
export interface VitalEditItemProps {
  icon: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  styles: CSSModuleClasses;
}

/**
 * FormField - Reusable form field with label
 */
export interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date' | 'time';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  styles: CSSModuleClasses;
}

/**
 * IconButton - Button with just an icon
 */
export interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  ariaLabel: string;
  styles: CSSModuleClasses;
  className?: string;
}
