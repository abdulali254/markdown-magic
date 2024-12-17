import { Document } from '../../types';
import { ExportOptions } from './types';
import { formatMetadata } from './utils';

export async function exportToMarkdown(
  document: Document,
  options: ExportOptions
): Promise<Blob> {
  const { includeMetadata } = options;
  
  let content = `# ${document.title}\n\n`;

  if (includeMetadata) {
    content += `${formatMetadata(document, 'markdown')}\n\n---\n\n`;
  }

  content += document.content;

  return new Blob([content], { type: 'text/markdown' });
}