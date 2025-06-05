
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ContentType, ContentStatus } from "@/types/content";

interface ContentFiltersProps {
  onFilterChange: (filters: {
    search?: string;
    contentType?: ContentType;
    status?: ContentStatus;
    featured?: boolean;
    author?: string;
  }) => void;
}

const ContentFilters = ({ onFilterChange }: ContentFiltersProps) => {
  const [filters, setFilters] = useState({
    search: '',
    contentType: 'all' as ContentType | 'all',
    status: 'all' as ContentStatus | 'all',
    featured: 'all' as 'true' | 'false' | 'all',
    author: ''
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update active filters list
    const active = Object.entries(newFilters)
      .filter(([_, val]) => val !== '' && val !== 'all')
      .map(([key, _]) => key);
    setActiveFilters(active);

    // Convert and send to parent
    const processedFilters: any = {};
    if (newFilters.search) processedFilters.search = newFilters.search;
    if (newFilters.contentType && newFilters.contentType !== 'all') processedFilters.contentType = newFilters.contentType as ContentType;
    if (newFilters.status && newFilters.status !== 'all') processedFilters.status = newFilters.status as ContentStatus;
    if (newFilters.featured && newFilters.featured !== 'all') processedFilters.featured = newFilters.featured === 'true';
    if (newFilters.author) processedFilters.author = newFilters.author;

    onFilterChange(processedFilters);
  };

  const clearFilter = (key: string) => {
    if (key === 'search' || key === 'author') {
      handleFilterChange(key, '');
    } else {
      handleFilterChange(key, 'all');
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      contentType: 'all' as ContentType | 'all',
      status: 'all' as ContentStatus | 'all',
      featured: 'all' as 'true' | 'false' | 'all',
      author: ''
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFilterChange({});
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filters</span>
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search content..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Content Type */}
          <Select value={filters.contentType} onValueChange={(value) => handleFilterChange('contentType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="magazine">Magazine</SelectItem>
              <SelectItem value="resource">Resource</SelectItem>
              <SelectItem value="event">Event</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          {/* Featured */}
          <Select value={filters.featured} onValueChange={(value) => handleFilterChange('featured', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Featured</SelectItem>
              <SelectItem value="false">Not Featured</SelectItem>
            </SelectContent>
          </Select>

          {/* Author */}
          <Input
            placeholder="Filter by author..."
            value={filters.author}
            onChange={(e) => handleFilterChange('author', e.target.value)}
          />
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {activeFilters.map((filterKey) => (
              <Badge key={filterKey} variant="secondary" className="gap-1">
                {filterKey}: {filters[filterKey as keyof typeof filters]}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={() => clearFilter(filterKey)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentFilters;
