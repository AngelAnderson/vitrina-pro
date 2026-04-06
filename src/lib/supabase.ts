import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type Service = {
  name: string;
  description: string;
  price_range: string;
  intent: "pain" | "aesthetics" | "routine" | "emergency";
};

export type GalleryItem = {
  before_url: string;
  after_url: string;
  caption: string;
  intent: string;
};

export type ChatConfig = {
  greeting: string;
  fallback: string;
  intents: {
    [key in "pain" | "aesthetics" | "routine" | "emergency"]: {
      response: string;
      show_gallery: boolean;
      urgency: "high" | "medium" | "low";
    };
  };
};

export type Professional = {
  id: string;
  slug: string;
  name: string;
  profession: string;
  phone: string;
  whatsapp_url: string | null;
  tagline: string | null;
  services: Service[];
  gallery: GalleryItem[];
  chat_config: ChatConfig;
  custom_domain: string | null;
  accent_color: string;
  is_showcase: boolean;
  is_active: boolean;
  created_at: string;
};
