"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

export function DevicesChart({
  deviceClicks,
}: {
  deviceClicks: { name: string; value: number }[] | undefined;
}) {
  console.log(deviceClicks);

  return (
    <>
      <ChartContainer
        config={{
          value: {
            label: "Clicks",
          },
        }}
        className="h-[300px] mx-auto w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={deviceClicks}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {deviceClicks?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="mt-6 flex justify-center gap-8  relative">
        {deviceClicks?.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm font-medium">{entry.name}</span>
            </div>
            <span className="text-2xl font-bold text-center">
              {entry.value}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(
                (entry.value / deviceClicks.reduce((a, b) => a + b.value, 0)) *
                  100
              )}
              %
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
