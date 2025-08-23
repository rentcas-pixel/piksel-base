# Supabase Projekto Sąranka

## 🗄️ Supabase Projekto Sukūrimas

### 1. Eiti į Supabase.com
- Prisijungti su GitHub paskyra
- Spustelėti "New Project"

### 2. Projekto Nustatymai
- **Organization**: pasirinkti arba sukurti naują
- **Project Name**: `piksel-base`
- **Database Password**: sukurti stiprų slaptažodį (išsaugoti!)
- **Region**: `West Europe (Ireland)` arba `North Europe (Frankfurt)`
- **Pricing Plan**: Free tier

### 3. Sukurti Projektą
- Spustelėti "Create new project"
- Palaukti projekto sukūrimo (5-10 min)

## 🔧 Duomenų Bazės Konfigūracija

### 1. SQL Editor
- Eiti į "SQL Editor" meniu
- Spustelėti "New query"
- Kopijuoti ir įvykdyti `supabase/schema.sql` failą

### 2. Patikrinti Lenteles
- Eiti į "Table Editor"
- Patikrinti ar sukurtos `orders` ir `files` lentelės

## 📁 Storage Konfigūracija

### 1. Sukurti Storage Bucket
- Eiti į "Storage" meniu
- Spustelėti "New Bucket"
- **Name**: `order-files`
- **Public bucket**: ✅ (checked)
- **File size limit**: `10MB`

### 2. Storage Policies
Eiti į "Policies" ir pridėti:

```sql
-- Allow authenticated uploads
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow public viewing
CREATE POLICY "Allow public viewing" ON storage.objects
FOR SELECT USING (true);

-- Allow users to delete their files
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE USING (auth.role() = 'authenticated');
```

## 🔑 API Raktų Gavyba

### 1. Settings > API
- **Project URL**: `https://your-project.supabase.co`
- **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2. Išsaugoti Raktus
Šie raktai reikalingi Vercel environment variables

## 🔐 Autentifikavimo Sąranka

### 1. Authentication > Settings
- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: 
  - `https://your-app.vercel.app/auth/callback`
  - `http://localhost:3000/auth/callback`

### 2. Email Templates
- Eiti į "Email Templates"
- Customize email templates pagal poreikius

## 📊 Monitoring

### 1. Dashboard
- **Database**: lentelių statistikos
- **Storage**: failų naudojimas
- **Auth**: vartotojų prisijungimai

### 2. Logs
- **API Logs**: visi API calls
- **Auth Logs**: prisijungimų istorija
- **Database Logs**: SQL queries

---

**Piksel Base Team** 🚀
