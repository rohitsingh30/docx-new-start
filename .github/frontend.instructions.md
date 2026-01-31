````instructions
# Frontend Instructions

## Tech Stack

- React 19.1.1 + TypeScript 5.9.2 (strict mode)
- CSS Modules (all files in `styles/` folder)
- React Router for navigation
- Jest + React Testing Library

---

## CRITICAL RULES

### 1. No String Literals

**ALL text must come from constants:**

```typescript
// ❌ FORBIDDEN
<h1>Dashboard</h1>
<button>Save</button>
placeholder="Enter email"

// ✅ REQUIRED
<h1>{STRING_CONSTANTS.LABELS.DASHBOARD}</h1>
<button>{STRING_CONSTANTS.BUTTONS.SAVE}</button>
placeholder={STRING_CONSTANTS.PLACEHOLDERS.ENTER_EMAIL}
```

### 2. No Inline Interfaces

**ALL interfaces in `/types/*.types.ts`:**

```typescript
// ❌ FORBIDDEN - interface in component file
interface MyComponentProps { ... }

// ✅ REQUIRED - in /types/MyComponent.types.ts
export interface MyComponentProps { ... }

// Then import in component
import { MyComponentProps } from '../types/MyComponent.types';
```

### 3. No Inline Mock Data

**ALL mock data in `dataConstants.ts`:**

```typescript
// ❌ FORBIDDEN - data in component
const user = { name: 'John', age: 30 };

// ✅ REQUIRED - import from constants
import { MOCK_DATA } from '../constants/dataConstants';
const user = MOCK_DATA.USERS[0];
```

### 4. Use Shared Components for Repetitive Patterns

**Reuse components from `/components/shared/`:**

```typescript
// ❌ FORBIDDEN - Repetitive JSX for history cards
<div className={styles.card}>
  <div className={styles.statCard}>...</div>
</div>
// repeated 5 times...

// ✅ REQUIRED - Single function call
import { PatientHistoryGrid } from './shared';
<PatientHistoryGrid styles={styles} />

// ❌ FORBIDDEN - Repetitive vitals display
<div className={styles.vitalCompactItem}>...</div>
// repeated 4-6 times...

// ✅ REQUIRED - Single function call
import { VitalsSection } from './shared';
<VitalsSection data={vitalsData} isEditing={false} onChange={handleChange} styles={styles} />

// ❌ FORBIDDEN - Repetitive info rows
<div className={styles.infoRow}>
  <span className={styles.infoLabel}>...</span>
  <span className={styles.infoValue}>...</span>
</div>
// repeated multiple times...

// ✅ REQUIRED - Single function call with data array
import { InfoList } from './shared';
<InfoList 
  items={[
    { icon: 'call', label: STRING_CONSTANTS.PATIENT_LABELS.PHONE, value: patient.phone },
    { icon: 'email', label: STRING_CONSTANTS.PATIENT_LABELS.EMAIL, value: patient.email },
  ]}
  styles={styles}
/>
```

**Available shared components (composite - for simple function calls):**
| Component | Use Case |
|-----------|----------|
| `PatientHistoryGrid` | Renders all 5 history cards (allergies, family, surgeries, lifestyle, conditions) |
| `VitalsSection` | Vitals display/edit with auto-toggle, supports 4 or 6 vitals |
| `VitalsDisplay` | Read-only vitals display |
| `VitalsEdit` | Editable vitals form |
| `DetailsList` | Array of label/value pairs |
| `InfoList` | Array of icon/label/value pairs |
| `StatsGrid` | Grid of stat cards with icon/value/label |
| `TabList` | Tab buttons with icon/label/count |
| `SimpleTabList` | Simple tabs with icon/label |
| `FormFieldList` | Multiple form input fields |
| `SelectFieldList` | Multiple select dropdowns |

**Available shared components (individual - for granular control):**
| Component | Use Case |
|-----------|----------|
| `VitalItem` | Single vital sign with icon/label/value |
| `VitalEditItem` | Single editable vital sign input |
| `InfoRow` | Single label/value pair with optional icon |
| `DetailRow` | Single simple label/value pair |
| `StatCard` | Single card with icon header + list items |
| `HistoryCard` | Single history card with empty state |
| `ActionButton` | Button with icon + text |
| `IconButton` | Button with just an icon |
| `CollapsibleCard` | Expandable/collapsible card |
| `FormField` | Labeled form input |

### 5. No Template Literals in className

**Compute class names in variables:**

```typescript
// ❌ FORBIDDEN
<div className={`${styles.item} ${isActive ? styles.active : ''}`}>

// ✅ REQUIRED
const itemClass = isActive ? `${styles.item} ${styles.active}` : styles.item;
<div className={itemClass}>
```

### 6. Mock Updates Are Mandatory

**When you change a component, update the HTML mock:**

1. Modify React component
2. Update `/mocks/[Page].html` to match
3. Both must stay in sync

---

## Enum Usage

**Define in `/types/enums.ts`:**

```typescript
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}
```

**Use in code:**

```typescript
// ❌ WRONG
if (status === 'scheduled') { ... }
type Tab = 'all' | 'today';

// ✅ CORRECT
if (status === AppointmentStatus.SCHEDULED) { ... }
enum Tab { ALL = 'all', TODAY = 'today' }
```

---

## Component Pattern

```typescript
// components/PatientCard.tsx
import React from 'react';
import styles from '../styles/PatientCard.module.css';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { PatientCardProps } from '../types/PatientCard.types';
import { Gender } from '../types/enums';

export const PatientCard: React.FC<PatientCardProps> = ({ name, gender, age }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{STRING_CONSTANTS.LABELS.AGE}: {age}</p>
      <p>{STRING_CONSTANTS.LABELS.GENDER}: {gender}</p>
    </div>
  );
};
```

---

## Material Icons

**Use CSS Modules for icon styling:**

```css
/* ComponentName.module.css */
.materialIcon {
  font-family: 'Material Symbols Outlined';
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  display: inline-block;
  font-feature-settings: 'liga';
}
```

```typescript
<span className={styles.materialIcon}>arrow_back</span>
<span className={styles.materialIcon}>settings</span>
```

---

## CSS Modules

```typescript
import styles from '../styles/Component.module.css';

// Single class
<div className={styles.container}>

// Multiple classes (compute first)
const cardClass = [styles.card, isActive && styles.active].filter(Boolean).join(' ');
<div className={cardClass}>
```

---

## String Constants Structure

```typescript
// constants/stringConstants.ts
export const STRING_CONSTANTS = {
  LABELS: {
    DASHBOARD: 'Dashboard',
    PATIENTS: 'Patients',
    APPOINTMENTS: 'Appointments',
  },
  BUTTONS: {
    SAVE: 'Save',
    CANCEL: 'Cancel',
    SUBMIT: 'Submit',
  },
  PLACEHOLDERS: {
    SEARCH: 'Search...',
    ENTER_EMAIL: 'Enter email address',
  },
  MESSAGES: {
    LOADING: 'Loading...',
    NO_DATA: 'No data available',
    SUCCESS: 'Operation successful',
  },
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email',
  },
} as const;
```

---

## Form Handling

```typescript
const [formData, setFormData] = useState({
  name: '',
  gender: Gender.MALE,
  email: '',
});

const handleChange = (field: keyof typeof formData, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // validate and submit
};
```

---

## File Structure

```
apps/doctor/src/
├── components/           # UI components
│   └── shared/          # Reusable UI components
├── modals/              # Modal components
├── styles/              # ALL CSS modules
│   └── modals/          # Modal-specific styles
├── types/
│   ├── enums.ts         # All enums
│   ├── Shared.types.ts  # Shared component interfaces
│   └── *.types.ts       # Component interfaces
├── constants/
│   ├── stringConstants.ts
│   └── dataConstants.ts
├── services/            # API calls
├── contexts/            # React contexts
├── hooks/               # Custom hooks
└── utils/               # Helpers
```

---

## Verification Checklist

Before completing any component:

- [ ] No string literals in JSX
- [ ] No inline interfaces
- [ ] No inline mock data  
- [ ] No template literals in className
- [ ] All enums for fixed values
- [ ] CSS only in `/styles/`
- [ ] Mock file updated (if UI changed)
- [ ] TypeScript compiles without errors
- [ ] Used shared components where applicable

---

## Refactoring Rules

**DO NOT change visual structure during code cleanup:**

- Keep existing HTML element types (`<a>`, `<button>`, `<div>`, etc.)
- Keep existing CSS class assignments
- Keep existing component hierarchy
- Only update string literals → constants
- Only move interfaces → types files
- Only move data → dataConstants

```typescript
// ❌ WRONG - Changing element type during refactoring
// Before: <a href="#" onClick={...}>Link</a>
// After:  <button onClick={...}>Link</button>  // DON'T DO THIS

// ✅ CORRECT - Only change the string literal
// Before: <a href="#" onClick={...}>Link</a>
// After:  <a href="#" onClick={...}>{STRING_CONSTANTS.BUTTONS.LINK}</a>
```

---

## Quick Reference

| What | Where |
|------|-------|
| UI text | `STRING_CONSTANTS.CATEGORY.KEY` |
| Fixed values | `EnumName.VALUE` |
| Mock data | `MOCK_DATA.CATEGORY` |
| Interfaces | `/types/Component.types.ts` |
| Styles | `/styles/Component.module.css` |
| Design spec | `/mocks/Page.html` |
````
