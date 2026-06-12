"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label list";

const chartData = [
  { browser: "Aura Wireless Headphones", visitors: 35, fill: "#bedad8" },
  { browser: "Chrono Smartwatch v2", visitors: 15, fill: "#3525CDDE" },
  { browser: "Mechanical Keyboard Pro", visitors: 45, fill: "#857BE1" },
  { browser: "Portable Bluetooth Speaker", visitors: 15, fill: "#84B6B2" },
];
const products = [
  {
    name: "Aura Wireless Headphones",
    percentage: "55%",
    color: "bg-violet-500",
  },
  {
    name: "Chrono Smartwatch v2",
    percentage: "30%",
    color: "bg-cyan-200",
  },
  {
    name: "Mechanical Keyboard Pro",
    percentage: "15%",
    color: "bg-indigo-600",
  },
  {
    name: "Portable Bluetooth Speaker",
    percentage: "15%",
    color: "bg-teal-200",
  },
];

const chartConfig = {
  visitors: {
    label: "Market Share",
  },
  "Aura Wireless Headphones": {
    label: "Aura Wireless Headphones",
    color: "#BFDAD8",
  },
  "Chrono Smartwatch v2": {
    label: "Chrono Smartwatch v2",
    color: "#84B6B2",
  },
  "Mechanical Keyboard Pro": {
    label: "Mechanical Keyboard Pro",
    color: "#2563EB",
  },
  "Portable Bluetooth Speaker": {
    label: "Portable Bluetooth Speaker",
    color: "#14B8A6",
  },
} satisfies ChartConfig;

export function ChartPieLabelList() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle className="text-2xl font-[600]">
          Competitive Markets
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="browser" />} />
            <Pie data={chartData} dataKey="visitors" nameKey="browser"></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        {products.map((item) => (
          <div key={item.name} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${item.color}`} />
              <span className="font-semibold text-slate-900">{item.name}</span>
            </div>

            <span className="font-bold text-slate-900">{item.percentage}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
