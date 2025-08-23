'use client'

import { useState, useEffect } from 'react'
import { Order } from '../types/order'
import { X, Calendar, FileText, AlertCircle } from 'lucide-react'

interface OrderModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedOrder: Order) => void
  onDelete: (orderId: number) => void
}

export default function OrderModal({ order, isOpen, onClose, onSave, onDelete }: OrderModalProps) {
  const [formData, setFormData] = useState<Partial<Order>>({})
  const [comment, setComment] = useState('')
  const [reminderDate, setReminderDate] = useState('')
  const [reminderNote, setReminderNote] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (order) {
      setFormData({
        pavadinimas: order.pavadinimas,
        agentura: order.agentura,
        patvirtinta: order.patvirtinta,
        dataNuo: order.dataNuo,
        dataIki: order.dataIki,
        mediaGautas: order.mediaGautas,
        galutineKaina: order.galutineKaina,
        saskaitaIssiusta: order.saskaitaIssiusta,
        saskaitosId: order.saskaitosId,
        atnaujinta: order.atnaujinta
      })
      setComment(order.komentaras || '')
    }
  }, [order])

  const handleInputChange = (field: keyof Order, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSave = () => {
    if (order) {
      const updatedOrder: Order = {
        ...order,
        ...formData,
        komentaras: comment
      }
      onSave(updatedOrder)
      onClose()
    }
  }

  const handleDelete = () => {
    if (order) {
      onDelete(order.id)
      onClose()
    }
  }

  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-800 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">{order.pavadinimas} - Kliento detalės</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Top Information - Read Only */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pavadinimas</label>
              <input
                type="text"
                value={formData.pavadinimas || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agentūra</label>
              <input
                type="text"
                value={formData.agentura || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Užsakymo Nr.</label>
              <input
                type="text"
                value={order.id}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Atnaujinta</label>
              <input
                type="text"
                value={formData.atnaujinta || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data nuo</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dataNuo || ''}
                  onChange={(e) => handleInputChange('dataNuo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data iki</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dataIki || ''}
                  onChange={(e) => handleInputChange('dataIki', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Approved</label>
              <select
                value={formData.patvirtinta ? 'true' : 'false'}
                onChange={(e) => handleInputChange('patvirtinta', e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">Taip</option>
                <option value="false">Ne</option>
                <option value="reserved">Rezervuota</option>
                <option value="cancelled">Atšaukta</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media received</label>
              <select
                value={formData.mediaGautas ? 'true' : 'false'}
                onChange={(e) => handleInputChange('mediaGautas', e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">Taip</option>
                <option value="false">Ne</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (€)</label>
              <input
                type="number"
                step="0.01"
                value={formData.galutineKaina || ''}
                onChange={(e) => handleInputChange('galutineKaina', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice sent</label>
              <select
                value={formData.saskaitaIssiusta ? 'true' : 'false'}
                onChange={(e) => handleInputChange('saskaitaIssiusta', e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">Taip</option>
                <option value="false">Ne</option>
              </select>
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Komentaras</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Palikti pastabas apie klienta..."
            />
          </div>

          {/* File Attachment Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Failai / Print screen
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept=".pdf,.xls,.xlsx,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Choose files
              </label>
              <p className="mt-2 text-sm text-gray-500">
                {selectedFile ? selectedFile.name : 'No file chosen'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Galite ir įklijuoti ekrano nuotrauką su Cmd/Ctrl+V
              </p>
            </div>
          </div>

          {/* Reminder Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Priminimas
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Priminimo data</label>
                <div className="relative">
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Priminimo žinutė</label>
                <input
                  type="text"
                  value={reminderNote}
                  onChange={(e) => setReminderNote(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Pvz.: perskambinti, patvirtinti užsakymą..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-between">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
          >
            Ištrinti
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Uždaryti
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Išsaugoti
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
