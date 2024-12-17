import { Document } from '../../types';
import { ExportOptions } from './types';
import { formatMetadata } from './utils';

export async function exportToPdf(
  document: Document,
  options: ExportOptions
): Promise<Blob> {
  // For PDF generation, we'll first create an HTML version
  const { includeMetadata, styleOptions } = options;
  
  let content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: ${styleOptions?.fontFamily || 'system-ui, sans-serif'};
          font-size: ${styleOptions?.fontSize || '12pt'};
          line-height: 1.5;
          color: ${styleOptions?.theme === 'dark' ? '#fff' : '#000'};
          background: ${styleOptions?.theme === 'dark' ? '#1a1a1a' : '#fff'};
        }
        .metadata {
          margin-bottom: 2rem;
          padding: 1rem;
          background: ${styleOptions?.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
        }
      </style>
    </head>
    <body>
      <h1>${document.title}</h1>
  `;

  if (includeMetadata) {
    content += `<div class="metadata">${formatMetadata(document)}</div>`;
  }

  content += `
      <div class="content">${document.content}</div>
    </body>
    </html>
  `;

  // Convert HTML to PDF using browser's print API
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Failed to open print window');
  }

  printWindow.document.write(content);
  printWindow.document.close();

  return new Promise((resolve, reject) => {
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
      resolve(new Blob([], { type: 'application/pdf' }));
    };
  });
}