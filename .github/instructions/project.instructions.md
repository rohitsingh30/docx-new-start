# Project Instructions - Docx

**⭐ PRIMARY CONTEXT DOCUMENT - Read this first when starting any feature**

## Overview

**Docx** is a production-ready three-sided healthcare platform connecting:
1. **Hospital Admins** - Manage doctors, resources, analytics
2. **Doctors** - Manage patients, appointments, medical records  
3. **Patients** - Book appointments, view doctors, AI health chatbot

This document contains the complete business context, architecture decisions, and implementation guidelines for Docx.

---

## 🎯 Project Goals

### Primary Objectives
- Build a **modular, reusable** codebase with 80%+ component reuse
- **Doctor-first priority** - Complete doctor flow before patient/admin
- **Lightweight** architecture - Bundle < 200KB per role
- **See every change** - Live development with immediate feedback
- **Zero technical debt** - Clean code from day one
- **80%+ test coverage** - Comprehensive testing strategy

### Development Approach
- **Sequential Development**: Doctor → Patient → Admin (not parallel)
- **Shared Components First**: Build reusable library, then use everywhere
- **Live Preview**: Every component visible in Storybook + main app
- **No Duplicate Code**: DRY principle strictly enforced

---

## 🏗️ Three-User Architecture

### Priority Order: Doctor First 👨‍⚕️

#### 1. Doctor Flow (Priority 1 - Weeks 3-5)
**Core Capabilities:**
- View dashboard with today's appointments and stats
- Manage assigned patients list (search, filter, view details)
- View patient medical history
- Add medical notes and prescriptions
- Manage appointments (view, complete, cancel)
- View own schedule and analytics

**Key Features:**
- Patient management interface
- Medical notes form
- Prescription form
- Appointment scheduling
- Patient medical history timeline

#### 2. Patient Flow (Priority 2 - Weeks 6-8)
**Core Capabilities:**
- Browse and search available doctors
- Book appointments with selected doctors
- View own upcoming/past appointments
- View medical records (prescriptions, notes, tests)
- AI health chatbot for queries and guidance
- Manage personal profile

**Key Features:**
- Doctor discovery (search by specialization, name)
- Appointment booking with date/time selection
- Medical records viewer
- AI chatbot interface
- Appointment management

#### 3. Hospital Admin Flow (Priority 3 - Weeks 9-10)
**Core Capabilities:**
- Manage doctors (add, edit, remove, assign specializations)
- View hospital-wide analytics and statistics
- Manage departments and resources
- Generate reports
- System configuration
- Audit logs for admin actions

**Key Features:**
- Doctor management (CRUD operations)
- Analytics dashboard with charts
- Report generation
- Department management
- Role-based access control (RBAC)

---

## 💻 Technical Stack

### Frontend
- **React 19.1.1** - UI library
- **TypeScript 5.9.2** (strict mode) - Type safety
- **React Router** - Navigation between flows
- **CSS Modules** - Component styling
- **Jest + React Testing Library** - Testing
- **Storybook** - Component development and documentation

### Backend (Planned)
- **Node.js 18+** - Runtime
- **Express.js or Fastify** - API framework
- **PostgreSQL 15** - Database
- **Prisma or TypeORM** - ORM
- **JWT** - Authentication with role-based claims
- **OpenAI/Claude API** - AI chatbot for patients

### DevOps
- **GitHub Actions** - CI/CD
- **Vercel/Netlify** - Frontend hosting
- **Railway/Render** - Backend hosting
- **Sentry** - Error monitoring

---

## 📊 Data Models

### User Types
```typescript
type UserRole = 'admin' | 'doctor' | 'patient';

interface Admin {
  id: string;
  email: string;
  name: string;
  hospitalId: string;
  permissions: string[];
  createdAt: Date;
}

interface Doctor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  specialization: string;
  experience: number;
  department: string;
  phoneNumber: string;
  assignedPatients: string[]; // patient IDs
  schedule: AppointmentSlot[];
  isActive: boolean;
}

interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  bloodType: string;
  phoneNumber: string;
  address: string;
  medicalHistory: MedicalNote[];
  assignedDoctorId: string;
  appointments: Appointment[];
}
```

### Core Entities
```typescript
interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: Date;
  duration: number; // minutes
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdBy: UserRole;
}

interface MedicalNote {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  diagnosis: string;
  symptoms: string;
  notes: string;
  prescriptions: Prescription[];
}

interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedDate: Date;
}
```

---

## 🔒 Security & Compliance

### Authentication
- **JWT-based** authentication with role claims
- Token structure: `{ userId, role: 'admin' | 'doctor' | 'patient', exp }`
- Refresh token mechanism for extended sessions
- Role-based route protection

### Authorization (RBAC)
**Admin can:**
- Manage doctors (CRUD)
- View all data (hospital-wide)
- Generate reports
- Configure system settings

**Doctor can:**
- View/edit assigned patients only
- Add medical notes and prescriptions
- Manage own appointments
- View own schedule

**Patient can:**
- View own data only
- Book appointments
- View assigned doctor(s)
- Use AI chatbot

### HIPAA Compliance Considerations
- Encrypt sensitive data at rest and in transit
- Audit logging for all data access
- Role-based access controls
- Secure PHI (Protected Health Information)
- Data retention policies
- Patient consent management

---

## 🎨 Design System (Brief)

### Colors
- **Doctor**: Blue theme (`#3182ce`)
- **Patient**: Green theme (`#38a169`)
- **Admin**: Orange/Yellow theme (`#d69e2e`)
- **Error**: Red (`#e53e3e`)
- **Success**: Green (`#48bb78`)

### Typography
- **Headings**: System font stack (SF Pro, Segoe UI, Roboto)
- **Body**: 16px base, 1.5 line-height
- **Code**: Monospace

### Spacing
- Base unit: 8px
- Scale: 8, 16, 24, 32, 40, 48px

---

## 📁 Folder Structure

```
src/
├── shared/                    # Reusable across all roles
│   ├── components/           # Card, Button, Input, Table, Modal
│   ├── hooks/                # useAuth, useApi, useForm
│   ├── services/             # authService, apiService
│   ├── types/                # Common TypeScript types
│   └── utils/                # Helper functions
├── features/
│   ├── auth/                 # Login/logout
│   ├── doctor/               # Doctor flow (Priority 1)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── patient/              # Patient flow (Priority 2)
│   └── admin/                # Admin flow (Priority 3)
├── dev/                      # Development-only utilities
│   └── UserSelector.tsx      # Role picker for testing
└── App.tsx                   # Root with routing
```

---

## 🚀 Development Phases

### Phase 1: Foundation (Weeks 1-2)
- Setup code quality tools
- Create shared component library
- Setup authentication (mock for dev)
- Create folder structure

### Phase 2A: Doctor Flow (Weeks 3-5)
- Build shared components (Card, Button, Input, Table)
- Doctor dashboard
- Patient management for doctors
- Medical notes and prescriptions
- Appointment management

### Phase 2B: Patient Flow (Weeks 6-8)
- Patient dashboard (reuse 80% components)
- Doctor discovery
- Appointment booking
- Medical records view
- AI chatbot integration

### Phase 2C: Admin Flow (Weeks 9-10)
- Admin dashboard (reuse 80-90% components)
- Doctor management
- Analytics and reports

### Phase 3: Advanced Features (Weeks 11-12)
- Performance optimization
- Real-time features
- File uploads
- Production deployment

---

## ✅ Quality Standards

### Code Quality
- **No hardcoded values** - Use constants
- **No duplicate code** - Extract to shared utilities
- **Functional components only** - No class components
- **TypeScript strict mode** - No `any` types
- **ESLint + Prettier** - Consistent formatting

### Testing
- **80% minimum coverage**
- **Testing pyramid**: 60% unit, 30% integration, 10% E2E
- **AAA pattern**: Arrange, Act, Assert
- **Test user behavior**, not implementation

### Performance
- **Bundle size < 200KB** per role
- **Code splitting** by route
- **Lazy loading** for heavy components
- **Tree shaking** enabled

---

## 🎯 Success Metrics

### Week 5 Target
- ✅ Complete doctor flow functional
- ✅ 10+ shared components built
- ✅ 80%+ test coverage for doctor flow
- ✅ Doctor can manage patients and appointments

### Week 8 Target
- ✅ Complete patient flow functional
- ✅ 80% code reuse from doctor flow
- ✅ AI chatbot working
- ✅ Patient can book appointments

### Week 10 Target
- ✅ Complete admin flow functional
- ✅ 90% code reuse from previous flows
- ✅ Analytics dashboard working
- ✅ All three flows integrated

---

## 📚 Related Documents

- **Implementation**: See `.github/DEVELOPMENT_PLAN.md`
- **Progress**: See `.github/PROJECT_TRACKER.md`
- **Live Dev**: See `.github/LIVE_DEVELOPMENT_WORKFLOW.md`
- **Frontend**: See `.github/instructions/frontend.instructions.md`
- **Backend**: See `.github/instructions/backend.instructions.md`
- **UI/UX**: See `.github/instructions/uiux.instructions.md`
- **Testing**: See `.github/instructions/testing.instructions.md`

---

**Remember**: This is the PRIMARY context document. Read this before starting any new feature to understand the business requirements and technical decisions!
