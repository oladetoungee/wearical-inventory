import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from '../utils/firebase';

interface StockLevelData {
  inStock: number;
  outOfStock: number;
  lowStock: number;
}

export const useStockLevelChart = () => {
  const [stockData, setStockData] = useState<StockLevelData>({
    inStock: 0,
    outOfStock: 0,
    lowStock: 0,
  });

  useEffect(() => {
    const fetchStockLevels = async () => {
      const inventoryRef = ref(db, "inventory");
      const snapshot = await get(inventoryRef);

      let inStock = 0;
      let outOfStock = 0;
      let lowStock = 0;

      if (snapshot.exists()) {
        Object.values(snapshot.val()).forEach((item: any) => {
          if (item.quantity > item.thresholdValue) {
            inStock++;
          } else if (item.quantity === 0) {
            outOfStock++;
          } else {
            lowStock++;
          }
        });
      }

      setStockData({ inStock, outOfStock, lowStock });
    };

    fetchStockLevels();
  }, []);

  return stockData;
};
