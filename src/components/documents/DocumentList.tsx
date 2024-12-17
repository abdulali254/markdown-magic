import React, { useState, useMemo } from 'react';
import { FileText, Clock, Tag } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Document, SearchFilters } from '../../types';
import { DocumentFilters } from './DocumentFilters';
import { searchDocuments } from '../../lib/search';

export function DocumentList() {
  const { documents, setCurrentDocument } = useStore();
  const [filters, setFilters] = useState<SearchFilters>({ query: '' });

  // Get unique categories and tags from all documents
  const { categories, tags } = useMemo(() => {
    const cats = new Set<string>();
    const tgs = new Set<string>();
    documents.forEach(doc => {
      doc.categories.forEach(c => cats.add(c));
      doc.tags.forEach(t => tgs.add(t));
    });
    return {
      categories: Array.from(cats),
      tags: Array.from(tgs),
    };
  }, [documents]);

  // Filter documents based on search criteria
  const filteredDocuments = useMemo(() => 
    searchDocuments(documents, filters),
    [documents, filters]
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-3xl">
      <h3 className="text-lg font-semibold mb-4">Your Documents</h3>
      
      <DocumentFilters
        onFilterChange={setFilters}
        availableCategories={categories}
        availableTags={tags}
      />

      <div className="space-y-2">
        {filteredDocuments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No documents found. Try adjusting your filters or create a new document.
          </p>
        ) : (
          filteredDocuments.map((doc: Document) => (
            <button
              key={doc.id}
              onClick={() => setCurrentDocument(doc)}
              className="w-full p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-left"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">{doc.title}</h4>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    {doc.categories.map(category => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                      >
                        {category}
                      </span>
                    ))}
                    {doc.tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center space-x-1 px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(doc.updatedAt)}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}