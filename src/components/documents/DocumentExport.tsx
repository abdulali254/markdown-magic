import React, { useState } from 'react';
import { Download, Settings } from 'lucide-react';
import { Document } from '../../types';
import { ExportFormat, ExportOptions } from '../../lib/export/types';
import { exportDocument } from '../../lib/export/exportDocument';

interface DocumentExportProps {
  document: Document;
}

export function DocumentExport({ document }: DocumentExportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<ExportFormat>('pdf');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);

    try {
      const options: ExportOptions = {
        format,
        includeMetadata,
        styleOptions: {
          fontSize: '12pt',
          fontFamily: 'system-ui, sans-serif',
          theme: 'light',
        },
      };

      const blob = await exportDocument(document, options);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${document.title}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
      >
        <Download className="w-4 h-4" />
        <span>Export</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Export Document</h3>
            <button onClick={() => setIsOpen(false)}>
              <Settings className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as ExportFormat)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="pdf">PDF</option>
                <option value="html">HTML</option>
                <option value="markdown">Markdown</option>
              </select>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Include metadata</span>
            </label>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 disabled:opacity-50"
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}