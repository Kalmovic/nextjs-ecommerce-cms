import React from "react";
import * as date from "date-fns";
import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/billboard-client";
import { BillboardColumn } from "./components/columns";

async function Billboard({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => {
    return {
      id: billboard.id,
      label: billboard.label,
      createdAt: date.format(billboard.createdAt, "MMM do, yyyy"),
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={formattedBillboards} />
      </div>
    </div>
  );
}

export default Billboard;
