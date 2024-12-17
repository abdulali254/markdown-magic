import { ApiResponse } from '../types';
import { generateServerDocument } from './server/ai';

export async function generateDocument(
  prompt: string
): Promise<ApiResponse<string>> {
  try {
    return await generateServerDocument(prompt);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'Failed to generate document',
    };
  }
}
