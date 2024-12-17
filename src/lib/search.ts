import { Document, SearchFilters } from '../types';

export function searchDocuments(documents: Document[], filters: SearchFilters): Document[] {
  return documents.filter(doc => {
    // Search in title and content
    const searchContent = `${doc.title} ${doc.content}`.toLowerCase();
    const matchesQuery = !filters.query || 
      searchContent.includes(filters.query.toLowerCase());

    // Filter by categories
    const matchesCategories = !filters.categories?.length ||
      filters.categories.some(cat => doc.categories.includes(cat));

    // Filter by tags
    const matchesTags = !filters.tags?.length ||
      filters.tags.some(tag => doc.tags.includes(tag));

    // Filter by date range
    const matchesDateRange = !filters.dateRange ||
      (doc.createdAt >= filters.dateRange.start && 
       doc.createdAt <= filters.dateRange.end);

    return matchesQuery && matchesCategories && matchesTags && matchesDateRange;
  });
}