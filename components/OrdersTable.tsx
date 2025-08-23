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

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
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
                  className="table-header cursor-pointer hover:bg-neutral-100 transition-colors duration-150"
                  onClick={() => handleSort(key as SortField)}
                >
                  <div className="flex items-center space-x-0.5">
                    <span>{label}</span>
                    {getSortIcon(key as SortField)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="table-row"
                onClick={() => onOrderClick(order)}
              >
                <td className="table-cell font-medium">{order.pavadinimas}</td>
                <td className="table-cell">{order.agentura}</td>
                <td className="table-cell">
                  <span className={`status-badge ${order.patvirtinta ? 'status-success' : 'status-danger'}`}>
                    {order.patvirtinta ? 'Taip' : 'Ne'}
                  </span>
                </td>
                <td className="table-cell">{formatDate(order.dataNuo)}</td>
                <td className="table-cell">{formatDate(order.dataIki)}</td>
                <td className="table-cell">
                  <span className={`status-badge ${order.mediaGautas ? 'status-success' : 'status-danger'}`}>
                    {order.mediaGautas ? 'Taip' : 'Ne'}
                  </span>
                </td>
                <td className="table-cell font-medium">{formatPrice(order.galutineKaina)}</td>
                <td className="table-cell">
                  <span className={`status-badge ${order.saskaitaIssiusta ? 'status-success' : 'status-danger'}`}>
                    {order.saskaitaIssiusta ? 'Taip' : 'Ne'}
                  </span>
                </td>
                <td className="table-cell font-mono text-xs">{order.saskaitosId}</td>
                <td className="table-cell text-neutral-500">{formatDate(order.atnaujinta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-3 py-2 flex items-center justify-between border-t border-neutral-200 sm:px-4">
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
      <div className="bg-neutral-50 px-3 py-2 border-t border-neutral-200">
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
