'use client'

import { useState } from 'react'
import { Download, CheckCircle, AlertCircle } from 'lucide-react'

export default function ImportButton() {
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<{
    success: boolean
    message: string
    summary?: {
      total: number
      success: number
      errors: number
    }
  } | null>(null)

  const handleImport = async () => {
    if (!confirm('Ar tikrai norite importuoti visus 25 Transliacijos užsakymus? Tai pridės naujus užsakymus su 100€ kaina.')) {
      return
    }

    setIsImporting(true)
    setImportResult(null)

    try {
      const response = await fetch('/api/import-transliacijos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (response.ok) {
        setImportResult({
          success: true,
          message: `Importavimas baigtas! Pridėta ${result.summary.success} iš ${result.summary.total} užsakymų.`,
          summary: result.summary
        })
        
        // Refresh the page after 3 seconds to show new orders
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } else {
        setImportResult({
          success: false,
          message: `Importavimo klaida: ${result.error || 'Nežinoma klaida'}`
        })
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: `Importavimo klaida: ${error instanceof Error ? error.message : 'Nežinoma klaida'}`
      })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="mb-6">
      <button
        onClick={handleImport}
        disabled={isImporting}
        className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isImporting
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
        }`}
      >
        {isImporting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Importuoju...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Importuoti Transliacijos (25 užsakymų)
          </>
        )}
      </button>

      {importResult && (
        <div className={`mt-4 p-4 rounded-md ${
          importResult.success 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            {importResult.success ? (
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            )}
            <span className="font-medium">{importResult.message}</span>
          </div>
          
          {importResult.summary && (
            <div className="mt-2 text-sm">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="font-medium">Iš viso:</span> {importResult.summary.total}
                </div>
                <div>
                  <span className="font-medium">Sėkmingai:</span> {importResult.summary.success}
                </div>
                <div>
                  <span className="font-medium">Klaidos:</span> {importResult.summary.errors}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
