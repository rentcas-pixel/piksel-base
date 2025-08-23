import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

// GET - gauti visus užsakymus
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipas = searchParams.get('tipas')
    const search = searchParams.get('search')

    let supabaseQuery = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (tipas && tipas !== 'bendras') {
      supabaseQuery = supabaseQuery.eq('tipas', tipas)
    }

    if (search) {
      supabaseQuery = supabaseQuery.or(
        `pavadinimas.ilike.%${search}%,agentura.ilike.%${search}%,saskaitos_id.ilike.%${search}%`
      )
    }

    const { data: orders, error } = await supabaseQuery

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    // Convert snake_case to camelCase for frontend
    const formattedOrders = (orders || []).map(order => ({
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
      saskaitosId: order.saskaitos_id,
      komentaras: order.komentaras,
      atnaujinta: order.updated_at,
      created_at: order.created_at,
      updated_at: order.updated_at
    }))

    return NextResponse.json(formattedOrders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - sukurti naują užsakymą
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Convert camelCase to snake_case for Supabase
    const supabaseOrder = {
      pavadinimas: body.pavadinimas,
      agentura: body.agentura,
      tipas: body.tipas,
      patvirtinta: body.patvirtinta || false,
      data_nuo: body.dataNuo,
      data_iki: body.dataIki,
      media_gautas: body.mediaGautas || false,
      galutine_kaina: body.galutineKaina || 0,
      saskaita_issiusta: body.saskaitaIssiusta || false,
      saskaitos_id: body.saskaitosId,
      komentaras: body.komentaras || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    console.log('Sending to Supabase:', supabaseOrder)
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert([supabaseOrder])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create order', details: error.message }, { status: 500 })
    }

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
  }
}
