# Piksel Base - Deployment Instrukcijos

## 🚀 Hosting Sprendimas: Vercel + Supabase

### Kodėl šis sprendimas?

1. **Vercel** - geriausias Next.js hosting
   - ✅ Automatinis deployment iš GitHub
   - ✅ Next.js 15 optimizacija
   - ✅ Global CDN ir greitas veikimas
   - ✅ Nemokamas planas su 100GB bandwidth
   - ✅ Serverless functions palaikymas

2. **Supabase** - moderni PostgreSQL duomenų bazė
   - ✅ PostgreSQL su real-time funkcionalumu
   - ✅ File storage (screenshotai, dokumentai)
   - ✅ Built-in autentifikavimas
   - ✅ Nemokamas planas su 500MB DB ir 1GB storage
   - ✅ Automatinis backup ir scaling

## 🔧 Supabase Sąranka

### 1. Sukurti Supabase projektą

1. **Eiti į** https://supabase.com/
2. **Sign Up** su GitHub arba email
3. **Create New Project**
4. **Pasirinkti organizaciją** arba sukurti naują
5. **Įvesti projekto pavadinimą**: `piksel-base`
6. **Pasirinkti regioną**: `West Europe (Ireland)` arba `North Europe (Frankfurt)`
7. **Sukurti duomenų bazės slaptažodį** (išsaugoti!)
8. **Create Project**

### 2. Sukonfigūruoti duomenų bazę

1. **Eiti į SQL Editor**
2. **Kopijuoti ir įvykdyti** `supabase/schema.sql` failą
3. **Patikrinti**, kad lentelės sukurtos

### 3. Sukonfigūruoti Storage

1. **Eiti į Storage > Buckets**
2. **Create New Bucket**
   - **Name**: `order-files`
   - **Public bucket**: ✅ (checked)
   - **File size limit**: `10MB`
3. **Create Bucket**
4. **Eiti į Policies**
5. **Pridėti RLS policies**:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow public access to view files
CREATE POLICY "Allow public viewing" ON storage.objects
FOR SELECT USING (true);

-- Allow users to delete their own files
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE USING (auth.role() = 'authenticated');
```

### 4. Gauti API raktus

1. **Eiti į Settings > API**
2. **Kopijuoti**:
   - **Project URL**
   - **anon public key**

## 🚀 Vercel Deployment

### 1. Sukurti Vercel paskyrą

1. **Eiti į** https://vercel.com/
2. **Sign Up** su GitHub
3. **Import Project** iš GitHub

### 2. Konfigūruoti environment variables

1. **Eiti į Project Settings > Environment Variables**
2. **Pridėti**:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. **Save**

### 3. Deploy

1. **Push changes** į GitHub
2. **Vercel automatiškai deploy** projektą
3. **Gauti production URL**

## 🔐 Autentifikavimo Sąranka

### 1. Supabase Auth

1. **Eiti į Authentication > Settings**
2. **Site URL**: įvesti Vercel URL
3. **Redirect URLs**: pridėti:
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback`

### 2. Email Templates

1. **Eiti į Authentication > Email Templates**
2. **Customize** email templates
3. **Test** email siuntimą

## 📱 Failų Upload Sąranka

### 1. Storage Bucket Permissions

```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow public viewing
CREATE POLICY "Allow public viewing" ON storage.objects
FOR SELECT USING (true);

-- Allow users to delete their files
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE USING (auth.role() = 'authenticated');
```

### 2. File Type Restrictions

```sql
-- Only allow specific file types
CREATE POLICY "Restrict file types" ON storage.objects
FOR INSERT WITH CHECK (
  storage.extension(name) IN ('png', 'jpg', 'jpeg', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx')
);
```

## 🔍 Monitoring ir Analytics

### 1. Vercel Analytics

1. **Eiti į Project > Analytics**
2. **Enable Analytics**
3. **Gauti** real-time statistikas

### 2. Supabase Monitoring

1. **Eiti į Dashboard > Logs**
2. **Monitor** API calls ir errors
3. **Set up alerts** kritiniams įvykiams

## 💰 Kainos

### Nemokamas planas:
- **Vercel**: 100GB bandwidth/mėn
- **Supabase**: 500MB DB, 1GB storage, 50MB bandwidth/mėn

### Pro planas (jei reikia daugiau):
- **Vercel Pro**: $20/mėn
- **Supabase Pro**: $25/mėn

## 🚨 Saugumo Rekomendacijos

1. **Environment variables** - niekada necommitinti į Git
2. **Row Level Security** - visada įjungti Supabase
3. **API rate limiting** - apsaugoti nuo DDoS
4. **Regular backups** - automatiniai Supabase backup
5. **SSL certificates** - automatiškai Vercel

## 🔧 Troubleshooting

### Dažni nusklandumai:

1. **"Invalid API key"**
   - Patikrinti environment variables
   - Patikrinti Supabase projekto URL

2. **"Storage bucket not found"**
   - Patikrinti bucket pavadinimą
   - Patikrinti storage policies

3. **"Database connection failed"**
   - Patikrinti Supabase status
   - Patikrinti network policies

## 📞 Pagalba

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **GitHub Issues**: projekto repository

---

**Piksel Base Team** 🚀
