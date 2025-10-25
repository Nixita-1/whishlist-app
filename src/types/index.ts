export interface Wish {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export type SortByDate = 'newest' | 'oldest';
export type SortByPrice = 'high-to-low' | 'low-to-high';
