"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "2023-01-01", clicks: 45 },
  { date: "2023-01-02", clicks: 52 },
  { date: "2023-01-03", clicks: 49 },
  { date: "2023-01-04", clicks: 63 },
  { date: "2023-01-05", clicks: 58 },
  { date: "2023-01-06", clicks: 72 },
  { date: "2023-01-07", clicks: 68 },
  { date: "2023-01-08", clicks: 75 },
  { date: "2023-01-09", clicks: 80 },
  { date: "2023-01-10", clicks: 92 },
  { date: "2023-01-11", clicks: 86 },
  { date: "2023-01-12", clicks: 97 },
  { date: "2023-01-13", clicks: 105 },
  { date: "2023-01-14", clicks: 115 },
]

export function ClicksChart() {
  return (
    <ChartContainer
      config={{
        clicks: {
          label: "Clicks",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
            }}
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="clicks"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-clicks)", opacity: 0.8 },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

