"use client";

import React, { useMemo } from "react";
import { useMonthlySalesChart } from "@/lib/hooks/monthly";
import { LineChartUI } from "@/components/ui";

export function MonthlySalesChart() {
  const monthlySalesData = useMonthlySalesChart();

  const data = useMemo(
    () =>
      monthlySalesData.map(({ month, onlineSales, storeSales }) => ({
        month,
        online: onlineSales,
        store: storeSales,
      })),
    [monthlySalesData]
  );

  return (
    <LineChartUI
      data={data}
      title="Sales Summary"
      description="January - December"
      footerContent={
        <div className="text-sm text-muted-foreground">
          You can place additional notes or stats here.
        </div>
      }
    />
  );
}
