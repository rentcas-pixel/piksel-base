'use client'

import { useState, useMemo } from 'react'
import Header from '../components/Header'
import Tabs from '../components/Tabs'
import OrdersTable from '../components/OrdersTable'
import { Order, OrderFilters } from '../types/order'
import { sampleOrders } from '../data/sampleOrders'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'ekranai' | 'viadukai'>('ekranai')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Filtruoti užsakymus pagal tab ir paieškos tekstą
  const filteredOrders = useMemo(() => {
    let filtered = sampleOrders.filter(order => order.tipas === activeTab)
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(order =>
        order.pavadinimas.toLowerCase().includes(query) ||
        order.agentura.toLowerCase().includes(query) ||
        order.saskaitosId.toLowerCase().includes(query) ||
        order.komentaras?.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [activeTab, searchQuery])

  const handleTabChange = (tab: 'ekranai' | 'viadukai') => {
    setActiveTab(tab)
    setSearchQuery('') // Reset paieškos tekstą keičiant tab
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    // TODO: Implement order details modal or navigation
    console.log('Selected order:', order)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Paieškos ir filtro sekcija */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {activeTab === 'ekranai' ? '🖥️ Ekranų užsakymai' : '🌉 Viadukų užsakymai'}
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Rasta {filteredOrders.length} užsakymų
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Ieškoti užsakymų..."
                    className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                
                <button className="btn-primary">
                  + Pridėti užsakymą
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Užsakymų lentelė */}
        <OrdersTable 
          orders={filteredOrders} 
          onOrderClick={handleOrderClick} 
        />

        {/* Statistikos kortelės */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 text-lg">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500">Iš viso užsakymų</p>
                <p className="text-2xl font-semibold text-neutral-900">{filteredOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                  <span className="text-success-600 text-lg">✅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500">Patvirtinti</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {filteredOrders.filter(o => o.patvirtinta).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                  <span className="text-warning-600 text-lg">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500">Bendra suma</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {filteredOrders.reduce((sum, o) => sum + o.galutineKaina, 0).toFixed(0)} €
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-danger-100 rounded-lg flex items-center justify-center">
                  <span className="text-danger-600 text-lg">📋</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500">Laukia patvirtinimo</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {filteredOrders.filter(o => !o.patvirtinta).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
