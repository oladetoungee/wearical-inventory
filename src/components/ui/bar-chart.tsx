"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

// Define the shape of each data item for the bar chart.
interface BarDataItem {
  day: string;
  added: number;
  sold: number;
}

// Props for the fully self-contained BarChartUI component.
interface BarChartUIProps {
  // The data to display in the bar chart, already formatted for Recharts.
  data: BarDataItem[];

  // Title and description for the Card header.
  title: string;
  description: string;

  // Optional content to render in the Card footer.
  footerContent?: React.ReactNode;
}

// Example chart config for your ChartContainer
const chartConfig: ChartConfig = {
  added: {
    label: "Added",
    color: "bg-purple-200",
  },
  sold: {
    label: "Sold",
    color: "bg-purple-400",
  },
};

// A simple legend component. You can customize or remove it as needed.
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

/**
 * This component is completely responsible for:
 *  - Rendering the card structure
 *  - Displaying the Recharts BarChart
 *  - Providing a footer/legend if needed
 */
export function BarChartUI({
  data,
  title,
  description,
  footerContent,
}: BarChartUIProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {/* ChartContainer from your UI library */}
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
