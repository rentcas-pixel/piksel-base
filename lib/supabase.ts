import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key'

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
          saskaitosId: string
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
          saskaitosId: string
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
          saskaitosId?: string
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
