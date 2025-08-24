'use client'
import { useState, useEffect } from 'react'
import { X, Save, Trash2 } from 'lucide-react'
import { Order } from '../types/order'

interface OrderModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedOrder: Order) => void
  onDelete: (orderId: number) => void
  activeTab: 'bendras' | 'ekranai' | 'viadukai'
}

export default function OrderModal({ order, isOpen, onClose, onSave, onDelete, activeTab }: OrderModalProps) {
  const [formData, setFormData] = useState<Partial<Order>>({
    pavadinimas: '',
    agentura: '',
    patvirtinta: false,
    dataNuo: '',
    dataIki: '',
    mediaGautas: false,
    galutineKaina: 0,
    saskaitaIssiusta: false,
    orderNo: '',
    komentaras: '',
    atnaujinta: '',
    tipas: 'ekranai'
  })

  useEffect(() => {
    if (order) {
      setFormData({
        pavadinimas: order.pavadinimas || '',
        agentura: order.agentura || '',
        patvirtinta: order.patvirtinta || false,
        dataNuo: order.dataNuo || '',
        dataIki: order.dataIki || '',
        mediaGautas: order.mediaGautas || false,
        galutineKaina: order.galutineKaina || 0,
        saskaitaIssiusta: order.saskaitaIssiusta || false,
        orderNo: order.orderNo || '',
        komentaras: order.komentaras || '',
        atnaujinta: order.atnaujinta || '',
        tipas: order.tipas || 'ekranai'
      })
    }
  }, [order])

  const handleInputChange = (field: keyof Order, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (order) {
      const updatedOrder: Order = {
        ...order,
        ...formData,
        atnaujinta: new Date().toISOString()
      }
      onSave(updatedOrder)
      onClose()
    }
  }

  const handleDelete = () => {
    if (order && confirm('Ar tikrai norite ištrinti šį užsakymą?')) {
      onDelete(order.id)
      onClose()
    }
  }

  if (!isOpen || !order) return null

  const getTabColor = () => {
    switch (activeTab) {
      case 'ekranai': return 'border-blue-500'
      case 'viadukai': return 'border-black'
      case 'bendras': return 'border-gray-500'
      default: return 'border-gray-500'
    }
  }

  const getTabLabel = () => {
    switch (activeTab) {
      case 'ekranai': return 'EKRANAI'
      case 'viadukai': return 'VIADUKAI'
      case 'bendras': return 'UŽSAKYMAS'
      default: return 'UŽSAKYMAS'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header - PocketBase stilius */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                {getTabLabel()} - {order?.orderNo || 'N/A'}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {order?.pavadinimas || 'N/A'}
              </h2>
              <p className="text-sm text-gray-600">
                {order?.agentura || 'N/A'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Spalvota linija */}
          <div className={`mt-4 h-1 bg-gradient-to-r ${getTabColor()} rounded-full`}></div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Toggle switches - PocketBase stilius */}
          <div className="space-y-6">
            {/* Row 1: Approve, Media received */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Patvirtinta
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleInputChange('patvirtinta', !formData.patvirtinta)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.patvirtinta ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.patvirtinta ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm text-gray-600">
                    {formData.patvirtinta ? 'Taip' : 'Ne'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Media gautas
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleInputChange('mediaGautas', !formData.mediaGautas)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.mediaGautas ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.mediaGautas ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm text-gray-600">
                    {formData.mediaGautas ? 'Taip' : 'Ne'}
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Price, Invoice sent */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kaina (€)
                </label>
                <input
                  type="number"
                  value={formData.galutineKaina || ''}
                  onChange={(e) => handleInputChange('galutineKaina', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sąskaita išsiųsta
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleInputChange('saskaitaIssiusta', !formData.saskaitaIssiusta)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.saskaitaIssiusta ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.saskaitaIssiusta ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm text-gray-600">
                    {formData.saskaitaIssiusta ? 'Taip' : 'Ne'}
                  </span>
                </div>
              </div>
            </div>

            {/* Row 3: Data nuo, Data iki */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data nuo
                </label>
                <input
                  type="date"
                  value={formData.dataNuo || ''}
                  onChange={(e) => handleInputChange('dataNuo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data iki
                </label>
                <input
                  type="date"
                  value={formData.dataIki || ''}
                  onChange={(e) => handleInputChange('dataIki', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Komentaras */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Komentaras
              </label>
              <textarea
                value={formData.komentaras || ''}
                onChange={(e) => handleInputChange('komentaras', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Įveskite komentarą..."
              />
            </div>

            {/* File upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pridėti failą
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Drag & drop failą čia arba <span className="text-blue-600 hover:text-blue-500 cursor-pointer">pasirinkite</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, XLS, screenshots (max 10MB)
                </p>
              </div>
            </div>

            {/* Reminder */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priminimas
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Data"
                />
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Pastaba"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Ištrinti
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Uždaryti
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Išsaugoti
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
