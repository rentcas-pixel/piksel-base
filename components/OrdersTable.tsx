'use client'

import { Order } from '../types/order'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useMemo } from 'react'
import OrderModal from './OrderModal'

interface OrdersTableProps {
  orders: Order[]
  onOrderClick: (order: Order) => void
  onOrderUpdate: (order: Order) => void
  activeTab: 'bendras' | 'ekranai' | 'viadukai'
}

type SortField = keyof Order
type SortDirection = 'asc' | 'desc'

export default function OrdersTable({ orders, onOrderClick, onOrderUpdate, activeTab }: OrdersTableProps) {
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return []
    }
    
    return [...orders].sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      // Ensure values are defined
      if (aValue === undefined || bValue === undefined) return 0

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [orders, sortField, sortDirection])

  const totalPages = Math.ceil(sortedOrders.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentOrders = sortedOrders.slice(startIndex, endIndex)

  const formatDate = (dateString: string | undefined | null) => {
    console.log('🔍 formatDate input:', dateString, 'type:', typeof dateString)
    if (!dateString) return '-'
    try {
      const date = new Date(dateString)
      const formatted = date.toLocaleDateString('lt-LT')
      console.log('✅ Date formatted successfully:', dateString, '→', formatted)
      return formatted
    } catch (error) {
      console.error('❌ Date formatting error:', error, 'for date:', dateString)
      return '-'
    }
  }

  const formatPrice = (price: number | undefined | null) => {
    if (price === undefined || price === null) return '0.00 €'
    return `${price.toFixed(2)} €`
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-3 w-3" />
    ) : (
      <ChevronDown className="h-3 w-3" />
    )
  }

  const handleRowClick = (order: Order) => {
    console.log('Row clicked:', order)
    setSelectedOrder(order)
    setIsModalOpen(true)
    console.log('Modal state:', { selectedOrder: order, isModalOpen: true })
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  const handleOrderSave = async (updatedOrder: Order) => {
    try {
      // Update parent component
      onOrderUpdate(updatedOrder)
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Klaida atnaujinant užsakymą')
    }
  }

  const handleOrderDelete = async (orderId: number) => {
    try {
      // Delete from Supabase
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete order')
      }

      // Refresh the table data
      window.location.reload()
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Klaida ištrinant užsakymą')
    }
  }

  // Debug: log orders data
  console.log('📊 OrdersTable received orders:', orders)
  if (orders.length > 0) {
    console.log('📅 First order dates:', {
      dataNuo: orders[0].dataNuo,
      dataIki: orders[0].dataIki,
      atnaujinta: orders[0].atnaujinta
    })
  }

  // Loading state
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="text-gray-500">Kraunama...</div>
      </div>
    )
  }

  return (
    <div>
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleOrderSave}
          onDelete={handleOrderDelete}
          activeTab={activeTab}
        />
      )}
      
      <div className="bg-white">
        <div className="px-8 py-4 border-b border-gray-200">
          <h2 className="text-base font-medium text-gray-900">orders ({orders.length})</h2>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {[
                  { key: 'pavadinimas', label: 'Client' },
                  { key: 'agentura', label: 'Agency' },
                  { key: 'orderNo', label: 'Order No' },
                  { key: 'patvirtinta', label: 'Approved' },
                  { key: 'periodas', label: 'Period' },
                  { key: 'mediaGautas', label: 'Media Received' },
                  { key: 'galutineKaina', label: 'Final Price' },
                  { key: 'saskaitaIssiusta', label: 'Invoice Sent' },
                  { key: 'atnaujinta', label: 'Update' }
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSort(key as SortField)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{label}</span>
                      {getSortIcon(key as SortField)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-2.5 text-sm text-gray-900" onClick={() => handleRowClick(order)}>
                    {order.pavadinimas}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-gray-700" onClick={() => handleRowClick(order)}>
                    {order.agentura}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-gray-600" onClick={() => handleRowClick(order)}>
                    {order.orderNo}
                  </td>
                  <td className="px-4 py-2.5" onClick={() => handleRowClick(order)}>
                    <span className={`text-sm font-medium ${
                      order.patvirtinta 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {order.patvirtinta ? 'True' : 'False'}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-gray-700" onClick={() => handleRowClick(order)}>
                    <span className="font-medium text-gray-900">{formatDate(order.dataNuo)}</span>
                    <span className="text-gray-400 mx-2">→</span>
                    <span className="font-medium text-gray-900">{formatDate(order.dataIki)}</span>
                  </td>
                  <td className="px-4 py-2.5" onClick={() => handleRowClick(order)}>
                    <span className={`text-sm font-medium ${
                      order.mediaGautas 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {order.mediaGautas ? 'True' : 'False'}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-gray-900" onClick={() => handleRowClick(order)}>
                    {formatPrice(order.galutineKaina)}
                  </td>
                  <td className="px-4 py-2.5" onClick={() => handleRowClick(order)}>
                    <span className={`text-sm font-medium ${
                      order.saskaitaIssiusta 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {order.saskaitaIssiusta ? 'True' : 'False'}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-gray-500" onClick={() => handleRowClick(order)}>
                    {formatDate(order.atnaujinta)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-8 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-1.5 border border-neutral-300 text-xs font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ankstesnis
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-1.5 border border-neutral-300 text-xs font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kitas
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total found: <span className="font-medium">{sortedOrders.length}</span> iš <span className="font-medium">{sortedOrders.length}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
                <span className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Page size selector */}
        <div className="bg-white px-8 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Eilutės per puslapį:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="border border-gray-300 rounded text-sm px-3 py-1.5 text-gray-700"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            Puslapis 1 iš 1 | {sortedOrders.length} įrašai
          </div>
        </div>
      </div>
    </div>
  )
}
