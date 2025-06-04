export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          target: string
          rating: number
          tags: string[]
          category: string | null
          image_urls: string[]
          is_anonymous: boolean
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          target: string
          rating: number
          tags?: string[]
          category?: string | null
          image_urls?: string[]
          is_anonymous?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          target?: string
          rating?: number
          tags?: string[]
          category?: string | null
          image_urls?: string[]
          is_anonymous?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      review_requests: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          category: string | null
          status: 'pending' | 'in_progress' | 'completed'
          deadline: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          category?: string | null
          status?: 'pending' | 'in_progress' | 'completed'
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          category?: string | null
          status?: 'pending' | 'in_progress' | 'completed'
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          review_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          review_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          review_id?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          user_id: string
          review_id: string
          content: string
          is_anonymous: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          review_id: string
          content: string
          is_anonymous?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          review_id?: string
          content?: string
          is_anonymous?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type ReviewRequest = Database['public']['Tables']['review_requests']['Row']
export type Like = Database['public']['Tables']['likes']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']
