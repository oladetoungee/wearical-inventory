import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { ref, onValue, DataSnapshot } from "firebase/database";
import { SalesData } from "../utils/definition";

interface UseSalesResult {
  sales: SalesData[];
  loading: boolean;
  error: Error | null;
}

export const useSales = (): UseSalesResult => {
  const [sales, setSales] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const salesRef = ref(db, "sales");
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(
      salesRef,
      async (salesSnapshot: DataSnapshot) => {
        try {
          if (!salesSnapshot.exists()) {
            setSales([]);
            console.warn("No sales found");
            return setLoading(false);
          }

          const salesList = Object.values(salesSnapshot.val()) as SalesData[];
          const usersSnapshot = await new Promise<DataSnapshot>(
            (resolve, reject) => {
              onValue(usersRef, resolve, reject, { onlyOnce: true });
            }
          );

          const users = usersSnapshot.exists() ? usersSnapshot.val() : {};
          const enrichedSales = salesList.map((sale) => ({
            ...sale,
            creatorName: users[sale.createdBy]?.fullName || "Unknown",
          }));

          setSales(enrichedSales);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching sales or users:", err);
          setError(
            err instanceof Error
              ? err
              : new Error("An unexpected error occurred")
          );
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error listening to sales data:", err);
        setError(
          err instanceof Error ? err : new Error("An unexpected error occurred")
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { sales, loading, error };
};
