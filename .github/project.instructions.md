# Project Instructions

## Architecture

**Three separate React apps sharing common library:**
- Doctor App (priority 1)
- Patient App  
- Admin App

Located: `/apps/doctor`, `/apps/patient`, `/apps/admin`

---

## Core Principles

1. **NO STRING LITERALS** - Define ALL strings in enums or constants (see Enum Usage below)
2. **Enum-first** - NO hardcoded string literals, all fixed values in enums
3. **String constants** - All UI text in `constants/stringConstants.ts`
4. **Shared components** - `/packages/shared` for reuse
5. **Sequential development** - Doctor → Patient → Admin
6. **All CSS in styles/** - `/apps/[app]/src/styles/*.module.css` (NO color files elsewhere)

---

## String Literals Rule (CRITICAL)

**NEVER use hardcoded string literals anywhere in code.**

### Two Types of Strings:

1. **Fixed/Enumerable Values** → Define in `enums.ts`
   - Gender, Status, Types, Roles, etc.
   - Any value that represents a fixed set of options

2. **UI Text (labels, buttons, messages)** → Define in `stringConstants.ts`
   - Button text, labels, placeholders, error messages
   - Any text visible to users

### Examples:

```typescript
// ❌ WRONG - String literals
const status = 'active';
if (type === 'general') { ... }
<button>Save</button>
<input placeholder="Enter name" />

// ✅ CORRECT - Use enums and constants
const status = DoctorStatus.ACTIVE;
if (type === AppointmentType.GENERAL) { ... }
<button>{STRING_CONSTANTS.BUTTONS.SAVE}</button>
<input placeholder={STRING_CONSTANTS.PLACEHOLDERS.ENTER_NAME} />
```

---

## Enum Usage (MANDATORY)

**Define in `/apps/[app]/src/types/enums.ts`:**

```typescript
export enum Gender { MALE = 'Male', FEMALE = 'Female', OTHER = 'Other' }
export enum DoctorStatus { ACTIVE = 'Active', INACTIVE = 'Inactive' }
export enum BloodType { A_POSITIVE = 'A+', O_NEGATIVE = 'O-' }
export enum AppointmentStatus { SCHEDULED = 'Scheduled', COMPLETED = 'Completed' }
```

**❌ NEVER:** `gender: 'Male'` or `if (status === 'active')` or `<h1>Dashboard</h1>`
**✅ ALWAYS:** `gender: Gender.MALE` or `if (status === DoctorStatus.ACTIVE)` or `<h1>{STRING_CONSTANTS.LABELS.DASHBOARD}</h1>`

---

## File Structure

```
apps/doctor/src/
├── components/       # React components
├── styles/          # ALL CSS files (*.module.css, index.css)
├── types/
│   └── enums.ts     # ALL enums here
├── constants/       # String constants, form configs
├── utils/           # Helper functions
└── hooks/           # Custom hooks
```

---

## Development Workflow

1. Check `/apps/[app]/mocks/` for design specs
2. Extract exact values from mocks (use Playwright to verify)
3. Implement with enums + constants (no hardcoded values)
4. Add CSS to `styles/` folder
5. Verify with Playwright before completing

---

## Key Rules

- **NO STRING LITERALS** - All strings must be in enums or stringConstants.ts (ZERO tolerance)
- **Mocks are source of truth** for design
- **ALL fixed values** in `types/enums.ts` (Gender, Status, Types, etc.)
- **ALL UI text** in `constants/stringConstants.ts` (buttons, labels, messages)
- **ALL CSS** in `styles/` folder (no color files elsewhere)
- **Type everything** - strict TypeScript mode
- **No any types** - explicit types required

### Quick Check Before Completing Work:

```bash
# Should return ZERO results (except imports, classNames)
grep -n '"[A-Za-z]' src/components/YourComponent.tsx | grep -v "import\|from\|className"
```

If this returns any results, you have string literal violations that MUST be fixed.
