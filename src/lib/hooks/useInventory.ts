import { useState, useEffect, useCallback } from "react";
import { db } from "../utils/firebase";
import { ref, onValue, DataSnapshot } from "firebase/database";
import { InventoryData } from "../utils/definition";

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
    const inventoryRef = ref(db, "inventory");
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(
      inventoryRef,
      async (inventorySnapshot: DataSnapshot) => {
        try {
          if (!inventorySnapshot.exists()) {
            setInventory([]);
            console.warn("No inventory found");
            return setLoading(false);
          }

          const inventoryList = Object.values(
            inventorySnapshot.val()
          ) as InventoryData[];

          const usersSnapshot = await new Promise<DataSnapshot>(
            (resolve, reject) => {
              onValue(usersRef, resolve, reject, { onlyOnce: true });
            }
          );

          const users = usersSnapshot.exists() ? usersSnapshot.val() : {};

          const enrichedInventory = inventoryList.map((item) => ({
            ...item,
            createdBy: users[item.createdBy]?.fullName || "Unknown",
            updatedBy: item.updatedBy ? users[item.updatedBy]?.fullName || "Unknown" : "Unknown",
          }));

          setInventory(enrichedInventory);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching inventory or users:", err);
          setError(
            err instanceof Error
              ? err
              : new Error("An unexpected error occurred")
          );
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error listening to inventory data:", err);
        setError(
          err instanceof Error ? err : new Error("An unexpected error occurred")
        );
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
