"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

interface BarDataItem {
  day: string;
  added: number;
  sold: number;
}

interface BarChartUIProps {
  data: BarDataItem[];
  title: string;
  description: string;
  footerContent?: React.ReactNode;
}

const chartConfig: ChartConfig = {
  added: { label: "Added", color: "bg-purple-200" },
  sold: { label: "Sold", color: "bg-purple-400" },
};

function CustomizedLegend() {
  return (
    <div className="mt-2 flex justify-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className="h-3 w-3 rounded-sm bg-purple-200" />
        <span>Added</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="h-3 w-3 rounded-sm bg-purple-500" />
        <span>Sold</span>
      </div>
    </div>
  );
}

export function BarChartUI({ data, title, description, footerContent }: BarChartUIProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} barCategoryGap="20%" barSize={15}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="added" fill="#E9D5FF" radius={4} />
            <Bar dataKey="sold" fill="#A855F7" radius={4} />
          </BarChart>
        </ChartContainer>
        <CustomizedLegend />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {footerContent}
      </CardFooter>
    </Card>
  );
}
