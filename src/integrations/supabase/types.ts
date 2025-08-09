export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      invitations: {
        Row: {
          code: string
          created_at: string
          created_by: string
          email: string
          id: string
          used_at: string | null
        }
        Insert: {
          code: string
          created_at?: string
          created_by: string
          email: string
          id?: string
          used_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string
          email?: string
          id?: string
          used_at?: string | null
        }
        Relationships: []
      }
      member_profile_submissions: {
        Row: {
          admin_notes: string | null
          bio: string | null
          company: string | null
          expertise: string[] | null
          full_name: string
          id: string
          linkedin_url: string | null
          location: string | null
          position: string | null
          profile_image_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          services_offered: string | null
          status: string | null
          submitted_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          admin_notes?: string | null
          bio?: string | null
          company?: string | null
          expertise?: string[] | null
          full_name: string
          id?: string
          linkedin_url?: string | null
          location?: string | null
          position?: string | null
          profile_image_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          services_offered?: string | null
          status?: string | null
          submitted_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          admin_notes?: string | null
          bio?: string | null
          company?: string | null
          expertise?: string[] | null
          full_name?: string
          id?: string
          linkedin_url?: string | null
          location?: string | null
          position?: string | null
          profile_image_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          services_offered?: string | null
          status?: string | null
          submitted_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      member_profiles: {
        Row: {
          bio: string | null
          company: string | null
          created_at: string
          expertise: string[] | null
          full_name: string
          id: string
          is_visible: boolean | null
          linkedin_url: string | null
          location: string | null
          position: string | null
          profile_image_url: string | null
          services_offered: string | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          bio?: string | null
          company?: string | null
          created_at?: string
          expertise?: string[] | null
          full_name: string
          id?: string
          is_visible?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          position?: string | null
          profile_image_url?: string | null
          services_offered?: string | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          bio?: string | null
          company?: string | null
          created_at?: string
          expertise?: string[] | null
          full_name?: string
          id?: string
          is_visible?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          position?: string | null
          profile_image_url?: string | null
          services_offered?: string | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      pending_members: {
        Row: {
          created_at: string
          created_by: string
          email: string
          full_name: string
          id: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          email: string
          full_name: string
          id?: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          email?: string
          full_name?: string
          id?: string
          notes?: string | null
        }
        Relationships: []
      }
      pre_approved_emails: {
        Row: {
          added_at: string
          added_by: string
          email: string
          id: string
          notes: string | null
          used_at: string | null
        }
        Insert: {
          added_at?: string
          added_by: string
          email: string
          id?: string
          notes?: string | null
          used_at?: string | null
        }
        Update: {
          added_at?: string
          added_by?: string
          email?: string
          id?: string
          notes?: string | null
          used_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          id: string
          requested_at: string | null
          role: Database["public"]["Enums"]["app_role"]
          status: string | null
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          id?: string
          requested_at?: string | null
          role: Database["public"]["Enums"]["app_role"]
          status?: string | null
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          id?: string
          requested_at?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_pre_approved_emails: {
        Args: { p_emails: string[]; p_notes?: string }
        Returns: number
      }
      approve_member_submission: {
        Args: { submission_id: string }
        Returns: undefined
      }
      approve_user_membership: {
        Args: { target_user_id: string }
        Returns: undefined
      }
      assign_admin_role: {
        Args: { target_user_id: string }
        Returns: undefined
      }
      create_invitation: {
        Args: { p_email: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_approved_member: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "member"],
    },
  },
} as const
