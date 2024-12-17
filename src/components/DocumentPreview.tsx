import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Document } from '../types';
import { DocumentActions } from './documents/DocumentActions';

interface DocumentPreviewProps {
  document: Document | null;
  isLoading?: boolean;
}

export function DocumentPreview({ document, isLoading }: DocumentPreviewProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500 text-center">
          Your generated document will appear here
        </p>
      </div>
    );
  }

  return (
    <>
      <DocumentActions document={document} />
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="prose prose-blue max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{document.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}