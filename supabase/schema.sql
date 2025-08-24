-- Piksel Base Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  pavadinimas TEXT NOT NULL,
  agentura TEXT NOT NULL,
  patvirtinta BOOLEAN DEFAULT false,
  data_nuo DATE NOT NULL,
  data_iki DATE NOT NULL,
  media_gautas BOOLEAN DEFAULT false,
  galutine_kaina DECIMAL(10,2) NOT NULL,
  saskaita_issiusta BOOLEAN DEFAULT false,
  orderNo TEXT NOT NULL UNIQUE,
  tipas TEXT NOT NULL CHECK (tipas IN ('ekranai', 'viadukai')),
  komentaras TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Files table
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by TEXT NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_orders_tipas ON orders(tipas);
CREATE INDEX IF NOT EXISTS idx_orders_agentura ON orders(agentura);
CREATE INDEX IF NOT EXISTS idx_orders_patvirtinta ON orders(patvirtinta);
CREATE INDEX IF NOT EXISTS idx_files_order_id ON files(order_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO orders (pavadinimas, agentura, patvirtinta, data_nuo, data_iki, media_gautas, galutine_kaina, saskaita_issiusta, orderNo, tipas, komentaras) VALUES
('🖥️ Ignitis Ekranų Kampanija', 'Ignitis', true, '2024-01-15', '2024-03-15', true, 2500.00, true, 'INV-2024-001', 'ekranai', 'Pagrindinė ekranų kampanija Vilniuje ir Kaune'),
('📺 Vilnius Miesto Ekranai', 'Vilniaus Miesto Savivaldybė', true, '2024-02-01', '2024-04-01', true, 1800.00, false, 'INV-2024-002', 'ekranai', 'Miesto informacijos ekranai'),
('🖥️ Kaunas Prekybos Centras', 'Kauno Prekybos Centras', false, '2024-02-15', '2024-05-15', false, 3200.00, false, 'INV-2024-003', 'ekranai', 'Prekybos centro reklamų ekranai'),
('📺 Klaipėda Uosto Ekranai', 'Klaipėdos Uostas', true, '2024-01-20', '2024-06-20', true, 4500.00, true, 'INV-2024-004', 'ekranai', 'Uosto informacijos sistema'),
('🖥️ Šiauliai Miesto Ekranai', 'Šiaulių Miesto Savivaldybė', true, '2024-03-01', '2024-05-01', false, 2100.00, false, 'INV-2024-005', 'ekranai', 'Miesto centras ir autobusų stotys'),
('🌉 Vilnius - Kaunas Viadukas', 'Lietuvos Geležinkeliai', true, '2024-01-10', '2024-12-31', true, 15000.00, true, 'INV-2024-006', 'viadukai', 'Pagrindinio kelio viadukas'),
('🌉 Klaipėda - Palanga Viadukas', 'Lietuvos Automobilių Kelių Direkcija', false, '2024-02-01', '2024-10-31', false, 8500.00, false, 'INV-2024-007', 'viadukai', 'Jūros kranto kelio viadukas'),
('🌉 Šiauliai - Panevėžys Viadukas', 'Panevėžio Miesto Savivaldybė', true, '2024-01-25', '2024-08-25', true, 12000.00, false, 'INV-2024-008', 'viadukai', 'Regioninio kelio viadukas'),
('🌉 Alytus - Marijampolė Viadukas', 'Marijampolės Miesto Savivaldybė', true, '2024-03-01', '2024-09-30', false, 9500.00, false, 'INV-2024-009', 'viadukai', 'Pietų regiono kelio viadukas')
ON CONFLICT (orderNo) DO NOTHING;

-- Create storage bucket for files
-- Note: This needs to be done in Supabase Dashboard > Storage
-- Bucket name: order-files
-- Public bucket: true
-- File size limit: 10MB
-- Allowed MIME types: image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
