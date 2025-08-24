import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

// POST - importuoti visus transliacijos užsakymus
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Pradėju importuoti Transliacijos...')
    
    const transliacijos = [
      { pavadinimas: "HILA 2", agentura: "Trendmark", dataNuo: "2025-01-27", dataIki: "2025-10-19" },
      { pavadinimas: "RIMI | Pašilaičiai 1", agentura: "Havas", dataNuo: "2025-05-06", dataIki: "2025-08-31" },
      { pavadinimas: "Viada - Savaitgalio pasiūlymas 2", agentura: "BpN", dataNuo: "2025-06-01", dataIki: "2025-12-31" },
      { pavadinimas: "Viada - Maistas (dešrainis) 1", agentura: "Carat", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "Viada - Maistas (kava) 1", agentura: "Arena Media", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "Viada supertrečiadieniai | Birželis 1", agentura: "Publicis Groupe", dataNuo: "2025-06-01", dataIki: "2025-06-30" },
      { pavadinimas: "Tele2 MBB → Viadukai 1", agentura: "OMG", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "Viada - Ledų loterija 1", agentura: "Open Agency", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "Betsafe/w28-31", agentura: "Media House", dataNuo: "2025-07-14", dataIki: "2025-08-03" },
      { pavadinimas: "LIDL 07.14-08.03 1", agentura: "Piksel", dataNuo: "2025-07-14", dataIki: "2025-08-03" },
      { pavadinimas: "Viada Trečiadieniai 2", agentura: "MBD", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "RIMI Nordika vasara 1", agentura: "Owexx", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "OC Vision/Vision Express - w30-31", agentura: "Trendmark", dataNuo: "2025-07-28", dataIki: "2025-08-03" },
      { pavadinimas: "Estrella | Liepa", agentura: "Havas", dataNuo: "2025-07-01", dataIki: "2025-07-31" },
      { pavadinimas: "MCD McCrispy", agentura: "BpN", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "TF bankas - Viadukai 2", agentura: "Carat", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "Perlas EJP 07 28 - 08 03", agentura: "Arena Media", dataNuo: "2025-07-28", dataIki: "2025-08-03" },
      { pavadinimas: "Galio group 1", agentura: "Publicis Groupe", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "Regitra → Viadukai 2", agentura: "OMG", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "Air Baltic → Viadukai + Ekranai 1", agentura: "Open Agency", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "IKEA Affordability Rugpjūtis", agentura: "Media House", dataNuo: "2025-08-01", dataIki: "2025-08-31" },
      { pavadinimas: "Viada | Rugpjūtis → Viadukai", agentura: "Piksel", dataNuo: "2025-08-01", dataIki: "2025-08-31" },
      { pavadinimas: "Elesen | Rugpjūtis Multibrand", agentura: "MBD", dataNuo: "2025-08-01", dataIki: "2025-08-31" },
      { pavadinimas: "Eglės sanatorija", agentura: "Owexx", dataNuo: "2025-07-01", dataIki: "2025-08-31" },
      { pavadinimas: "Elesen | Rugpjūtis 2 Sale&Clearance", agentura: "Trendmark", dataNuo: "2025-08-01", dataIki: "2025-08-31" }
    ];

    let successCount = 0;
    let errorCount = 0;
    const results = [];

    for (let i = 0; i < transliacijos.length; i++) {
      const orderData = transliacijos[i];
      console.log(`📝 Importuoju ${i + 1}/${transliacijos.length}: ${orderData.pavadinimas}`);
      
      try {
        const orderNo = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
        
        const supabaseOrder = {
          pavadinimas: orderData.pavadinimas,
          agentura: orderData.agentura,
          tipas: 'viadukai',
          patvirtinta: true,
          data_nuo: orderData.dataNuo,
          data_iki: orderData.dataIki,
          media_gautas: true,
          galutine_kaina: 100,
          saskaita_issiusta: false,
          order_no: orderNo,
          komentaras: 'Importuota iš Notion Transliacijos',
          created_at: new Date().toISOString(),
          atnaujinta: new Date().toISOString()
        };

        const { data: order, error } = await supabase
          .from('orders')
          .insert([supabaseOrder])
          .select()
          .single();

        if (error) {
          console.error(`❌ Klaida pridedant: ${orderData.pavadinimas}`, error);
          errorCount++;
          results.push({ pavadinimas: orderData.pavadinimas, status: 'error', error: error.message });
        } else {
          console.log(`✅ Užsakymas pridėtas: ${orderData.pavadinimas}`);
          successCount++;
          results.push({ pavadinimas: orderData.pavadinimas, status: 'success', orderNo: order.order_no });
        }

        // Wait 100ms between requests to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`❌ Klaida: ${orderData.pavadinimas}`, error);
        errorCount++;
        results.push({ pavadinimas: orderData.pavadinimas, status: 'error', error: error.message });
      }
    }

    console.log(`🎉 Importavimas baigtas!`);
    console.log(`✅ Sėkmingai: ${successCount}`);
    console.log(`❌ Klaidos: ${errorCount}`);

    return NextResponse.json({
      success: true,
      message: 'Transliacijos importuotos',
      summary: {
        total: transliacijos.length,
        success: successCount,
        errors: errorCount
      },
      results: results
    });

  } catch (error) {
    console.error('❌ Importavimo klaida:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Importavimo klaida',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
