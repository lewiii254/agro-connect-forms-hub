import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash, Plus } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import type { Content, ContentType } from "@/types/content";
import ContentForm from "./ContentForm";
import ContentFilters from "./ContentFilters";

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
  const [filteredContent, setFilteredContent] = useState<Content[]>(content);

  // Update filtered content when main content changes
  useEffect(() => {
    setFilteredContent(content);
  }, [content]);

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
      news: 'bg-blue-100 text-blue-800 border-blue-200',
      blog: 'bg-green-100 text-green-800 border-green-200',
      update: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      magazine: 'bg-purple-100 text-purple-800 border-purple-200',
      resource: 'bg-orange-100 text-orange-800 border-orange-200',
      event: 'bg-red-100 text-red-800 border-red-200'
    } as const;

    return (
      <Badge 
        variant="outline" 
        className={`${colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'}`}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...content];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.summary?.toLowerCase().includes(searchTerm) ||
        item.author?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.contentType) {
      filtered = filtered.filter(item => item.content_type === filters.contentType);
    }

    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    if (filters.featured !== undefined) {
      filtered = filtered.filter(item => item.featured === filters.featured);
    }

    if (filters.author) {
      const authorTerm = filters.author.toLowerCase();
      filtered = filtered.filter(item => 
        item.author?.toLowerCase().includes(authorTerm)
      );
    }

    setFilteredContent(filtered);
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

  // Update filtered content when main content changes
  useEffect(() => {
    setFilteredContent(content);
  }, [content]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-500">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Content Management</CardTitle>
              <p className="text-gray-600 mt-1">
                Manage your website content, articles, and resources
              </p>
            </div>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Content
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
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
        </CardHeader>
      </Card>

      {/* Filters */}
      <ContentFilters onFilterChange={handleFilterChange} />

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{content.length}</div>
            <p className="text-sm text-gray-600">Total Content</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {content.filter(c => c.status === 'published').length}
            </div>
            <p className="text-sm text-gray-600">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {content.filter(c => c.status === 'draft').length}
            </div>
            <p className="text-sm text-gray-600">Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {content.filter(c => c.featured).length}
            </div>
            <p className="text-sm text-gray-600">Featured</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Author</TableHead>
                <TableHead className="font-semibold">Featured</TableHead>
                <TableHead className="font-semibold">Created</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="text-gray-500 space-y-2">
                      <p className="text-lg font-medium">No content found</p>
                      <p className="text-sm">Create your first piece of content to get started.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredContent.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{item.title}</div>
                        {item.summary && (
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {item.summary}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getContentTypeBadge(item.content_type)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <span className="text-gray-700">{item.author || 'N/A'}</span>
                    </TableCell>
                    <TableCell>
                      {item.featured ? (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Featured
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{formatDate(item.created_at)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="hover:bg-red-50 hover:border-red-300 text-red-600"
                            >
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
                              <AlertDialogAction 
                                onClick={() => onDeleteContent(item.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTable;
