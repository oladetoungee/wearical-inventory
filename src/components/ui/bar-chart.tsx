"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "Monday", added: 150, sold: 80 },
  { day: "Tuesday", added: 200, sold: 120 },
  { day: "Wednesday", added: 180, sold: 95 },
  { day: "Thursday", added: 220, sold: 110 },
  { day: "Friday", added: 190, sold: 105 },
  { day: "Saturday", added: 160, sold: 90 },
  { day: "Sunday", added: 175, sold: 100 },
]

const chartConfig = {
  added: {
    label: "Added",
    color: "bg-purple-200",
  },
  sold: {
    label: "Sold",
    color: "bg-purple-400",
  },
} satisfies ChartConfig

const CustomizedLegend = () => (
  <div className="flex justify-center space-x-4 mt-2">
    <div className="flex items-center space-x-2">
      <span className="w-3 h-3 bg-purple-200 rounded-sm"></span>
      <span>Added</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="w-3 h-3 bg-purple-500 rounded-sm"></span>
      <span>Sold</span>
    </div>
  </div>
)

export function ChartBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Summary</CardTitle>
        <CardDescription>Weekly Data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
        <BarChart data={chartData} barCategoryGap="20%" barSize={15}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="added" fill="#E9D5FF" radius={4} />
            <Bar dataKey="sold" fill="#A855F7" radius={4} />
          </BarChart>
        </ChartContainer>
        <CustomizedLegend />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}
