import { useState } from 'react';
import { ApiResponse } from '../types';

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const request = async <T,>(url: string, options?: RequestInit): Promise<ApiResponse<T>> => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options?.headers },
      });
      if (!response.ok) throw new Error(`http error status: ${response.status}`);
      const data = await response.json();
      setLoading(false);
      return { data };
    } catch (error) {
      setLoading(false);
      return { error: (error as Error).message };
    }
  };

  return { request, loading };
};
