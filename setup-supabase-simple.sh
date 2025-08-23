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

echo "🔗 Jungiamės prie Supabase projekto..."

# Link to existing project
supabase link --project-ref zgqgxyydjnaddxrcffle

echo "📋 Sukuriame duomenų bazės lenteles..."

# Push migrations
supabase db push

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
