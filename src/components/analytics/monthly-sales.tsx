"use client";

import * as React from "react";
import { useMonthlySalesChart } from "@/lib/hooks/monthly"; // Adjust path as needed
import { LineChartUI } from "@/components/ui"; // Update path to match your structure

export function MonthlySalesChart() {
  // Retrieve data from your custom hook
  // e.g., returns an array of objects:
  // [{ month: "January", onlineSales: 100, storeSales: 80 }, ...]
  const monthlySalesData = useMonthlySalesChart();

  // Transform to the shape needed for <LineChartUI/>
  const formattedData = React.useMemo(
    () =>
      monthlySalesData.map((item) => ({
        month: item.month,
        online: item.onlineSales,
        store: item.storeSales,
      })),
    [monthlySalesData]
  );

  return (
    <LineChartUI
      data={formattedData}
      title="Sales Summary"
      description="January - December"
      footerContent={
        <div className="text-sm text-muted-foreground">
          {/* Customize or leave empty */}
          You can place additional notes or stats here.
        </div>
      }
    />
  );
}
