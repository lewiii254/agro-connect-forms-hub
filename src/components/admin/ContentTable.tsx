
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash, Plus, Eye } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import type { Content, ContentType } from "@/types/content";
import ContentForm from "./ContentForm";

interface ContentTableProps {
  content: Content[];
  loading: boolean;
  onCreateContent: (data: any) => Promise<boolean>;
  onUpdateContent: (data: any) => Promise<boolean>;
  onDeleteContent: (id: string) => Promise<boolean>;
  onFilterChange: (contentType?: ContentType) => void;
}

const ContentTable = ({ 
  content, 
  loading, 
  onCreateContent, 
  onUpdateContent, 
  onDeleteContent,
  onFilterChange 
}: ContentTableProps) => {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState<ContentType | 'all'>('all');

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      published: 'default',
      archived: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  const getContentTypeBadge = (type: string) => {
    const colors = {
      news: 'bg-blue-100 text-blue-800',
      blog: 'bg-green-100 text-green-800',
      update: 'bg-yellow-100 text-yellow-800',
      magazine: 'bg-purple-100 text-purple-800',
      resource: 'bg-orange-100 text-orange-800',
      event: 'bg-red-100 text-red-800'
    } as const;

    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {type}
      </span>
    );
  };

  const handleFilterChange = (value: string) => {
    setFilter(value as ContentType | 'all');
    onFilterChange(value === 'all' ? undefined : value as ContentType);
  };

  const handleEdit = (content: Content) => {
    setSelectedContent(content);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedContent(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    if (selectedContent) {
      return await onUpdateContent({ ...data, id: selectedContent.id });
    } else {
      return await onCreateContent(data);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedContent(null);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading content...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Content Management</h2>
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Content</SelectItem>
              <SelectItem value="news">News Articles</SelectItem>
              <SelectItem value="blog">Blog Posts</SelectItem>
              <SelectItem value="update">Updates</SelectItem>
              <SelectItem value="magazine">Magazines</SelectItem>
              <SelectItem value="resource">Resources</SelectItem>
              <SelectItem value="event">Events</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedContent ? 'Edit Content' : 'Create New Content'}</DialogTitle>
            </DialogHeader>
            <ContentForm
              content={selectedContent || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No content found. Create your first piece of content to get started.
                </TableCell>
              </TableRow>
            ) : (
              content.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{getContentTypeBadge(item.content_type)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.author || 'N/A'}</TableCell>
                  <TableCell>
                    {item.featured ? (
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800">Featured</Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(item.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Content</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{item.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteContent(item.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContentTable;
