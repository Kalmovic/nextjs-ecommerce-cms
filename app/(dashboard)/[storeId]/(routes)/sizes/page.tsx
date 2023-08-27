import React from "react";
import * as date from "date-fns";
import prismadb from "@/lib/prismadb";
import SizeClient from "./components/size-client";
import { SizesColumnType } from "./components/columns";

async function Sizes({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizesColumnType[] = sizes.map((size) => {
    return {
      id: size.id,
      name: size.name,
      value: size.value,
      createdAt: date.format(size.createdAt, "MMM do, yyyy"),
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient sizes={formattedSizes} />
      </div>
    </div>
  );
}

export default Sizes;
