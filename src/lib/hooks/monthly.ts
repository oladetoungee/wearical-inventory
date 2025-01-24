import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from '../utils/firebase';
import { format } from "date-fns";

interface MonthlySalesData {
  month: string;
  onlineSales: number;
  storeSales: number;
}

export const useMonthlySalesChart = () => {
  const [monthlySales, setMonthlySales] = useState<MonthlySalesData[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesRef = ref(db, "sales");
      const snapshot = await get(salesRef);
      const data = snapshot.val();

      if (data) {
        // Initialize sales data for each month
        const salesByMonth = Array.from({ length: 12 }, (_, i) => ({
          month: format(new Date(2024, i, 1), "MMMM"), // Month names
          onlineSales: 0,
          storeSales: 0,
        }));

        Object.values(data).forEach((sale: any) => {
          const saleMonth = new Date(sale.dateCreated).getMonth();
          
          if (sale.location === "Online") {
            // Count the number of sales, not revenue
            salesByMonth[saleMonth].onlineSales += 1;
          } else {
            salesByMonth[saleMonth].storeSales += 1;
          }
        });

        setMonthlySales(salesByMonth);
      }
    };

    fetchSales();
  }, []);

  return monthlySales;
};
