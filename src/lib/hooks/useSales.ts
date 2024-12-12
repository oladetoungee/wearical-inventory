import { useState, useEffect, useCallback } from 'react';
import { db } from '../utils/firebase';
import { ref, onValue, DataSnapshot } from 'firebase/database';
import { SalesData } from '../utils/definition';

interface UseSalesResult {
  sales: SalesData[];
  loading: boolean;
  error: Error | null;
}

export const useSales = (): UseSalesResult => {
  const [sales, setSales] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSales = useCallback(() => {
    const salesRef = ref(db, 'sales');

    const unsubscribe = onValue(
      salesRef,
      (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const salesList = Object.values(snapshot.val()) as SalesData[];
          setSales(salesList);
        } else {
          setSales([]); 
          console.warn('No sales found');
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching sales:', err);
        setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = fetchSales();

    return () => unsubscribe();
  }, [fetchSales]);

  return { sales, loading, error };
};
