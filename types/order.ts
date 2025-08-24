export interface Order {
  id: number
  pavadinimas: string
  agentura: string
  patvirtinta: boolean
  dataNuo: string
  dataIki: string
  mediaGautas: boolean
  galutineKaina: number
  saskaitaIssiusta: boolean
  orderNo: string
  atnaujinta: string
  tipas: 'ekranai' | 'viadukai'
  komentaras?: string
}
