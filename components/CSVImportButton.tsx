'use client'
import { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react'

export default function CSVImportButton() {
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/csv') {
      setSelectedFile(file)
      setImportResult(null)
    } else if (file) {
      alert('Prašome pasirinkti CSV failą (.csv)')
      setSelectedFile(null)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      alert('Prašome pasirinkti CSV failą')
      return
    }

    if (!confirm(`Ar tikrai norite importuoti CSV failą "${selectedFile.name}"? Visi užsakymai bus pridėti su 100€ kaina.`)) {
      return
    }

    setIsImporting(true)
    setImportResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/import-csv', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        setImportResult({
          success: true,
          message: `CSV importavimas baigtas! Pridėta ${result.summary.success} iš ${result.summary.total} užsakymų.`,
          summary: result.summary,
          results: result.results
        })
        
        // Automatiškai atnaujinti puslapį po 3 sekundžių
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } else {
        setImportResult({
          success: false,
          message: `Importavimo klaida: ${result.error}`,
          details: result.details
        })
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: 'Importavimo klaida',
        details: error instanceof Error ? error.message : 'Nežinoma klaida'
      })
    } finally {
      setIsImporting(false)
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setImportResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">CSV Import</h3>
        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="h-4 w-4 mr-2" />
            Pasirinkti CSV
          </button>
        </div>
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md mb-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">
              {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
          <button
            onClick={clearFile}
            className="text-blue-600 hover:text-blue-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {selectedFile && (
        <button
          onClick={handleImport}
          disabled={isImporting}
          className={`w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isImporting
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isImporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Importuoju CSV...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Importuoti CSV ({selectedFile.name})
            </>
          )}
        </button>
      )}

      {importResult && (
        <div className={`mt-4 p-4 rounded-md ${
          importResult.success
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start">
            {importResult.success ? (
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                importResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {importResult.message}
              </p>
              
              {importResult.summary && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Iš viso: {importResult.summary.total}</p>
                  <p>Sėkmingai: {importResult.summary.success}</p>
                  <p>Klaidų: {importResult.summary.errors}</p>
                </div>
              )}

              {importResult.details && (
                <p className="mt-1 text-sm text-gray-600">
                  Detalės: {importResult.details}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500">
        <p>📋 CSV formatas: pavadinimas, agentūra, datos (neprivaloma)</p>
        <p>💰 Visi užsakymai bus pridėti su 100€ kaina</p>
        <p>📅 Jei datos nenurodytos, bus naudojamos šiandien ir +30 dienų</p>
      </div>
    </div>
  )
}
