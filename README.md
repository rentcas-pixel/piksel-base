# Piksel Base - Užsakymų Valdymo Sistema

Moderni web aplikacija ekranų ir viadukų užsakymų valdymui, sukurta su Next.js 15, TypeScript ir Tailwind CSS.

## 🚀 Techninė Infrastruktūra

- **Frontend Framework**: Next.js 15 su Turbopack
- **React**: 18 su TypeScript
- **Styling**: Tailwind CSS
- **Ikonos**: Lucide React
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Supabase Storage
- **Hosting**: Vercel su auto-deploy
- **Authentication**: Supabase Auth

## ✨ Funkcionalumas

- 📋 Užsakymų lentelė su 10 stulpeliais
- 🔍 Real-time paieška ir filtravimas
- 📊 Rūšiavimas pagal bet kurį stulpelį
- 📄 Paginacija (5, 10, 20, 50 elementų)
- 📁 Failų upload ir valdymas (screenshotai, dokumentai)
- 💾 Duomenų išsaugojimas PostgreSQL duomenų bazėje
- 🔐 Vartotojų autentifikavimas
- 📱 Responsive dizainas
- 🎨 Modernus UI su Tailwind CSS
- 🇱🇹 Lietuvių kalba

## 🏗️ Projekto Struktūra

```
piksel-base/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── orders/        # Užsakymų API
│   │   └── upload/        # Failų upload API
│   ├── globals.css        # Globalūs stiliai
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Pagrindinis puslapis
├── components/             # React komponentai
│   ├── Header.tsx         # Antraštės komponentas
│   ├── Tabs.tsx           # Tab navigacija
│   ├── OrdersTable.tsx    # Užsakymų lentelė
│   └── FileUpload.tsx     # Failų upload komponentas
├── lib/                    # Utilities
│   └── supabase.ts        # Supabase klientas
├── types/                  # TypeScript tipai
│   └── order.ts           # Užsakymų interfeisai
├── data/                   # Pavyzdiniai duomenys
│   └── sampleOrders.ts    # Užsakymų duomenys
├── supabase/               # Duomenų bazės schema
│   └── schema.sql         # SQL schema
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind konfigūracija
├── next.config.js          # Next.js konfigūracija
├── env.example             # Environment variables pavyzdys
└── DEPLOYMENT_INSTRUKCIJOS.md # Deployment instrukcijos
```

## 🛠️ Instaliavimas

1. **Klonuoti projektą**
   ```bash
   git clone <repository-url>
   cd piksel-base
   ```

2. **Įdiegti dependencies**
   ```bash
   npm install
   ```

3. **Paleisti development server**
   ```bash
   npm run dev
   ```

4. **Atidaryti naršyklę**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Vercel + Supabase (Rekomenduojama)

1. **Sukurti Supabase projektą** (žr. `DEPLOYMENT_INSTRUKCIJOS.md`)
2. **Sukurti Vercel paskyrą** ir importuoti GitHub repository
3. **Konfigūruoti environment variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```
4. **Deploy** - automatiškai iš GitHub

### Alternatyvūs sprendimai

- **Railway** - full-stack hosting
- **Render** - PostgreSQL + Next.js
- **DigitalOcean** - VPS hosting

## 📊 Duomenų Struktūra

### Order Interface
```typescript
interface Order {
  id: number
  pavadinimas: string
  agentura: string
  patvirtinta: boolean
  dataNuo: string
  dataIki: string
  mediaGautas: boolean
  galutineKaina: number
  saskaitaIssiusta: boolean
  orderNo: string
  atnaujinta: string
  tipas: 'ekranai' | 'viadukai'
  komentaras?: string
}
```

### Pavyzdiniai duomenys
- **5 ekranų užsakymai**: Ignitis, Vilnius, Kaunas, Klaipėda, Šiauliai
- **4 viadukų užsakymai**: Skirtingos agentūros ir lokacijos

## 🎨 Dizaino Sistema

### Spalvų paletė
- **Primary**: Mėlyna (#3b82f6) - pagrindinės akcijos
- **Success**: Žalia (#22c55e) - pridėjimas, patvirtinimas
- **Warning**: Geltona (#f59e0b) - įspėjimai
- **Danger**: Raudona (#ef4444) - klaidos, atšaukimas
- **Neutral**: Pilka (#6b7280) - tekstas, fonas

### Tipografija
- **Font**: Inter (Google Fonts)
- **Antraštės**: 2xl, xl, lg dydžiai
- **Tekstas**: base, sm dydžiai

## 📱 Responsive Dizainas

- **Mobile**: < 768px - stacked layout
- **Tablet**: 768px - 1024px - 2 stulpelių grid
- **Desktop**: > 1024px - 3 stulpelių grid

## 🔧 Scripts

```json
{
  "dev": "next dev",           # Development server
  "build": "next build",       # Production build
  "start": "next start",       # Production server
  "lint": "next lint",         # ESLint
  "export": "next build && next export"  # Static export
}
```

## 🚀 Ateities Funkcionalumas

### Phase 1: Pagrindinis funkcionalumas ✅
- [x] Užsakymų lentelė
- [x] Filtravimas ir paieška
- [x] Pagination
- [x] Responsive dizainas

### Phase 2: Autentifikavimas 🔄
- [ ] User login/register
- [ ] Protected routes
- [ ] User management

### Phase 3: Duomenų valdymas 📊
- [ ] CRUD operacijos
- [ ] Forms integracija
- [ ] Data export

### Phase 4: Advanced features 🚀
- [ ] Admin panelis
- [ ] Notifications
- [ ] Workflow automation
- [ ] API integracijos

## 🤝 Prisidėjimas

1. Fork repository
2. Sukurti feature branch
3. Commit changes
4. Push to branch
5. Sukurti Pull Request

## 📄 Licencija

Šis projektas yra privatus ir priklauso Piksel Base komandai.

## 📞 Kontaktai

- **Komanda**: Piksel Base Team
- **Projektas**: Užsakymų valdymo sistema
- **Versija**: 1.0.0

---

**Piksel Base** - Moderni užsakymų valdymo sistema 🚀
