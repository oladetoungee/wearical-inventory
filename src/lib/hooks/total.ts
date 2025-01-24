import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from '../utils/firebase';

interface SalesData {
  totalRevenue: number;
  totalSales: number;
  totalProducts: number;
  totalEmployees: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<SalesData>({
    totalRevenue: 0,
    totalSales: 0,
    totalProducts: 0,
    totalEmployees: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const salesRef = ref(db, "sales");
      const inventoryRef = ref(db, "inventory");
      const usersRef = ref(db, "users");

      const [salesSnap, inventorySnap, usersSnap] = await Promise.all([
        get(salesRef),
        get(inventoryRef),
        get(usersRef),
      ]);

      let totalRevenue = 0;
      let totalSales = 0;
      let totalProducts = 0;
      let totalEmployees = 0;

      if (salesSnap.exists()) {
        totalSales = Object.keys(salesSnap.val()).length;
        totalRevenue = Object.values(salesSnap.val()).reduce(
          (acc: number, sale: any) => acc + sale.totalSellingPrice,
          0
        );
      }

      if (inventorySnap.exists()) {
        totalProducts = Object.keys(inventorySnap.val()).length;
      }

      if (usersSnap.exists()) {
        totalEmployees = Object.keys(usersSnap.val()).length;
      }

      setStats({ totalRevenue, totalSales, totalProducts, totalEmployees });
    };

    fetchData();
  }, []);

  return stats;
};
