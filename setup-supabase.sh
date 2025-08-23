#!/bin/bash

echo "🚀 Piksel Base - Supabase Automatinis Setup"
echo "=============================================="

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI nerastas. Įdiegiame..."
    npm install -g supabase
fi

# Check if user is logged in
if ! supabase projects list &> /dev/null; then
    echo "🔐 Reikia prisijungti prie Supabase..."
    supabase login
fi

echo "📋 Sukuriame duomenų bazės lenteles..."

# Create orders table
echo "📊 Sukuriame orders lentelę..."
supabase db push --db-url "postgresql://postgres:[YOUR_DB_PASSWORD]@db.zgqgxyydjnaddxrcffle.supabase.co:5432/postgres" --file supabase/migrations/001_create_orders_table.sql

# Create storage bucket
echo "🗂️ Sukuriame storage bucket..."
supabase db push --db-url "postgresql://postgres:[YOUR_DB_PASSWORD]@db.zgqgxyydjnaddxrcffle.supabase.co:5432/postgres" --file supabase/migrations/002_create_storage.sql

echo "✅ Setup baigtas!"
echo ""
echo "🔧 Ką daryti toliau:"
echo "1. Eikite į https://supabase.com/dashboard"
echo "2. Atidarykite savo projektą"
echo "3. Eikite į Storage → sukurkite 'piksel-files' bucket"
echo "4. Pažymėkite 'Public bucket'"
echo "5. Testuokite aplikaciją: npm run dev"
echo ""
echo "📚 Pilnos instrukcijos: SUPABASE_SETUP_INSTRUCTIONS.md"
