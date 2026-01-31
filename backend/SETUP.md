# 🚀 Backend Setup Guide

## Prerequisites

Before starting, you need:

1. **Node.js 18+** installed
2. **MongoDB** (local or Atlas)
3. **npm** or **yarn** package manager

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env
```

Update `.env` with your MongoDB connection string:

```
MONGODB_URI="mongodb://localhost:27017/docx"
```

### 3. Start Development Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:4000
📍 Environment: development
🏥 Health check: http://localhost:4000/health
```

## Testing the API

### 1. Health Check

```bash
curl http://localhost:4000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-12T...",
  "environment": "development"
}
```

### 2. Login as Doctor

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@docx.com",
    "password": "demo123"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "doctor@docx.com",
      "name": "Dr. Sarah Johnson",
      "role": "DOCTOR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Appointments (Protected Route)

```bash
# Replace YOUR_TOKEN with the token from login response
curl http://localhost:4000/api/doctor/appointments \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### Database Connection Error

```
Error: MONGODB_URI is not set
```

**Solution:** Check your `.env`:
```bash
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

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::4000
```

**Solution:** Change the port in `.env`:
```bash
PORT=4001
```

### JWT Secret Missing

```
Error: JWT_SECRET is not defined
```

**Solution:** Make sure `.env` has `JWT_SECRET` set:
```bash
JWT_SECRET="your-secret-key-change-in-production"
```

## Database Management

### View Database

Use MongoDB Compass or Atlas to inspect collections and documents.

### Reset Database (Clear All Data)

Drop the database or remove collections from MongoDB Compass/Atlas.

### Seed Demo Data (Optional)

```bash
npm run seed:mongo
```

## Next Steps

1. ✅ Backend is running
2. 🔄 Test all API endpoints with Postman or cURL
3. 🔗 Connect frontend apps to the backend
4. 📝 Add more features as needed

## Useful Commands

```bash
# Development
npm run dev              # Start with hot reload
npm run build            # Build for production
npm start                # Start production server

# Database
# (MongoDB uses Mongoose models; no ORM migrations)

# Testing
npm test                 # Run tests (when added)
npm run test:watch       # Run tests in watch mode
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, error handling
│   ├── routes/          # API endpoints
│   ├── types/           # TypeScript enums
│   ├── utils/           # Helper functions
│   ├── app.ts           # Express app
│   └── index.ts         # Server entry
├── src/models/          # Mongoose models
├── .env                 # Environment config
└── README.md           # Documentation
```

## Support

For more information:
- Backend Handoff: `../.github/BACKEND_HANDOFF.md`
- Backend Instructions: `../.github/backend.instructions.md`
- Project Overview: `../.github/project.instructions.md`
