'use client'

import { useState, useMemo, useEffect } from 'react'
import Header from '../components/Header'
import Tabs from '../components/Tabs'
import OrdersTable from '../components/OrdersTable'
import OrderModal from '../components/OrderModal'
import AddOrderModal from '../components/AddOrderModal'
import { Order } from '../types/order'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'bendras' | 'ekranai' | 'viadukai'>('bendras')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // Load orders from Supabase
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const supabaseOrders = await response.json()
          setOrders(supabaseOrders)
        } else {
          console.error('Failed to fetch orders from Supabase')
        }
      } catch (error) {
        console.error('Error loading orders:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadOrders()
  }, [])

  // Filter orders by tab and search query
  const filteredOrders = useMemo(() => {
    let filtered = activeTab === 'bendras' 
      ? orders 
      : orders.filter(order => order.tipas === activeTab)
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(order =>
        order.pavadinimas.toLowerCase().includes(query) ||
        order.agentura.toLowerCase().includes(query) ||
        order.orderNo.toLowerCase().includes(query) ||
        order.komentaras?.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [activeTab, searchQuery, orders])

  const handleTabChange = (tab: 'bendras' | 'ekranai' | 'viadukai') => {
    setActiveTab(tab)
    setSearchQuery('')
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleOrderUpdate = async (updatedOrder: Order) => {
    try {
      const response = await fetch(`/api/orders/${updatedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder)
      })
      
      if (response.ok) {
        // Update local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === updatedOrder.id ? updatedOrder : order
          )
        )
        setSelectedOrder(null)
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const handleAddOrder = async (newOrder: Partial<Order>) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      })

      if (response.ok) {
        const savedOrder = await response.json()
        setOrders(prevOrders => [...prevOrders, savedOrder])
      } else {
        const errorData = await response.json()
        alert(`Klaida pridedant užsakymą: ${errorData.error || 'Nežinoma klaida'}`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Nežinoma klaida'
      alert(`Klaida pridedant užsakymą: ${errorMessage}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Kraunama...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddOrder={() => setSelectedOrder({} as Order)} activeTab={activeTab} />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        
        <main className="w-full px-6 lg:px-8 py-6">
          {/* Užsakymų lentelė */}
          <OrdersTable 
            orders={filteredOrders} 
            onOrderClick={handleOrderClick}
            onOrderUpdate={handleOrderUpdate}
            activeTab={activeTab}
          />
        </main>
      </div>

      {/* Add Order Modal */}
      {selectedOrder && Object.keys(selectedOrder).length === 0 && (
        <AddOrderModal
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          onSave={handleAddOrder}
          activeTab={activeTab}
        />
      )}

      {/* Edit Order Modal */}
      {selectedOrder && selectedOrder.id && (
        <OrderModal
          order={selectedOrder}
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          onSave={handleOrderUpdate}
          onDelete={(orderId) => {
            setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId))
            setSelectedOrder(null)
          }}
          activeTab={activeTab}
        />
      )}
    </div>
  )
}
