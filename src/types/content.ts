
export type ContentType = 'news' | 'blog' | 'update' | 'magazine' | 'resource' | 'event';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Content {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  content?: string;
  content_type: ContentType;
  status: ContentStatus;
  author?: string;
  image_url?: string;
  download_url?: string;
  event_date?: string;
  event_location?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface CreateContentRequest {
  title: string;
  summary?: string;
  content?: string;
  content_type: ContentType;
  status?: ContentStatus;
  author?: string;
  image_url?: string;
  download_url?: string;
  event_date?: string;
  event_location?: string;
  featured?: boolean;
}

export interface UpdateContentRequest extends Partial<CreateContentRequest> {
  id: string;
}
