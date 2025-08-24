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

export interface OrderFilters {
  search: string
  tipas: 'ekranai' | 'viadukai'
  patvirtinta?: boolean
  mediaGautas?: boolean
  saskaitaIssiusta?: boolean
}

export interface PaginationState {
  currentPage: number
  pageSize: number
  totalItems: number
}

export interface AppState {
  orders: Order[]
  filteredOrders: Order[]
  filters: OrderFilters
  pagination: PaginationState
  user: {
    isAuthenticated: boolean
    name?: string
    role?: string
  }
}
