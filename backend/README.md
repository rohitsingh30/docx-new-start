# Docx Backend API

Backend API for the Docx Healthcare Platform.

## Tech Stack

- **Node.js 18+** with TypeScript
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Zod** - Validation (ready to add)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Use MongoDB locally or Atlas.

- Local example: `mongodb://localhost:27017/docx`
- Atlas example: `mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority`

### 3. Configure Environment

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Set `MONGODB_URI` in `.env`.

### 4. Start Development Server

```bash
npm run dev
```

Server runs on http://localhost:4000

**⚠️ Important:** Keep this terminal running! Open a new terminal for testing commands.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Doctor Endpoints
- `GET /api/doctor/appointments` - Get my appointments
- `GET /api/doctor/patients` - Get my patients
- `GET /api/doctor/patients/:patientId` - Get patient details
- `POST /api/doctor/patients/:patientId/notes` - Add medical note
- `PATCH /api/doctor/appointments/:appointmentId/status` - Update appointment

### Patient Endpoints
- `GET /api/patient/appointments` - Get my appointments
- `GET /api/patient/doctors` - Get available doctors
- `POST /api/patient/appointments` - Book appointment
- `DELETE /api/patient/appointments/:appointmentId` - Cancel appointment
- `GET /api/patient/medical-records` - Get my records
- `GET /api/patient/medical-notes` - Get my notes

### Admin Endpoints
- `GET /api/admin/doctors` - Get all doctors
- `GET /api/admin/analytics` - Get system analytics

## Environment Variables

```bash
MONGODB_URI="mongodb://localhost:27017/docx"
JWT_SECRET="your-secret-key"
PORT=4000
NODE_ENV=development
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001,http://localhost:3002"
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, error handling
│   ├── routes/          # API routes
│   ├── models/          # Mongoose models
│   ├── types/           # TypeScript types/enums
│   ├── utils/           # Helper functions
│   ├── app.ts           # Express app setup
│   └── index.ts         # Server entry point
├── tests/               # Tests (to be added)
├── .env                 # Environment variables
└── package.json
```

## Development

```bash
# Watch mode (auto-restart on changes)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## Troubleshooting

### "Server keeps stopping when I run curl"
**Problem:** Running curl commands in the same terminal as `npm run dev` stops the server.

**Solution:** Keep the server terminal open and use another terminal for testing:

```bash
# Terminal 1: Keep this running
npm run dev

# Terminal 2: Use this for testing
curl http://localhost:4000/health
```

### "Cannot connect to database"
**Problem:** MongoDB not running or wrong credentials.

**Solution:**
```bash
# Verify MONGODB_URI in .env
cat .env | grep MONGODB_URI
```

### "Port 4000 already in use"
**Problem:** Another process is using port 4000.

**Solution:**
```bash
# Find and kill the process
lsof -ti:4000 | xargs kill -9

# Or change PORT in .env
echo "PORT=4001" >> .env
```

## Key Rules

1. **NO STRING LITERALS** - Use enums from `src/types/enums.ts`
2. **Type Everything** - Strict TypeScript, no `any` types
3. **Validate Input** - Use Zod for request validation
4. **Hash Passwords** - Never store plain text passwords
5. **Use JWT** - Stateless authentication
6. **Error Handling** - Try-catch in all async functions

## Support

See the main project documentation in `.github/`:
- `backend.instructions.md` - Detailed backend guidelines
- `project.instructions.md` - Overall project context
