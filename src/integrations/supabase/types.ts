export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agro_dealer_applications: {
        Row: {
          business_name: string | null
          created_at: string
          email: string
          experience_period: string
          full_name: string
          id: string
          location: string
          other_product_type: string | null
          other_referral_source: string | null
          other_training_topic: string | null
          phone: string
          preferred_date: string | null
          previous_training: boolean
          product_types: string[] | null
          referral_source: string | null
          staff_count: string | null
          training_topics: string[] | null
          wants_certificate: boolean
        }
        Insert: {
          business_name?: string | null
          created_at?: string
          email: string
          experience_period: string
          full_name: string
          id?: string
          location: string
          other_product_type?: string | null
          other_referral_source?: string | null
          other_training_topic?: string | null
          phone: string
          preferred_date?: string | null
          previous_training?: boolean
          product_types?: string[] | null
          referral_source?: string | null
          staff_count?: string | null
          training_topics?: string[] | null
          wants_certificate?: boolean
        }
        Update: {
          business_name?: string | null
          created_at?: string
          email?: string
          experience_period?: string
          full_name?: string
          id?: string
          location?: string
          other_product_type?: string | null
          other_referral_source?: string | null
          other_training_topic?: string | null
          phone?: string
          preferred_date?: string | null
          previous_training?: boolean
          product_types?: string[] | null
          referral_source?: string | null
          staff_count?: string | null
          training_topics?: string[] | null
          wants_certificate?: boolean
        }
        Relationships: []
      }
      extension_applications: {
        Row: {
          challenges: string | null
          created_at: string
          delivery_method: string | null
          email: string
          farm_size: string | null
          farming_types: string[] | null
          full_name: string
          id: string
          interest_areas: string[] | null
          location: string
          other_farming_type: string | null
          other_interest_area: string | null
          other_referral_source: string | null
          phone: string
          preferred_date: string | null
          referral_source: string | null
          training_preference: string | null
        }
        Insert: {
          challenges?: string | null
          created_at?: string
          delivery_method?: string | null
          email: string
          farm_size?: string | null
          farming_types?: string[] | null
          full_name: string
          id?: string
          interest_areas?: string[] | null
          location: string
          other_farming_type?: string | null
          other_interest_area?: string | null
          other_referral_source?: string | null
          phone: string
          preferred_date?: string | null
          referral_source?: string | null
          training_preference?: string | null
        }
        Update: {
          challenges?: string | null
          created_at?: string
          delivery_method?: string | null
          email?: string
          farm_size?: string | null
          farming_types?: string[] | null
          full_name?: string
          id?: string
          interest_areas?: string[] | null
          location?: string
          other_farming_type?: string | null
          other_interest_area?: string | null
          other_referral_source?: string | null
          phone?: string
          preferred_date?: string | null
          referral_source?: string | null
          training_preference?: string | null
        }
        Relationships: []
      }
      ssp_training_applications: {
        Row: {
          area_size: string | null
          challenges: string | null
          created_at: string
          email: string
          experience: string
          full_name: string
          id: string
          location: string
          other_referral_source: string | null
          other_technique: string | null
          people_count: string | null
          phone: string
          preferred_date: string | null
          previous_training: boolean
          referral_source: string | null
          techniques: string[] | null
        }
        Insert: {
          area_size?: string | null
          challenges?: string | null
          created_at?: string
          email: string
          experience: string
          full_name: string
          id?: string
          location: string
          other_referral_source?: string | null
          other_technique?: string | null
          people_count?: string | null
          phone: string
          preferred_date?: string | null
          previous_training?: boolean
          referral_source?: string | null
          techniques?: string[] | null
        }
        Update: {
          area_size?: string | null
          challenges?: string | null
          created_at?: string
          email?: string
          experience?: string
          full_name?: string
          id?: string
          location?: string
          other_referral_source?: string | null
          other_technique?: string | null
          people_count?: string | null
          phone?: string
          preferred_date?: string | null
          previous_training?: boolean
          referral_source?: string | null
          techniques?: string[] | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
