'use client'

import { useState, useRef } from 'react'
import { Upload, X, File, Image, FileText, Download } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface FileUploadProps {
  orderId: number
  onFileUploaded: () => void
}

interface FileRecord {
  id: string
  filename: string
  file_path: string
  file_type: string
  file_size: number
  uploaded_at: string
  uploaded_by: string
}

export default function FileUpload({ orderId, onFileUploaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [files, setFiles] = useState<FileRecord[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Gauti esamus failus
  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('order_id', orderId)
      .order('uploaded_at', { ascending: false })

    if (!error && data) {
      setFiles(data)
    }
  }

  // Failo upload
  const uploadFile = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('orderId', orderId.toString())
      formData.append('uploadedBy', 'user@example.com') // TODO: Get from auth

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setUploadProgress(100)
        await fetchFiles()
        onFileUploaded()
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    droppedFiles.forEach(uploadFile)
  }

  // File input handler
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    selectedFiles.forEach(uploadFile)
  }

  // Delete file
  const deleteFile = async (fileId: string, filePath: string) => {
    try {
      // Delete from storage
      await supabase.storage
        .from('order-files')
        .remove([filePath])

      // Delete from database
      await supabase
        .from('files')
        .delete()
        .eq('id', fileId)

      await fetchFiles()
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  // Get file icon
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-5 w-5" />
    if (fileType.includes('pdf')) return <FileText className="h-5 w-5" />
    return <File className="h-5 w-5" />
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-neutral-300 hover:border-neutral-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-neutral-400" />
        <div className="mt-4">
          <p className="text-lg font-medium text-neutral-900">
            Tempkite failus čia arba spustelėkite
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            PNG, JPG, PDF, DOC, XLSX iki 10MB
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 btn-primary"
          disabled={isUploading}
        >
          Pasirinkti failus
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Upload progress */}
      {isUploading && (
        <div className="bg-neutral-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">
              Įkeliama...
            </span>
            <span className="text-sm text-neutral-500">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Files list */}
      {files.length > 0 && (
        <div className="bg-white rounded-lg border border-neutral-200">
          <div className="px-4 py-3 border-b border-neutral-200">
            <h3 className="text-lg font-medium text-neutral-900">
              Pridėti failai ({files.length})
            </h3>
          </div>
          <div className="divide-y divide-neutral-200">
            {files.map((file) => (
              <div key={file.id} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-neutral-400">
                    {getFileIcon(file.file_type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {file.filename}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {formatFileSize(file.file_size)} • {new Date(file.uploaded_at).toLocaleDateString('lt-LT')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      // Download file
                      const url = supabase.storage
                        .from('order-files')
                        .getPublicUrl(file.file_path).data.publicUrl
                      window.open(url, '_blank')
                    }}
                    className="p-1 text-neutral-400 hover:text-neutral-600"
                    title="Atsisiųsti"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteFile(file.id, file.file_path)}
                    className="p-1 text-neutral-400 hover:text-red-600"
                    title="Ištrinti"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
