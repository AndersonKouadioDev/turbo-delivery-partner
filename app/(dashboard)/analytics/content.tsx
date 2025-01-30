"use client";
import { Card, CardBody, CardHeader, Select, SelectItem } from "@nextui-org/react";
import { title } from "@/components/primitives";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { rapportCommande } from "@/data";
import { TbMoneybag } from "react-icons/tb";

const chartConfig = {
  orders: {
    label: "Commandes",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function Content() {
  return (
    <div className="w-full h-full flex flex-1 flex-col gap-4 lg:gap-6 mb-10">
      <div className="flex items-center">
        <h1 className={title({ size: "h3", class: "text-primary" })}>
          Tableau de bord
        </h1>
      </div>
      <div className="space-y-4 lg:space-y-0 lg:flex lg:space-x-4">
        <Card className="lg:w-2/3 h-fit" shadow="sm">
          <CardHeader>
            <Select
              defaultSelectedKeys={["june-july"]}
              label="Sélectionner une période"
              variant="bordered"
              size="sm"
            >
              {[
                { key: "june-july", value: "Du 30 juin-31 juillet" },
                { key: "july-august", value: "Du 31 juillet-31 août" },
                {
                  key: "august-september",
                  value: "Du 31 août-30 septembre",
                },
              ].map((item) => (
                <SelectItem key={item.key}>{item.value}</SelectItem>
              ))}
            </Select>
          </CardHeader>
          <CardBody>
            <Card className="mb-4 bg-gradient-to-r from-red-600 to-primary text-white">
              <CardBody className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center p-2 justify-center rounded-full border">
                    <TbMoneybag className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm">Montant actuel</span>
                    <div className="text-4xl font-bold">7 805 000 XOF</div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { title: "Menus au total", value: "35", percentage: 72 },
                { title: "Total des commandes", value: "135", percentage: 93 },
                { title: "Dépenses totales", value: "4 457 798", unit: "XOF" },
                { title: "Frais de service", value: "1 857 798", unit: "XOF" },
              ].map((item, index) => (
                <Card key={index}>
                  <CardBody className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold">{item.value}</span>
                      <TbMoneybag className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="text-sm text-gray-500">{item.title}</div>
                    {item.percentage && (
                      <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-red-500 h-full rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    )}
                    {item.percentage && (
                      <div className="text-xs text-gray-500 mt-1">
                        {item.percentage}% vendus
                      </div>
                    )}
                    {item.unit && (
                      <div className="text-xs text-gray-500 mt-1">
                        {item.unit}
                      </div>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card className="lg:w-1/3 h-fit" shadow="sm">
          <CardBody>
            <CardHeader>
              <h2 className="text-xl font-bold text-red-500">
                Progression annuel
              </h2>
            </CardHeader>
            <ChartContainer config={chartConfig} className="w-full">
              <AreaChart
                accessibilityLayer
                data={rapportCommande}
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
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="orders"
                  type="natural"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.4}
                  stroke="hsl(var(--primary))"
                />
              </AreaChart>
            </ChartContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
