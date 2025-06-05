
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";
import ContentPreview from "./ContentPreview";
import type { Content, CreateContentRequest, ContentType, ContentStatus } from "@/types/content";

interface ContentFormProps {
  content?: Content;
  onSubmit: (data: CreateContentRequest) => Promise<boolean>;
  onCancel: () => void;
}

const ContentForm = ({ content, onSubmit, onCancel }: ContentFormProps) => {
  const [formData, setFormData] = useState<CreateContentRequest>({
    title: content?.title || '',
    summary: content?.summary || '',
    content: content?.content || '',
    content_type: content?.content_type || 'news',
    status: content?.status || 'draft',
    author: content?.author || '',
    image_url: content?.image_url || '',
    download_url: content?.download_url || '',
    event_date: content?.event_date || '',
    event_location: content?.event_location || '',
    featured: content?.featured || false
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await onSubmit(formData);
      if (success) {
        console.log('Content submitted successfully');
        onCancel();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const contentTypeOptions: { value: ContentType; label: string }[] = [
    { value: 'news', label: 'News Article' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'update', label: 'Update' },
    { value: 'magazine', label: 'Magazine' },
    { value: 'resource', label: 'Agricultural Resource' },
    { value: 'event', label: 'Event' }
  ];

  const statusOptions: { value: ContentStatus; label: string }[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header with Preview */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {content ? 'Edit Content' : 'Create New Content'}
        </h2>
        <ContentPreview content={formData} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content_type">Content Type *</Label>
                <Select 
                  value={formData.content_type} 
                  onValueChange={(value: ContentType) => setFormData({ ...formData, content_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: ContentStatus) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief summary of the content"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured Content</Label>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              value={formData.content || ''}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Write your content here..."
            />
          </CardContent>
        </Card>

        {/* Media */}
        <Card>
          <CardHeader>
            <CardTitle>Media & Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUpload
              value={formData.image_url || ''}
              onChange={(url) => setFormData({ ...formData, image_url: url })}
              label="Featured Image"
            />

            <div className="space-y-2">
              <Label htmlFor="download_url">Download URL</Label>
              <Input
                id="download_url"
                type="url"
                value={formData.download_url}
                onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                placeholder="https://example.com/file.pdf"
              />
            </div>
          </CardContent>
        </Card>

        {/* Event Details (conditional) */}
        {formData.content_type === 'event' && (
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event_date">Event Date</Label>
                  <Input
                    id="event_date"
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event_location">Event Location</Label>
                  <Input
                    id="event_location"
                    value={formData.event_location}
                    onChange={(e) => setFormData({ ...formData, event_location: e.target.value })}
                    placeholder="Event location"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (content ? 'Update' : 'Create')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;
