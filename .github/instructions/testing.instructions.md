# Testing Instructions

## Coverage Requirements

- **80% minimum** (statements, functions, lines)
- **75% branches**
- **100% coverage** for: Auth, payments, data mutations, security

---

## Test Stack

- Jest + React Testing Library
- @testing-library/user-event (interactions)
- @testing-library/jest-dom (matchers)
- MSW (API mocking)
- Supertest (backend)

---

## Test Pyramid

```
       E2E (10%)          ← Few, slow, expensive
     Integration (30%)    ← Moderate
   Unit Tests (60%)       ← Many, fast, cheap
```

---

## Component Test (AAA Pattern)

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DoctorCard } from './DoctorCard';
import { Gender } from '../types/enums';

describe('DoctorCard', () => {
  const mockDoctor = {
    id: '1',
    name: 'Dr. Smith',
    gender: Gender.MALE,
    specialization: 'Cardiology',
  };

  it('renders doctor information', () => {
    // Arrange
    render(<DoctorCard doctor={mockDoctor} />);
    
    // Act - (component renders)
    
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

## Form Test Example

```typescript
describe('DoctorForm', () => {
  it('submits valid doctor data', async () => {
    // Arrange
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(<DoctorForm onSubmit={onSubmit} />);
    
    // Act - Fill form
    await user.type(screen.getByLabelText(/name/i), 'Dr. Johnson');
    await user.selectOptions(screen.getByLabelText(/gender/i), Gender.FEMALE);
    await user.type(screen.getByLabelText(/email/i), 'dr@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Assert
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Dr. Johnson',
      gender: Gender.FEMALE,
      email: 'dr@example.com',
    });
  });

  it('shows validation error for invalid email', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<DoctorForm onSubmit={jest.fn()} />);
    
    // Act
    await user.type(screen.getByLabelText(/email/i), 'invalid');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Assert
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
```

---

## API Mocking (MSW)

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserRole } from '../types/enums';

const server = setupServer(
  rest.get('/api/doctor/patients', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [
          { id: '1', name: 'John Doe', age: 30 },
          { id: '2', name: 'Jane Smith', age: 25 },
        ],
      })
    );
  }),

  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        token: 'fake-jwt-token',
        role: UserRole.DOCTOR,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## Backend API Test (Supertest)

```typescript
import request from 'supertest';
import app from '../app';
import { UserRole } from '../types/enums';

describe('POST /api/doctor/patients/:id/notes', () => {
  it('adds medical note', async () => {
    // Arrange
    const token = generateTestToken({ userId: '123', role: UserRole.DOCTOR });
    
    // Act
    const res = await request(app)
      .post('/api/doctor/patients/456/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ note: 'Patient shows improvement' });
    
    // Assert
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.note).toBe('Patient shows improvement');
  });

  it('returns 401 without auth', async () => {
    // Act
    const res = await request(app)
      .post('/api/doctor/patients/456/notes')
      .send({ note: 'Test' });
    
    // Assert
    expect(res.status).toBe(401);
  });
});
```

---

## Test Organization

```
src/
├── components/
│   ├── DoctorCard.tsx
│   └── DoctorCard.test.tsx          ← Co-located tests
├── utils/
│   ├── formUtils.ts
│   └── formUtils.test.ts
└── __tests__/                        ← Integration tests
    ├── setup.ts
    └── DoctorFlow.integration.test.tsx
```

---

## Common Queries

```typescript
// By role (preferred)
screen.getByRole('button', { name: /submit/i })
screen.getByRole('textbox', { name: /email/i })

// By label
screen.getByLabelText(/password/i)

// By text
screen.getByText(/welcome/i)

// By test ID (last resort)
screen.getByTestId('doctor-card-123')
```

---

## Async Testing

```typescript
it('loads doctor data', async () => {
  render(<DoctorList />);
  
  // Wait for loading to finish
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data to appear
  const doctorName = await screen.findByText('Dr. Smith');
  expect(doctorName).toBeInTheDocument();
  
  // Verify loading disappeared
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```

---

## Test Utils (setup.ts)

```typescript
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

# Coverage
npm test -- --coverage

# Specific file
npm test DoctorCard.test.tsx

# Update snapshots
npm test -- -u
```

---

## Key Rules

❌ **NEVER:**
- Test implementation details
- Use `any` in tests
- Skip error cases
- Mock everything (prefer real logic)
- Commit failing tests

✅ **ALWAYS:**
- Test user-facing behavior
- Use AAA pattern (Arrange, Act, Assert)
- Test error states
- Use enums in test data
- Run tests before committing
- Aim for 80%+ coverage
