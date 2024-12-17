import { User, ApiResponse } from '../types';

export async function login(email: string, password: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return { data: data.user };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Login failed' };
  }
}

export async function register(email: string, password: string, name: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return { data: data.user };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Registration failed' };
  }
}