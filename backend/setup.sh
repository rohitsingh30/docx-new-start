#!/bin/bash

echo "🚀 Docx Backend Setup Script"
echo "=============================="
echo ""

if [ ! -f .env ]; then
    echo "❌ .env file not found"
    echo "Create .env from .env.example and set MONGODB_URI"
    exit 1
fi

if ! grep -q "^MONGODB_URI=" .env; then
    echo "❌ MONGODB_URI is not set in .env"
    exit 1
fi

echo "✅ .env found and MONGODB_URI is set"
echo ""
echo "Start the server with:"
echo "  npm run dev"
echo ""
