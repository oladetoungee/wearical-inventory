"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Define the shape of each data item for the line chart.
interface LineChartDataItem {
  month: string;
  online: number;
  store: number;
}

export interface LineChartUIProps {
  /**
   * Data for the chart, already in the shape Recharts needs.
   * Each item must have: { month, online, store }.
   */
  data: LineChartDataItem[];

  /**
   * Title & description for the Card header.
   */
  title: string;
  description: string;

  /**
   * An optional node or string to appear in the CardFooter, if needed.
   */
  footerContent?: React.ReactNode;
}

/**
 * Example chart config for usage with ChartContainer (optional).
 * You can adjust or remove this if you're not using ChartContainer for theming.
 */
const chartConfig: ChartConfig = {
  onlineSales: {
    label: "Online",
    color: "bg-green100",
  },
  storeSales: {
    label: "Store",
    color: "bg-purple100",
  },
};

// A simple legend component (optional).
function CustomizedLegend() {
  return (
    <div className="mt-2 flex justify-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className="h-3 w-3 rounded-sm bg-green100" />
        <span>Online</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="h-3 w-3 rounded-sm bg-purple100" />
        <span>Store</span>
      </div>
    </div>
  );
}

const currentYear = new Date().getFullYear();

/**
 * A fully self-contained UI component for displaying
 * a line chart with month-based filtering.
 */
export function LineChartUI({ data, title, description, footerContent }: LineChartUIProps) {
  // Track the currently selected month
  const [selectedMonth, setSelectedMonth] = React.useState<string>("All");

  // If user selects a specific month, filter data to that single item.
  // Otherwise, show all months.
  const filteredData = React.useMemo(() => {
    if (selectedMonth === "All") {
      return data;
    }
    const singleItem = data.find((item) => item.month === selectedMonth);
    return singleItem ? [singleItem] : [];
  }, [data, selectedMonth]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description} {currentYear}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Month selector */}
        <div className="mb-4 flex justify-end">
          <div className="w-48">
            <Select onValueChange={setSelectedMonth} value={selectedMonth}>
              <SelectTrigger className="w-full">
                <span>
                  {selectedMonth === "All" ? "Select Month" : `Month: ${selectedMonth}`}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Months</SelectItem>
                {data.map((item) => (
                  <SelectItem key={item.month} value={item.month}>
                    {item.month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* The line chart */}
        <ChartContainer config={chartConfig}>
          <LineChart
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // e.g., Jan, Feb, ...
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="online"
              name="Online"
              type="monotone"
              stroke="#00923F"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="store"
              name="Store"
              type="monotone"
              stroke="#7B49B9"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>

        <CustomizedLegend />
      </CardContent>

      <CardFooter>{footerContent}</CardFooter>
    </Card>
  );
}
