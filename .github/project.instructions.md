````instructions
# Project Instructions

## Overview

DocX is a healthcare platform with **three separate React apps** sharing common patterns:
- **Doctor App** (Priority 1) - `/apps/doctor`
- **Patient App** - `/apps/patient`  
- **Admin App** - `/apps/admin`

---

## Architecture

```
docx/
├── apps/
│   ├── doctor/       # React 19 + TypeScript
│   ├── patient/      # React 19 + TypeScript
│   └── admin/        # React 19 + TypeScript
├── backend/          # Node.js + Express + MongoDB/Mongoose
└── packages/shared/  # Shared components (future)
```

---

## Core Principles

| # | Principle | Rule |
|---|-----------|------|
| 1 | **No String Literals** | ALL strings in enums or `stringConstants.ts` |
| 2 | **Enum-First** | Fixed values → `enums.ts`, UI text → `stringConstants.ts` |
| 3 | **Type Everything** | Strict TypeScript, zero `any` |
| 4 | **CSS in styles/** | All CSS modules in `/src/styles/` |
| 5 | **Sequential Dev** | Doctor → Patient → Admin |
| 6 | **Mocks = Truth** | `/mocks/*.html` are the source of truth |

---

## The String Literals Rule (CRITICAL)

**NEVER use hardcoded strings anywhere in code.**

### Two Categories:

| Category | Where | Example |
|----------|-------|---------|
| Fixed Values | `types/enums.ts` | Gender, Status, Roles |
| UI Text | `constants/stringConstants.ts` | Buttons, Labels, Messages |

### Examples:

```typescript
// ❌ WRONG
const status = 'active';
if (type === 'general') { ... }
<button>Save</button>

// ✅ CORRECT
const status = DoctorStatus.ACTIVE;
if (type === AppointmentType.GENERAL) { ... }
<button>{STRING_CONSTANTS.BUTTONS.SAVE}</button>
```

---

## File Organization

```
apps/doctor/src/
├── components/       # React components (no inline interfaces)
├── modals/          # Modal components
├── styles/          # ALL CSS modules
├── types/
│   ├── enums.ts     # ALL enums
│   └── *.types.ts   # Component interfaces
├── constants/
│   ├── stringConstants.ts   # UI text
│   └── dataConstants.ts     # Mock data
├── services/        # API calls
├── contexts/        # React contexts
├── hooks/           # Custom hooks
└── utils/           # Helpers
```

---

## Development Workflow

1. **Check Mock** → `/apps/[app]/mocks/[Page].html`
2. **Extract Values** → Colors, sizes, text from mock
3. **Define Constants** → Add to enums/stringConstants FIRST
4. **Implement** → Use constants, never hardcode
5. **Style** → CSS modules in `/styles/`
6. **Verify** → Compare with mock visually

---

## Quick Reference

| Need | Location |
|------|----------|
| Enum values | `src/types/enums.ts` |
| UI strings | `src/constants/stringConstants.ts` |
| Mock data | `src/constants/dataConstants.ts` |
| Component types | `src/types/[Component].types.ts` |
| Styles | `src/styles/[Component].module.css` |
| Design reference | `mocks/[Page].html` |

---

## Related Instructions

- [frontend.instructions.md](./frontend.instructions.md) - React & component patterns
- [backend.instructions.md](./backend.instructions.md) - API & database patterns
- [uiux.instructions.md](./uiux.instructions.md) - CSS variables & design system
- [testing.instructions.md](./testing.instructions.md) - Testing standards
````
