import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Wish, SortByDate, SortByPrice } from '../types';
import { useApi } from '../hooks/useApi';
import { Snackbar } from '../components/common/Snackbar/Snackbar';

interface WishContextType {
  wishes: Wish[];
  filteredWishes: Wish[];
  loading: boolean;
  fetchWishes: () => Promise<void>;
  addWish: (wish: Omit<Wish, 'id' | 'createdAt'>) => Promise<boolean>;
  updateWish: (id: string, wish: Partial<Wish>) => Promise<boolean>;
  deleteWish: (id: string) => Promise<boolean>;
  sortByDate: SortByDate;
  sortByPrice: SortByPrice;
  setSortByDate: (sort: SortByDate) => void;
  setSortByPrice: (sort: SortByPrice) => void;
  showSnackbar: (message: string, type: 'success' | 'error') => void;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const useWishContext = () => {
  const context = useContext(WishContext);
  if (!context) throw new Error('err');
  return context;
};

export const WishProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [filteredWishes, setFilteredWishes] = useState<Wish[]>([]);
  const [sortByDate, setSortByDate] = useState<SortByDate>('newest');
  const [sortByPrice, setSortByPrice] = useState<SortByPrice>('high-to-low');
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { request, loading } = useApi();

  const API_URL = 'https://jsonplaceholder.typicode.com/posts';

  const showSnackbar = (message: string, type: 'success' | 'error') => setSnackbar({ message, type });

  const fetchWishes = async () => {
    try {
      const stored = localStorage.getItem('wishes');
      if (stored) setWishes(JSON.parse(stored));
    } catch (error) {
      console.error('Error fetching wishes:', error);
    }
  };

  const saveWishes = (newWishes: Wish[]) => {
    try {
      localStorage.setItem('wishes', JSON.stringify(newWishes));
      setWishes(newWishes);
    } catch (error) {
      console.error('Error saving wishes:', error);
    }
  };

  const addWish = async (wish: Omit<Wish, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      await request<any>(API_URL, { method: 'POST', body: JSON.stringify(wish) });
      const newWish: Wish = { ...wish, id: Date.now().toString(), createdAt: new Date().toISOString() };
      saveWishes([...wishes, newWish]);
      showSnackbar('Wish added successfully!', 'success');
      return true;
    } catch (error) {
      showSnackbar('Failed to add wish', 'error');
      return false;
    }
  };

  const updateWish = async (id: string, updatedWish: Partial<Wish>): Promise<boolean> => {
    try {
      await request<any>(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(updatedWish) });
      const updated = wishes.map(w => w.id === id ? { ...w, ...updatedWish } : w);
      saveWishes(updated);
      showSnackbar('Wish updated successfully!', 'success');
      return true;
    } catch (error) {
      showSnackbar('Failed to update wish', 'error');
      return false;
    }
  };

  const deleteWish = async (id: string): Promise<boolean> => {
    try {
      await request<any>(`${API_URL}/${id}`, { method: 'DELETE' });
      saveWishes(wishes.filter(w => w.id !== id));
      showSnackbar('Wish deleted successfully!', 'success');
      return true;
    } catch (error) {
      showSnackbar('Failed to delete wish', 'error');
      return false;
    }
  };

  useEffect(() => { fetchWishes(); }, []);

  useEffect(() => {
    let sorted = [...wishes];
    sorted.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortByDate === 'newest' ? dateB - dateA : dateA - dateB;
    });
    sorted.sort((a, b) => sortByPrice === 'high-to-low' ? b.price - a.price : a.price - b.price);
    setFilteredWishes(sorted);
  }, [wishes, sortByDate, sortByPrice]);

  return (
    <WishContext.Provider value={{ wishes, filteredWishes, loading, fetchWishes, addWish, updateWish, deleteWish, sortByDate, sortByPrice, setSortByDate, setSortByPrice, showSnackbar }}>
      {children}
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
    </WishContext.Provider>
  );
};
