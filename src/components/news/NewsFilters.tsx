
import { useState } from "react";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface NewsFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  contentType: string;
  onContentTypeChange: (type: string) => void;
}

const NewsFilters = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  contentType,
  onContentTypeChange
}: NewsFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold mb-3 block text-gray-700">Content Type</label>
        <Select value={contentType} onValueChange={onContentTypeChange}>
          <SelectTrigger className="border-gray-300 focus:border-agro-blue">
            <SelectValue placeholder="All Content" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Content</SelectItem>
            <SelectItem value="news">News Articles</SelectItem>
            <SelectItem value="magazine">Magazines</SelectItem>
            <SelectItem value="blog">Research Journals</SelectItem>
            <SelectItem value="resource">Resources</SelectItem>
            <SelectItem value="event">Events</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-semibold mb-3 block text-gray-700">Sort By</label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="border-gray-300 focus:border-agro-blue">
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date_desc">Newest First</SelectItem>
            <SelectItem value="date_asc">Oldest First</SelectItem>
            <SelectItem value="title_asc">Title A-Z</SelectItem>
            <SelectItem value="title_desc">Title Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        <Input
          type="text"
          placeholder="Search articles, events, magazines..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-12 h-12 text-base border-gray-300 focus:border-agro-blue"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal size={18} className="text-agro-blue" />
          <span className="font-semibold text-gray-700">Filter & Sort</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <div className="md:hidden">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full h-12 border-agro-blue text-agro-blue hover:bg-agro-blue hover:text-white">
              <Filter size={18} className="mr-2" />
              Filters & Sort Options
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[80vh]">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-xl text-agro-blue">Filter & Sort Content</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FilterContent />
            </div>
            <Button 
              onClick={() => setIsFilterOpen(false)} 
              className="w-full mt-6 h-12 bg-agro-blue hover:bg-agro-green"
            >
              Apply Filters
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NewsFilters;
