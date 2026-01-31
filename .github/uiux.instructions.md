````instructions
# UI/UX Instructions

## Core Rules

1. **Mocks = Source of Truth** → `/apps/[app]/mocks/*.html`
2. **CSS in styles/ only** → `/apps/[app]/src/styles/*.module.css`
3. **Use Existing Variables** → Only variables in `index.css`
4. **Never Hardcode Colors** → Always `var(--name, #fallback)`
5. **Inter Font** → Inherited from body, don't override

---

## CSS Variables (ONLY THESE EXIST)

Check `/apps/doctor/src/styles/index.css` - these are the ONLY available variables:

### Primary Colors

```css
--color-primary: #2A64F5;              /* Buttons, links, active states */
--color-primary-rgb: 42, 100, 245;     /* For rgba() usage */
--color-primary-hover: rgba(42, 100, 245, 0.9);
--color-primary-light: rgba(42, 100, 245, 0.1);
--color-primary-focus: rgba(42, 100, 245, 0.5);
```

### Text Colors

```css
--color-text-primary: #1a202c;         /* Headings, main text */
--color-text-secondary: #4a5568;       /* Body text, labels */
--color-text-tertiary: #718096;        /* Muted, placeholders */
```

### Backgrounds & Borders

```css
--color-background: #f7fafc;           /* Page background */
--color-white: #ffffff;                /* Cards, white areas */
--color-border: #e2e8f0;               /* Default borders */
--color-gray-100: #f7fafc;             /* Light fills */
--color-gray-200: #e2e8f0;             /* Darker fills */
```

### Status Colors

```css
--color-success-bg: #c6f6d5;
--color-success-text: #2f855a;
--color-warning-bg: #feebc8;
--color-warning-text: #c05621;
--color-error-bg: #fed7d7;
--color-error-text: #c53030;
--color-info-bg: #bee3f8;
--color-info-text: #2c5282;
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-focus: 0 0 0 3px rgba(42, 100, 245, 0.5);
```

---

## Variable Usage

### ❌ WRONG

```css
.button {
  background-color: #2A64F5;           /* Hardcoded */
  color: var(--color-gray-300);        /* Doesn't exist */
  border: 1px solid #e2e8f0;           /* Hardcoded */
}
```

### ✅ CORRECT

```css
.button {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.button:hover {
  background-color: var(--color-primary-hover);
}

.button:focus {
  box-shadow: var(--shadow-focus);
}
```

---

## Quick Reference Table

| Use Case | CSS Variable |
|----------|-------------|
| Button background | `var(--color-primary)` |
| Button hover | `var(--color-primary-hover)` |
| Active state bg | `var(--color-primary-light)` |
| Focus ring | `var(--shadow-focus)` |
| Heading text | `var(--color-text-primary)` |
| Body text | `var(--color-text-secondary)` |
| Placeholder text | `var(--color-text-tertiary)` |
| Card background | `var(--color-white)` |
| Page background | `var(--color-background)` |
| Borders | `var(--color-border)` |
| Small shadow | `var(--shadow-sm)` |

---

## Typography

### Font Family (Inherited)

The app uses **Inter** font loaded in `index.html`. Never override:

```css
/* ❌ WRONG */
.component {
  font-family: 'Roboto', sans-serif;
}

/* ✅ CORRECT - just inherit */
.component {
  font-size: 1rem;
  font-weight: 500;
}
```

### Font Weights

| Weight | Use For |
|--------|---------|
| 400 | Body text |
| 500 | Labels, secondary headings |
| 600 | Card titles |
| 700 | Page headings |
| 900 | Hero text (rare) |

---

## Box Sizing

**Always include on custom-sized elements:**

```css
.input {
  box-sizing: border-box;  /* Required for accurate sizing */
  height: 3rem;
  padding: 0 1rem;
}
```

---

## Mock → CSS Workflow

### 1. Open Mock

```
file:///Users/rohit/docx/apps/doctor/mocks/Login.html
```

### 2. Extract Tailwind → Map to Variables

| Tailwind | CSS Variable |
|----------|-------------|
| `text-[#1a202c]` | `var(--color-text-primary)` |
| `bg-[#2A64F5]` | `var(--color-primary)` |
| `text-[#718096]` | `var(--color-text-tertiary)` |
| `border-[#e2e8f0]` | `var(--color-border)` |

### 3. Extract Sizes

| Tailwind | CSS |
|----------|-----|
| `h-14` | `height: 3.5rem` |
| `h-12` | `height: 3rem` |
| `p-4` | `padding: 1rem` |
| `text-sm` | `font-size: 0.875rem` |
| `text-lg` | `font-size: 1.125rem` |

---

## Status Badge Pattern

```css
.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badgeSuccess {
  background-color: var(--color-success-bg);
  color: var(--color-success-text);
}

.badgeWarning {
  background-color: var(--color-warning-bg);
  color: var(--color-warning-text);
}

.badgeError {
  background-color: var(--color-error-bg);
  color: var(--color-error-text);
}
```

---

## Design Decision: Consistent Page Patterns

### Pattern 1a: Page Header Layout (Main Pages - No Back Button)

For main pages without a back button:
```
[Page Title] ─────────────────────────────── [Button] [Button]
```

**Example Pages:** Dashboard, Patient Records, Appointments, Invoice (list view)

---

### Pattern 1b: Page Header with Back Button (Detail Pages)

For detail/sub-pages with a back button - back button is ICON ONLY (no text):
```
[←] [Title]                                  [Button] [Button]
    [Subtitle - name • additional info]
```

**Structure (use PageHeader component):**
```tsx
<PageHeader 
  title="Appointment Details"
  subtitle="Liam Johnson • November 9, 2025 at 09:00 AM"
  onBack={handleBack}
  rightContent={
    <div className={styles.headerActions}>
      <button className={styles.actionBtn}>Action</button>
    </div>
  }
  styles={styles}
/>
```

**Required CSS Classes:**
```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.headerLeft {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.headerContent {
  display: flex;
  flex-direction: column;
}

.backButton {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  color: var(--color-text-secondary, #4a5568);
  transition: background 0.2s;
}

.backButton:hover {
  background: var(--color-gray-100, #f7fafc);
}

.pageTitle {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-text-primary, #1a202c);
  margin: 0;
}

.pageSubtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary, #4a5568);
  margin: 0;
}
```

**Example Pages:**
- AppointmentDetails: "Appointment Details" / "Liam Johnson • November 9, 2025 at 09:00 AM"
- Consultation: "Consultation Session" / "Liam Johnson • 34y, Male • General Checkup"
- PatientDetails: "John Doe" (patient name) / "34y, Male • A+"
- Invoice (detail): "Invoice INV-001" / "John Doe • January 15, 2026"
- AppointmentReport: "Appointment Report" / "Liam Johnson • November 9, 2025 at 09:00 AM"

---

### Pattern 2: Stats Cards Grid

All stat cards MUST use the same layout:
```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ Label            │ │ Label            │ │ Label            │
│ [Large Value]    │ │ [Large Value]    │ │ [Large Value]    │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

**Dashboard Stats (Simple):**
```tsx
<StatsGrid 
  stats={[
    { title: 'Total Patients Today', value: 145 },
    { title: 'Appointments', value: 8 },
    { title: 'Pending Tasks', value: 3 },
  ]}
  styles={styles}
/>
```

**Invoice Stats (With Icons):**
```tsx
<StatsGridWithIcon 
  items={[
    { icon: 'attach_money', value: 8750, label: 'Total Revenue', prefix: '$' },
    { icon: 'pending', value: 1250, label: 'Pending Payments', prefix: '$' },
    { icon: 'description', value: 12, label: 'Invoices This Month' },
    { icon: 'check_circle', value: 8, label: 'Paid Invoices' },
  ]}
  styles={styles}
/>
```

**CSS Pattern:**
```css
.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.statCard {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.statValue {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary, #1a202c);
}

.statLabel, .statTitle {
  font-size: 0.75rem;
  color: var(--color-text-secondary, #4a5568);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

### Pattern 3: Table/List Rows (Patient Records = Appointments)

All list rows MUST have the same structure:
```
┌─────────────────────────────────────────────────────────────────────┐
│ [Avatar] Name       │ [Date] [Time] [Type] │ [Status] │ [View Btn] │
└─────────────────────────────────────────────────────────────────────┘
```

**Structure:**
```tsx
<div className={styles.appointmentCard}>
  <div className={styles.appointmentContent}>
    <div className={styles.patientInfo}>
      <div className={styles.avatar} />
      <h3 className={styles.patientName}>{name}</h3>
    </div>
    <div className={styles.appointmentInfo}>
      <span className={styles.infoTag}>{date}</span>
      <span className={styles.infoTag}>{time}</span>
      <span className={styles.infoTag}>{type}</span>
    </div>
    <span className={styles.statusBadge}>{status}</span>
    <div className={styles.appointmentActions}>
      <button className={styles.viewButton}>View</button>
    </div>
  </div>
</div>
```

**CSS Pattern:**
```css
.appointmentCard {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.appointmentContent {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.patientInfo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 200px;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--color-gray-100, #f7fafc);
  background-size: cover;
}

.infoTag {
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  background-color: var(--color-gray-100, #f7fafc);
  font-size: 0.875rem;
  color: var(--color-text-secondary, #4a5568);
}

.viewButton {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: var(--color-primary, #3182ce);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
}
```

---

### Pattern 4: Container Padding

ALL page containers MUST use consistent padding:

```css
.container {
  flex: 1;
  padding: 1.5rem 2rem;
  background-color: var(--color-background, #f7fafc);
  overflow-y: auto;
}
```

---

### Pattern 5: Tab Navigation (CONSISTENT EVERYWHERE)

All tabs MUST use the same CSS class names and structure:

**Required CSS Classes:**
- Container: `.tabsContainer` (NOT `.tabContainer`)
- Tab button: `.tab`
- Active tab: `.tabActive` (NOT `.activeTab`)
- Tab icon: `.materialIcon` or `.tabIcon`

**Structure:**
```tsx
<SimpleTabList 
  tabs={[
    { id: 'overview', icon: 'dashboard', label: 'Overview' },
    { id: 'medical_history', icon: 'medical_information', label: 'Medical History' },
  ]}
  activeTab={activeTab}
  onTabChange={(tab) => setActiveTab(tab)}
  styles={styles}
/>
```

**CSS Pattern:**
```css
.tabsContainer {
  display: flex;
  gap: 0.5rem;
  padding: 0 2rem;
  background: white;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  position: sticky;
  top: 0;
  z-index: 9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-text-secondary, #4a5568);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  white-space: nowrap;
}

.tab:hover {
  color: var(--color-primary, #3182ce);
  background: var(--color-gray-100, #f7fafc);
}

.tabActive {
  color: var(--color-primary, #3182ce);
  border-bottom-color: var(--color-primary, #3182ce);
}

.tabIcon {
  font-size: 1.25rem;
}

/* Tab count badge (for numbered tabs like Appointments) */
.tabCount {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25rem;
  padding: 0.125rem 0.375rem;
  background-color: var(--color-gray-100, #f7fafc);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-text-secondary, #4a5568);
  min-width: 1.25rem;
}

.tabActive .tabCount {
  background-color: #EBF2FF;
  color: var(--color-primary, #3182ce);
  font-weight: 600;
}
```

**Pages Using Tabs:**
- AppointmentDetails: Overview | Medical History
- PatientDetails: Overview | Medical History
- Consultation: Medical History | Symptoms | Treatment | Follow-up
- Settings: Profile | Account Security | Preferences
- Appointments: All | Today | Upcoming | Completed | Cancelled

---

### Pattern 6: Medical History Grid (CONSISTENT DISPLAY)

Medical history MUST be displayed using `PatientHistoryGrid` component with two variants:

**Default variant (`statCard`)** - For AppointmentDetails, Consultation:
```tsx
<PatientHistoryGrid styles={styles} />
```

**History card variant (`historyCard`)** - For PatientDetails:
```tsx
<PatientHistoryGrid 
  data={{
    allergies: patient.allergies,
    familyHistory: [...],
    surgeries: [...],
    lifestyle: [...],
    conditions: [...],
  }}
  styles={styles}
  variant="historyCard"
/>
```

**Collapsible Cards (Medications & Previous Appointments):**
Always use `CollapsibleCardWithIcon` component:
```tsx
<CollapsibleCardWithIcon 
  icon="medication"
  title={STRING_CONSTANTS.LABELS.CURRENT_MEDICATIONS}
  isCollapsed={collapsedSections.currentMedications}
  onToggle={() => toggleSection('currentMedications')}
  styles={styles}
>
  <MedicationList medications={[...]} styles={styles} />
</CollapsibleCardWithIcon>

<CollapsibleCardWithIcon 
  icon="event_note"
  title={STRING_CONSTANTS.LABELS.PREVIOUS_APPOINTMENTS}
  isCollapsed={collapsedSections.previousAppointments}
  onToggle={() => toggleSection('previousAppointments')}
  styles={styles}
>
  <AppointmentList appointments={[...]} styles={styles} />
</CollapsibleCardWithIcon>
```

---

## Common Component Patterns

### Card

```css
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
}
```

### Input

```css
.input {
  box-sizing: border-box;
  height: 2.75rem;
  padding: 0 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}

.input::placeholder {
  color: var(--color-text-tertiary);
}
```

### Button

```css
.buttonPrimary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
}

.buttonPrimary:hover {
  background-color: var(--color-primary-hover);
}

.buttonPrimary:focus {
  box-shadow: var(--shadow-focus);
}
```

---

## Before Writing CSS Checklist

1. [ ] Open `/apps/doctor/src/styles/index.css` - verify variable exists
2. [ ] Check `/apps/doctor/mocks/[Page].html` for exact values
3. [ ] Look at existing CSS files for patterns
4. [ ] Use ONLY existing CSS variables
5. [ ] Include `box-sizing: border-box` where needed
6. [ ] Test visually against mock

---

## Forbidden Patterns

❌ **NEVER DO:**
- Hardcode hex colors: `color: #2A64F5`
- Invent variables: `var(--color-gray-300)`
- Override font-family in components
- Skip box-sizing on custom elements
- Use colors without var() wrapper
````
