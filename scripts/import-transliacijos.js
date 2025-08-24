// Script to import Transliacijos from Notion into Piksel Base system
// Run this in browser console on your web app

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

// Function to add order
async function addOrder(orderData) {
  try {
    const orderNo = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    const order = {
      pavadinimas: orderData.pavadinimas,
      agentura: orderData.agentura,
      tipas: 'viadukai', // Most are viadukai based on the data
      patvirtinta: true,
      dataNuo: orderData.dataNuo,
      dataIki: orderData.dataIki,
      mediaGautas: true,
      galutineKaina: 100, // Fixed price as requested
      saskaitaIssiusta: false,
      orderNo: orderNo,
      komentaras: 'Importuota iš Notion Transliacijos'
    };

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      console.log(`✅ Užsakymas pridėtas: ${orderData.pavadinimas}`);
      return true;
    } else {
      console.error(`❌ Klaida pridedant: ${orderData.pavadinimas}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Klaida: ${orderData.pavadinimas}`, error);
    return false;
  }
}

// Function to import all orders
async function importAllTransliacijos() {
  console.log('🚀 Pradėju importuoti Transliacijos...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < transliacijos.length; i++) {
    const order = transliacijos[i];
    console.log(`📝 Importuoju ${i + 1}/${transliacijos.length}: ${order.pavadinimas}`);
    
    const success = await addOrder(order);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Wait 500ms between requests to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`🎉 Importavimas baigtas!`);
  console.log(`✅ Sėkmingai: ${successCount}`);
  console.log(`❌ Klaidos: ${errorCount}`);
  
  // Refresh the page to show new orders
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

// Export functions for use in browser console
window.importTransliacijos = importAllTransliacijos;
window.addTransliacijosOrder = addOrder;
window.transliacijosData = transliacijos;

console.log('📋 Transliacijos import script loaded!');
console.log('🚀 Use: importTransliacijos() to import all orders');
console.log('📝 Use: addTransliacijosOrder(orderData) to add single order');
console.log('📊 Use: transliacijosData to see all data');
