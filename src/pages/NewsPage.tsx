
import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import NewsHero from "@/components/news/NewsHero";
import NewsFilters from "@/components/news/NewsFilters";
import ContentGrid from "@/components/news/ContentGrid";
import { usePublishedContent } from "@/hooks/usePublishedContent";

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");
  const [contentType, setContentType] = useState("all");
  const [itemsToShow, setItemsToShow] = useState(12);

  // Fetch all content types
  const { content: allContent, loading } = usePublishedContent();

  // Filter and sort content
  const filteredAndSortedContent = useMemo(() => {
    let filtered = allContent;

    // Filter by content type
    if (contentType !== "all") {
      filtered = filtered.filter(item => item.content_type === contentType);
    }

    // Filter by search term
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(lowercaseSearch) ||
        (item.summary && item.summary.toLowerCase().includes(lowercaseSearch)) ||
        (item.author && item.author.toLowerCase().includes(lowercaseSearch))
      );
    }

    // Sort content
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date_asc":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "date_desc":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [allContent, searchTerm, sortBy, contentType]);

  const displayedContent = filteredAndSortedContent.slice(0, itemsToShow);
  const hasMoreContent = filteredAndSortedContent.length > itemsToShow;

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 12);
  };

  return (
    <Layout>
      <NewsHero />
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <NewsFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          contentType={contentType}
          onContentTypeChange={setContentType}
        />

        {/* Results Summary */}
        {!loading && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-gray-600">
                {searchTerm ? (
                  <>
                    Showing {displayedContent.length} of {filteredAndSortedContent.length} results for "{searchTerm}"
                  </>
                ) : (
                  <>
                    Showing {displayedContent.length} of {filteredAndSortedContent.length} items
                  </>
                )}
              </p>
              {searchTerm && filteredAndSortedContent.length === 0 && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-agro-green hover:text-agro-blue text-sm underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content Grid */}
        <ContentGrid
          items={displayedContent}
          loading={loading}
          showLoadMore={hasMoreContent}
          onLoadMore={handleLoadMore}
        />
      </div>
    </Layout>
  );
};

export default NewsPage;
