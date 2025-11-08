# Docx Instructions - Quick Reference

This folder contains all the instructions and guidelines for building the Docx healthcare platform.

## 📚 Instruction Files

### ⭐ **Start Here: [project.instructions.md](./project.instructions.md)**
**PRIMARY CONTEXT DOCUMENT** - Read this first!
- Complete business context for Docx
- Three-user architecture (Hospital Admin, Doctor, Patient)
- Tech stack decisions
- Data models and relationships
- Security & HIPAA compliance

### 🎨 [frontend.instructions.md](./frontend.instructions.md)
React, TypeScript, and Component Development
- React 19 + TypeScript 5.9 best practices
- No hardcoded values - use constants
- Functional components only
- Strict folder structure
- CSS Modules guidelines
- Testing requirements

### 🔧 [backend.instructions.md](./backend.instructions.md)
API, Database, and Security
- Node.js + Express + PostgreSQL
- RESTful API design patterns
- Role-based authentication (JWT)
- Database patterns with Prisma
- Error handling and validation
- Security best practices

### 🎨 [uiux.instructions.md](./uiux.instructions.md)
UI/UX Design System and Guidelines
- Color palette and typography
- Layout and responsive design
- User flows for all three roles
- Component UI patterns
- Accessibility (WCAG 2.1)
- Loading and error states

### 🧪 [testing.instructions.md](./testing.instructions.md)
Testing Strategy and Standards
- 80% coverage requirement
- Testing pyramid (60/30/10)
- AAA pattern examples
- Unit, integration, E2E testing
- Mocking strategies

## 📖 When to Use Which File

- **Starting a new feature?** → Read `project.instructions.md` for business context
- **Writing React code?** → Check `frontend.instructions.md`
- **Building APIs?** → Reference `backend.instructions.md`
- **Designing UI?** → Follow `uiux.instructions.md`
- **Writing tests?** → Use `testing.instructions.md`

## 🎯 Key Principles (All Files)

1. **Doctor First Priority** - Build doctor flow completely before patient/admin
2. **Modular & Reusable** - Build once, use everywhere (80% code reuse target)
3. **No Hardcoded Values** - Everything in constants
4. **No Duplicate Code** - DRY principle strictly enforced
5. **Test Everything** - 80% coverage minimum
6. **Lightweight** - Bundle size < 200KB per role
7. **See Every Change** - Live development with hot reload

## 📋 Also See

- [PROJECT_TRACKER.md](../ PROJECT_TRACKER.md) - Development progress and roadmap
- [DEVELOPMENT_PLAN.md](../DEVELOPMENT_PLAN.md) - Week-by-week implementation plan
- [LIVE_DEVELOPMENT_WORKFLOW.md](../LIVE_DEVELOPMENT_WORKFLOW.md) - How to see changes live

---

**Remember:** `project.instructions.md` is the PRIMARY source of truth for business logic and architecture decisions. Always read it when starting work on a new feature!
