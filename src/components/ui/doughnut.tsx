"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { useStockLevelChart } from "@/lib/hooks/stock"; // Adjust to the correct path

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define color variables for chart
const chartConfig = {
  inStock: {
    label: "In Stock",
    color: "hsl(var(--chart-1))",
  },
  outOfStock: {
    label: "Out of Stock",
    color: "hsl(var(--chart-2))",
  },
  lowStock: {
    label: "Low Stock",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function DonutChart() {
  const stockData = useStockLevelChart();

  // Prepare chart data from hook values
  const chartData = [
    { status: "In Stock", count: stockData.inStock, fill: chartConfig.inStock.color },
    { status: "Out of Stock", count: stockData.outOfStock, fill: chartConfig.outOfStock.color },
    { status: "Low Stock", count: stockData.lowStock, fill: chartConfig.lowStock.color },
  ];

  const totalStock = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [stockData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stock Levels Overview</CardTitle>
        <CardDescription>Current Inventory Status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStock.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Items
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Stock levels analyzed <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Breakdown of current inventory stock levels
        </div>
      </CardFooter>
    </Card>
  );
}
