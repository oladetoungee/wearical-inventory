"use client";

import React, { useMemo, useState } from "react";
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

interface LineChartDataItem {
  month: string;
  online: number;
  store: number;
}

export interface LineChartUIProps {
  data: LineChartDataItem[];
  title: string;
  description: string;
  footerContent?: React.ReactNode;
}

const chartConfig: ChartConfig = {
  onlineSales: { label: "Online", color: "bg-green100" },
  storeSales: { label: "Store", color: "bg-purple100" },
};

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

export function LineChartUI({ data, title, description, footerContent }: LineChartUIProps) {
  const [selectedMonth, setSelectedMonth] = useState("All");

  const filteredData = useMemo(() => {
    if (selectedMonth === "All") return data;
    const match = data.find((item) => item.month === selectedMonth);
    return match ? [match] : [];
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
        <div className="mb-4 flex justify-end">
          <div className="w-48">
            <Select onValueChange={setSelectedMonth} value={selectedMonth}>
              <SelectTrigger className="w-full">
                <span>{selectedMonth === "All" ? "Select Month" : `Month: ${selectedMonth}`}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Months</SelectItem>
                {data.map(({ month }) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <ChartContainer config={chartConfig}>
          <LineChart data={filteredData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="online" name="Online" type="monotone" stroke="#00923F" strokeWidth={2} dot={false} />
            <Line dataKey="store" name="Store" type="monotone" stroke="#7B49B9" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
        <CustomizedLegend />
      </CardContent>
      <CardFooter>{footerContent}</CardFooter>
    </Card>
  );
}
