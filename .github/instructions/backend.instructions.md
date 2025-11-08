# Backend Instructions - Docx

## Overview

Backend development guidelines for Docx healthcare platform API, database, and security.

---

## 🛠️ Tech Stack

- **Node.js 18+** - Runtime
- **Express.js or Fastify** - API framework  
- **PostgreSQL 15** - Database
- **Prisma or TypeORM** - ORM
- **JWT** - Authentication
- **Zod** - Validation
- **Jest/Supertest** - Testing

---

## 🏗️ API Structure

### RESTful Endpoints

**Doctor Endpoints:**
```
GET    /api/doctor/dashboard           # Doctor overview stats
GET    /api/doctor/patients            # List assigned patients
GET    /api/doctor/patients/:id        # Patient details
POST   /api/doctor/patients/:id/notes  # Add medical note
POST   /api/doctor/patients/:id/prescriptions  # Add prescription
GET    /api/doctor/appointments        # Doctor's appointments
PUT    /api/doctor/appointments/:id    # Update appointment
```

**Patient Endpoints:**
```
GET    /api/patient/dashboard          # Patient overview
GET    /api/patient/doctors            # Available doctors
GET    /api/patient/doctors/:id        # Doctor profile
POST   /api/patient/appointments       # Book appointment
GET    /api/patient/appointments       # Patient's appointments
DELETE /api/patient/appointments/:id   # Cancel appointment
GET    /api/patient/medical-records    # Patient's records
POST   /api/patient/ai-chat            # AI chatbot
```

**Admin Endpoints:**
```
GET    /api/admin/dashboard            # Hospital stats
GET    /api/admin/doctors              # All doctors
POST   /api/admin/doctors              # Create doctor
PUT    /api/admin/doctors/:id          # Update doctor
DELETE /api/admin/doctors/:id          # Remove doctor
GET    /api/admin/analytics            # Reports
```

---

## 🔒 Authentication

### JWT Structure
```typescript
interface JWTPayload {
  userId: string;
  role: 'admin' | 'doctor' | 'patient';
  email: string;
  exp: number;
}
```

### Auth Middleware
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

---

## 🗄️ Database Schema (Prisma)

```prisma
model Admin {
  id          String   @id @default(uuid())
  email       String   @unique
  name        String
  password    String
  hospitalId  String
  permissions String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Doctor {
  id             String   @id @default(uuid())
  email          String   @unique
  password       String
  firstName      String
  lastName       String
  specialization String
  experience     Int
  department     String
  phoneNumber    String
  isActive       Boolean  @default(true)
  patients       Patient[]
  appointments   Appointment[]
  medicalNotes   MedicalNote[]
  prescriptions  Prescription[]
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Patient {
  id              String   @id @default(uuid())
  email           String   @unique
  password        String
  firstName       String
  lastName        String
  dateOfBirth     DateTime
  bloodType       String
  phoneNumber     String
  address         String
  assignedDoctorId String?
  assignedDoctor  Doctor?  @relation(fields: [assignedDoctorId], references: [id])
  appointments    Appointment[]
  medicalNotes    MedicalNote[]
  prescriptions   Prescription[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Appointment {
  id        String   @id @default(uuid())
  patientId String
  patient   Patient  @relation(fields: [patientId], references: [id])
  doctorId  String
  doctor    Doctor   @relation(fields: [doctorId], references: [id])
  dateTime  DateTime
  duration  Int      // minutes
  status    String   // scheduled, completed, cancelled
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model MedicalNote {
  id          String   @id @default(uuid())
  patientId   String
  patient     Patient  @relation(fields: [patientId], references: [id])
  doctorId    String
  doctor      Doctor   @relation(fields: [doctorId], references: [id])
  date        DateTime @default(now())
  diagnosis   String
  symptoms    String
  notes       String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Prescription {
  id             String   @id @default(uuid())
  patientId      String
  patient        Patient  @relation(fields: [patientId], references: [id])
  doctorId       String
  doctor         Doctor   @relation(fields: [doctorId], references: [id])
  medicationName String
  dosage         String
  frequency      String
  duration       String
  instructions   String
  prescribedDate DateTime @default(now())
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

---

## ✅ API Best Practices

### 1. **Use Repository Pattern**
```typescript
// patientRepository.ts
export class PatientRepository {
  async findById(id: string): Promise<Patient | null> {
    return prisma.patient.findUnique({ where: { id } });
  }
  
  async findByDoctorId(doctorId: string): Promise<Patient[]> {
    return prisma.patient.findMany({
      where: { assignedDoctorId: doctorId }
    });
  }
  
  async create(data: CreatePatientDTO): Promise<Patient> {
    return prisma.patient.create({ data });
  }
}
```

### 2. **Use DTOs for Validation**
```typescript
import { z } from 'zod';

export const CreatePrescriptionSchema = z.object({
  patientId: z.string().uuid(),
  medicationName: z.string().min(1),
  dosage: z.string().min(1),
  frequency: z.string().min(1),
  duration: z.string().min(1),
  instructions: z.string().optional(),
});

export type CreatePrescriptionDTO = z.infer<typeof CreatePrescriptionSchema>;
```

### 3. **Error Handling**
```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
  }
}

// Error handler middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }
  
  // Log unexpected errors
  console.error('Unexpected error:', err);
  
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
```

---

## 🔒 Security Best Practices

1. **Hash passwords** with bcrypt
2. **Validate all inputs** with Zod
3. **Use parameterized queries** (ORM handles this)
4. **Rate limiting** on API endpoints
5. **CORS** configuration
6. **Helmet.js** for security headers
7. **Environment variables** for secrets

---

**See also:**
- [project.instructions.md](./project.instructions.md) - Business context
- [frontend.instructions.md](./frontend.instructions.md) - Frontend guidelines
