# Backend Instructions

## Tech Stack

- Node.js 18+ + TypeScript
- Express/Fastify + PostgreSQL 15
- Prisma/TypeORM, JWT, Zod

---

## Core Rules

1. **Enum-first** - NO string literals, use enums for roles, statuses
2. **Type everything** - Strict TypeScript, no `any`
3. **Validate all input** - Use Zod schemas
4. **Error handling** - Consistent error responses
5. **CORS for 3 apps** - doctor/patient/admin origins

---

## File Structure

```
backend/src/
├── routes/         # API endpoints
├── controllers/    # Business logic
├── models/         # Database models (Prisma/TypeORM)
├── types/
│   └── enums.ts    # ALL enums (UserRole, Status, etc.)
├── middleware/     # Auth, validation, error handling
├── utils/          # Helper functions
└── services/       # External services
```

---

## Enum Pattern

```typescript
// types/enums.ts
export enum UserRole {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  ADMIN = 'ADMIN',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum DoctorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
```

**Usage:**
```typescript
// ❌ NEVER
if (user.role === 'DOCTOR') {}

// ✅ ALWAYS
if (user.role === UserRole.DOCTOR) {}
```

---

## API Endpoints

**Doctor:**
- `GET /api/doctor/patients` - List patients
- `POST /api/doctor/patients/:id/notes` - Add medical note
- `GET /api/doctor/appointments` - Appointments

**Patient:**
- `GET /api/patient/doctors` - Available doctors
- `POST /api/patient/appointments` - Book appointment
- `GET /api/patient/medical-records` - Records

**Admin:**
- `GET /api/admin/doctors` - All doctors
- `POST /api/admin/doctors` - Create doctor
- `GET /api/admin/analytics` - Reports

---

## Request Validation (Zod)

```typescript
import { z } from 'zod';
import { Gender, UserRole } from '../types/enums';

const createDoctorSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  gender: z.nativeEnum(Gender),
  specialization: z.string(),
  role: z.literal(UserRole.DOCTOR),
});

// In controller
const validated = createDoctorSchema.parse(req.body);
```

---

## Authentication (JWT)

```typescript
import jwt from 'jsonwebtoken';
import { UserRole } from '../types/enums';

interface JWTPayload {
  userId: string;
  role: UserRole;
}

const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
  req.user = decoded;
  next();
};
```

---

## CORS (3 Apps)

```typescript
const allowedOrigins = [
  'https://doctor.docx.com',
  'https://patient.docx.com',
  'https://admin.docx.com',
  'http://localhost:3000', // Dev
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

---

## Error Handling

```typescript
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
  }
}

// Usage
if (!user) {
  throw new AppError(404, 'User not found');
}

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});
```

---

## Database Model Example (Prisma)

```prisma
enum UserRole {
  DOCTOR
  PATIENT
  ADMIN
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole
  gender    Gender
  createdAt DateTime @default(now())
}

model Doctor {
  id              String       @id @default(uuid())
  userId          String       @unique
  specialization  String
  status          DoctorStatus @default(ACTIVE)
  patients        Patient[]
}
```

---

## API Response Format

```typescript
// Success
{
  success: true,
  data: { ... }
}

// Error
{
  success: false,
  message: "Error description"
}

// List with pagination
{
  success: true,
  data: [...],
  pagination: {
    page: 1,
    limit: 20,
    total: 150
  }
}
```

---

## Testing

```typescript
import request from 'supertest';
import { UserRole } from '../types/enums';

describe('POST /api/doctor/patients/:id/notes', () => {
  it('should add medical note', async () => {
    const token = generateToken({ userId: '123', role: UserRole.DOCTOR });
    
    const res = await request(app)
      .post('/api/doctor/patients/456/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ note: 'Test note' });
    
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
```

---

## Key Rules

❌ **NEVER:**
- String literals for roles/statuses
- `any` types
- Unvalidated input
- Plain text passwords
- Missing error handling

✅ **ALWAYS:**
- Enums for fixed values
- Type all functions
- Validate with Zod
- Hash passwords (bcrypt)
- Try-catch blocks
- JWT for auth
