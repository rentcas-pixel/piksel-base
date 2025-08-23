import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import { Order } from '../../../../types/order'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id)
    const updatedOrder: Partial<Order> = await request.json()

    // Update order in Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .update({
        pavadinimas: updatedOrder.pavadinimas,
        agentura: updatedOrder.agentura,
        tipas: updatedOrder.tipas,
        patvirtinta: updatedOrder.patvirtinta,
        data_nuo: updatedOrder.dataNuo,
        data_iki: updatedOrder.dataIki,
        media_gautas: updatedOrder.mediaGautas,
        galutine_kaina: updatedOrder.galutineKaina,
        saskaita_issiusta: updatedOrder.saskaitaIssiusta,
        komentaras: updatedOrder.komentaras,
        atnaujinta: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id)

    // Delete order from Supabase
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Order deleted successfully' })
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
