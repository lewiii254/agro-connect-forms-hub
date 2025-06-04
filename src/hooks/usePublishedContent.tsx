
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Content, ContentType } from "@/types/content";

export const usePublishedContent = (contentType?: ContentType, featured?: boolean) => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        console.log('Fetching published content, type:', contentType, 'featured:', featured);
        
        let query = supabase
          .from('content')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (contentType) {
          query = query.eq('content_type', contentType);
        }

        if (featured !== undefined) {
          query = query.eq('featured', featured);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching published content:', error);
          setContent([]);
          return;
        }

        console.log('Fetched published content:', data);
        setContent(data || []);
      } catch (error) {
        console.error('Error fetching published content:', error);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentType, featured]);

  return { content, loading };
};
