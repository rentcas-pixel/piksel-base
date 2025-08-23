# Vercel Deployment Instrukcijos

## 🚀 Vercel Deployment

### 1. Eiti į Vercel.com
- Prisijungti su GitHub paskyra
- Spustelėti "New Project"

### 2. Importuoti GitHub Repository
- Pasirinkti `piksel-base` repository
- Spustelėti "Import"

### 3. Konfigūruoti Projektą
- **Project Name**: `piksel-base` (arba bet koks)
- **Framework Preset**: Next.js (automatiškai aptiktas)
- **Root Directory**: `./` (palikti tuščią)
- **Build Command**: `npm run build` (automatiškai)
- **Output Directory**: `.next` (automatiškai)

### 4. Environment Variables
Pridėti šiuos environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Deploy
- Spustelėti "Deploy"
- Palaukti deployment proceso pabaigos

## 🔗 Gauti Live URL

Po sėkmingo deployment:
- **Production URL**: `https://piksel-base.vercel.app`
- **Preview URLs**: automatiškai sugeneruojami kiekvienam commit

## 🔄 Automatinis Deployment

- Kiekvienas push į `main` branch automatiškai deploy'ina
- Preview deployments sugeneruojami pull request'ams
- Rollback galimas per Vercel dashboard

## 📊 Monitoring

- **Analytics**: real-time statistikos
- **Logs**: server logs ir errors
- **Performance**: Core Web Vitals
- **Uptime**: sistemos veikimo laikas

---

**Piksel Base Team** 🚀
