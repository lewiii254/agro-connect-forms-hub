
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Calendar, MapPin, User, Download } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import type { CreateContentRequest } from "@/types/content";

interface ContentPreviewProps {
  content: CreateContentRequest;
}

const ContentPreview = ({ content }: ContentPreviewProps) => {
  const getContentTypeColor = (type: string) => {
    const colors = {
      news: 'bg-blue-500',
      blog: 'bg-green-500',
      update: 'bg-yellow-500',
      magazine: 'bg-purple-500',
      resource: 'bg-orange-500',
      event: 'bg-red-500'
    } as const;
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Content Preview</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            {content.image_url && (
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <img 
                  src={content.image_url} 
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`${getContentTypeColor(content.content_type)} text-white`}>
                {content.content_type.charAt(0).toUpperCase() + content.content_type.slice(1)}
              </Badge>
              {content.featured && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Featured
                </Badge>
              )}
              <Badge variant="outline">
                {content.status?.charAt(0).toUpperCase() + content.status?.slice(1)}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">
              {content.title || 'Untitled'}
            </h1>
            
            {content.summary && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {content.summary}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {content.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{content.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(new Date().toISOString())}</span>
              </div>
            </div>
          </div>

          {/* Event specific fields */}
          {content.content_type === 'event' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {content.event_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{formatDate(content.event_date)}</span>
                  </div>
                )}
                {content.event_location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{content.event_location}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Content */}
          {content.content && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
              </CardContent>
            </Card>
          )}

          {/* Download link */}
          {content.download_url && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Download Available</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={content.download_url} target="_blank" rel="noopener noreferrer">
                      Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentPreview;
