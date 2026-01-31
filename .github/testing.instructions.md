````instructions
# Testing Instructions

## Coverage Requirements

| Metric | Target |
|--------|--------|
| Statements | 80% |
| Functions | 80% |
| Lines | 80% |
| Branches | 75% |
| **Critical paths** | **100%** |

Critical = Auth, payments, data mutations, security

---

## Test Stack

| Tool | Purpose |
|------|---------|
| Jest | Test runner |
| React Testing Library | Component tests |
| @testing-library/user-event | User interactions |
| @testing-library/jest-dom | DOM matchers |
| MSW | API mocking |
| Supertest | Backend API tests |

---

## Test Pyramid

```
       E2E (10%)          ← Few, slow, critical flows only
     Integration (30%)    ← Component interactions
   Unit Tests (60%)       ← Fast, isolated, most tests
```

---

## AAA Pattern (Arrange-Act-Assert)

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DoctorCard } from './DoctorCard';
import { Gender } from '../types/enums';

describe('DoctorCard', () => {
  it('displays doctor information', () => {
    // Arrange
    const doctor = {
      id: '1',
      name: 'Dr. Smith',
      gender: Gender.MALE,
      specialization: 'Cardiology',
    };
    
    // Act
    render(<DoctorCard doctor={doctor} />);
    
    // Assert
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    // Arrange
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<DoctorCard doctor={mockDoctor} onSelect={onSelect} />);
    
    // Act
    await user.click(screen.getByRole('button'));
    
    // Assert
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
```

---

## Common Queries (Priority Order)

```typescript
// 1. By role (preferred - accessible)
screen.getByRole('button', { name: /submit/i })
screen.getByRole('textbox', { name: /email/i })
screen.getByRole('heading', { level: 1 })

// 2. By label (forms)
screen.getByLabelText(/password/i)

// 3. By text (visible content)
screen.getByText(/welcome/i)

// 4. By placeholder (inputs)
screen.getByPlaceholderText(/search/i)

// 5. By test ID (last resort)
screen.getByTestId('doctor-card-123')
```

---

## Async Testing

```typescript
it('loads and displays data', async () => {
  render(<DoctorList />);
  
  // Loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data (findBy = async)
  const doctor = await screen.findByText('Dr. Smith');
  expect(doctor).toBeInTheDocument();
  
  // Verify loading gone (queryBy = returns null if not found)
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```

---

## Form Testing

```typescript
describe('DoctorForm', () => {
  it('submits with valid data', async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(<DoctorForm onSubmit={onSubmit} />);
    
    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'Dr. Johnson');
    await user.selectOptions(screen.getByLabelText(/gender/i), Gender.FEMALE);
    await user.type(screen.getByLabelText(/email/i), 'dr@example.com');
    
    // Submit
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verify
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Dr. Johnson',
      gender: Gender.FEMALE,
      email: 'dr@example.com',
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<DoctorForm onSubmit={jest.fn()} />);
    
    await user.type(screen.getByLabelText(/email/i), 'invalid');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
```

---

## API Mocking (MSW)

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/doctor/patients', (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      data: [{ id: '1', name: 'John Doe', age: 30 }],
    }));
  }),
  
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      token: 'test-token',
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## Backend API Tests (Supertest)

```typescript
import request from 'supertest';
import app from '../app';
import { UserRole } from '../types/enums';

describe('POST /api/doctor/patients/:id/notes', () => {
  it('adds medical note with valid auth', async () => {
    const token = generateTestToken({ userId: '123', role: UserRole.DOCTOR });
    
    const res = await request(app)
      .post('/api/doctor/patients/456/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ note: 'Patient improving' });
    
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('returns 401 without auth', async () => {
    const res = await request(app)
      .post('/api/doctor/patients/456/notes')
      .send({ note: 'Test' });
    
    expect(res.status).toBe(401);
  });

  it('returns 403 for wrong role', async () => {
    const token = generateTestToken({ userId: '123', role: UserRole.PATIENT });
    
    const res = await request(app)
      .post('/api/doctor/patients/456/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ note: 'Test' });
    
    expect(res.status).toBe(403);
  });
});
```

---

## Test File Organization

```
src/
├── components/
│   ├── DoctorCard.tsx
│   └── DoctorCard.test.tsx      ← Co-located
├── utils/
│   ├── formatDate.ts
│   └── formatDate.test.ts       ← Co-located
└── __tests__/                    ← Integration tests
    └── DoctorFlow.test.tsx
```

---

## Test Utilities

```typescript
// test-utils.ts
import { render } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import { UserRole } from '../types/enums';

export const renderWithAuth = (
  ui: React.ReactElement,
  role: UserRole = UserRole.DOCTOR
) => {
  return render(
    <AuthProvider initialUser={{ id: '1', role }}>
      {ui}
    </AuthProvider>
  );
};

export const generateTestToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, 'test-secret');
};
```

---

## Running Tests

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Specific file
npm test DoctorCard.test.tsx

# Specific test name
npm test -- -t "displays doctor"
```

---

## What to Test

| Component Type | Test For |
|----------------|----------|
| Display | Renders correct data |
| Form | Validation, submission |
| Interactive | Click handlers, state changes |
| Conditional | Shows/hides based on state |
| Async | Loading, success, error states |
| API | Request/response handling |

---

## Rules Summary

❌ **NEVER:**
- Test implementation details
- Use `any` in test code
- Skip error case tests
- Mock everything (prefer real logic)
- Commit failing tests

✅ **ALWAYS:**
- Test user-visible behavior
- Use AAA pattern
- Test error states
- Use enums in test data
- Run tests before committing
````
