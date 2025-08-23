import { NextRequest, NextResponse } from 'next/server'

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

    // Simuliuojame failo upload (development mode)
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${orderId}_${timestamp}.${fileExtension}`

    // Grąžiname mock response
    return NextResponse.json({
      success: true,
      file: {
        id: `mock_${timestamp}`,
        order_id: parseInt(orderId),
        filename: file.name,
        file_path: `mock/orders/${orderId}/${fileName}`,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: uploadedBy,
        uploaded_at: new Date().toISOString()
      },
      url: `https://mock-storage.com/orders/${orderId}/${fileName}`
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
