

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Content, CreateContentRequest, UpdateContentRequest, ContentType } from "@/types/content";

export const useContentManagement = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async (contentType?: ContentType) => {
    try {
      setLoading(true);
      console.log('Fetching content with type:', contentType);
      
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
        toast.error('Failed to fetch content: ' + error.message);
        return;
      }

      console.log('Fetched content:', data);
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const sanitizeContentData = (contentData: CreateContentRequest | UpdateContentRequest) => {
    return {
      ...contentData,
      // Convert empty strings to null for date fields
      event_date: contentData.event_date === '' ? null : contentData.event_date,
      // Convert empty strings to null for optional text fields
      summary: contentData.summary === '' ? null : contentData.summary,
      content: contentData.content === '' ? null : contentData.content,
      author: contentData.author === '' ? null : contentData.author,
      image_url: contentData.image_url === '' ? null : contentData.image_url,
      download_url: contentData.download_url === '' ? null : contentData.download_url,
      event_location: contentData.event_location === '' ? null : contentData.event_location,
    };
  };

  const createContent = async (contentData: CreateContentRequest): Promise<boolean> => {
    try {
      console.log('Creating content with data:', contentData);
      
      // Generate slug from title
      const slug = contentData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      const sanitizedData = sanitizeContentData(contentData);
      const insertData = {
        ...sanitizedData,
        slug,
        status: sanitizedData.status || 'draft',
        featured: sanitizedData.featured || false
      };

      console.log('Insert data:', insertData);

      const { data, error } = await supabase
        .from('content')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Error creating content:', error);
        toast.error('Failed to create content: ' + error.message);
        return false;
      }

      console.log('Created content:', data);
      toast.success('Content created successfully');
      await fetchContent();
      return true;
    } catch (error) {
      console.error('Error creating content:', error);
      toast.error('Failed to create content');
      return false;
    }
  };

  const updateContent = async (contentData: UpdateContentRequest): Promise<boolean> => {
    try {
      console.log('Updating content with data:', contentData);
      
      const { id, ...updateData } = contentData;
      
      // Generate new slug if title changed
      if (updateData.title) {
        updateData.slug = updateData.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      }

      const sanitizedData = sanitizeContentData(updateData);

      const { error } = await supabase
        .from('content')
        .update(sanitizedData)
        .eq('id', id);

      if (error) {
        console.error('Error updating content:', error);
        toast.error('Failed to update content: ' + error.message);
        return false;
      }

      toast.success('Content updated successfully');
      await fetchContent();
      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
      return false;
    }
  };

  const deleteContent = async (id: string): Promise<boolean> => {
    try {
      console.log('Deleting content with id:', id);
      
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting content:', error);
        toast.error('Failed to delete content: ' + error.message);
        return false;
      }

      toast.success('Content deleted successfully');
      await fetchContent();
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

