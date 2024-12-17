import { AIClient } from '../ai/client';
import { createPromptMessages } from '../ai/prompts';
import { ApiResponse } from '../../types';

// Use Vite's environment variable syntax for client-side code
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Create a singleton instance for the AI client
let aiClient: AIClient | null = null;

function getAIClient(): AIClient {
  if (!aiClient) {
    if (!GITHUB_TOKEN) {
      throw new Error(
        'GitHub token is not configured. Please check your environment variables.'
      );
    }
    aiClient = new AIClient(GITHUB_TOKEN);
  }
  return aiClient;
}

export async function generateServerDocument(
  prompt: string
): Promise<ApiResponse<string>> {
  try {
    const client = getAIClient();
    const messages = createPromptMessages(prompt);
    const response = await client.generateContent(messages);

    if (response.error) {
      throw new Error(response.error);
    }

    return { data: response.content };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'Failed to generate document',
    };
  }
}
