````instructions
# Backend Instructions

## Tech Stack

- Node.js 18+ with TypeScript (strict)
- Express.js for REST API
- MongoDB with Mongoose
- JWT for authentication
- Zod for validation

---

## Core Rules

| # | Rule | Description |
|---|------|-------------|
| 1 | **Enum-First** | No string literals for roles, statuses |
| 2 | **Type Everything** | Strict TypeScript, no `any` |
| 3 | **Validate Input** | Zod schemas for all requests |
| 4 | **Consistent Errors** | Standardized error responses |
| 5 | **CORS Setup** | Allow doctor/patient/admin origins |

---

## File Structure

```
backend/src/
├── routes/           # API endpoint definitions
├── controllers/      # Request handlers
├── services/         # Business logic
├── middleware/       # Auth, validation, errors
├── types/
│   └── enums.ts      # ALL enums
├── utils/            # Helpers (jwt, password, response)
└── config/           # Environment config
```

---

## Enum Pattern

**Define in `/types/enums.ts`:**

```typescript
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
// ❌ WRONG
if (user.role === 'DOCTOR') { ... }

// ✅ CORRECT
if (user.role === UserRole.DOCTOR) { ... }
```

---

## API Response Format

```typescript
// Success
{
  success: true,
  data: { ... }
}

// Success with pagination
{
  success: true,
  data: [...],
  pagination: {
    page: 1,
    limit: 20,
    total: 150
  }
}

// Error
{
  success: false,
  message: "Error description"
}
```

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

// Generate token
const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

// Auth middleware
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
```

---

## Role-Based Authorization

```typescript
const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
  };
};

// Usage
router.get('/patients', authenticate, authorize(UserRole.DOCTOR), getPatients);
```

---

## Error Handling

```typescript
class AppError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
  }
}

// Usage
if (!user) throw new AppError(404, 'User not found');

// Global error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});
```

---

## CORS Configuration

```typescript
const allowedOrigins = [
  'https://doctor.docx.com',
  'https://patient.docx.com',
  'https://admin.docx.com',
  'http://localhost:3000', // Dev
  'http://localhost:3001',
  'http://localhost:3002',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

---

## API Endpoints

### Doctor Routes (`/api/doctor`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/patients` | List doctor's patients |
| GET | `/patients/:id` | Patient details |
| POST | `/patients/:id/notes` | Add medical note |
| GET | `/appointments` | Doctor's appointments |
| PATCH | `/appointments/:id` | Update appointment |

### Patient Routes (`/api/patient`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/doctors` | Available doctors |
| POST | `/appointments` | Book appointment |
| GET | `/appointments` | My appointments |
| GET | `/medical-records` | My records |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/doctors` | All doctors |
| POST | `/doctors` | Create doctor |
| PATCH | `/doctors/:id` | Update doctor |
| GET | `/analytics` | Dashboard stats |

---

## Mongoose Schema Pattern

```typescript
import { Schema } from 'mongoose';
import { UserRole } from '../types/enums';

const UserSchema = new Schema(
  {
    id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
  },
  { timestamps: true, collection: 'users' }
);
```

---

## Controller Pattern

```typescript
// controllers/doctor.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { UserRole } from '../types/enums';

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user.userId;
    const patients = await PatientModel.find({ doctorId, deletedAt: null }).lean();

    res.json({ success: true, data: patients });
  } catch (error) {
    next(error);
  }
};
```

---

## Quick Reference

| Task | Pattern |
|------|---------|
| Check role | `user.role === UserRole.DOCTOR` |
| Validate input | `schema.parse(req.body)` |
| Return success | `res.json({ success: true, data })` |
| Return error | `throw new AppError(404, 'Not found')` |
| Require auth | `router.use(authenticate)` |
| Check role | `authorize(UserRole.DOCTOR)` |

---

## Rules Summary

❌ **NEVER:**
- Use string literals for roles/statuses
- Use `any` type
- Skip input validation
- Return unstructured responses
- Expose sensitive errors to client

✅ **ALWAYS:**
- Use enums for fixed values
- Type all functions and parameters
- Validate with Zod schemas
- Use consistent response format
- Hash passwords with bcrypt
- Use try-catch in controllers
````
