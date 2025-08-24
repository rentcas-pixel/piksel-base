'use client'

import { useState, useMemo, useEffect } from 'react'
import Header from '../components/Header'
import Tabs from '../components/Tabs'
import OrdersTable from '../components/OrdersTable'
import { Order, OrderFilters } from '../types/order'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'bendras' | 'ekranai' | 'viadukai'>('bendras')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // Load orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
        } else {
          console.error('Failed to fetch orders')
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrders()
  }, [])

  // Filtruoti užsakymus pagal tab ir paieškos tekstą
  const filteredOrders = useMemo(() => {
    let filtered = activeTab === 'bendras' 
      ? orders // Rodyti visus užsakymus
      : orders.filter(order => order.tipas === activeTab)
    
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
  }, [activeTab, searchQuery, orders])

  const handleTabChange = (tab: 'bendras' | 'ekranai' | 'viadukai') => {
    setActiveTab(tab)
    setSearchQuery('') // Reset paieškos tekstą keičiant tab
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    console.log('Selected order:', order)
  }

  const handleOrderUpdate = (updatedOrder: Order) => {
    // Update local state
    const updatedOrders = filteredOrders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    )
    
    // Refresh the data
    window.location.reload()
  }

  const handleAddOrder = async (newOrder: Partial<Order>) => {
    try {
      console.log('🚀 Attempting to add order via MOCK API...')
      
      const response = await fetch('/api/orders-mock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      })

      if (response.ok) {
        const createdOrder = await response.json()
        console.log('✅ Order created successfully:', createdOrder)
        
        // Add to local state instead of page reload
        setOrders(prev => [createdOrder, ...prev])
        
        // Show success message
        alert('Užsakymas sėkmingai pridėtas!')
      } else {
        throw new Error('Failed to add order')
      }
    } catch (error) {
      console.error('❌ Error adding order:', error)
      alert('Klaida pridedant užsakymą')
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header onAddOrder={handleAddOrder} activeTab={activeTab} />
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="w-full px-8 lg:px-12 py-8">


        {/* Užsakymų lentelė */}
        <OrdersTable 
          orders={filteredOrders} 
          onOrderClick={handleOrderClick} 
          onOrderUpdate={handleOrderUpdate}
          activeTab={activeTab}
        />


      </main>
    </div>
  )
}
