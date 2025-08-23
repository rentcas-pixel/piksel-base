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

    return NextResponse.json(orders || [])
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - sukurti naują užsakymą
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
