"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Mobile", value: 1250 },
  { name: "Desktop", value: 840 },
  { name: "Tablet", value: 260 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

export function DevicesChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Clicks",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={140}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 flex justify-center gap-8">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-sm font-medium">{entry.name}</span>
            </div>
            <span className="text-2xl font-bold">{entry.value}</span>
            <span className="text-sm text-muted-foreground">
              {Math.round((entry.value / data.reduce((a, b) => a + b.value, 0)) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </ChartContainer>
  )
}

