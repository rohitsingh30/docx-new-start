# Project Instructions

## Architecture

**Three separate React apps sharing common library:**
- Doctor App (priority 1)
- Patient App  
- Admin App

Located: `/apps/doctor`, `/apps/patient`, `/apps/admin`

---

## Core Principles

1. **Enum-first** - NO string literals, all fixed values in enums
2. **Shared components** - `/packages/shared` for reuse
3. **Sequential development** - Doctor → Patient → Admin
4. **All CSS in styles/** - `/apps/[app]/src/styles/*.module.css`

---

## Enum Usage (MANDATORY)

**Define in `/apps/[app]/src/types/enums.ts`:**

```typescript
export enum Gender { MALE = 'Male', FEMALE = 'Female', OTHER = 'Other' }
export enum DoctorStatus { ACTIVE = 'Active', INACTIVE = 'Inactive' }
export enum BloodType { A_POSITIVE = 'A+', O_NEGATIVE = 'O-' }
```

**❌ NEVER:** `gender: 'Male'` or `if (status === 'active')`
**✅ ALWAYS:** `gender: Gender.MALE` or `if (status === DoctorStatus.ACTIVE)`

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

- **Mocks are source of truth** for design
- **ALL string/UI text** in `constants/stringConstants.ts`
- **ALL CSS** in `styles/` folder
- **Type everything** - strict TypeScript mode
- **No any types** - explicit types required
