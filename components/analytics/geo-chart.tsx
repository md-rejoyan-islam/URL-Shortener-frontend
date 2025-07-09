"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function GeoChart({
  locations,
}: {
  locations: { country: string; clicks: number }[] | undefined;
}) {
  console.log(locations);

  return (
    <ChartContainer
      config={{
        clicks: {
          label: "Clicks",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px] w-full mx-auto"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={locations?.map((location) => ({
            country: location.country || "Unknown",
            clicks: location.clicks,
          }))}
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
