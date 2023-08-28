import React from "react";
import * as date from "date-fns";
import prismadb from "@/lib/prismadb";
import { priceFormatter } from "@/lib/utils";
import { OrdersColumnType } from "./components/columns";
import OrdersPageContent from "./content";

async function OrdersPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrdersColumnType[] = orders.map((order) => {
    return {
      id: order.id,
      phone: order.phone,
      address: order.address,
      products: order.orderItems
        .map((orderItem) => orderItem.product.name)
        .join(", "),
      totalPrice: priceFormatter.format(
        order.orderItems.reduce(
          (acc, orderItem) => acc + orderItem.product.price.toNumber(),
          0
        )
      ),
      isPaid: order.isPaid,
      createdAt: date.format(order.createdAt, "MMM do, yyyy"),
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersPageContent orders={formattedOrders} />
      </div>
    </div>
  );
}

export default OrdersPage;
