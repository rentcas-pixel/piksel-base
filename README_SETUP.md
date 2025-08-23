# 🚀 Piksel Base - Supabase Setup

## 📋 Automatinis Setup (Rekomenduojama)

### 1. Paleiskite Setup Script

```bash
# Paleiskite automatinį setup
./setup-supabase-sql.sh
```

**Ką daro script:**
- ✅ Patikrina, ar yra Supabase CLI
- ✅ Prisijungia prie jūsų projekto
- ✅ Sukuria visas lenteles automatiškai
- ✅ Nustato RLS politikas

### 2. Sukurkite Storage Bucket

Po sėkmingo setup:

1. **Eikite į** [Supabase Dashboard](https://supabase.com/dashboard)
2. **Atidarykite savo projektą**
3. **Eikite į Storage**
4. **Sukurkite naują bucket:**
   - **Name:** `piksel-files`
   - **Public bucket:** ✅ (pažymėkite)

### 3. Testuokite Sistemą

```bash
npm run dev
```

Atidarykite: http://localhost:3000

---

## 🔧 Rankinis Setup (Jei automatinis neveikia)

### 1. Įdiegti Supabase CLI

```bash
npm install -g supabase
```

### 2. Prisijungti

```bash
supabase login
```

### 3. Susieti Projektą

```bash
supabase link --project-ref zgqgxyydjnaddxrcffle
```

### 4. Sukurti Lenteles

```bash
supabase db reset --linked
```

---

## 📚 Pilnos Instrukcijos

Detalios instrukcijos: [SUPABASE_SETUP_INSTRUCTIONS.md](./SUPABASE_SETUP_INSTRUCTIONS.md)

---

## 🆘 Troubleshooting

### Jei klaidos:

#### **"Supabase CLI not found"**
```bash
npm install -g supabase
```

#### **"Not logged in"**
```bash
supabase login
```

#### **"Project not found"**
- Patikrinkite, ar teisingas project-ref
- Patikrinkite, ar esate prisijungęs

#### **"Permission denied"**
```bash
chmod +x setup-supabase*.sh
```

---

## 🎯 Kas Sukuriama Automatiškai

- ✅ **orders lentele** - užsakymų duomenys
- ✅ **files lentele** - failų metadata
- ✅ **Indeksai** - geresniam našumui
- ✅ **RLS politikos** - saugumui
- ✅ **Sample data** - 9 pavyzdiniai užsakymai

---

## 🚀 Po Setup

1. **Sistema naudos tikrą Supabase duomenų bazę**
2. **Failai įkeliami į Supabase Storage**
3. **Visi duomenys saugomi saugiai**
4. **Sistema paruošta produkcijai**

---

## 📞 Pagalba

Jei kyla problemų:
1. **Patikrinkite console** - ar nėra JavaScript klaidų
2. **Patikrinkite Supabase Dashboard** - ar lentelės sukurtos
3. **Patikrinkite storage bucket** - ar sukurtas `piksel-files`
