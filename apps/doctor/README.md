# Docx Doctor App

Healthcare management portal for doctors.

## Features

- **🔐 Authentication**: Secure login with form validation
- **Dashboard**: View today's appointments, assigned patients, and quick stats
- **Patient Management**: View and manage assigned patients
- **Medical Records**: Add medical notes and prescriptions
- **Appointments**: Manage appointments (view, complete, cancel)

## 🧪 Testing / Development

### Quick Login (Development Only)

When running in development mode, you'll see a **"🚀 Quick Login (Dev Only)"** button on the login page that instantly logs you in as Dr. Sarah Johnson. This bypass:

- ✅ Only appears when `NODE_ENV=development`
- ✅ Automatically removed in production builds
- ✅ Uses mock data from `dataConstants.ts`

### Manual Login Credentials

You can also test with these mock accounts:

| Email | Password | User |
|-------|----------|------|
| doctor@docx.com | doctor123 | Dr. Sarah Johnson |
| demo@docx.com | demo123 | Dr. Demo |
| admin@docx.com | admin123 | Admin User |

## Tech Stack

- React 19.1.1
- TypeScript 4.9.5
- CSS Modules
- React Scripts 5.0.1

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app on [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Test Coverage

```bash
npm run test:coverage
```

## Project Structure

```
src/
├── components/       # React components
│   ├── Dashboard.tsx
│   ├── DoctorCard.tsx
│   ├── DoctorForm.tsx
│   ├── LeftPane.tsx
│   └── ...
├── styles/           # ⭐ ALL CSS FILES (Component CSS + App CSS)
│   ├── App.module.css
│   ├── index.css
│   ├── Dashboard.module.css
│   ├── DoctorCard.module.css
│   ├── DoctorForm.module.css
│   ├── LeftPane.module.css
│   └── ...
├── constants/        # Application constants
│   ├── colors.ts
│   ├── stringConstants.ts
│   └── ...
├── types/            # TypeScript type definitions
│   ├── Doctor.types.ts
│   ├── Patient.types.ts
│   └── ...
├── utils/            # Helper functions
│   ├── cssUtils.ts
│   ├── dataUtils.ts
│   └── ...
├── hooks/            # Custom React hooks
│   ├── useForm.ts
│   ├── useLocalStorage.ts
│   └── ...
├── App.tsx           # Main app component
└── index.tsx         # Entry point
```

**CSS Organization**: All CSS files are centralized in the `styles/` folder for better organization and maintainability.

## Development Guidelines

- **No hardcoded values** - Use constants from `constants/` folder
- **Functional components only** - Use React hooks
- **TypeScript strict mode** - No `any` types
- **CSS Modules** - All CSS files in `styles/` folder
- **CSS Imports** - Components import from `../styles/ComponentName.module.css`
- **80%+ test coverage** - Write comprehensive tests
