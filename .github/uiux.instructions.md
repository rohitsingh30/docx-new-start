# UI/UX Instructions

## Core Rules

1. **Mocks are source of truth** - Extract exact values from `/apps/[app]/mocks/`
2. **All CSS in styles folder** - `/apps/[app]/src/styles/*.module.css`
3. **ONLY USE EXISTING CSS VARIABLES** - Check `/apps/doctor/src/styles/index.css` for available variables. DO NOT invent new ones.
4. **NEVER HARDCODE COLORS** - Always use `var(--color-name, #fallback)` format
5. **USE INTER FONT** - All components must inherit Inter font (loaded in index.html)
6. **Verify with Playwright** - Compare mock vs app computed styles before completing work
7. **box-sizing: border-box** - Always add this (Tailwind default)
8. **Follow existing patterns** - Check Dashboard.module.css for consistent variable usage

## BEFORE Writing Any CSS

**MANDATORY CHECKLIST:**
1. ✅ Open `/apps/doctor/src/styles/index.css`
2. ✅ Read the `:root` section to see EXACTLY which CSS variables exist
3. ✅ Check `/apps/doctor/mocks/Dashboard.html` for color hex values used in mock
4. ✅ Look at `/apps/doctor/src/styles/Dashboard.module.css` for usage patterns
5. ❌ DO NOT create variables like `--color-gray-300`, `--color-text-quaternary`, etc. - they don't exist!

---

## CSS Variable System (MANDATORY)

### CRITICAL: Only Use Variables That Exist

**THESE ARE THE ONLY CSS VARIABLES AVAILABLE** (defined in `/apps/doctor/src/styles/index.css`):

```css
/* Primary Colors (from Login.html mock) */
--color-primary: #2A64F5;              /* Main brand color - buttons, links, active states */
--color-primary-rgb: 42, 100, 245;     /* RGB values for rgba() usage */
--color-primary-hover: rgba(42, 100, 245, 0.9);   /* 90% opacity hover */
--color-primary-light: rgba(42, 100, 245, 0.1);   /* 10% opacity backgrounds */
--color-primary-focus: rgba(42, 100, 245, 0.5);   /* 50% opacity focus rings */

/* Text Colors (from Dashboard.html mock) */
--color-text-primary: #1a202c;         /* Main text, headings */
--color-text-secondary: #4a5568;       /* Body text, labels */
--color-text-tertiary: #718096;        /* Muted text, placeholders, icons */

/* Background Colors */
--color-background: #f7fafc;           /* Page background */
--color-white: #ffffff;                /* Card backgrounds, white elements */

/* Borders and Grays */
--color-border: #e2e8f0;               /* Default borders */
--color-gray-100: #f7fafc;             /* Light background fills */
--color-gray-200: #e2e8f0;             /* Slightly darker fills */

/* Shadows (consolidated) */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);        /* Small shadow */
--shadow-focus: 0 0 0 3px rgba(42, 100, 245, 0.5); /* Focus ring shadow */

/* Status Colors (from mocks) */
--color-success-bg: #c6f6d5;
--color-success-text: #2f855a;
--color-warning-bg: #feebc8;
--color-warning-text: #c05621;
--color-error-bg: #fed7d7;
--color-error-text: #c53030;
--color-info-bg: #bee3f8;
--color-info-text: #2c5282;

/* Login-specific (only use in Login component) */
--color-form-bg: #F2F4F7;
--color-heading: #101828;
--color-body: #667085;
--color-border-hover: #98A2B3;
--color-error: #D92D20;
```

### Usage in Code - ALWAYS use var() with fallback

❌ **WRONG - DO NOT DO THIS:**
```css
.button {
  background-color: #2A64F5;                    /* Never hardcode */
  color: #1a202c;                               /* Never hardcode */
  border-color: var(--color-gray-300);          /* DOES NOT EXIST! */
  color: var(--color-text-quaternary);          /* DOES NOT EXIST! */
}
```

✅ **CORRECT - ALWAYS DO THIS:**
```css
.button {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.button:hover {
  background: var(--color-primary-hover);
}

.button:focus {
  box-shadow: var(--shadow-focus);
}

.text {
  color: var(--color-text-primary);    /* Headings */
  color: var(--color-text-secondary);  /* Body text */
  color: var(--color-text-tertiary);   /* Subtle text */
}

.activeTab {
  background: var(--color-primary-light);  /* 10% opacity background */
  color: var(--color-primary);
}
```

### Quick Reference Map

| Use Case | CSS Variable |
|----------|-------------|
| Button background | `var(--color-primary)` |
| Button hover | `var(--color-primary-hover)` |
| Active state background (10% opacity) | `var(--color-primary-light)` |
| Focus ring | `var(--shadow-focus)` |
| Heading text | `var(--color-text-primary)` |
| Body text / Labels | `var(--color-text-secondary)` |
| Placeholder / Subtle | `var(--color-text-tertiary)` |
| Card background | `var(--color-white)` |
| Page background | `var(--color-background)` |
| Borders | `var(--color-border)` |
| Light fill | `var(--color-gray-100)` |
| Small shadow | `var(--shadow-sm)` |

### Before Writing CSS - CHECK THESE

1. ✅ Open `/apps/doctor/src/styles/index.css` and verify variable exists
2. ✅ Check `/apps/doctor/mocks/Dashboard.html` for color values
3. ✅ Look at `/apps/doctor/src/styles/Dashboard.module.css` for patterns
4. ❌ NEVER invent new CSS variables (--color-gray-300, --color-text-quaternary, etc.)

### Common Mistakes & Fixes

| ❌ WRONG | ✅ CORRECT | Reason |
|----------|-----------|--------|
| `color: #2A64F5;` | `color: var(--color-primary, #2A64F5);` | Never hardcode colors |
| `var(--color-gray-300)` | `var(--color-border, #e2e8f0)` | Variable doesn't exist |
| `var(--color-text-quaternary)` | `var(--color-text-tertiary, #718096)` | Variable doesn't exist |
| `background: #f7fafc;` | `background: var(--color-gray-100, #f7fafc);` | Never hardcode colors |
| `border: 1px solid #e2e8f0;` | `border: 1px solid var(--color-border, #e2e8f0);` | Never hardcode colors |

### If You Need a Color Not in Variables

1. **First**: Check if an existing variable matches the mock's color value
2. **Second**: Check `/apps/doctor/mocks/Dashboard.html` for the exact hex value used
3. **Third**: Map that hex value to one of the existing CSS variables above
4. **Never**: Create new CSS variables - use only what exists in index.css

---

## Typography System (MANDATORY)

### Font Family
**ALWAYS inherit from body - DO NOT override font-family in components**

The app uses **Inter font** loaded in `/public/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
```

Set in `/src/styles/index.css`:
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
}
```

### Font Usage Rules
❌ **NEVER DO THIS:**
```css
.component {
  font-family: 'Roboto', sans-serif;  /* Wrong! */
}
```

✅ **ALWAYS DO THIS:**
```css
.component {
  /* Inherit from body - no font-family property needed */
  font-size: 1rem;
  font-weight: 500;
}
```

### Font Weights Available
- `400` - Regular (body text)
- `500` - Medium (labels, secondary headings)
- `600` - Semi-bold (card titles)
- `700` - Bold (page headings)
- `900` - Black (hero text, emphasis)

### Special Cases
- **Material Icons**: Use `font-family: 'Material Symbols Outlined'` only
- **Code/Monospace**: Use `font-family: 'Monaco', 'Menlo', 'Courier New', monospace`
- **Form Inputs**: Use `font-family: inherit` to get Inter from body

---

## Mock-to-CSS Workflow

### 1. Extract from Mock
```bash
# Open mock in browser
file:///Users/rohit/docx/apps/doctor/mocks/Login.html
```

Find Tailwind classes → Check tailwind.config → Map to CSS variables

### 2. Tailwind → CSS Variable Mapping

**Colors (USE VARIABLES):**
- `text-[#1a202c]` → `color: var(--color-text-primary, #1a202c)`
- `bg-primary` → `background-color: var(--color-primary, #3182ce)`
- `text-[#718096]` → `color: var(--color-text-tertiary, #718096)`
- Apply to text AND icons inside elements

**Typography (INHERIT Inter):**
- `font-display` (Tailwind) → Don't set font-family, use inheritance
- `font-semibold` → `font-weight: 600`
- `font-bold` → `font-weight: 700`
- `text-sm` → `font-size: 0.875rem`
- `text-base` → `font-size: 1rem`
- `text-lg` → `font-size: 1.125rem`

**Sizes:**
- `h-14` → `height: 3.5rem` (56px)
- `h-12` → `height: 3rem` (48px)
- `p-[15px]` → `padding: 0.9375rem`

**Always add:** `box-sizing: border-box`

### 3. Playwright Verification (MANDATORY)

```javascript
// Mock
await page.goto('file:///...mocks/Login.html');
const mockHeight = await page.evaluate(...);

// App  
await page.goto('http://localhost:3000');
const appHeight = await page.evaluate(...);

// Compare: mockHeight === appHeight
```

Check: `height`, `padding`, `boxSizing`, `color`, `fontSize`

---

## Common Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Icons black instead of white | Missing icon color | Add `color: #FFFFFF` to `.button .material-symbols-outlined` |
| Input too tall | Missing box-sizing | Add `box-sizing: border-box` |
| Wrong colors | Not checking tailwind.config | Extract from mock's `<script>` tag |

---

## Mock Update Rules

- Change implementation → Update mock immediately
- Verify with Playwright → Both must match
- Commit together → Never let them diverge

Reference: `/apps/doctor/mocks/Login.html` for Login page specs
