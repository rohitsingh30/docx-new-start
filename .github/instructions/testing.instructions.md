# Testing Instructions - Docx---

applyTo: '**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx,**/tests/**'

## Overview---



Comprehensive testing strategy for Docx healthcare platform.# Testing Instructions



---## Overview

Comprehensive testing guidelines for **Docx** healthcare platform to ensure code quality, reliability, and maintainability through automated testing.

## 🎯 Testing Requirements

---

- **80% minimum coverage** across all code

- **Testing Pyramid**: 60% unit, 30% integration, 10% E2E## 🎯 Testing Philosophy

- **AAA Pattern**: Arrange, Act, Assert

- **Test behavior**, not implementation**"If it's not tested, it's broken"**



---Testing is mandatory, not optional. It:

- Catches bugs before production

## 🛠️ Testing Stack- Documents expected behavior

- Enables safe refactoring

- **Jest** - Test runner- Provides confidence in changes

- **React Testing Library** - Component testing- Reduces debugging time

- **@testing-library/user-event** - User interactions

- **@testing-library/jest-dom** - DOM matchers---

- **MSW** - API mocking

- **Supertest** - Backend API testing## 📊 Test Coverage Requirements



---### Minimum Coverage

```

## 🧪 Unit TestingOverall:     ≥ 80%

Statements:  ≥ 80%

### Component Test ExampleBranches:    ≥ 75%

```typescriptFunctions:   ≥ 80%

import { render, screen, fireEvent } from '@testing-library/react';Lines:       ≥ 80%

import { Button } from './Button';```



describe('Button', () => {### Critical Paths: 100% Coverage

  // Arrange Act Assert pattern- Authentication & Authorization

  - Payment processing

  it('renders with children text', () => {- Data mutations (Create, Update, Delete)

    // Arrange- Security-sensitive operations

    const buttonText = 'Click me';- Business logic calculations

    

    // Act---

    render(<Button>{buttonText}</Button>);

    ## 🧪 Testing Pyramid

    // Assert

    expect(screen.getByText(buttonText)).toBeInTheDocument();```

  });       E2E (10%)          ← Few, slow, expensive

     Integration (30%)    ← Moderate

  it('calls onClick handler when clicked', () => {   Unit Tests (60%)       ← Many, fast, cheap

    // Arrange```

    const handleClick = jest.fn();

    ### Unit Tests

    // ActTest individual functions/components in isolation. Fast, focused, many.

    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByText('Click'));### Integration Tests

    Test how multiple components work together. Slower, broader scope.

    // Assert

    expect(handleClick).toHaveBeenCalledTimes(1);### End-to-End Tests

  });Test complete user workflows through the UI. Slowest, most comprehensive.



  it('is disabled when disabled prop is true', () => {---

    // Arrange & Act

    render(<Button disabled>Click</Button>);## 📁 Test Organization

    

    // Assert```

    expect(screen.getByText('Click')).toBeDisabled();src/

  });├── components/

});│   ├── PatientCard.tsx

```│   └── PatientCard.test.tsx         ← Co-located with component

├── services/

---│   ├── patient.service.ts

│   └── patient.service.test.ts

## 🔗 Integration Testing└── utils/

    ├── validation.ts

### Testing with API calls    └── validation.test.ts

```typescript

import { render, screen, waitFor } from '@testing-library/react';tests/

import { rest } from 'msw';├── integration/                      ← Integration tests

import { setupServer } from 'msw/node';│   ├── api/

import { DoctorDashboard } from './DoctorDashboard';│   └── components/

└── e2e/                              ← End-to-end tests

const server = setupServer(    ├── patient-workflow.spec.ts

  rest.get('/api/doctor/patients', (req, res, ctx) => {    └── doctor-workflow.spec.ts

    return res(ctx.json([```

      { id: '1', name: 'John Doe', age: 30 },

      { id: '2', name: 'Jane Smith', age: 25 }---

    ]));

  })## ✅ Unit Testing

);

### Test Structure (AAA Pattern)

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());```typescript

afterAll(() => server.close());describe('PatientService', () => {

  describe('createPatient', () => {

describe('DoctorDashboard Integration', () => {    it('should create patient with valid data', () => {

  it('loads and displays patients', async () => {      // 1. ARRANGE - Setup test data and dependencies

    // Arrange      const validData: CreatePatientDTO = {

    render(<DoctorDashboard />);        name: 'John Doe',

            email: 'john@example.com',

    // Assert loading state        age: 30

    expect(screen.getByText(/loading/i)).toBeInTheDocument();      };

          const mockRepository = createMockRepository();

    // Act - wait for data to load      const service = new PatientService(mockRepository);

    await waitFor(() => {      

      expect(screen.getByText('John Doe')).toBeInTheDocument();      // 2. ACT - Execute the function being tested

    });      const result = service.createPatient(validData);

          

    // Assert final state      // 3. ASSERT - Verify the results

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();      expect(result).toBeDefined();

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();      expect(result.name).toBe('John Doe');

  });      expect(mockRepository.save).toHaveBeenCalledWith(validData);

});    });

```    

    it('should throw ValidationError for missing name', () => {

---      const invalidData = { email: 'john@example.com', age: 30 };

      const service = new PatientService(mockRepository);

## ✅ Testing Checklist      

      expect(() => service.createPatient(invalidData))

### For Every Component        .toThrow(ValidationError);

- [ ] Renders correctly with default props    });

- [ ] Renders with all prop variants  });

- [ ] Handles user interactions (clicks, typing, etc.)});

- [ ] Shows loading states```

- [ ] Shows error states

- [ ] Shows empty states### Component Testing

- [ ] Accessibility (ARIA labels, keyboard navigation)

- [ ] 80%+ code coverage```typescript

import { render, screen, fireEvent } from '@testing-library/react';

### For Every Hookimport userEvent from '@testing-library/user-event';

- [ ] Returns correct initial valuesimport PatientCard from './PatientCard';

- [ ] Updates values correctly

- [ ] Handles edge casesdescribe('PatientCard', () => {

- [ ] Cleans up on unmount  const mockPatient = {

    id: '1',

### For Every API Call    name: 'John Doe',

- [ ] Success case    age: 30,

- [ ] Error handling    status: 'active'

- [ ] Loading states  };

- [ ] Data transformation  

  it('should render patient information', () => {

---    render(<PatientCard patient={mockPatient} />);

    

**See also:**    expect(screen.getByText('John Doe')).toBeInTheDocument();

- [project.instructions.md](./project.instructions.md) - Business context    expect(screen.getByText('30')).toBeInTheDocument();

- [frontend.instructions.md](./frontend.instructions.md) - Component guidelines  });

  
  it('should call onSelect when clicked', async () => {
    const onSelect = jest.fn();
    render(<PatientCard patient={mockPatient} onSelect={onSelect} />);
    
    await userEvent.click(screen.getByRole('button'));
    
    expect(onSelect).toHaveBeenCalledWith('1');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
  
  it('should show active status badge', () => {
    render(<PatientCard patient={mockPatient} />);
    
    const badge = screen.getByText(/active/i);
    expect(badge).toHaveClass('statusActive');
  });
  
  it('should handle null patient gracefully', () => {
    render(<PatientCard patient={null} />);
    
    expect(screen.getByText(/no patient data/i)).toBeInTheDocument();
  });
});
```

### Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { usePatientData } from './usePatientData';

describe('usePatientData', () => {
  it('should initialize with empty patients', () => {
    const { result } = renderHook(() => usePatientData());
    
    expect(result.current.patients).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
  
  it('should fetch patients on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePatientData());
    
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    
    expect(result.current.loading).toBe(false);
    expect(result.current.patients).toHaveLength(3);
  });
  
  it('should add new patient', () => {
    const { result } = renderHook(() => usePatientData());
    const newPatient = { id: '4', name: 'Jane Doe' };
    
    act(() => {
      result.current.addPatient(newPatient);
    });
    
    expect(result.current.patients).toContain(newPatient);
  });
});
```

### Utility Function Testing

```typescript
describe('formatDate', () => {
  it('should format date in MM/DD/YYYY format', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('01/15/2024');
  });
  
  it('should handle invalid dates', () => {
    expect(formatDate(null)).toBe('Invalid Date');
    expect(formatDate(undefined)).toBe('Invalid Date');
    expect(formatDate('invalid')).toBe('Invalid Date');
  });
  
  it('should handle edge cases', () => {
    expect(formatDate(new Date('2024-12-31'))).toBe('12/31/2024');
    expect(formatDate(new Date('2024-01-01'))).toBe('01/01/2024');
  });
});
```

---

## 🔗 Integration Testing

### API Integration Tests

```typescript
import request from 'supertest';
import { app } from '../app';
import { database } from '../database';

describe('POST /api/patients', () => {
  beforeAll(async () => {
    await database.connect();
  });
  
  afterAll(async () => {
    await database.disconnect();
  });
  
  beforeEach(async () => {
    await database.clear();
  });
  
  it('should create patient and return 201', async () => {
    const patientData = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };
    
    const response = await request(app)
      .post('/api/patients')
      .set('Authorization', `Bearer ${validToken}`)
      .send(patientData)
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.name).toBe('John Doe');
    
    // Verify in database
    const savedPatient = await database.patients.findOne({ 
      email: 'john@example.com' 
    });
    expect(savedPatient).toBeDefined();
  });
  
  it('should return 400 for duplicate email', async () => {
    await database.patients.create({ email: 'john@example.com' });
    
    const response = await request(app)
      .post('/api/patients')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ email: 'john@example.com', name: 'John' })
      .expect(400);
    
    expect(response.body.error.code).toBe('DUPLICATE_EMAIL');
  });
  
  it('should return 401 without authentication', async () => {
    await request(app)
      .post('/api/patients')
      .send({ name: 'John' })
      .expect(401);
  });
});
```

### Component Integration Tests

```typescript
describe('PatientForm Integration', () => {
  it('should submit form and show success message', async () => {
    const onSubmit = jest.fn().mockResolvedValue({ success: true });
    
    render(<PatientForm onSubmit={onSubmit} />);
    
    // Fill form
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/age/i), '30');
    
    // Submit
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verify
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });
    
    expect(await screen.findByText(/success/i)).toBeInTheDocument();
  });
  
  it('should show validation errors', async () => {
    render(<PatientForm onSubmit={jest.fn()} />);
    
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });
});
```

---

## 🌍 End-to-End Testing

### E2E Test Example (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Patient Management Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await login(page, 'doctor@example.com', 'password123');
  });
  
  test('should create, view, and delete patient', async ({ page }) => {
    // Navigate to patients
    await page.click('text=Patients');
    await expect(page).toHaveURL(/patients/);
    
    // Create new patient
    await page.click('button:has-text("Add Patient")');
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="age"]', '30');
    await page.click('button:has-text("Submit")');
    
    // Verify success message
    await expect(page.locator('text=Patient created successfully')).toBeVisible();
    
    // Verify patient in list
    await expect(page.locator('text=John Doe')).toBeVisible();
    
    // View patient details
    await page.click('text=John Doe');
    await expect(page.locator('text=john@example.com')).toBeVisible();
    
    // Delete patient
    await page.click('button:has-text("Delete")');
    await page.click('button:has-text("Confirm")');
    
    // Verify deletion
    await expect(page.locator('text=Patient deleted successfully')).toBeVisible();
    await expect(page.locator('text=John Doe')).not.toBeVisible();
  });
});
```

---

## 🎭 Mocking Guidelines

### Mock External Dependencies

```typescript
// ✅ CORRECT - Mock external API calls
jest.mock('../services/email.service');

describe('UserService', () => {
  it('should send welcome email after registration', async () => {
    const mockEmailService = {
      sendWelcomeEmail: jest.fn().mockResolvedValue(true)
    };
    
    const service = new UserService(mockEmailService);
    await service.registerUser(userData);
    
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalled();
  });
});
```

### Mock Data

```typescript
// tests/fixtures/patient.fixture.ts
export const mockPatient = {
  id: 'patient-123',
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  status: 'active'
};

export const createMockPatient = (overrides = {}) => ({
  ...mockPatient,
  ...overrides
});

// Usage in tests
const youngPatient = createMockPatient({ age: 20 });
const inactivePatient = createMockPatient({ status: 'inactive' });
```

### Mock Timers

```typescript
describe('auto-save functionality', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  
  it('should auto-save after 5 seconds', () => {
    const onSave = jest.fn();
    render(<Editor onSave={onSave} />);
    
    userEvent.type(screen.getByRole('textbox'), 'Hello');
    
    jest.advanceTimersByTime(5000);
    
    expect(onSave).toHaveBeenCalled();
  });
});
```

---

## 🎯 Test Naming Conventions

### Describe Blocks
```typescript
// ✅ CORRECT - Describe what you're testing
describe('PatientService', () => {
  describe('createPatient', () => {
    describe('with valid data', () => {});
    describe('with invalid data', () => {});
  });
});
```

### Test Cases
```typescript
// ✅ CORRECT - Clear, specific descriptions
it('should create patient with valid data')
it('should throw ValidationError for missing name')
it('should return 404 when patient not found')
it('should disable submit button while loading')

// ❌ WRONG - Vague descriptions
it('works')
it('test1')
it('checks the thing')
```

---

## 🔍 Testing Edge Cases

Always test:
```typescript
describe('Edge Cases', () => {
  // Null/Undefined
  it('should handle null input', () => {
    expect(processData(null)).toBe(null);
  });
  
  // Empty values
  it('should handle empty array', () => {
    expect(filterPatients([])).toEqual([]);
  });
  
  // Boundary values
  it('should handle age = 0', () => {
    expect(isValidAge(0)).toBe(true);
  });
  
  it('should handle age = 150', () => {
    expect(isValidAge(150)).toBe(true);
  });
  
  it('should reject age = 151', () => {
    expect(isValidAge(151)).toBe(false);
  });
  
  // Large datasets
  it('should handle 10000 patients', () => {
    const patients = generatePatients(10000);
    expect(filterPatients(patients)).toBeDefined();
  });
  
  // Special characters
  it('should handle special characters in name', () => {
    expect(formatName("O'Brien")).toBe("O'Brien");
  });
});
```

---

## 🚫 Testing Anti-Patterns

### Don't Test Implementation Details
```typescript
// ❌ WRONG - Testing internal state
it('should set loading to true', () => {
  wrapper.setState({ loading: true });
  expect(wrapper.state('loading')).toBe(true);
});

// ✅ CORRECT - Test behavior
it('should show loading spinner while fetching', () => {
  render(<PatientList />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
```

### Don't Write Brittle Tests
```typescript
// ❌ WRONG - Depends on exact class names
expect(element).toHaveClass('css-123abc-componentName');

// ✅ CORRECT - Test behavior or accessible attributes
expect(element).toHaveStyle({ color: 'red' });
expect(element).toHaveAttribute('aria-label', 'Close');
```

### Don't Create Test Interdependencies
```typescript
// ❌ WRONG - Tests depend on order
let globalUser;
it('creates user', () => { globalUser = createUser(); });
it('updates user', () => { updateUser(globalUser); });

// ✅ CORRECT - Each test is independent
it('creates user', () => {
  const user = createUser();
  expect(user).toBeDefined();
});

it('updates user', () => {
  const user = createUser();
  const updated = updateUser(user);
  expect(updated).toBeDefined();
});
```

---

## 📊 Code Coverage

### Run Coverage
```bash
# Generate coverage report
npm run test:coverage

# View in browser
open coverage/lcov-report/index.html
```

### Coverage Configuration
```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.types.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/index.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/services/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
```

---

## ⚡ Performance Testing

```typescript
describe('Performance', () => {
  it('should render large list in under 100ms', () => {
    const start = performance.now();
    
    render(<PatientList patients={generatePatients(1000)} />);
    
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100);
  });
});
```

---

## ♿ Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<PatientCard patient={mockPatient} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## 📋 Testing Checklist

Before marking a feature complete:

- [ ] Unit tests for all functions/components
- [ ] Integration tests for workflows
- [ ] E2E test for critical user path
- [ ] Edge cases covered
- [ ] Error handling tested
- [ ] Loading states tested
- [ ] Empty states tested
- [ ] Coverage ≥ 80%
- [ ] All tests passing
- [ ] No skipped tests (`.skip`)
- [ ] No focused tests (`.only`)

---

## 🎓 Testing Best Practices

1. **Write tests first** (TDD when possible)
2. **Keep tests simple** - One assertion per test when possible
3. **Test behavior, not implementation**
4. **Make tests readable** - Clear AAA structure
5. **Fast tests** - Unit tests should be < 100ms
6. **Independent tests** - No shared state
7. **Meaningful assertions** - Use specific matchers
8. **Mock external dependencies**
9. **Test unhappy paths** - Errors, edge cases
10. **Maintain tests** - Update with code changes

---

## 🔧 Test Configuration

### Jest Setup
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.types.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Test Setup File
```typescript
// tests/setup.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Mock API server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Suppress console errors in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
```

---

**Remember**: Tests are not a burden, they're an investment. Good tests save debugging time, prevent regressions, and give you confidence to refactor!
