import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { SearchFilters } from '../../types';

interface DocumentFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
  availableCategories: string[];
  availableTags: string[];
}

export function DocumentFilters({ onFilterChange, availableCategories, availableTags }: DocumentFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    tags: [],
  });

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-full max-w-3xl mb-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <input
            type="text"
            placeholder="Search documents..."
            value={filters.query}
            onChange={(e) => handleFilterChange({ query: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map(category => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.categories?.includes(category)}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...(filters.categories || []), category]
                          : filters.categories?.filter(c => c !== category);
                        handleFilterChange({ categories: newCategories });
                      }}
                      className="rounded border-gray-300"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      const newTags = filters.tags?.includes(tag)
                        ? filters.tags.filter(t => t !== tag)
                        : [...(filters.tags || []), tag];
                      handleFilterChange({ tags: newTags });
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.tags?.includes(tag)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setFilters({ query: '' });
              onFilterChange({ query: '' });
            }}
            className="mt-4 flex items-center space-x-1 text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4" />
            <span>Clear filters</span>
          </button>
        </div>
      )}
    </div>
  );
}