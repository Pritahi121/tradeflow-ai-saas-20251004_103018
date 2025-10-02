import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      // Define your table types here
      examples: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
        }
      }
    }
  }
}