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
      
      <main className="w-full px-8 lg:px-12 py-8">


        {/* Užsakymų lentelė */}
        <OrdersTable 
          orders={filteredOrders} 
          onOrderClick={handleOrderClick} 
        />

        {/* Statistikos kortelės */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-card p-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 text-xl">📊</span>
                </div>
              </div>
              <div className="ml-6">
                <p className="text-base font-medium text-neutral-500">Iš viso užsakymų</p>
                <p className="text-3xl font-semibold text-neutral-900">{filteredOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <span className="text-success-600 text-xl">✅</span>
                </div>
              </div>
              <div className="ml-6">
                <p className="text-base font-medium text-neutral-500">Patvirtinti</p>
                <p className="text-3xl font-semibold text-neutral-900">
                  {filteredOrders.filter(o => o.patvirtinta).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                  <span className="text-warning-600 text-xl">💰</span>
                </div>
              </div>
              <div className="ml-6">
                <p className="text-base font-medium text-neutral-500">Bendra suma</p>
                <p className="text-3xl font-semibold text-neutral-900">
                  {filteredOrders.reduce((sum, o) => sum + o.galutineKaina, 0).toFixed(0)} €
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-danger-100 rounded-lg flex items-center justify-center">
                  <span className="text-warning-600 text-xl">📋</span>
                </div>
              </div>
              <div className="ml-6">
                <p className="text-base font-medium text-neutral-500">Laukia patvirtinimo</p>
                <p className="text-3xl font-semibold text-neutral-900">
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
