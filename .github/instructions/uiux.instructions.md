# UI/UX Instructions

## Core Rules

1. **Mocks are source of truth** - Extract exact values from `/apps/[app]/mocks/`
2. **All CSS in styles folder** - `/apps/[app]/src/styles/*.module.css`
3. **Verify with Playwright** - Compare mock vs app computed styles before completing work
4. **box-sizing: border-box** - Always add this (Tailwind default)
5. **Extract from tailwind.config** - Colors, sizes, spacing from mock's `<script>` tag

---

## Mock-to-CSS Workflow

### 1. Extract from Mock
```bash
# Open mock in browser
file:///Users/rohit/docx/apps/doctor/mocks/Login.html
```

Find Tailwind classes → Check tailwind.config → Use exact hex values

### 2. Tailwind → CSS Conversion

**Colors:**
- `text-white` → `color: #FFFFFF` (from tailwind.config)
- `bg-primary` → `background-color: #2A64F5`
- Apply to text AND icons inside elements

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
