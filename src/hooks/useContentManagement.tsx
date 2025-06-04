
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import type { Content, CreateContentRequest, UpdateContentRequest, ContentType } from "@/types/content";

export const useContentManagement = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async (contentType?: ContentType) => {
    try {
      setLoading(true);
      let query = supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });

      if (contentType) {
        query = query.eq('content_type', contentType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching content:', error);
        toast.error('Failed to fetch content');
        return;
      }

      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (contentData: CreateContentRequest): Promise<boolean> => {
    try {
      // Generate slug from title
      const { data: slugData } = await supabase.rpc('generate_slug', { title: contentData.title });
      const slug = slugData || contentData.title.toLowerCase().replace(/[^a-z0-9]/g, '-');

      const { data, error } = await supabase
        .from('content')
        .insert([{
          ...contentData,
          slug,
          status: contentData.status || 'draft'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating content:', error);
        toast.error('Failed to create content');
        return false;
      }

      toast.success('Content created successfully');
      fetchContent();
      return true;
    } catch (error) {
      console.error('Error creating content:', error);
      toast.error('Failed to create content');
      return false;
    }
  };

  const updateContent = async (contentData: UpdateContentRequest): Promise<boolean> => {
    try {
      const { id, ...updateData } = contentData;
      
      // Generate new slug if title changed
      let slug = undefined;
      if (updateData.title) {
        const { data: slugData } = await supabase.rpc('generate_slug', { title: updateData.title });
        slug = slugData || updateData.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      }

      const { error } = await supabase
        .from('content')
        .update({
          ...updateData,
          ...(slug && { slug })
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating content:', error);
        toast.error('Failed to update content');
        return false;
      }

      toast.success('Content updated successfully');
      fetchContent();
      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
      return false;
    }
  };

  const deleteContent = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting content:', error);
        toast.error('Failed to delete content');
        return false;
      }

      toast.success('Content deleted successfully');
      fetchContent();
      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
      return false;
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    fetchContent,
    createContent,
    updateContent,
    deleteContent
  };
};
