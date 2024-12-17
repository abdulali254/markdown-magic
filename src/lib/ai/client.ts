import OpenAI from 'openai';
import { AIConfig, Message, AIResponse } from './types';
import { defaultConfig } from './config';

export class AIClient {
  private client: OpenAI;
  private config: AIConfig;

  constructor(apiKey: string, config: Partial<AIConfig> = {}) {
    if (!apiKey) {
      throw new Error('API key is required');
    }

    this.config = { ...defaultConfig, ...config, apiKey };
    this.client = new OpenAI({
      baseURL: this.config.baseURL,
      apiKey: this.config.apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  async generateContent(messages: Message[]): Promise<AIResponse> {
    try {
      const response = await this.client.chat.completions.create({
        messages,
        model: this.config.model,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
        top_p: this.config.topP,
      });

      return {
        content: response.choices[0].message.content || '',
      };
    } catch (error) {
      console.error('AI generation error:', error);
      return {
        content: '',
        error:
          error instanceof Error ? error.message : 'Failed to generate content',
      };
    }
  }
}
