"use client"

import { useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const chartData = [
  { month: "January", online: 186, store: 80 },
  { month: "February", online: 305, store: 200 },
  { month: "March", online: 237, store: 120 },
  { month: "April", online: 73, store: 900 },
  { month: "May", online: 209, store: 130 },
  { month: "June", online: 214, store: 140 },
  { month: "July", online: 195, store: 150 },
  { month: "August", online: 255, store: 160 },
  { month: "September", online: 230, store: 180 },
  { month: "October", online: 190, store: 170 },
  { month: "November", online: 220, store: 150 },
  { month: "December", online: 240, store: 190 },
]

const chartConfig: ChartConfig = {
  online: {
    label: "Online",
    color: "bg-green100",
  },
  store: {
    label: "Store",
    color: "bg-purple100",
  },
}

const currentYear = new Date().getFullYear()

const CustomizedLegend = () => (
  <div className="flex justify-center space-x-4 mt-2">
    <div className="flex items-center space-x-2">
      <span className="w-3 h-3 bg-green100 rounded-sm"></span>
      <span>Online</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="w-3 h-3 bg-purple100 rounded-sm"></span>
      <span>Store</span>
    </div>
  </div>
)

export function ChartLine() {
  const [selectedMonth, setSelectedMonth] = useState<string>("All")

  const filteredData =
    selectedMonth === "All"
      ? chartData
      : [
          chartData.find((data) => data.month === selectedMonth),
          chartData.find((data) => data.month === selectedMonth),
        ].filter(Boolean)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Summary</CardTitle>
        <CardDescription>January - December {currentYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <div className="w-48">
            <Select
              onValueChange={(value) => setSelectedMonth(value)}
              value={selectedMonth}
            >
              <SelectTrigger className="w-full">
                <span>
                  {selectedMonth === "All"
                    ? "Select Month"
                    : `Month: ${selectedMonth}`}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Months</SelectItem>
                {chartData.map((data) => (
                  <SelectItem key={data.month} value={data.month}>
                    {data.month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
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
              tickFormatter={(value) => value.slice(0, 3)}
              label={{ value: "", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: "", angle: -90, position: "insideLeft" }}
            />
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
      <CardFooter></CardFooter>
    </Card>
  )
}
