'use client'
import { useState } from 'react'
import { X, Save, Plus } from 'lucide-react'
import { Order } from '../types/order'

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (order: Partial<Order>) => void
  activeTab: 'bendras' | 'ekranai' | 'viadukai'
}

export default function AddOrderModal({ isOpen, onClose, onSave, activeTab }: AddOrderModalProps) {
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
    tipas: activeTab === 'bendras' ? 'ekranai' : activeTab
  })

  const handleInputChange = (field: keyof Order, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newOrder = {
      ...formData,
      atnaujinta: new Date().toISOString()
    }
    onSave(newOrder)
    onClose()
    // Reset form
    setFormData({
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
      tipas: activeTab === 'bendras' ? 'ekranai' : activeTab
    })
  }

  if (!isOpen) return null

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
                {getTabLabel()} - NAUJAS UŽSAKYMAS
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Pridėti naują užsakymą
              </h2>
              <p className="text-sm text-gray-600">
                Užpildykite visus reikalingus laukus
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Pavadinimas ir Agentūra */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pavadinimas *
                </label>
                <input
                  type="text"
                  required
                  value={formData.pavadinimas}
                  onChange={(e) => handleInputChange('pavadinimas', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Įveskite pavadinimą"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agentūra *
                </label>
                <input
                  type="text"
                  required
                  value={formData.agentura}
                  onChange={(e) => handleInputChange('agentura', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Įveskite agentūrą"
                />
              </div>
            </div>

            {/* Order No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order No *
              </label>
              <input
                type="text"
                required
                value={formData.orderNo}
                onChange={(e) => handleInputChange('orderNo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="INV-2024-001"
              />
            </div>

            {/* Toggle switches - PocketBase stilius */}
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

            {/* Kaina ir Sąskaita */}
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

            {/* Datos */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data nuo
                </label>
                <input
                  type="date"
                  value={formData.dataNuo}
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
                  value={formData.dataIki}
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
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Uždaryti
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Pridėti užsakymą
          </button>
        </div>
      </div>
    </div>
  )
}
