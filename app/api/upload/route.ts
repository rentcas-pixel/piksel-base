import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const orderId = formData.get('orderId') as string
    const uploadedBy = formData.get('uploadedBy') as string

    if (!file || !orderId || !uploadedBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Sukurti unikalų failo pavadinimą
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${orderId}_${timestamp}.${fileExtension}`
    const filePath = `orders/${orderId}/${fileName}`

    // Upload failą į Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('order-files')
      .upload(filePath, file)

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      )
    }

    // Gauti failo URL
    const { data: urlData } = supabase.storage
      .from('order-files')
      .getPublicUrl(filePath)

    // Išsaugoti failo informaciją duomenų bazėje
    const { data: fileRecord, error: dbError } = await supabase
      .from('files')
      .insert([{
        order_id: parseInt(orderId),
        filename: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: uploadedBy
      }])
      .select()
      .single()

    if (dbError) {
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      file: fileRecord,
      url: urlData.publicUrl
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
