import { Document } from '../../types';
import { ExportFormat, ExportOptions } from './types';
import { exportToPdf } from './pdf';
import { exportToHtml } from './html';
import { exportToMarkdown } from './markdown';

export async function exportDocument(
  document: Document,
  options: ExportOptions
): Promise<Blob> {
  switch (options.format) {
    case 'pdf':
      return exportToPdf(document, options);
    case 'html':
      return exportToHtml(document, options);
    case 'markdown':
      return exportToMarkdown(document, options);
    default:
      throw new Error(`Unsupported export format: ${options.format}`);
  }
}