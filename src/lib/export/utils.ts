import { Document } from '../../types';

export function formatMetadata(document: Document, format: 'html' | 'markdown' = 'html'): string {
  const metadata = {
    'Created': new Date(document.createdAt).toLocaleString(),
    'Last Modified': new Date(document.updatedAt).toLocaleString(),
    'Categories': document.categories.join(', ') || 'None',
    'Tags': document.tags.join(', ') || 'None'
  };

  if (format === 'markdown') {
    return Object.entries(metadata)
      .map(([key, value]) => `**${key}:** ${value}`)
      .join('\n');
  }

  return `
    <dl>
      ${Object.entries(metadata)
        .map(([key, value]) => `
          <dt style="font-weight: bold">${key}:</dt>
          <dd>${value}</dd>
        `)
        .join('')}
    </dl>
  `;
}