
export type AdminUser = {
  user_id: string;
  email: string | null;
  invited_at: string | null;
};

export type ApplicationTableName = "agro_dealer_applications" | "ssp_training_applications" | "extension_applications";

export type ApplicationBase = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  location: string;
  phone: string;
  status?: string;
};

export type AgroDealerApplication = ApplicationBase & {
  experience_period: string;
  business_name: string | null;
  product_types: string[] | null;
  training_topics: string[] | null;
  staff_count: string | null;
  other_product_type: string | null;
  other_training_topic: string | null;
  previous_training: boolean;
  wants_certificate: boolean;
  preferred_date: string | null;
  referral_source: string | null;
  other_referral_source: string | null;
};

export type SSPTrainingApplication = ApplicationBase & {
  experience: string;
  area_size: string | null;
  techniques: string[] | null;
  people_count: string | null;
  other_technique: string | null;
  preferred_date: string | null;
  previous_training: boolean;
  challenges: string | null;
  referral_source: string | null;
  other_referral_source: string | null;
};

export type ExtensionApplication = ApplicationBase & {
  farming_types: string[] | null;
  interest_areas: string[] | null;
  farm_size: string | null;
  other_farming_type: string | null;
  other_interest_area: string | null;
  delivery_method: string | null;
  training_preference: string | null;
  preferred_date: string | null;
  challenges: string | null;
  referral_source: string | null;
  other_referral_source: string | null;
};
