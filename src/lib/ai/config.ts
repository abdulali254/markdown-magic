import { AIConfig } from './types';

// Default configuration without sensitive data
export const defaultConfig: AIConfig = {
  baseURL: 'https://models.inference.ai.azure.com',
  model: 'gpt-4o',
  temperature: 1,
  maxTokens: 4096,
  topP: 1,
  apiKey: import.meta.env.VITE_GITHUB_TOKEN,
};
