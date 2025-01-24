"use client";

import React, { useMemo } from "react";
import { useWeeklyDataChart } from "@/lib/hooks";
import { BarChartUI } from "@/components/ui";

export function WeeklyChart() {
  const weeklyData = useWeeklyDataChart();

  const chartData = useMemo(
    () =>
      weeklyData.map(({ day, productsAdded, productsSold }) => ({
        day,
        added: productsAdded,
        sold: productsSold,
      })),
    [weeklyData]
  );

  return (
    <BarChartUI
      data={chartData}
      title="Product Summary"
      description="Weekly Data"
      footerContent={<div>Any additional footer content goes here</div>}
    />
  );
}
