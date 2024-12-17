export interface Document {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  shareUrl?: string;
  categories: string[];
  tags: string[];
  title: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ShareSettings {
  isPublic: boolean;
  expiresAt?: Date;
  allowEdit?: boolean;
}

export interface SearchFilters {
  query: string;
  categories?: string[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}