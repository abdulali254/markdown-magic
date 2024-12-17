import React, { useState, useCallback } from 'react';
import { Save } from 'lucide-react';
import { Document } from '../../types';
import { updateDocument } from '../../lib/documents';
import { useStore } from '../../store/useStore';

interface DocumentEditorProps {
  document: Document;
}

export function DocumentEditor({ document }: DocumentEditorProps) {
  const [content, setContent] = useState(document.content);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const updateDocumentInStore = useStore((state) => state.updateDocument);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setError(null);

    const response = await updateDocument(document.id, content);
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      updateDocumentInStore(response.data);
    }

    setIsSaving(false);
  }, [content, document.id, updateDocumentInStore]);

  return (
    <div className="w-full max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Edit Document</h3>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save'}</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[500px] p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="Enter your markdown content..."
      />
    </div>
  );
}