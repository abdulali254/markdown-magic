import React, { useState } from 'react';
import { Edit, Share2, Download } from 'lucide-react';
import { Document } from '../../types';
import { DocumentEditor } from './DocumentEditor';
import { ShareDialog } from './ShareDialog';
import { DocumentExport } from './DocumentExport';

interface DocumentActionsProps {
  document: Document;
}

export function DocumentActions({ document }: DocumentActionsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center justify-end space-x-2 mb-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-gray-900"
        >
          <Edit className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit'}</span>
        </button>
        <DocumentExport document={document} />
        <button
          onClick={() => setIsShareDialogOpen(true)}
          className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-gray-900"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {isEditing && <DocumentEditor document={document} />}

      <ShareDialog
        document={document}
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
      />
    </div>
  );
}