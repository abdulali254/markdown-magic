import { ApiResponse, Document, ShareSettings } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export async function updateDocument(id: string, content: string): Promise<ApiResponse<Document>> {
  try {
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) throw new Error('Failed to update document');
    return { data: await response.json() };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to update document' };
  }
}

export async function shareDocument(id: string, settings: ShareSettings): Promise<ApiResponse<{ shareUrl: string }>> {
  try {
    const response = await fetch(`${API_URL}/documents/${id}/share`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });

    if (!response.ok) throw new Error('Failed to share document');
    return { data: await response.json() };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to share document' };
  }
}