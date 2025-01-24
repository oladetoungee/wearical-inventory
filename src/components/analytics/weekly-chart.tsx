"use client";

import * as React from "react";
import { useWeeklyDataChart } from "@/lib/hooks"; // Adjust path to your hook
import { BarChartUI } from "@/components/ui"; // Path to the UI component

export function WeeklyChart() {
  // Retrieve raw data (e.g., { day: 'Mon', productsAdded: 10, productsSold: 5, ... })
  const weeklyData = useWeeklyDataChart();

  // Transform data to match what Recharts expects
  const formattedChartData = React.useMemo(
    () =>
      weeklyData.map((item) => ({
        day: item.day,
        added: item.productsAdded,
        sold: item.productsSold,
      })),
    [weeklyData]
  );

  return (
    <BarChartUI
      data={formattedChartData}
      title="Product Summary"
      description="Weekly Data"
      footerContent={<div>Any additional footer content goes here</div>}
    />
  );
}
