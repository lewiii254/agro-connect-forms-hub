
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
  const [itemsToShow, setItemsToShow] = useState(9);

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
    setItemsToShow(prev => prev + 9);
  };

  return (
    <Layout>
      <NewsHero />
      
      {/* Main Content Container */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-agro-blue mb-4">
              Latest News & Publications
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover the latest insights, research, and updates from the agricultural world
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            <NewsFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              contentType={contentType}
              onContentTypeChange={setContentType}
            />
          </div>

          {/* Results Summary */}
          {!loading && (
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-agro-green rounded-full"></div>
                  <p className="text-gray-700 font-medium">
                    {searchTerm ? (
                      <>
                        Found {filteredAndSortedContent.length} results for "{searchTerm}"
                      </>
                    ) : (
                      <>
                        Showing {displayedContent.length} of {filteredAndSortedContent.length} publications
                      </>
                    )}
                  </p>
                </div>
                {searchTerm && filteredAndSortedContent.length === 0 && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-agro-orange hover:text-agro-blue text-sm font-medium px-4 py-2 rounded-lg border border-agro-orange hover:border-agro-blue transition-colors"
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
      </div>
    </Layout>
  );
};

export default NewsPage;
