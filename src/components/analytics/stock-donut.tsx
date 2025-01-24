"use client";

import React, { useMemo } from "react";
import { useStockLevelChart } from "@/lib/hooks/stock";
import { Doughnut } from "@/components/ui/doughnut";
import { TrendingUp } from "lucide-react";

export function StockChart() {
  const { inStock, outOfStock, lowStock } = useStockLevelChart();

  // Build the chart data only when values change
  const data = useMemo(
    () => [
      { label: "In Stock", value: inStock, color: "hsl(var(--chart-1))" },
      { label: "Out of Stock", value: outOfStock, color: "hsl(var(--chart-2))" },
      { label: "Low Stock", value: lowStock, color: "hsl(var(--chart-3))" },
    ],
    [inStock, outOfStock, lowStock]
  );

  return (
    <Doughnut
      title="Stock Levels Overview"
      description="Current Inventory Status"
      totalLabel="Total Items"
      data={data}
      footerTitle="Stock levels analyzed"
      footerSubtitle="Breakdown of current inventory stock levels"
      Icon={TrendingUp}
    />
  );
}
