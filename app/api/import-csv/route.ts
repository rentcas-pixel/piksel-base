import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Pradėju importuoti CSV...')
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'CSV failas nerastas' },
        { status: 400 }
      )
    }

    console.log(`📁 CSV failas: ${file.name}, dydis: ${file.size} baitų`)

    // Nuskaitome CSV failą
    const csvText = await file.text()
    const lines = csvText.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      return NextResponse.json(
        { error: 'CSV failas tuščias arba neturi duomenų' },
        { status: 400 }
      )
    }

    // Pirmą eilutę naudojame kaip stulpelių pavadinimus
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    console.log('📊 CSV stulpeliai:', headers)

    // Nuskaitome duomenis (praleidžiame pirmą eilutę)
    const dataLines = lines.slice(1)
    console.log(`📈 Importuojama ${dataLines.length} eilučių`)

    let successCount = 0
    let errorCount = 0
    const results = []

    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i]
      if (!line.trim()) continue

      try {
        // Skirstome CSV eilutę, atsižvelgiant į kabutes
        const values = parseCSVLine(line)
        
        if (values.length < 2) {
          console.log(`⚠️ Eilutė ${i + 2} neturi pakankamai duomenų:`, line)
          continue
        }

        // Ištraukiame duomenis pagal poziciją (pirmas stulpelis - pavadinimas, antras - agentūra)
        const pavadinimas = values[0]?.trim() || `Importuotas užsakymas ${i + 1}`
        const agentura = values[1]?.trim() || 'Nežinoma agentūra'
        
        // Jei yra trečias stulpelis su datomis, bandome jį išskaidyti
        let dataNuo = new Date().toISOString().split('T')[0]
        let dataIki = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        
        if (values[2]) {
          const dates = values[2].trim().split(/[-–—]/)
          if (dates.length >= 2) {
            dataNuo = dates[0].trim()
            dataIki = dates[1].trim()
          }
        }

        // Generuojame unikalų Order No
        const orderNo = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`

        const supabaseOrder = {
          pavadinimas,
          agentura,
          tipas: 'viadukai', // Nustatome kaip viadukai pagal nutylėjimą
          patvirtinta: true,
          data_nuo: dataNuo,
          data_iki: dataIki,
          media_gautas: true,
          galutine_kaina: 100, // Fiksuota kaina 100 EUR
          saskaita_issiusta: false,
          order_no: orderNo,
          komentaras: `Importuota iš CSV failo: ${file.name}`,
          created_at: new Date().toISOString(),
          atnaujinta: new Date().toISOString()
        }

        console.log(`📝 Importuoju: ${pavadinimas} - ${agentura}`)

        const { data: order, error } = await supabase
          .from('orders')
          .insert([supabaseOrder])
          .select()
          .single()

        if (error) {
          console.error(`❌ Klaida importuojant ${pavadinimas}:`, error)
          errorCount++
          results.push({
            line: i + 2,
            pavadinimas,
            agentura,
            status: 'error',
            error: error.message
          })
        } else {
          console.log(`✅ Sėkmingai importuota: ${pavadinimas}`)
          successCount++
          results.push({
            line: i + 2,
            pavadinimas,
            agentura,
            status: 'success',
            orderNo: order.order_no
          })
        }

        // Palaukime 100ms tarp užklausų, kad nepersikraustytų Supabase
        await new Promise(resolve => setTimeout(resolve, 100))

      } catch (error) {
        console.error(`❌ Klaida apdorojant eilutę ${i + 2}:`, error)
        errorCount++
        results.push({
          line: i + 2,
          pavadinimas: `Eilutė ${i + 2}`,
          agentura: 'N/A',
          status: 'error',
          error: error instanceof Error ? error.message : 'Nežinoma klaida'
        })
      }
    }

    console.log(`🎉 Importavimas baigtas! Sėkmingai: ${successCount}, klaidų: ${errorCount}`)

    return NextResponse.json({
      success: true,
      message: `CSV importavimas baigtas! Pridėta ${successCount} iš ${dataLines.length} užsakymų.`,
      summary: {
        total: dataLines.length,
        success: successCount,
        errors: errorCount
      },
      results
    })

  } catch (error) {
    console.error('❌ CSV import klaida:', error)
    return NextResponse.json(
      { 
        error: 'CSV import klaida',
        details: error instanceof Error ? error.message : 'Nežinoma klaida'
      },
      { status: 500 }
    )
  }
}

// Pagalbinė funkcija CSV eilutės apdorojimui
function parseCSVLine(line: string): string[] {
  const result = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result
}
