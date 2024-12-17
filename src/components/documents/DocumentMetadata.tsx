import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';
import { Document } from '../../types';
import { updateDocument } from '../../lib/documents';
import { useStore } from '../../store/useStore';

interface DocumentMetadataProps {
  document: Document;
}

export function DocumentMetadata({ document }: DocumentMetadataProps) {
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const updateDocumentInStore = useStore((state) => state.updateDocument);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    const updatedCategories = [...document.categories, newCategory.trim()];
    const response = await updateDocument(document.id, {
      ...document,
      categories: updatedCategories,
    });

    if (response.data) {
      updateDocumentInStore(response.data);
      setNewCategory('');
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    
    const updatedTags = [...document.tags, newTag.trim()];
    const response = await updateDocument(document.id, {
      ...document,
      tags: updatedTags,
    });

    if (response.data) {
      updateDocumentInStore(response.data);
      setNewTag('');
    }
  };

  const handleRemoveCategory = async (category: string) => {
    const updatedCategories = document.categories.filter(c => c !== category);
    const response = await updateDocument(document.id, {
      ...document,
      categories: updatedCategories,
    });

    if (response.data) {
      updateDocumentInStore(response.data);
    }
  };

  const handleRemoveTag = async (tag: string) => {
    const updatedTags = document.tags.filter(t => t !== tag);
    const response = await updateDocument(document.id, {
      ...document,
      tags: updatedTags,
    });

    if (response.data) {
      updateDocumentInStore(response.data);
    }
  };

  return (
    <div className="space-y-4 mb-4">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {document.categories.map(category => (
            <span
              key={category}
              className="group flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-600 rounded"
            >
              <span>{category}</span>
              <button
                onClick={() => handleRemoveCategory(category)}
                className="opacity-0 group-hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <div className="flex items-center space-x-1">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add category"
              className="px-2 py-1 text-sm border border-gray-200 rounded"
            />
            <button
              onClick={handleAddCategory}
              className="p-1 text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {document.tags.map(tag => (
            <span
              key={tag}
              className="group flex items-center space-x-1 px-2 py-1 bg-blue-50 text-blue-600 rounded"
            >
              <Tag className="w-3 h-3" />
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="opacity-0 group-hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <div className="flex items-center space-x-1">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              className="px-2 py-1 text-sm border border-gray-200 rounded"
            />
            <button
              onClick={handleAddTag}
              className="p-1 text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}