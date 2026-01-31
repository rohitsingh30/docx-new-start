# Docx Instructions - Quick Reference

## 📚 Instruction Files

| File | When to Use |
|------|-------------|
| [project.instructions.md](./project.instructions.md) | **Start here** - Architecture, core principles |
| [frontend.instructions.md](./frontend.instructions.md) | React components, TypeScript patterns |
| [backend.instructions.md](./backend.instructions.md) | APIs, database, authentication |
| [uiux.instructions.md](./uiux.instructions.md) | CSS variables, styling, design system |
| [testing.instructions.md](./testing.instructions.md) | Tests, coverage, mocking |

---

## 🎯 Core Principles

1. **No String Literals** - All text in enums or `stringConstants.ts`
2. **Type Everything** - Strict TypeScript, no `any`
3. **CSS in styles/** - All CSS modules in `/src/styles/`
4. **Mocks = Truth** - HTML mocks are the design source
5. **Doctor First** - Build doctor app before patient/admin

---

## 📖 Quick Decision Guide

| Question | Answer |
|----------|--------|
| Starting a feature? | Read `project.instructions.md` |
| Writing a component? | Follow `frontend.instructions.md` |
| Building an API? | Follow `backend.instructions.md` |
| Styling a component? | Follow `uiux.instructions.md` |
| Writing tests? | Follow `testing.instructions.md` |

---

## 🔗 Project Files

| File | Location |
|------|----------|
| Enums | `/apps/doctor/src/types/enums.ts` |
| String Constants | `/apps/doctor/src/constants/stringConstants.ts` |
| Mock Data | `/apps/doctor/src/constants/dataConstants.ts` |
| CSS Variables | `/apps/doctor/src/styles/index.css` |
| Design Mocks | `/apps/doctor/mocks/*.html` |

---

## ⚠️ Critical Rules

```typescript
// ❌ WRONG
<button>Save</button>
const status = 'active';
interface Props { ... }  // in component file

// ✅ CORRECT  
<button>{STRING_CONSTANTS.BUTTONS.SAVE}</button>
const status = Status.ACTIVE;
import { Props } from '../types/Component.types';
```
