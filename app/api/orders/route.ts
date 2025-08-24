import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

// GET - gauti visus užsakymus
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipas = searchParams.get('tipas')
    const search = searchParams.get('search')

    let query = supabase.from('orders').select('*')

    // Filter by type if specified
    if (tipas && tipas !== 'bendras') {
      query = query.eq('tipas', tipas)
    }

    // Add search if specified
    if (search) {
      query = query.or(`pavadinimas.ilike.%${search}%,agentura.ilike.%${search}%,orderNo.ilike.%${search}%,komentaras.ilike.%${search}%`)
    }

    const { data: orders, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    // Convert snake_case to camelCase for frontend consistency
    const formattedOrders = orders.map(order => ({
      id: order.id,
      pavadinimas: order.pavadinimas,
      agentura: order.agentura,
      tipas: order.tipas,
      patvirtinta: order.patvirtinta,
      dataNuo: order.data_nuo,
      dataIki: order.data_iki,
      mediaGautas: order.media_gautas,
      galutineKaina: order.galutine_kaina,
      saskaitaIssiusta: order.saskaita_issiusta,
      orderNo: order.orderNo,
      komentaras: order.komentaras,
      atnaujinta: order.updated_at,
      created_at: order.created_at,
      updated_at: order.updated_at
    }))

    return NextResponse.json(formattedOrders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 })
  }
}

// POST - sukurti naują užsakymą
export async function POST(request: NextRequest) {
  try {
    // Test Supabase connection
    console.log('Testing Supabase connection...')
    console.log('Supabase URL: https://zgqgxyydjnaddxrcffle.supabase.co')
    console.log('Supabase Key: [REDACTED]')
    
    const { data: testData, error: testError } = await supabase
      .from('orders')
      .select('id')
      .limit(1)
    
    if (testError) {
      console.error('Supabase connection test failed:', testError)
      return NextResponse.json({ error: 'Database connection failed', details: testError.message }, { status: 500 })
    }
    
    console.log('Supabase connection successful, test data:', testData)
    
    const body = await request.json()
    console.log('Received request body:', body)
    
    // Validate required fields
    if (!body.pavadinimas || !body.agentura || !body.dataNuo || !body.dataIki) {
      console.error('Missing required fields:', { pavadinimas: !!body.pavadinimas, agentura: !!body.agentura, dataNuo: !!body.dataNuo, dataIki: !!body.dataIki })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Convert camelCase to snake_case for Supabase
    const supabaseOrder = {
      pavadinimas: body.pavadinimas,
      agentura: body.agentura,
      tipas: body.tipas || 'ekranai',
      patvirtinta: body.patvirtinta || false,
      data_nuo: body.dataNuo,
      data_iki: body.dataIki,
      media_gautas: body.mediaGautas || false,
      galutine_kaina: parseFloat(body.galutineKaina) || 0,
      saskaita_issiusta: body.saskaitaIssiusta || false,
      orderNo: body.orderNo || `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      komentaras: body.komentaras || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    console.log('Sending to Supabase:', supabaseOrder)
    
    console.log('Attempting to insert into Supabase...')
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert([supabaseOrder])
      .select()
      .single()

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      const errorMessage = error.message || 'Supabase error'
      return NextResponse.json({ error: 'Failed to create order', details: errorMessage }, { status: 500 })
    }
    
    console.log('Successfully inserted order:', order)

    // Convert snake_case to camelCase for frontend consistency
    const formattedOrder = {
      id: order.id,
      pavadinimas: order.pavadinimas,
      agentura: order.agentura,
      tipas: order.tipas,
      patvirtinta: order.patvirtinta,
      dataNuo: order.data_nuo,
      dataIki: order.data_iki,
      mediaGautas: order.media_gautas,
      galutineKaina: order.galutine_kaina,
      saskaitaIssiusta: order.saskaita_issiusta,
      orderNo: order.orderNo,
      komentaras: order.komentaras,
      atnaujinta: order.updated_at,
      created_at: order.created_at,
      updated_at: order.updated_at
    }

    console.log('Formatted order for frontend:', formattedOrder)
    return NextResponse.json(formattedOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 })
  }
}
