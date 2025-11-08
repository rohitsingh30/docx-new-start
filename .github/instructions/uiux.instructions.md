# UI/UX Instructions - Docx

## Overview

Design system and user experience guidelines for Docx healthcare platform.

---

## 🎨 Design System

### Colors
```typescript
export const COLORS = {
  // Role-based themes
  DOCTOR_PRIMARY: '#3182ce',
  PATIENT_PRIMARY: '#38a169',
  ADMIN_PRIMARY: '#d69e2e',
  
  // Semantic colors
  SUCCESS: '#48bb78',
  ERROR: '#e53e3e',
  WARNING: '#ed8936',
  INFO: '#4299e1',
  
  // Neutrals
  GRAY_50: '#f7fafc',
  GRAY_100: '#edf2f7',
  GRAY_200: '#e2e8f0',
  GRAY_500: '#718096',
  GRAY_700: '#2d3748',
  GRAY_900: '#1a202c',
};
```

### Typography
- **Font Family**: System font stack (SF Pro, Segoe UI, Roboto)
- **Base Size**: 16px
- **Line Height**: 1.5
- **Headings**: 24px, 20px, 18px, 16px
- **Body**: 16px, 14px, 12px

### Spacing Scale
- Base: 8px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px

### Border Radius
- Small: 4px (buttons, inputs)
- Medium: 8px (cards)
- Large: 12px (modals)
- XL: 16px (containers)

---

## 📱 Responsive Design

### Breakpoints
```typescript
const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};
```

### Grid System
- **Desktop**: 12 columns, 24px gutter
- **Tablet**: 8 columns, 16px gutter
- **Mobile**: 4 columns, 12px gutter

---

## 🎭 Component Patterns

### Loading States
- Use skeleton screens for content
- Show spinner for actions
- Disable buttons during submission

### Error States
- Clear error messages
- Show where the error occurred
- Provide actionable next steps

### Empty States
- Friendly message
- Illustration or icon
- Call-to-action button

---

## ♿ Accessibility

- **WCAG 2.1 AA** compliance
- Color contrast ratio ≥ 4.5:1
- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators visible
- Alt text for images

---

**See also:**
- [project.instructions.md](./project.instructions.md) - Business context
- [frontend.instructions.md](./frontend.instructions.md) - Implementation guidelines
