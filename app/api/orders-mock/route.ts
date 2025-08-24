import { NextRequest, NextResponse } from 'next/server'

// Mock API - nepriklauso nuo Supabase
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('🎯 MOCK API - Received request:', body)
    
    // Simuliuoti sėkmingą įterpimą
    const mockOrder = {
      id: Math.floor(Math.random() * 10000) + 1000,
      pavadinimas: body.pavadinimas,
      agentura: body.agentura,
      tipas: body.tipas || 'ekranai',
      patvirtinta: body.patvirtinta || false,
      data_nuo: body.dataNuo,
      data_iki: body.dataIki,
      media_gautas: body.mediaGautas || false,
      galutine_kaina: parseFloat(body.galutineKaina) || 0,
      saskaita_issiusta: body.saskaitaIssiusta || false,
      saskaitosId: body.saskaitosId || `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      komentaras: body.komentaras || '',
      atnaujinta: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    console.log('✅ MOCK API - Successfully created order:', mockOrder)
    
    // Simuliuoti vėlavimą
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json(mockOrder, { status: 201 })
  } catch (error) {
    console.error('❌ MOCK API - Error:', error)
    return NextResponse.json({ error: 'Mock API error' }, { status: 500 })
  }
}

// GET - grąžinti mock duomenis
export async function GET() {
  const mockOrders = [
    {
      id: 1,
      pavadinimas: "Test Mock Order 1",
      agentura: "Mock Agency",
      tipas: "ekranai",
      patvirtinta: true,
      data_nuo: "2024-01-01",
      data_iki: "2024-12-31",
      media_gautas: true,
      galutine_kaina: 1000.00,
      saskaita_issiusta: false,
      saskaitosId: "INV-2024-MOCK-001",
      komentaras: "Mock order for testing",
      atnaujinta: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
  
  return NextResponse.json(mockOrders)
}
