# Frontend Instructions

## Tech Stack

- React 19.1.1 + TypeScript 5.9.2 (strict)
- CSS Modules (all in `styles/` folder)
- React Router, Jest, Storybook

---

## ABSOLUTE RULE: Mock Updates are MANDATORY

**WHENEVER you modify ANY UI component, you MUST update the corresponding HTML mock file.**

### Mock Update Workflow (NEVER SKIP):

1. **After ANY component change** (removal, addition, style, layout):
   - Locate the HTML mock file in `/apps/[app]/mocks/[PageName].html`
   - Update the HTML to match the new component structure
   - Remove/add/modify HTML elements to reflect the change
   - Maintain Tailwind CSS classes and styling

2. **What counts as "component change" requiring mock update:**
   - ❌ Removing UI elements (profile section, buttons, cards, navigation items)
   - ❌ Adding UI elements (new fields, sections, navigation items)
   - ❌ Changing layout (reordering, resizing, repositioning)
   - ❌ Modifying visible styles (colors, fonts, spacing)
   - ❌ Updating text/labels
   - ✅ Internal logic changes with NO visual impact (state management, API calls)

3. **Mock file locations (HTML FILES):**
   - Dashboard: `/apps/doctor/mocks/Dashboard.html`
   - Login: `/apps/doctor/mocks/Login.html`
   - Other pages: `/apps/doctor/mocks/[PageName].html`

4. **Steps to update HTML mock (REQUIRED):**
   ```bash
   # 1. Open the HTML mock file
   # 2. Locate the section that changed
   # 3. Update/remove/add HTML elements to match the React component
   # 4. Preserve Tailwind classes and structure
   # 5. Test by opening HTML file in browser
   ```

5. **Example: Removing profile section from sidebar**
   ```html
   <!-- BEFORE -->
   <div class="flex items-center gap-3 px-2">
     <div class="...profile-image..."></div>
     <div class="flex flex-col">
       <h1>Dr. Emily Carter</h1>
       <p>Cardiologist</p>
     </div>
   </div>
   
   <!-- AFTER -->
   <!-- Section removed completely -->
   ```

6. **Document mock update in CHANGELOG:**
   - Add entry: "Updated [PageName].html mock to reflect [change description]"

**FAILURE TO UPDATE HTML MOCKS = INCOMPLETE WORK**

HTML mock files are the source of truth. When you change the React app, you MUST update the corresponding HTML mock to match.

---

## CRITICAL: Mock Comparison Process

**When implementing from a mock, ALWAYS follow this checklist:**

1. **Layout Structure Analysis**
   - [ ] Identify ALL major containers (header, sidebar, main content, footer)
   - [ ] List ALL visible UI elements in each container
   - [ ] Note spacing, borders, dividers between sections
   - [ ] Check for navigation bars (top and/or side)
   
2. **Component Inventory**
   - [ ] List every button, input, icon, image, card, table
   - [ ] Check each data value (numbers, text, statuses)
   - [ ] Verify color-coded elements (badges, status indicators)
   - [ ] Note active/inactive states

3. **Mock vs Implementation Comparison** 
   - [ ] Open mock in Playwright browser
   - [ ] Take screenshot of mock
   - [ ] Open running app in Playwright
   - [ ] Take screenshot of app
   - [ ] Compare side-by-side for missing elements
   - [ ] Check for extra elements not in mock

4. **Missing Elements Check**
   - [ ] Search bars, filters, dropdowns
   - [ ] Icons (notification, chat, profile, menu)
   - [ ] Borders, dividers, separators
   - [ ] Headers, footers
   - [ ] Background colors, shadows

**NEVER assume - ALWAYS verify visually with Playwright**

---

## Automated Quality Checks

### Before Completing Any Component:

```bash
# 1. Check for string literals (should only return imports, types, CSS)
grep -n '"' src/components/YourComponent.tsx | grep -v "import\|from\|className"

# 2. Check for single-quote strings (enums, imports only)
grep -n "'" src/components/YourComponent.tsx | grep -v "import\|from\|className"

# 3. TypeScript compilation
npm run build

# 4. Run linter
npm run lint
```

### Violation Examples to Catch:

```typescript
// ❌ Will be caught by grep check
const title = "Dashboard Overview";
return <h1>Welcome</h1>;
placeholder="Search here"

// ✅ Will pass - only imports/classNames
import styles from '../styles/Component.module.css';
className={styles.container}
```

---

## Core Rules

1. **Enum-first** - NO string literals (`Gender.MALE` not `'Male'`)
2. **String constants** - All UI text in `stringConstants.ts`
3. **CSS in styles/** - `/apps/[app]/src/styles/*.module.css`
4. **Functional components** - Hooks only, no classes
5. **Type everything** - No `any`, explicit types required
6. **Mock fidelity** - Implementation must match mock structure EXACTLY
7. **NO template literal classNames** - FORBIDDEN pattern

---

## ABSOLUTE: NO Template Literal ClassName Pattern

**NEVER use template literals directly in className attributes.**

### ❌ FORBIDDEN Patterns:

```tsx
// ❌ WRONG - Template literal in className
<div className={`${styles.item} ${isActive ? styles.active : ''}`}>

// ❌ WRONG - Inline conditional with template literal
<div className={`${styles.base} ${variant === 'primary' ? styles.primary : styles.secondary}`}>

// ❌ WRONG - Multiple conditions in template literal
<div className={`${styles.card} ${isDisabled && styles.disabled} ${isSelected && styles.selected}`}>
```

### ✅ CORRECT Patterns:

```tsx
// ✅ CORRECT - Compute className in variable BEFORE JSX
const itemClass = isActive 
  ? `${styles.item} ${styles.active}` 
  : styles.item;

return <div className={itemClass}>

// ✅ CORRECT - Use helper function
const getClassName = () => {
  const classes = [styles.base];
  if (isActive) classes.push(styles.active);
  if (isDisabled) classes.push(styles.disabled);
  return classes.join(' ');
};

return <div className={getClassName()}>

// ✅ CORRECT - Early computation for multiple conditions
const cardClass = [
  styles.card,
  isDisabled && styles.disabled,
  isSelected && styles.selected
].filter(Boolean).join(' ');

return <div className={cardClass}>
```

### Enforcement Rule:

**BEFORE writing any JSX with conditional className:**
1. Declare a variable to compute the className
2. Use ternary or helper function to build the string
3. Pass the variable to className prop
4. NEVER put template literals directly in JSX attributes

**Violation = Incomplete work. Must be fixed immediately.**

---

## ABSOLUTE: Zero String Literals Policy

**EVERY visible text string MUST come from `stringConstants.ts` - NO EXCEPTIONS**

**EVERY className value MUST come from CSS Modules or `componentConstants.ts` - NO EXCEPTIONS**

### CRITICAL: NO String Literal ClassNames

**NEVER use string literal values in className attributes.**

#### ❌ FORBIDDEN:

```tsx
// ❌ WRONG - String literal in className
<span className="material-symbols-outlined">icon_name</span>

// ❌ WRONG - Any hardcoded className
<div className="container">
<button className="btn-primary">

// ❌ WRONG - Framework/library classes as strings
<div className="flex items-center">

// ❌ WRONG - Using constants from componentConstants.ts for className
<span className={COMPONENT_CONSTANTS.CSS_CLASSES.MATERIAL_ICONS}>icon_name</span>
```

#### ✅ CORRECT - CSS Modules Approach:

```tsx
// ✅ CORRECT - CSS Module for component styles
<div className={styles.container}>

// ✅ CORRECT - CSS Module for icon classes
<span className={styles.materialIcon}>icon_name</span>
```

#### How to Handle Material Icons:

**1. Add .materialIcon to component's CSS Module file:**
```css
/* ComponentName.module.css */
.materialIcon {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}
```

**2. Use in component:**
```tsx
import styles from '../styles/ComponentName.module.css';

<span className={styles.materialIcon}>icon_name</span>
```

**3. Apply to ALL Material Icons in the component:**
- Logo icons
- Navigation icons  
- Button icons
- Input field icons
- Any Google Material Symbols

**Why CSS Modules, not constants?**
- CSS Modules keep styles in CSS files where they belong
- No need for componentConstants.CSS_CLASSES pattern
- Better separation of concerns
- Consistent with rest of styling approach

**Enforcement:** Run grep check:
```bash
grep -r 'className="' src/components/
# Should return NOTHING (exit code 1)
```

### CRITICAL: Complete Multi-Step Fixes Atomically

**When fixing string literal violations, you MUST complete ALL steps before responding:**

1. **Identify ALL violations** in the file/function
2. **Add ALL required constants** to stringConstants.ts
3. **Replace ALL violations** in the component code
4. **Verify with grep** that no violations remain
5. **Update CHANGELOG** with both changes

**NEVER stop after step 2 to explain what you did. Complete steps 2, 3, 4 atomically.**

#### Example of WRONG Approach (INCOMPLETE):

```
❌ Step 1: Find violations in Dashboard.tsx getStatusLabel
❌ Step 2: Add STATUS_LABELS to stringConstants.ts
❌ STOP and explain to user ← WRONG! You haven't fixed the actual code!
```

#### Example of CORRECT Approach (ATOMIC):

```
✅ Step 1: Find violations in Dashboard.tsx getStatusLabel
✅ Step 2: Add STATUS_LABELS to stringConstants.ts
✅ Step 3: Replace ALL 'Active'/'Pending' etc with STRING_CONSTANTS.STATUS_LABELS.*
✅ Step 4: Run grep check to verify zero violations
✅ Step 5: Update CHANGELOG
✅ THEN respond to user with completion message
```

**Why This Matters:**
- Adding constants without applying them = incomplete fix
- User sees the violation still exists
- Wastes time with back-and-forth
- Builds bad habits

**Rule:** If you add a constant, you MUST immediately use it. No explanations in between.

### What Counts as a String Literal (ALL FORBIDDEN):

```typescript
// ❌ WRONG - Direct string literals
<h1>Dashboard</h1>
<button>Save</button>
<input placeholder="Enter name" />
<div aria-label="Close button" />
<img alt="User avatar" />
<option>Select option</option>
```

```typescript
// ✅ CORRECT - From STRING_CONSTANTS
<h1>{STRING_CONSTANTS.LABELS.DASHBOARD}</h1>
<button>{STRING_CONSTANTS.BUTTONS.SAVE}</button>
<input placeholder={STRING_CONSTANTS.PLACEHOLDERS.ENTER_NAME} />
<div aria-label={STRING_CONSTANTS.ARIA_LABELS.CLOSE_BUTTON} />
<img alt={STRING_CONSTANTS.ALT_TEXT.USER_AVATAR} />
<option>{STRING_CONSTANTS.OPTIONS.SELECT_OPTION}</option>
```

### String Constant Categories in `stringConstants.ts`:

```typescript
export const STRING_CONSTANTS = {
  LABELS: { /* All headings, labels, titles */ },
  BUTTONS: { /* All button text */ },
  MESSAGES: { /* Success, error, info messages */ },
  PLACEHOLDERS: { /* Input placeholders */ },
  ARIA_LABELS: { /* Accessibility labels */ },
  ALT_TEXT: { /* Image alt text */ },
  TOOLTIPS: { /* Tooltip text */ },
  OPTIONS: { /* Dropdown/select options */ },
  VALIDATION: { /* Form validation messages */ },
} as const;
```

### Pre-Code Checklist (MANDATORY):

Before writing ANY component with text:

1. [ ] Identify EVERY string that will appear in the UI
2. [ ] Add ALL strings to appropriate category in `stringConstants.ts`
3. [ ] Import `STRING_CONSTANTS` in component
4. [ ] Use constants for ALL text (including placeholders, aria-labels, alt text)
5. [ ] Search code for quotes: `"..."` or `'...'` - if found, move to constants
6. [ ] Run final check: `grep -n '".*"' ComponentName.tsx` should return NO UI strings

### String Literal Fix Workflow (ATOMIC EXECUTION):

When you find string literal violations, execute ALL steps without interruption:

```typescript
// Step 1: IDENTIFY - Search for violations
grep -n '"' src/components/Component.tsx | grep -v "import|from|className"

// Step 2: ADD CONSTANTS - Update stringConstants.ts
export const STRING_CONSTANTS = {
  // ... existing
  NEW_CATEGORY: {
    CONSTANT_1: 'Value 1',
    CONSTANT_2: 'Value 2',
  }
}

// Step 3: REPLACE - Update component immediately (same turn)
// Change: return 'Value 1';
// To:     return STRING_CONSTANTS.NEW_CATEGORY.CONSTANT_1;

// Step 4: VERIFY - Confirm zero violations
grep -n '"' src/components/Component.tsx | grep -v "import|from|className"
// Should return nothing or exit code 1

// Step 5: DOCUMENT - Update CHANGELOG
```

**DO NOT explain between steps 2 and 3. Complete the entire workflow atomically.**

---

## File Structure

```
apps/doctor/src/
├── components/          # React components
├── styles/             # ALL CSS (*.module.css, index.css)
├── types/
│   └── enums.ts        # ALL enums (Gender, Status, etc.)
├── constants/
│   └── stringConstants.ts  # ALL UI text
├── utils/              # Helper functions
├── hooks/              # Custom hooks
├── contexts/           # React contexts
└── services/           # API calls
```

---

## Component Pattern

```typescript
// components/PatientCard.tsx
import styles from '../styles/PatientCard.module.css';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { Gender } from '../types/enums';

interface PatientCardProps {
  name: string;
  gender: Gender;  // ✅ Enum, not string
  age: number;
}

export const PatientCard: React.FC<PatientCardProps> = ({ name, gender, age }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{STRING_CONSTANTS.LABELS.GENDER}: {gender}</p>
    </div>
  );
};
```

---

## CSS Modules

**Import:**
```typescript
import styles from '../styles/Component.module.css';
```

**Usage:**
```typescript
<div className={styles.container}>
  <h1 className={styles.title}>Title</h1>
</div>
```

**Multiple classes:**
```typescript
<div className={`${styles.card} ${styles.active}`}>
```

---

## Constants Pattern

```typescript
// constants/stringConstants.ts
export const STRING_CONSTANTS = {
  LABELS: {
    APP_NAME: 'DocX',
    EMAIL_ADDRESS: 'Email Address',
    PASSWORD: 'Password',
  },
  BUTTONS: {
    LOGIN: 'Login',
    SUBMIT: 'Submit',
  },
  MESSAGES: {
    LOADING: 'Loading...',
    ERROR: 'Something went wrong',
  },
};
```

---

## Enum Pattern

```typescript
// types/enums.ts
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum DoctorStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum FormFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
}
```

---

## Form Handling

```typescript
const [formData, setFormData] = useState<PatientFormData>({
  name: '',
  gender: Gender.MALE,  // ✅ Use enum
  age: 0,
});

const handleChange = (field: keyof PatientFormData, value: any) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

<input
  type={FormFieldType.TEXT}
  value={formData.name}
  onChange={(e) => handleChange('name', e.target.value)}
/>
```

---

## Mock-Based Development

1. Check `/apps/[app]/mocks/` for design
2. Extract values from mock's tailwind.config
3. Implement in CSS Modules with exact values
4. Verify with Playwright (mock vs app)

---

## Common Patterns

**Conditional rendering:**
```typescript
{isLoading && <Spinner />}
{error && <ErrorMessage message={error} />}
{data && <DataDisplay data={data} />}
```

**Lists:**
```typescript
{patients.map(patient => (
  <PatientCard key={patient.id} {...patient} />
))}
```

**Event handlers:**
```typescript
const handleSubmit = useCallback((e: FormEvent) => {
  e.preventDefault();
  // logic
}, [dependencies]);
```

---

## Testing Requirements

- Test files: `Component.test.tsx` next to component
- Test user interactions, not implementation
- Mock API calls in tests
- Aim for 80%+ coverage

---

## Key Rules

❌ **NEVER:**
- String literals (`'Male'`, `'Active'`)
- CSS outside `styles/` folder
- `any` types
- Hardcoded text in components
- Class components

✅ **ALWAYS:**
- Enums (`Gender.MALE`, `DoctorStatus.ACTIVE`)
- CSS Modules from `styles/`
- Explicit types
- String constants
- Functional components + hooks
