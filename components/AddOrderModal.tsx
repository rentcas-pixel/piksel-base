'use client'

import { useState } from 'react'
import { X, FileText, AlertCircle } from 'lucide-react'
import { Order } from '../types/order'
import CustomDatePicker from './DatePicker'

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newOrder: Partial<Order>) => void
  activeTab: 'bendras' | 'ekranai' | 'viadukai'
}

export default function AddOrderModal({ isOpen, onClose, onSave, activeTab }: AddOrderModalProps) {
  const [formData, setFormData] = useState<Partial<Order>>({
    pavadinimas: '',
    agentura: '',
    tipas: activeTab === 'bendras' ? 'ekranai' : activeTab,
    patvirtinta: false,
    dataNuo: null,
    dataIki: null,
    mediaGautas: false,
    galutineKaina: 0,
    saskaitaIssiusta: false,
    saskaitosId: '',
    komentaras: ''
  })

  const handleInputChange = (field: keyof Order, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate Order No
    const orderNo = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    
    const newOrder = {
      ...formData,
      dataNuo: formData.dataNuo ? formData.dataNuo.toISOString().split('T')[0] : '',
      dataIki: formData.dataIki ? formData.dataIki.toISOString().split('T')[0] : '',
      saskaitosId: orderNo,
      atnaujinta: new Date().toISOString()
    }
    
    onSave(newOrder)
    onClose()
    
    // Reset form
    setFormData({
      pavadinimas: '',
      agentura: '',
      tipas: activeTab === 'bendras' ? 'ekranai' : activeTab,
      patvirtinta: false,
      dataNuo: '',
      dataIki: '',
      mediaGautas: false,
      galutineKaina: 0,
      saskaitaIssiusta: false,
      saskaitosId: '',
      komentaras: ''
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header - Pixelmator Pro Style */}
        <div className="bg-white border border-gray-200 rounded-t-lg p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                {activeTab === 'bendras' ? 'EKRANAI' : activeTab.toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Naujas Užsakymas
              </h2>
              <div className="text-sm text-gray-600">
                Sukurti naują užsakymą
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Colored line based on tab */}
          <div className={`h-1 rounded-full ${
            activeTab === 'ekranai' ? 'bg-blue-500' : 'bg-black'
          }`} />
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="Įveskite užsakymo pavadinimą"
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
                placeholder="Įveskite agentūros pavadinimą"
              />
            </div>
          </div>

          {/* Row 1: Approve, Media received */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patvirtinta
              </label>
              <select
                value={formData.patvirtinta ? 'true' : 'false'}
                onChange={(e) => handleInputChange('patvirtinta', e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="false">Ne</option>
                <option value="true">Taip</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Gautas
              </label>
              <select
                value={formData.mediaGautas ? 'true' : 'false'}
                onChange={(e) => handleInputChange('mediaGautas', e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="false">Ne</option>
                <option value="true">Taip</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price, Invoice sent */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kaina (€)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.galutineKaina}
                onChange={(e) => handleInputChange('galutineKaina', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sąskaita Išsiųsta
              </label>
              <select
                value={formData.saskaitaIssiusta ? 'true' : 'false'}
                onChange={(e) => handleInputChange('saskaitaIssiusta', e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="false">Ne</option>
                <option value="true">Taip</option>
              </select>
            </div>
          </div>

          {/* Row 3: Data nuo, Data iki */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <CustomDatePicker
                selected={formData.dataNuo}
                onChange={(date) => handleInputChange('dataNuo', date)}
                label="Data Nuo"
                required
                placeholderText="Pasirinkite pradžios datą"
              />
            </div>
            
            <div>
              <CustomDatePicker
                selected={formData.dataIki}
                onChange={(date) => handleInputChange('dataIki', date)}
                label="Data Iki"
                required
                placeholderText="Pasirinkite pabaigos datą"
                minDate={formData.dataNuo}
              />
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Komentaras
            </label>
            <textarea
              value={formData.komentaras}
              onChange={(e) => handleInputChange('komentaras', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Įveskite komentarą apie užsakymą..."
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Uždaryti
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Išsaugoti
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
