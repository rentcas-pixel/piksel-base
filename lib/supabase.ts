import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zgqgxyydjnaddxrcffle.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncWd4eXlkam5hZGR4cmNmZmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5Nzk0NDYsImV4cCI6MjA3MTU1NTQ0Nn0.k8H8lCgPPr6MCuJBDLVSI6x7NvmAWi2m0nYycHK7xZM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: number
          pavadinimas: string
          agentura: string
          patvirtinta: boolean
          data_nuo: string
          data_iki: string
          media_gautas: boolean
          galutine_kaina: number
          saskaita_issiusta: boolean
          orderNo: string
          atnaujinta: string
          tipas: 'ekranai' | 'viadukai'
          komentaras?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          pavadinimas: string
          agentura: string
          patvirtinta?: boolean
          data_nuo: string
          data_iki: string
          media_gautas?: boolean
          galutine_kaina: number
          saskaita_issiusta?: boolean
          orderNo: string
          tipas: 'ekranai' | 'viadukai'
          komentaras?: string
        }
        Update: {
          pavadinimas?: string
          agentura?: string
          patvirtinta?: boolean
          data_nuo?: string
          data_iki?: string
          media_gautas?: boolean
          galutine_kaina?: number
          saskaita_issiusta?: boolean
          orderNo?: string
          komentaras?: string
          updated_at?: string
        }
      }
      files: {
        Row: {
          id: string
          order_id: number
          filename: string
          file_path: string
          file_type: string
          file_size: number
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          order_id: number
          filename: string
          file_path: string
          file_type: string
          file_size: number
          uploaded_by: string
        }
        Update: {
          filename?: string
          file_path?: string
          file_type?: string
          file_size?: number
        }
      }
    }
  }
}
