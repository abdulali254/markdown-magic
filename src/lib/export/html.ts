import { Document } from '../../types';
import { ExportOptions } from './types';
import { formatMetadata } from './utils';

export async function exportToHtml(
  document: Document,
  options: ExportOptions
): Promise<Blob> {
  const { includeMetadata, styleOptions } = options;
  
  let content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${document.title}</title>
  <style>
    body {
      font-family: ${styleOptions?.fontFamily || 'system-ui, sans-serif'};
      font-size: ${styleOptions?.fontSize || '16px'};
      line-height: 1.5;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: ${styleOptions?.theme === 'dark' ? '#fff' : '#000'};
      background: ${styleOptions?.theme === 'dark' ? '#1a1a1a' : '#fff'};
    }
    .metadata {
      margin-bottom: 2rem;
      padding: 1rem;
      background: ${styleOptions?.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
      border-radius: 0.5rem;
    }
  </style>
</head>
<body>`;

  if (includeMetadata) {
    content += `\n<div class="metadata">${formatMetadata(document)}</div>`;
  }

  content += `\n<div class="content">${document.content}</div>
</body>
</html>`;

  return new Blob([content], { type: 'text/html' });
}