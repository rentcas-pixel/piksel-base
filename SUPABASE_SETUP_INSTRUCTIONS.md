# Supabase Nustatymo Instrukcijos

## 1. Sukurti Duomenų Bazę

Eikite į [Supabase Dashboard](https://supabase.com/dashboard) ir atidarykite savo projektą.

### SQL Editor
1. **Eikite į SQL Editor**
2. **Sukurkite naują query**
3. **Įkopijuokite ir įvykdykite šį kodą:**

```sql
-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  pavadinimas VARCHAR(255) NOT NULL,
  agentura VARCHAR(255) NOT NULL,
  tipas VARCHAR(50) NOT NULL CHECK (tipas IN ('ekranai', 'viadukai')),
  patvirtinta BOOLEAN DEFAULT false,
  data_nuo DATE NOT NULL,
  data_iki DATE NOT NULL,
  media_gautas BOOLEAN DEFAULT false,
  galutine_kaina DECIMAL(10,2) DEFAULT 0.00,
  saskaita_issiusta BOOLEAN DEFAULT false,
  orderNo VARCHAR(100) UNIQUE NOT NULL,
  komentaras TEXT,
  atnaujinta TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_orders_tipas ON orders(tipas);
CREATE INDEX IF NOT EXISTS idx_orders_orderNo ON orders(orderNo);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Create files table for attachments
CREATE TABLE IF NOT EXISTS files (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for files
CREATE INDEX IF NOT EXISTS idx_files_order_id ON files(order_id);

-- Insert sample data
INSERT INTO orders (pavadinimas, agentura, tipas, patvirtinta, data_nuo, data_iki, media_gautas, galutine_kaina, saskaita_issiusta, orderNo, komentaras) VALUES
('Lidl Viadukas', 'Marijampolės Miesto Savivaldybė', 'viadukai', true, '2025-09-15', '2025-09-22', true, 2500.00, true, 'INV-2024-001', 'Sėkmingai įgyvendintas projektas'),
('Alytus - Marijampolė Viadukas', 'Marijampolės Miesto Savivaldybė', 'viadukai', true, '2025-08-01', '2025-08-15', true, 3200.00, true, 'INV-2024-002', 'Darbai baigti anksčiau termino'),
('Kauno Ekranas', 'Kauno Miesto Savivaldybė', 'ekranai', false, '2025-10-01', '2025-10-31', false, 1800.00, false, 'INV-2024-003', 'Laukia patvirtinimo'),
('Vilniaus Ekranas', 'Vilniaus Miesto Savivaldybė', 'ekranai', true, '2025-07-15', '2025-07-30', true, 2100.00, true, 'INV-2024-004', 'Projektas sėkmingai įgyvendintas'),
('Klaipėdos Viadukas', 'Klaipėdos Miesto Savivaldybė', 'viadukai', false, '2025-11-01', '2025-11-30', false, 4500.00, false, 'INV-2024-005', 'Planuojama pradėti spalį'),
('Šiaulių Ekranas', 'Šiaulių Miesto Savivaldybė', 'ekranai', true, '2025-06-01', '2025-06-15', true, 1600.00, true, 'INV-2024-006', 'Darbai baigti laiku'),
('Panevėžio Viadukas', 'Panevėžio Miesto Savivaldybė', 'viadukai', true, '2025-05-15', '2025-05-30', true, 3800.00, true, 'INV-2024-007', 'Projektas sėkmingai įgyvendintas'),
('Utenos Ekranas', 'Utenos Miesto Savivaldybė', 'ekranai', false, '2025-12-01', '2025-12-31', false, 1400.00, false, 'INV-2024-008', 'Laukia patvirtinimo'),
('Tauragės Viadukas', 'Tauragės Miesto Savivaldybė', 'viadukai', true, '2025-04-01', '2025-04-15', true, 2900.00, true, 'INV-2024-009', 'Darbai baigti anksčiau termino');

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON files FOR SELECT USING (true);

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update" ON orders FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated users to delete" ON orders FOR DELETE USING (true);

CREATE POLICY "Allow authenticated users to insert files" ON files FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to delete files" ON files FOR DELETE USING (true);
```

## 2. Sukurti Storage Bucket

### Storage
1. **Eikite į Storage**
2. **Sukurkite naują bucket:**
   - **Name:** `piksel-files`
   - **Public bucket:** ✅ (pažymėkite)
3. **Įkopijuokite ir įvykdykite šį kodą SQL Editor:**

```sql
-- Create storage policies
CREATE POLICY "Allow public read access" ON storage.objects FOR SELECT USING (bucket_id = 'piksel-files');
CREATE POLICY "Allow authenticated users to upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'piksel-files');
CREATE POLICY "Allow authenticated users to update" ON storage.objects FOR UPDATE USING (bucket_id = 'piksel-files');
CREATE POLICY "Allow authenticated users to delete" ON storage.objects FOR DELETE USING (bucket_id = 'piksel-files');
```

## 3. Patikrinti API Keys

### Settings → API
- **Project URL:** `https://zgqgxyydjnaddxrcffle.supabase.co`
- **anon public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 4. Testuoti Sistemą

1. **Paleiskite aplikaciją:** `npm run dev`
2. **Atidarykite:** http://localhost:3000
3. **Patikrinkite, ar rodomi užsakymai iš duomenų bazės**
4. **Išbandykite failų upload**

## 5. Troubleshooting

### Jei klaidos:
1. **Patikrinkite SQL migracijas** - ar visos lentelės sukurtos
2. **Patikrinkite storage bucket** - ar sukurtas `piksel-files`
3. **Patikrinkite RLS policies** - ar visos politikos sukurtos
4. **Patikrinkite console** - ar nėra JavaScript klaidų

### Dažnos klaidos:
- **"relation does not exist"** - lentele nesukurta
- **"bucket not found"** - storage bucket nesukurtas
- **"permission denied"** - RLS politikos nesukurtos
