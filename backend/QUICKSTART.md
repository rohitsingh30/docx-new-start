# 🎯 Quick Start - Docx Backend

Get the backend running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB (local or Atlas)

## Configure MongoDB

Set `MONGODB_URI` in `.env`:

```bash
cp .env.example .env
# Example:
MONGODB_URI="mongodb://localhost:27017/docx"
```

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start server (KEEP THIS TERMINAL OPEN!)
npm run dev
```

That's it! Server runs on http://localhost:4000

**⚠️ Important:** The `npm run dev` command starts the server and keeps it running. Don't close this terminal! Open a **new terminal window** for testing.

## Test It (in a NEW terminal)

```bash
# Health check
curl http://localhost:4000/health

# Login as doctor
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"doctor@docx.com","password":"demo123"}'
```

## Need Help?

See `SETUP.md` for detailed instructions.

## What's Next?

1. ✅ Backend is running
2. Test endpoints with Postman
3. Connect frontend apps
4. Build features!

---

**Full Documentation:**
- `README.md` - Complete backend docs
- `SETUP.md` - Detailed setup guide
- `../.github/BACKEND_HANDOFF.md` - Complete handoff document
