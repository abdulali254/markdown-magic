export type ExportFormat = 'pdf' | 'html' | 'markdown';

export interface ExportOptions {
  format: ExportFormat;
  includeMetadata?: boolean;
  styleOptions?: {
    fontSize?: string;
    fontFamily?: string;
    theme?: 'light' | 'dark';
  };
}