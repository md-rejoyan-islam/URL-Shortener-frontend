"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { country: "United States", clicks: 420 },
  { country: "United Kingdom", clicks: 312 },
  { country: "Germany", clicks: 245 },
  { country: "France", clicks: 190 },
  { country: "Japan", clicks: 167 },
  { country: "Canada", clicks: 152 },
  { country: "Australia", clicks: 134 },
  { country: "Brazil", clicks: 98 },
  { country: "India", clicks: 87 },
  { country: "Spain", clicks: 65 },
];

export function GeoChart() {
  return (
    <ChartContainer
      config={{
        clicks: {
          label: "Clicks",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis type="number" />
          <YAxis
            dataKey="country"
            type="category"
            scale="band"
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="clicks"
            fill="var(--primary)"
            radius={[4, 4, 4, 4]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
