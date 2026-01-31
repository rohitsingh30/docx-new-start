# Docx Healthcare Platform

A comprehensive healthcare management platform with separate apps for Doctors, Patients, and Hospital Admins.

## 🏥 Project Overview

Docx is a modern healthcare platform built with React 19, TypeScript, and a Node.js backend. The system enables:

- **Doctors** to manage patients, appointments, and medical records
- **Patients** to book appointments, view records, and communicate with doctors
- **Admins** to oversee hospital operations and analytics

---

## 📁 Project Structure

```
docx/
├── apps/
│   ├── doctor/          # Doctor Portal (Priority 1) ✅
│   ├── patient/         # Patient Portal (Priority 2)
│   └── admin/           # Admin Portal (Priority 3)
├── backend/             # REST API Backend ✅
└── .github/             # Documentation & Instructions
```

---

## 🚀 Quick Start

### Frontend (Doctor App)

```bash
cd apps/doctor
npm install
npm start
```

Opens at http://localhost:3000

**Demo Login:**
- Email: `doctor@docx.com`
- Password: `demo123`

### Backend API

```bash
cd backend
npm install
npm run dev     # KEEP THIS TERMINAL OPEN!
```

API runs at http://localhost:4000

**⚠️ Important:** Keep the `npm run dev` terminal running! Open a **new terminal** for other commands.

**See `backend/QUICKSTART.md` for detailed setup**

---

## 📚 Documentation

### Main Documentation
- **[.github/README.md](.github/README.md)** - Documentation index
- **[.github/project.instructions.md](.github/project.instructions.md)** - PRIMARY project context

### Backend Documentation
- **[backend/QUICKSTART.md](backend/QUICKSTART.md)** - Get backend running in 5 minutes
- **[backend/SETUP.md](backend/SETUP.md)** - Detailed backend setup
- **[backend/README.md](backend/README.md)** - Complete API documentation
- **[.github/BACKEND_IMPLEMENTATION_SUMMARY.md](.github/BACKEND_IMPLEMENTATION_SUMMARY.md)** - Implementation summary

### Frontend Documentation
- **[.github/frontend.instructions.md](.github/frontend.instructions.md)** - React/TypeScript guidelines
- **[.github/uiux.instructions.md](.github/uiux.instructions.md)** - Design system

### Other Documentation
- **[.github/backend.instructions.md](.github/backend.instructions.md)** - API patterns
- **[.github/testing.instructions.md](.github/testing.instructions.md)** - Testing strategy
- **[.github/PROJECT_TRACKER.md](.github/PROJECT_TRACKER.md)** - Project progress

---

## 🛠️ Tech Stack

### Frontend
- React 19.1.1
- TypeScript 5.9.2
- CSS Modules
- React Router DOM

### Backend
- Node.js 18+ with TypeScript
- Express.js
- MongoDB (Atlas or local)
- Mongoose
- JWT Authentication

---

## ✅ Current Status

### Completed ✅
- [x] Doctor App UI (full implementation)
- [x] Backend API (16 endpoints)
- [x] Database models
- [x] Authentication system
- [x] Role-based authorization
- [x] Demo data seeding
- [x] Complete documentation

### In Progress 🔄
- [ ] Patient App UI
- [ ] Admin App UI
- [ ] Backend-Frontend integration
- [ ] API testing
- [ ] Deployment setup

---

## 🔐 Demo Accounts

After running backend setup, these accounts are available:

| Role | Email | Password |
|------|-------|----------|
| 👨‍⚕️ Doctor | doctor@docx.com | demo123 |
| 👤 Patient | patient@docx.com | demo123 |
| 👤 Patient | emma@docx.com | demo123 |
| 🔧 Admin | admin@docx.com | demo123 |

---

## 🎯 Development Priority

1. **Doctor Flow** 👨‍⚕️ (CURRENT) - UI complete, backend complete
2. **Patient Flow** 👤 (NEXT) - To be built
3. **Admin Flow** 🏥 (LAST) - To be built

---

## 📝 Key Rules

This project follows strict coding standards:

1. **NO STRING LITERALS** - Use enums and constants
2. **Type Everything** - Strict TypeScript
3. **Functional Components** - No class components
4. **CSS Modules** - All styles in `/styles`
5. **Validate Input** - Zod schemas
6. **Document Changes** - Update PROJECT_TRACKER.md

See `.github/project.instructions.md` for complete guidelines.

---

## 🧪 Testing

```bash
# Frontend tests
cd apps/doctor
npm test

# Backend tests (when added)
cd backend
npm test
```

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB (for backend)
- npm or yarn

### Install All Dependencies

```bash
# Doctor app
cd apps/doctor && npm install

# Backend
cd ../../backend && npm install
```

---

## 🚢 Deployment

### Frontend
- Deploy to Vercel/Netlify
- Build command: `npm run build`
- Output directory: `build/`

### Backend
- Deploy to Railway/Render
- Build command: `npm run build`
- Start command: `npm start`
- Requires MongoDB database

See deployment documentation in `.github/` for details.

---

## 🤝 Contributing

1. Read `.github/project.instructions.md`
2. Follow the coding standards
3. Update `PROJECT_TRACKER.md`
4. Test your changes
5. Update documentation

---

## 📞 Support

For help and guidance:
- Check documentation in `.github/`
- Review handoff documents
- See setup guides in `backend/`

---

## 📜 License

ISC

---

**Built with ❤️ for healthcare professionals and patients**

---

## Original Create React App Documentation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
