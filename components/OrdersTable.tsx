'use client'

import { Order } from '../types/order'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useMemo } from 'react'

interface OrdersTableProps {
  orders: Order[]
  onOrderClick: (order: Order) => void
}

type SortField = keyof Order
type SortDirection = 'asc' | 'desc'

export default function OrdersTable({ orders, onOrderClick }: OrdersTableProps) {
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set())

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedOrders = useMemo(() => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('lt-LT')
  }

  const formatPrice = (price: number) => {
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

  const handleSelectOrder = (orderId: number) => {
    const newSelected = new Set(selectedOrders)
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId)
    } else {
      newSelected.add(orderId)
    }
    setSelectedOrders(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedOrders.size === currentOrders.length) {
      setSelectedOrders(new Set())
    } else {
      setSelectedOrders(new Set(currentOrders.map(order => order.id)))
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl overflow-hidden shadow-xl">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50/50">
            <tr className="border-b border-gray-100">
              <th className="w-4 px-2 py-1.5">
                <input
                  type="checkbox"
                  checked={selectedOrders.size === currentOrders.length && currentOrders.length > 0}
                  onChange={handleSelectAll}
                  className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
              {[
                { key: 'pavadinimas', label: 'Pavadinimas' },
                { key: 'agentura', label: 'Agentūra' },
                { key: 'patvirtinta', label: 'Patvirtinta' },
                { key: 'dataNuo', label: 'Data nuo' },
                { key: 'dataIki', label: 'Data iki' },
                { key: 'mediaGautas', label: 'Media gautas' },
                { key: 'galutineKaina', label: 'Galutinė kaina' },
                { key: 'saskaitaIssiusta', label: 'Sąskaita išsiųsta' },
                { key: 'saskaitosId', label: 'Sąskaitos ID' },
                { key: 'atnaujinta', label: 'Atnaujinta' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-all duration-200"
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
          <tbody className="bg-white/50 divide-y divide-gray-50">
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50/50 transition-all duration-200 cursor-pointer border-b border-gray-50"
              >
                <td className="w-4 px-2 py-1.5">
                  <input
                    type="checkbox"
                    checked={selectedOrders.has(order.id)}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleSelectOrder(order.id)
                    }}
                    className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900" onClick={() => onOrderClick(order)}>{order.pavadinimas}</td>
                <td className="px-4 py-3 text-sm text-gray-700" onClick={() => onOrderClick(order)}>{order.agentura}</td>
                <td className="px-4 py-3" onClick={() => onOrderClick(order)}>
                  <span className={`inline-flex px-3 py-1.5 rounded-2xl text-xs font-semibold ${
                    order.patvirtinta 
                      ? 'bg-green-100/80 text-green-700' 
                      : 'bg-red-100/80 text-red-700'
                  }`}>
                    {order.patvirtinta ? 'Patvirtinta' : 'Laukiama'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700" onClick={() => onOrderClick(order)}>{formatDate(order.dataNuo)}</td>
                <td className="px-4 py-3 text-sm text-sm text-gray-700" onClick={() => onOrderClick(order)}>{formatDate(order.dataIki)}</td>
                <td className="px-4 py-3" onClick={() => onOrderClick(order)}>
                  <span className={`inline-flex px-3 py-1.5 rounded-2xl text-xs font-semibold ${
                    order.mediaGautas 
                      ? 'bg-green-100/80 text-green-700' 
                      : 'bg-red-100/80 text-red-700'
                  }`}>
                    {order.mediaGautas ? 'Taip' : 'Ne'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900" onClick={() => onOrderClick(order)}>{formatPrice(order.galutineKaina)}</td>
                <td className="px-4 py-3" onClick={() => onOrderClick(order)}>
                  <span className={`inline-flex px-3 py-1.5 rounded-2xl text-xs font-semibold ${
                    order.saskaitaIssiusta 
                      ? 'bg-green-100/80 text-green-700' 
                      : 'bg-red-100/80 text-red-700'
                  }`}>
                    {order.saskaitaIssiusta ? 'Taip' : 'Ne'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-mono text-gray-600" onClick={() => onOrderClick(order)}>{order.saskaitosId}</td>
                <td className="px-4 py-3 text-sm text-gray-500" onClick={() => onOrderClick(order)}>{formatDate(order.atnaujinta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-gray-50/50 px-6 py-4 flex items-center justify-between border-t border-gray-100 sm:px-8">
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
            className="ml-2 relative inline-flex items-center px-3 py-1.5 border border-neutral-300 text-xs font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:cursor-not-allowed"
          >
            Kitas
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-neutral-700">
              Rodoma <span className="font-medium">{startIndex + 1}</span> iki{' '}
              <span className="font-medium">{Math.min(endIndex, sortedOrders.length)}</span> iš{' '}
              <span className="font-medium">{sortedOrders.length}</span> rezultatų
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-3 py-1.5 border text-xs font-medium ${
                    page === currentPage
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Page size selector */}
      <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <label htmlFor="page-size" className="text-xs text-neutral-700">
            Puslapio dydis:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="border border-neutral-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  )
}
