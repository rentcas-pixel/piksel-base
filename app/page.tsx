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
          activeTab={activeTab}
        />


      </main>
    </div>
  )
}
