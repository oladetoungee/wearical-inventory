import { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { ref, onValue, DataSnapshot } from 'firebase/database';

interface Category {
  id: string;
  name: string;
  itemCount: number;
  lastUpdated: string;
}

interface UseCategoryResult {
  categories: Category[];
  loading: boolean;
  error: Error | null;
}

export const useCategory = (): UseCategoryResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const categoriesRef = ref(db, 'categories'); 

    const unsubscribe = onValue(
      categoriesRef,
      (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const categoriesList: Category[] = Object.keys(snapshot.val()).map(key => ({
            id: key,
            name: snapshot.val()[key].name,
            itemCount: snapshot.val()[key].itemCount,
            lastUpdated: snapshot.val()[key].lastUpdated,
          }));
          setCategories(categoriesList);
        } else {
          setCategories([]);
          console.warn('No categories found');
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { categories, loading, error };
};
