/**
 * Shared UI Components
 * 
 * Reusable components for consistent UI patterns across the app.
 * Import these components to reduce code duplication.
 */

// Individual components (for granular control)
export { VitalItem } from './VitalItem';
export { InfoRow, DetailRow } from './InfoRow';
export { StatCard, HistoryCard } from './StatCard';
export { ActionButton, IconButton } from './ActionButton';
export { CollapsibleCard } from './CollapsibleCard';
export { VitalEditItem } from './VitalEditItem';
export { FormField } from './FormField';

// Composite components (for simple function calls)
export { PatientHistoryGrid } from './PatientHistoryGrid';
export { VitalsDisplay, VitalsEdit, VitalsSection } from './VitalsSection';
export { DetailsList, InfoList } from './DetailsList';
export { StatsGrid, StatsGridWithIcon } from './StatsGrid';
export { TabList, SimpleTabList } from './TabList';
export { FormFieldList, SelectFieldList } from './FormFieldList';
export { Card, CardWithGrid, CollapsibleCardWithIcon } from './Card';
export { 
  ActionButtons, 
  StatusBadge, 
  MedicationItem, 
  MedicationList, 
  AppointmentListItem, 
  AppointmentList,
  SymptomTags,
  DurationDisplay 
} from './ActionComponents';
export {
  PageHeader,
  SectionHeader,
  ContentWrapper,
  TabContentWrapper,
  GridWrapper
} from './Layout';
export {
  QuickAddChip,
  QuickAddList,
  TagList,
  ListItemWithActions,
  ItemListWithActions,
  TextAreaCard,
  InputFieldCard,
  CardWithHeaderAction,
  EditableHeaderCard,
  SectionSeparator
} from './FormComponents';
export {
  MedicationForm,
  PrescriptionItem,
  PrescriptionList,
  LabTestList
} from './MedicationComponents';
export {
  SettingCard,
  ToggleSetting,
  ToggleSettingList,
  SessionItem,
  SessionList,
  SelectField
} from './SettingsComponents';
