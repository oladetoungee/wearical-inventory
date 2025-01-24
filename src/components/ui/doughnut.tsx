"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Label } from "recharts";
import { TrendingUp } from "lucide-react";
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
} from "@/components/ui/chart";

interface DoughnutItem {
  label: string;
  value: number;
  color?: string;
}

export interface DoughnutProps {
  title: string;
  description: string;
  totalLabel: string;
  data: DoughnutItem[];
  footerTitle: string;
  footerSubtitle: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Doughnut({
  title,
  description,
  totalLabel,
  data,
  footerTitle,
  footerSubtitle,
  Icon = TrendingUp,
}: DoughnutProps) {
  const total = useMemo(
    () => data.reduce((acc, { value }) => acc + value, 0),
    [data]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{}} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data.map(({ label, value, color }) => ({
                name: label,
                value,
                fill: color ?? "hsl(var(--chart-1))",
              }))}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const { cx, cy } = viewBox;
                    return (
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={cx} y={cy} className="fill-foreground text-3xl font-bold">
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={cx}
                          y={(cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          {totalLabel}
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {footerTitle}
          <Icon className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{footerSubtitle}</div>
      </CardFooter>
    </Card>
  );
}
