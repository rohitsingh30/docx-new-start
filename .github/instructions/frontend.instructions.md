# Frontend Instructions - Docx

## Overview

Frontend development guidelines for the Docx healthcare platform. This covers React, TypeScript, component development, styling with CSS Modules, and testing.

---

## 🛠️ Tech Stack

- **React 19.1.1** - UI library
- **TypeScript 5.9.2** (strict mode) - Type safety
- **React Router** - Client-side routing
- **CSS Modules** - Component styling
- **Jest + React Testing Library** - Testing
- **Storybook** - Component development

---

## ✅ Core Principles

### 1. **NO HARDCODED VALUES**
❌ **Bad:**
```typescript
<button style={{ background: '#3182ce' }}>Submit</button>
<h1>Patient Dashboard</h1>
```

✅ **Good:**
```typescript
import { COLORS } from '@/shared/constants/colors';
import { STRING_CONSTANTS } from '@/constants/stringConstants';

<button style={{ background: COLORS.PRIMARY_BLUE }}>
  {STRING_CONSTANTS.BUTTONS.SUBMIT}
</button>
<h1>{STRING_CONSTANTS.TITLES.PATIENT_DASHBOARD}</h1>
```

### 2. **FUNCTIONAL COMPONENTS ONLY**
- No class components
- Use React hooks (useState, useEffect, useCallback, useMemo)
- Custom hooks for reusable logic

### 3. **NO DUPLICATE CODE**
- Extract repeated patterns to shared components
- Create custom hooks for repeated logic
- Use utility functions for common operations

### 4. **STRICT FOLDER STRUCTURE**
```
src/
├── shared/
│   ├── components/    # Reusable components (Card, Button, Input)
│   ├── hooks/         # Reusable hooks (useAuth, useApi)
│   ├── services/      # API clients, auth service
│   ├── types/         # Shared TypeScript types
│   └── utils/         # Helper functions
├── features/
│   ├── doctor/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── patient/
│   └── admin/
└── constants/         # All constants (strings, colors, config)
```

---

## 📁 File Organization Rules

### Component Structure
```
src/shared/components/Card/
├── Card.tsx              # Component implementation
├── Card.module.css       # Component styles
├── Card.test.tsx         # Component tests
├── Card.stories.tsx      # Storybook stories
├── Card.types.ts         # Component-specific types
└── index.ts              # Export

```

**Every component MUST have:**
1. `.tsx` file (implementation)
2. `.module.css` file (styles)
3. `.test.tsx` file (tests)
4. `.stories.tsx` file (Storybook)
5. `index.ts` (clean exports)

### Constants Structure
```
src/constants/
├── stringConstants.ts     # All UI strings
├── componentConstants.ts  # Component config
├── navigationConstants.ts # Routes, menu items
└── formConstants.ts       # Form validation rules
```

---

## 🎨 CSS Modules Guidelines

### 1. **One CSS file per component**
```typescript
// Card.tsx
import styles from './Card.module.css';

<div className={styles.card}>
  <h2 className={styles.title}>Title</h2>
</div>
```

### 2. **Use camelCase for class names**
```css
/* Card.module.css */
.card {
  padding: 24px;
  border-radius: 8px;
}

.cardElevated {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cardTitle {
  font-size: 20px;
  font-weight: 600;
}
```

### 3. **Import as `styles` object**
```typescript
import styles from './Component.module.css'; // ✅ Good
import classes from './Component.module.css'; // ❌ Inconsistent
```

### 4. **Conditional classes**
```typescript
<div className={`${styles.card} ${elevated ? styles.cardElevated : ''}`}>
```

Or use a helper:
```typescript
import { combineStyles } from '@/shared/utils/styleUtils';

<div className={combineStyles(styles.card, elevated && styles.cardElevated)}>
```

---

## 🔧 Component Development

### Shared Component Template
```typescript
// src/shared/components/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}) => {
  const className = `${styles.button} ${styles[`button${variant}`]} ${styles[`button${size}`]}`;
  
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
```

### TypeScript Props Interface
```typescript
// Button.types.ts
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

### Export Pattern
```typescript
// index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

---

## 🎯 Component Development Workflow

### Step 1: Design in Storybook First
```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
```

### Step 2: Write Tests
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText('Click')).toBeDisabled();
  });
});
```

### Step 3: Use in Application
```typescript
// DoctorDashboard.tsx
import { Button } from '@/shared/components/Button';

<Button variant="primary" onClick={handleSave}>
  Save Changes
</Button>
```

---

## 🪝 Custom Hooks

### Example: useApi Hook
```typescript
// src/shared/hooks/useApi.ts
import { useState, useCallback } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<void>;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, execute };
}
```

### Usage:
```typescript
import { useApi } from '@/shared/hooks/useApi';
import { fetchPatients } from '@/features/doctor/services/doctorService';

const DoctorDashboard = () => {
  const { data: patients, loading, error, execute } = useApi(fetchPatients);

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <PatientList patients={patients} />;
};
```

---

## 📋 Forms

### Form Pattern with Validation
```typescript
import { useState } from 'react';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';

interface FormData {
  name: string;
  email: string;
}

export const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Invalid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Submit form
    }
  };

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        value={formData.name}
        onChange={handleChange('name')}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T: Mix concerns
```typescript
// Bad: Business logic in component
const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  
  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data));
  }, []);
};
```

### ✅ DO: Separate concerns
```typescript
// Good: Business logic in service/hook
const DoctorDashboard = () => {
  const { patients, loading } = useDoctorPatients();
  // Component only handles presentation
};
```

### ❌ DON'T: Inline styles with magic numbers
```typescript
<div style={{ padding: '24px', margin: '16px' }}>
```

### ✅ DO: Use CSS Modules with named classes
```typescript
<div className={styles.container}>
```

---

## 📦 Import Aliases

Use path aliases for cleaner imports:
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@/shared/*": ["shared/*"],
      "@/features/*": ["features/*"]
    }
  }
}
```

```typescript
// Usage
import { Button } from '@/shared/components/Button';
import { useAuth } from '@/shared/hooks/useAuth';
import { DoctorDashboard } from '@/features/doctor/components/DoctorDashboard';
```

---

## ✅ Checklist for Every Component

- [ ] Created `.tsx` file with functional component
- [ ] Created `.module.css` file for styles
- [ ] Created `.test.tsx` file with tests (80% coverage)
- [ ] Created `.stories.tsx` file for Storybook
- [ ] Created `.types.ts` file for TypeScript interfaces
- [ ] No hardcoded strings (used constants)
- [ ] No hardcoded colors (used color constants)
- [ ] No inline styles (used CSS Modules)
- [ ] Props interface defined
- [ ] Default props provided where appropriate
- [ ] Component exported via `index.ts`

---

**See also:**
- [project.instructions.md](./project.instructions.md) - Business context
- [testing.instructions.md](./testing.instructions.md) - Testing guidelines
- [uiux.instructions.md](./uiux.instructions.md) - Design guidelines
