"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";
import { Pie, PieChart, Cell } from "recharts";

const chartData = [
  { name: "Aura Wireless Headphones", value: 35, fill: "#C8F135" },
  { name: "Chrono Smartwatch v2", value: 25, fill: "#0A2E1A" },
  { name: "Mechanical Keyboard Pro", value: 25, fill: "#4F46E5" },
  { name: "Portable Bluetooth Speaker", value: 15, fill: "#818CF8" },
];

const chartConfig = {
  visitors: {
    label: "Market Share",
  },
  "Aura Wireless Headphones": {
    label: "Aura Wireless Headphones",
    color: "#C8F135",
  },
  "Chrono Smartwatch v2": {
    label: "Chrono Smartwatch v2",
    color: "#0A2E1A",
  },
  "Mechanical Keyboard Pro": {
    label: "Mechanical Keyboard Pro",
    color: "#4F46E5",
  },
  "Portable Bluetooth Speaker": {
    label: "Portable Bluetooth Speaker",
    color: "#818CF8",
  },
} satisfies ChartConfig;

export function ChartPieLabelList() {
  return (
    <Card className="flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
      <CardHeader className="items-start pb-0">
        <CardTitle className="text-lg font-semibold text-[#0A2E1A] dark:text-white">
          Competitive Markets
        </CardTitle>
        <CardDescription className="text-xs text-gray-400">
          Market share by product category
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  nameKey="name"
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl"
                />
              } 
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              strokeWidth={2}
              stroke="#FFFFFF"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {item.name}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#0A2E1A] dark:text-[#C8F135]">
              {item.value}%
            </span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}