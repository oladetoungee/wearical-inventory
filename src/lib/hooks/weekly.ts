import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from '../utils/firebase';
import { format } from "date-fns";

interface WeeklyData {
  day: string;
  productsAdded: number;
  productsSold: number;
}

export const useWeeklyDataChart = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const inventoryRef = ref(db, "inventory");
      const salesRef = ref(db, "sales");

      const [inventorySnap, salesSnap] = await Promise.all([
        get(inventoryRef),
        get(salesRef),
      ]);

      const weeklyStats = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => ({
        day,
        productsAdded: 0,
        productsSold: 0,
      }));

      if (inventorySnap.exists()) {
        Object.values(inventorySnap.val()).forEach((item: any) => {
          const dayIndex = new Date(item.dateCreated).getDay();
          weeklyStats[dayIndex].productsAdded += 1;
        });
      }

      if (salesSnap.exists()) {
        Object.values(salesSnap.val()).forEach((sale: any) => {
          const dayIndex = new Date(sale.dateCreated).getDay();
          weeklyStats[dayIndex].productsSold += sale.quantity;
        });
      }

      setWeeklyData(weeklyStats);
    };

    fetchData();
  }, []);

  return weeklyData;
};
