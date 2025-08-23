# 🚀 Piksel Base - Pilnas Deployment Planas

## 📋 Deployment Žingsniai

### 1️⃣ **GitHub Repository** (5 min)
- [ ] Eiti į [GitHub.com](https://github.com)
- [ ] Sukurti naują repository: `piksel-base`
- [ ] Nukopijuoti repository URL

### 2️⃣ **Supabase Projektas** (10 min)
- [ ] Eiti į [Supabase.com](https://supabase.com)
- [ ] Sukurti naują projektą: `piksel-base`
- [ ] Palaukti projekto sukūrimo
- [ ] Įvykdyti `supabase/schema.sql` SQL Editor
- [ ] Sukurti Storage bucket: `order-files`
- [ ] Gauti API raktus (URL + anon key)

### 3️⃣ **Vercel Deployment** (5 min)
- [ ] Eiti į [Vercel.com](https://vercel.com)
- [ ] Prisijungti su GitHub
- [ ] Importuoti `piksel-base` repository
- [ ] Pridėti environment variables:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  ```
- [ ] Deploy projektą

### 4️⃣ **GitHub Push** (2 min)
```bash
git remote add origin https://github.com/YOUR_USERNAME/piksel-base.git
git branch -M main
git push -u origin main
```

## 🌐 Rezultatas

Po sėkmingo deployment:
- **Live URL**: `https://piksel-base.vercel.app`
- **GitHub**: `https://github.com/YOUR_USERNAME/piksel-base`
- **Supabase**: `https://your-project.supabase.co`

## 🔧 Automatinis Deployment

- Kiekvienas push į GitHub automatiškai deploy'ina į Vercel
- Real-time atnaujinimai be rankinio darbo
- Preview deployments pull request'ams

## 📱 Sistemos Funkcionalumas

✅ **Užsakymų valdymas**
- Ekranų ir viadukų užsakymai
- Real-time paieška ir filtravimas
- Rūšiavimas ir paginacija

✅ **Failų valdymas**
- Screenshotai, PDF, DOC, XLSX
- Drag & drop upload
- 10MB failo dydžio limitas

✅ **Duomenų bazė**
- PostgreSQL su real-time funkcionalumu
- Automatinis backup
- Row Level Security

✅ **Autentifikavimas**
- Vartotojų prisijungimas
- Saugūs API endpoints
- Role-based access

## 💰 Kainos

**Nemokamas planas:**
- Vercel: 100GB bandwidth/mėn
- Supabase: 500MB DB, 1GB storage, 50MB bandwidth/mėn

**Pro planas (jei reikia daugiau):**
- Vercel Pro: $20/mėn
- Supabase Pro: $25/mėn

## 🚨 Saugumas

- SSL certificates automatiškai
- Environment variables saugomi
- Row Level Security įjungta
- API rate limiting

## 📞 Pagalba

Jei kyla problemų:
1. Patikrinti environment variables
2. Patikrinti Supabase status
3. Patikrinti Vercel logs
4. Patikrinti GitHub Actions

---

**Piksel Base Team** 🚀

*Sistema bus pilnai funkcionali per 20-30 minučių!*
