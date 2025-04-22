
export type AdminUser = {
  user_id: string;
  email: string | null;
  invited_at: string | null;
};

export type ApplicationBase = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  location: string;
  phone: string;
};

export type AgroDealerApplication = ApplicationBase & {
  experience_period: string;
  business_name: string | null;
  product_types: string[] | null;
  training_topics: string[] | null;
};

export type SSPTrainingApplication = ApplicationBase & {
  experience: string;
  area_size: string | null;
  techniques: string[] | null;
  previous_training: boolean;
};

export type ExtensionApplication = ApplicationBase & {
  farming_types: string[] | null;
  interest_areas: string[] | null;
  farm_size: string | null;
};
