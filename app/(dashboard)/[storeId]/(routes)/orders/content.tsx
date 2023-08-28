"use client";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { OrdersColumnType, columns } from "./components/columns";

function OrdersPageContent({ orders }: { orders: OrdersColumnType[] }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${orders.length})`}
          description="Manage orders for your store."
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={orders} searchKey="products" />
    </>
  );
}

export default OrdersPageContent;
