import { useState, useEffect, useCallback } from 'react';
import { db } from '../utils/firebase';
import { ref, onValue, DataSnapshot } from 'firebase/database';
import { InventoryData } from '../utils/definition';

interface UseInventoryResult {
  inventory: InventoryData[];
  loading: boolean;
  error: Error | null;
}

export const useInventory = (): UseInventoryResult => {
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInventory = useCallback(() => {
    const inventoryRef = ref(db, 'inventory');

    const unsubscribe = onValue(
      inventoryRef,
      (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const inventoryList = Object.values(snapshot.val()) as InventoryData[];
          setInventory(inventoryList);
        } else {
          setInventory([]); 
          console.warn('No inventory found');
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching inventory:', err);
        setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = fetchInventory();

    return () => unsubscribe();
  }, [fetchInventory]);

  return { inventory, loading, error };
};
