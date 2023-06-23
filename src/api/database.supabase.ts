export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          city: string
          created_at: string
          end: string | null
          id: string
          is_default: boolean | null
          is_disabled: boolean
          is_ongoing: boolean
          profile_id: string | null
          start: string | null
          state: string
          street: string
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string
          end?: string | null
          id?: string
          is_default?: boolean | null
          is_disabled?: boolean
          is_ongoing?: boolean
          profile_id?: string | null
          start?: string | null
          state: string
          street: string
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string
          end?: string | null
          id?: string
          is_default?: boolean | null
          is_disabled?: boolean
          is_ongoing?: boolean
          profile_id?: string | null
          start?: string | null
          state?: string
          street?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "address_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      education: {
        Row: {
          created_at: string
          degree: string
          end: string | null
          id: string
          is_disabled: boolean
          is_ongoing: boolean
          major: string
          modified_at: string
          profile_id: string
          school: string
          start: string
        }
        Insert: {
          created_at?: string
          degree: string
          end?: string | null
          id?: string
          is_disabled?: boolean
          is_ongoing?: boolean
          major?: string
          modified_at?: string
          profile_id: string
          school: string
          start: string
        }
        Update: {
          created_at?: string
          degree?: string
          end?: string | null
          id?: string
          is_disabled?: boolean
          is_ongoing?: boolean
          major?: string
          modified_at?: string
          profile_id?: string
          school?: string
          start?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      experience: {
        Row: {
          city: string
          company: string
          created_at: string
          description: string
          end: string | null
          id: string
          is_disabled: boolean
          is_ongoing: boolean
          modified_at: string
          profile_id: string
          start: string
          title: string
        }
        Insert: {
          city: string
          company: string
          created_at?: string
          description: string
          end?: string | null
          id?: string
          is_disabled?: boolean
          is_ongoing?: boolean
          modified_at?: string
          profile_id: string
          start: string
          title: string
        }
        Update: {
          city?: string
          company?: string
          created_at?: string
          description?: string
          end?: string | null
          id?: string
          is_disabled?: boolean
          is_ongoing?: boolean
          modified_at?: string
          profile_id?: string
          start?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      like: {
        Row: {
          created_at: string
          description: string | null
          fan_id: string
          id: string
          is_disabled: boolean
          modified_at: string
          profile_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          fan_id: string
          id?: string
          is_disabled?: boolean
          modified_at?: string
          profile_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          fan_id?: string
          id?: string
          is_disabled?: boolean
          modified_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "like_fan_id_fkey"
            columns: ["fan_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      phone: {
        Row: {
          catalog: string
          created_at: string
          id: string
          is_default: boolean | null
          is_disabled: boolean
          phone: string
          profile_id: string
        }
        Insert: {
          catalog?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          is_disabled?: boolean
          phone: string
          profile_id: string
        }
        Update: {
          catalog?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          is_disabled?: boolean
          phone?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "phone_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          created_at: string
          first_name: string
          id: string
          is_disabled: boolean
          last_name: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          is_disabled?: boolean
          last_name: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          is_disabled?: boolean
          last_name?: string
        }
        Relationships: []
      }
      skill: {
        Row: {
          created_at: string
          experience_id: string | null
          id: string
          profile_id: string | null
          skill: string
        }
        Insert: {
          created_at?: string
          experience_id?: string | null
          id?: string
          profile_id?: string | null
          skill: string
        }
        Update: {
          created_at?: string
          experience_id?: string | null
          id?: string
          profile_id?: string | null
          skill?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_experience_id_fkey"
            columns: ["experience_id"]
            referencedRelation: "experience"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
