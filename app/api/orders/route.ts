import { NextRequest, NextResponse } from 'next/server'
import { sampleOrders } from '../../../data/sampleOrders'

// GET - gauti visus užsakymus
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipas = searchParams.get('tipas')
    const search = searchParams.get('search')

    let filteredOrders = [...sampleOrders]

    if (tipas) {
      filteredOrders = filteredOrders.filter(order => order.tipas === tipas)
    }

    if (search) {
      const query = search.toLowerCase()
      filteredOrders = filteredOrders.filter(order =>
        order.pavadinimas.toLowerCase().includes(query) ||
        order.agentura.toLowerCase().includes(query) ||
        order.saskaitos_id.toLowerCase().includes(query)
      )
    }

    return NextResponse.json(filteredOrders)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - sukurti naują užsakymą
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('orders')
      .insert([body])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
