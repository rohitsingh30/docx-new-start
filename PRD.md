# Docx Healthcare Platform - Product Requirements Document

> **Last Updated**: January 30, 2026  
> **Current Phase**: Phase 1 - Doctor App API Integration  
> **Sprint**: Week 1

---

## Table of Contents

1. [Product Vision](#product-vision)
2. [Current State](#current-state)
3. [Phase Roadmap](#phase-roadmap)
4. [Phase 1 Tasks](#phase-1-tasks---doctor-app-api-integration)
5. [API Status Tracker](#api-status-tracker)
6. [Component Integration Map](#component-integration-map)
7. [Database Migrations](#database-migrations)
8. [Agent Instructions](#agent-instructions)

---

## Product Vision

### One-Liner
**Docx is a speed-first clinic management platform that lets doctors see more patients with less typing.**

### Target User
- **Primary**: Individual doctors and small clinics (1-5 doctors) in India
- **Secondary**: Patients booking appointments
- **Tertiary**: Hospital chains (future expansion)

### Core Value Proposition
1. **For Doctors**: Complete consultation in < 5 minutes with minimal typing
2. **For Patients**: Easy online booking + digital prescriptions
3. **For Clinics**: Full patient data, appointment management, billing

### Success Metrics (MVP)
- [ ] Doctor can complete end-to-end patient flow (add → consult → prescribe)
- [ ] All data persists in database (zero mock data in production)
- [ ] < 3 clicks to start a consultation
- [ ] Prescription PDF generated in < 2 seconds

---

## Current State

### What's Built ✅

| Component | Status | Notes |
|-----------|--------|-------|
| Doctor App UI | ✅ Complete | All screens built, using mock data |
| Backend API | ✅ Partial | Auth + basic CRUD, missing consultation flow |
| Database Schema | ✅ Partial | Core tables exist, need Consultation/Vitals/Prescription |
| Authentication | ✅ Working | JWT login, role-based access |
| Patient App | ❌ Not started | Only README placeholder |
| Admin App | ❌ Not started | Only README placeholder |

### What's Using Mock Data ❌

| Component | Mock Data Location | Real API Needed |
|-----------|-------------------|-----------------|
| Dashboard | `dataConstants.ts` → `dashboardStats` | `GET /api/doctor/stats` |
| Appointments | `dataConstants.ts` → `appointmentsData` | `GET /api/doctor/appointments` ✅ |
| AppointmentDetails | `dataConstants.ts` → hardcoded | `GET /api/doctor/appointments/:id` |
| PatientRecords | `dataConstants.ts` → `patientsData` | `GET /api/doctor/patients` ✅ |
| PatientDetails | Hardcoded in component | `GET /api/doctor/patients/:id` ✅ |
| Consultation | Hardcoded symptoms/medicines | `POST /api/doctor/consultations` |
| Settings | Hardcoded "Dr. John Smith" | `GET /api/auth/me` ✅ |

### API Integration Status

```
✅ = API exists and frontend uses it
🔌 = API exists but frontend uses mock data
🔨 = API needs to be built
❌ = Not started
```

---

## Phase Roadmap

### Phase 1: Doctor App API Integration (Week 1-2) 🔄 CURRENT
> **Goal**: Doctor app fully functional with real database

- [ ] Add Consultation, Vitals, Prescription tables
- [ ] Build missing API endpoints
- [ ] Connect all frontend components to real APIs
- [ ] Remove all mock data imports
- [ ] Test full CRUD cycle

### Phase 2: Prescription PDF (Week 3)
> **Goal**: Digital prescriptions generated and shareable

- [ ] Design prescription template (customizable header)
- [ ] Implement React-PDF generation
- [ ] Upload to Cloudflare R2
- [ ] Share via email link
- [ ] WhatsApp integration (optional)

### Phase 3: Patient App (Week 4-5)
> **Goal**: Patients can book appointments online

- [ ] Patient registration/login
- [ ] Doctor listing with availability
- [ ] Appointment booking flow
- [ ] My appointments view
- [ ] My prescriptions view
- [ ] Email notifications

### Phase 4: Receptionist Role (Week 6)
> **Goal**: Clinic workflow with role separation

- [ ] Add RECEPTIONIST role
- [ ] Receptionist dashboard
- [ ] Queue management view
- [ ] Vitals entry screen (fast input)
- [ ] Basic billing/invoice

### Phase 5: Polish & Production (Week 7-8)
> **Goal**: Production-ready deployment

- [ ] Error handling improvements
- [ ] Loading states everywhere
- [ ] Mobile responsive testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Production deployment

### Future Phases (Backlog)
- [ ] AI symptom autocomplete
- [ ] AI patient chatbot for pre-assessment
- [ ] Telemedicine (video calls)
- [ ] Desktop app with offline support (Tauri)
- [ ] Drug interaction warnings
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Hospital/multi-clinic support

---

## Phase 1 Tasks - Doctor App API Integration

### Sprint 1.1: Database Setup (Day 1-2)

- [x] **Task 1.1.1**: Add soft delete to existing models
  - Added `deletedAt DateTime?` to User, Patient, Appointment
  - Updated queries to filter `WHERE deletedAt IS NULL`

- [x] **Task 1.1.2**: Create Consultation model (Mongoose schema)

- [x] **Task 1.1.3**: Create Vitals model (Mongoose schema)

- [x] **Task 1.1.4**: Create Prescription model (Mongoose schema)

- [x] **Task 1.1.5**: Apply MongoDB model updates

- [x] **Task 1.1.6**: Update seed data with sample consultations

### Sprint 1.2: Build Missing APIs (Day 3-5)

- [x] **Task 1.2.1**: `GET /api/doctor/stats` - Dashboard statistics
  ```typescript
  Response: {
    totalPatients: number,
    todayAppointments: number,
    pendingAppointments: number,
    completedToday: number,
    upcomingThisWeek: number
  }
  ```

- [x] **Task 1.2.2**: `GET /api/doctor/appointments/:id` - Single appointment with patient
  ```typescript
  Response: {
    appointment: Appointment & { patient: Patient & { user: User } }
  }
  ```

- [x] **Task 1.2.3**: `POST /api/doctor/appointments` - Create appointment
  ```typescript
  Body: {
    patientId: string,
    date: string,
    startTime: string,
    duration: number,
    type: string,
    room?: string,
    notes?: string
  }
  ```

- [x] **Task 1.2.4**: `PATCH /api/doctor/appointments/:id` - Update/reschedule
  ```typescript
  Body: {
    date?: string,
    startTime?: string,
    duration?: number,
    room?: string,
    notes?: string
  }
  ```

- [x] **Task 1.2.5**: `DELETE /api/doctor/appointments/:id` - Soft delete (cancel)

- [x] **Task 1.2.6**: `POST /api/doctor/patients` - Create patient
  ```typescript
  Body: {
    name: string,
    email: string,
    phone?: string,
    gender: Gender,
    dateOfBirth: string,
    bloodType?: BloodType,
    allergies?: string[],
    currentMedications?: string[],
    emergencyContactName?: string,
    emergencyContactPhone?: string
  }
  ```

- [x] **Task 1.2.7**: `PATCH /api/doctor/patients/:id` - Update patient

- [x] **Task 1.2.8**: `GET /api/doctor/patients/:id/vitals` - Vitals history

- [x] **Task 1.2.9**: `POST /api/doctor/patients/:id/vitals` - Add vitals
  ```typescript
  Body: {
    heartRate?: number,
    bloodPressure?: string,
    temperature?: number,
    weight?: number,
    height?: number,
    spo2?: number
  }
  ```

- [x] **Task 1.2.10**: `GET /api/doctor/patients/:id/consultations` - Consultation history

- [x] **Task 1.2.11**: `POST /api/doctor/consultations` - Save consultation
  ```typescript
  Body: {
    appointmentId: string,
    symptoms: Array<{name: string, duration: string, severity: string}>,
    diagnosis: string,
    notes?: string,
    icdCode?: string,
    medicines?: Array<{name, dosage, frequency, duration, instructions}>,
    advice?: string,
    followUpDate?: string
  }
  ```

### Sprint 1.3: Frontend Integration (Day 6-10)

- [ ] **Task 1.3.1**: Set up TanStack Query in Doctor App
  - Install `@tanstack/react-query`
  - Create QueryClient provider
  - Create custom hooks: `useAppointments`, `usePatients`, etc.

- [ ] **Task 1.3.2**: Replace Dashboard mock data
  - Create `useDashboardStats()` hook
  - Replace hardcoded stats with API data
  - Add loading skeleton

- [ ] **Task 1.3.3**: Replace Appointments mock data
  - Create `useAppointments()` hook
  - Replace `appointmentsData` with API response
  - Implement filtering (Today, Upcoming, Completed)

- [ ] **Task 1.3.4**: Replace AppointmentDetails mock data
  - Create `useAppointment(id)` hook
  - Fetch real appointment + patient data
  - Connect status update buttons to API

- [ ] **Task 1.3.5**: Replace PatientRecords mock data
  - Create `usePatients()` hook
  - Replace `patientsData` with API response
  - Connect "Add Patient" form to `POST /api/doctor/patients`

- [ ] **Task 1.3.6**: Replace PatientDetails mock data
  - Create `usePatient(id)` hook with history
  - Fetch patient + consultations + vitals
  - Display real medical history

- [ ] **Task 1.3.7**: Connect Consultation to APIs
  - Connect vitals form to `POST /patients/:id/vitals`
  - Connect consultation save to `POST /consultations`
  - Update appointment status on complete

- [ ] **Task 1.3.8**: Remove all mock data imports
  - Delete or comment out mock data in `dataConstants.ts`
  - Ensure no component imports mock data
  - Test with empty database

### Sprint 1.4: Testing & Validation (Day 11-12)

- [ ] **Task 1.4.1**: Test complete flow
  ```
  Login → Add Patient → Create Appointment → 
  Start Consultation → Enter Vitals → Add Symptoms → 
  Enter Diagnosis → Complete → Verify data persisted
  ```

- [ ] **Task 1.4.2**: Test data persistence
  - Create patient, reload page, verify still exists
  - Create appointment, reload, verify still exists
  - Complete consultation, check patient history shows it

- [ ] **Task 1.4.3**: Test edge cases
  - Create appointment for same time (should fail)
  - Cancel appointment (verify soft delete)
  - Update patient info

---

## API Status Tracker

### Authentication APIs

| Endpoint | Method | Status | Frontend Uses |
|----------|--------|--------|---------------|
| `/api/auth/login` | POST | ✅ Exists | ✅ Yes |
| `/api/auth/logout` | POST | ✅ Exists | ✅ Yes |
| `/api/auth/me` | GET | ✅ Exists | 🔌 No (uses hardcoded) |

### Doctor APIs

| Endpoint | Method | Status | Frontend Uses |
|----------|--------|--------|---------------|
| `/api/doctor/stats` | GET | ✅ Built | ❌ Mock |
| `/api/doctor/appointments` | GET | ✅ Exists | 🔌 Mock |
| `/api/doctor/appointments/:id` | GET | ✅ Built | ❌ Mock |
| `/api/doctor/appointments` | POST | ✅ Built | ❌ None |
| `/api/doctor/appointments/:id` | PATCH | ✅ Built | ❌ None |
| `/api/doctor/appointments/:id/status` | PATCH | ✅ Exists | 🔌 Mock |
| `/api/doctor/appointments/:id` | DELETE | ✅ Built | ❌ None |
| `/api/doctor/patients` | GET | ✅ Exists | 🔌 Mock |
| `/api/doctor/patients/:id` | GET | ✅ Exists | 🔌 Mock |
| `/api/doctor/patients` | POST | ✅ Built | ❌ None |
| `/api/doctor/patients/:id` | PATCH | ✅ Built | ❌ None |
| `/api/doctor/patients/:id/notes` | POST | ✅ Exists | 🔌 Mock |
| `/api/doctor/patients/:id/vitals` | GET | ✅ Built | ❌ None |
| `/api/doctor/patients/:id/vitals` | POST | ✅ Built | ❌ None |
| `/api/doctor/patients/:id/consultations` | GET | ✅ Built | ❌ None |
| `/api/doctor/consultations` | POST | ✅ Built | ❌ None |

### Patient APIs

| Endpoint | Method | Status | Frontend Uses |
|----------|--------|--------|---------------|
| `/api/patient/appointments` | GET | ✅ Exists | ❌ No app |
| `/api/patient/appointments` | POST | ✅ Exists | ❌ No app |
| `/api/patient/appointments/:id` | DELETE | ✅ Exists | ❌ No app |
| `/api/patient/doctors` | GET | ✅ Exists | ❌ No app |
| `/api/patient/medical-records` | GET | ✅ Exists | ❌ No app |
| `/api/patient/medical-notes` | GET | ✅ Exists | ❌ No app |

---

## Component Integration Map

### Doctor App Components

| Component | File | Current Data Source | Target API | Priority |
|-----------|------|---------------------|------------|----------|
| Dashboard | `Dashboard.tsx` | `dashboardStats` mock | `GET /doctor/stats` | P1 |
| Appointments | `Appointments.tsx` | `appointmentsData` mock | `GET /doctor/appointments` | P1 |
| AppointmentDetails | `AppointmentDetails.tsx` | Hardcoded | `GET /doctor/appointments/:id` | P1 |
| PatientRecords | `PatientRecords.tsx` | `patientsData` mock | `GET /doctor/patients` | P1 |
| PatientDetails | `PatientDetails.tsx` | Hardcoded | `GET /doctor/patients/:id` | P1 |
| PatientForm | `PatientForm.tsx` | Local state only | `POST /doctor/patients` | P1 |
| Consultation | `Consultation.tsx` | Hardcoded | `POST /doctor/consultations` | P1 |
| VitalsModal | `VitalsModal.tsx` | Local state only | `POST /doctor/patients/:id/vitals` | P1 |
| NotesModal | `NotesModal.tsx` | Local state only | `POST /doctor/patients/:id/notes` | P1 |
| RescheduleModal | `RescheduleModal.tsx` | Local state only | `PATCH /doctor/appointments/:id` | P1 |
| Settings | `Settings.tsx` | Hardcoded | `GET /auth/me` + `PATCH /doctor/profile` | P2 |
| Invoice | `Invoice.tsx` | Mock | Phase 4 | P4 |

---

## Database Migrations

### Migration Checklist

- [ ] **Migration 1**: Add soft delete fields
  ```sql
  ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP;
  ALTER TABLE patients ADD COLUMN deleted_at TIMESTAMP;
  ALTER TABLE appointments ADD COLUMN deleted_at TIMESTAMP;
  ```

- [ ] **Migration 2**: Create consultations table
  ```sql
  CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID UNIQUE REFERENCES appointments(id),
    symptoms JSONB NOT NULL,
    diagnosis TEXT NOT NULL,
    notes TEXT,
    icd_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```

- [ ] **Migration 3**: Create vitals table
  ```sql
  CREATE TABLE vitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    heart_rate INT,
    blood_pressure VARCHAR(10),
    temperature DECIMAL(4,1),
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    spo2 INT,
    recorded_by_id UUID REFERENCES users(id),
    recorded_at TIMESTAMP DEFAULT NOW()
  );
  ```

- [ ] **Migration 4**: Create prescriptions table
  ```sql
  CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultation_id UUID UNIQUE REFERENCES consultations(id),
    medicines JSONB NOT NULL,
    advice TEXT,
    follow_up_date DATE,
    pdf_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```

---

## Agent Instructions

### For AI Coding Agents

When working on this project, follow these rules:

#### 1. Before Starting Any Task

1. Read this PRD.md to understand current state
2. Check the task's checkbox status (don't redo completed work)
3. Identify which files need changes
4. Understand the API contract before implementing

#### 2. File Structure Rules

```
apps/doctor/src/
├── components/     # React components (one per file)
├── contexts/       # React contexts (AuthContext, etc.)
├── services/       # API calls (api.ts, doctor.service.ts)
├── hooks/          # Custom hooks (create useXxx.ts files)
├── types/          # TypeScript types and enums
├── constants/      # Static data (REMOVE mock data)
├── styles/         # CSS Modules (ComponentName.module.css)
├── modals/         # Modal components
└── utils/          # Helper functions

backend/src/
├── controllers/    # Route handlers (one per domain)
├── routes/         # Express routes
├── middleware/     # Auth, error handling
├── services/       # Business logic (if complex)
├── types/          # Enums, interfaces
└── utils/          # Helpers (jwt, password, response)
```

#### 3. Code Conventions

**TypeScript**:
- Use enums for fixed values, never string literals
- All API responses typed
- No `any` type unless absolutely necessary

**React**:
- Functional components only
- Use TanStack Query for server state
- Use Zustand for complex UI state
- CSS Modules for styling

**API Design**:
- RESTful endpoints
- Use `successResponse()` and `errorResponse()` helpers
- Include proper error codes

#### 4. After Completing a Task

1. Mark the checkbox in this PRD.md as complete: `- [x]`
2. Add the date completed if significant
3. Note any issues or follow-ups needed
4. Test the feature manually if possible

#### 5. Testing Requirements

- Test happy path manually
- Test with empty data (new user scenario)
- Test with existing data (returning user)
- Verify data persists after page reload

#### 6. When Stuck

1. Check SYSTEM_DESIGN.md for architecture decisions
2. Look at existing similar code (e.g., existing controllers)
3. Check Mongoose models for data relationships
4. Don't guess - ask if unclear

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-30 | Initial PRD created | Co-founder |
| 2026-01-30 | Completed Sprint 1.1 (Database) + Sprint 1.2 (APIs) | Agent |
| | | |

---

## Notes & Decisions

### Open Questions
- [ ] What's the exact prescription PDF format? (Resolve in Phase 2)
- [ ] Drug database source? (Start with 200 common medicines CSV)
- [ ] SMS provider for India? (MSG91 shortlisted)

### Decisions Made
- ✅ Soft delete for all patient/medical data (DPDP compliance)
- ✅ Receptionist role deferred to Phase 4
- ✅ AI features deferred to Phase 5+
- ✅ Start with email notifications, add SMS in Phase 3
- ✅ Use TanStack Query for frontend data fetching
- ✅ No Redux - Zustand if needed for complex UI state
