import React, { useState } from 'react';
import { Link, X, Copy, Check } from 'lucide-react';
import { Document, ShareSettings } from '../../types';
import { shareDocument } from '../../lib/documents';

interface ShareDialogProps {
  document: Document;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareDialog({ document, isOpen, onClose }: ShareDialogProps) {
  const [settings, setSettings] = useState<ShareSettings>({
    isPublic: true,
    allowEdit: false,
  });
  const [shareUrl, setShareUrl] = useState(document.shareUrl);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleShare = async () => {
    const response = await shareDocument(document.id, settings);
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setShareUrl(response.data.shareUrl);
      setError(null);
    }
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Link className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Share Document</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.isPublic}
                onChange={(e) => setSettings({ ...settings, isPublic: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span>Public access</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.allowEdit}
                onChange={(e) => setSettings({ ...settings, allowEdit: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span>Allow editing</span>
            </label>
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {shareUrl ? (
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent border-none focus:ring-0"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={handleShare}
              className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
            >
              Generate Share Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
}