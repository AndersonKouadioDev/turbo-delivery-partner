"use client";

import { useState } from "react";
import { title } from "@/components/primitives";
import {
  Image,
  CircularProgress,
  Button,
  Input,
  AvatarGroup,
  Avatar,
} from "@heroui/react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Card, CardBody, CardHeader, Select, SelectItem } from "@heroui/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { orders, orderState, rapportCommandeWeek } from "@/data";
import { Search } from "lucide-react";

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
          Commandes
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-6 lg:gap-4 justify-center">
        <Card
          className="w-full col-span-12 lg:col-span-8 2xl:col-span-7"
          shadow="sm"
        >
          <CardHeader className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Input
              startContent={<Search className="text-gray-500 w-4 h-4" />}
              label="Rechercher une commande"
              variant="bordered"
              size="sm"
            />
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
            <Orders />
          </CardBody>
        </Card>
        <Card
          className="w-full col-span-12 lg:col-span-4 2xl:col-span-5"
          shadow="sm"
        >
          <CardBody>
            <CardHeader>
              <h2 className="text-xl font-bold text-red-500">
                Progression hebdomadaire
              </h2>
            </CardHeader>
            <ChartContainer config={chartConfig} className="w-full">
              <AreaChart
                accessibilityLayer
                data={rapportCommandeWeek}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
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

export function Orders() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="w-full h-full p-4 space-y-6">
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        {orderState.map((category) => (
          <Button
            key={category.id}
            className="flex-shrink-0 mx-2"
            variant={selectedCategory === category.id ? "solid" : "flat"}
            color={selectedCategory === category.id ? "primary" : "default"}
            onPress={() => setSelectedCategory(category.id)}
            size="sm"
          >
            {category.name}
          </Button>
        ))}
        <ScrollBar orientation="horizontal" className="h-0" />
      </ScrollArea>

      <div className="grid gap-4  2xl:grid-cols-2">
        {orders.map((item, index) => (
          <Card key={index}>
            <CardBody className="p-4 flex gap-4 flex-row  items-center">
              <AvatarGroup isBordered max={3}>
                {item.items.map((item, index) => (
                  <Avatar key={index} src={item.image} />
                ))}
              </AvatarGroup>
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${item.status === "Effectué" ? "text-green-500" : "text-red-500"}`}
                >
                  {item.status === "Livré" ? "+" : "-"}
                  {item.price} F
                </p>
                <p
                  className={`text-xs ${item.status === "Livré" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} px-2 py-1 rounded-full inline-block`}
                >
                  {item.status}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
