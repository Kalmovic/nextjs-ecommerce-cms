import React from "react";
import * as date from "date-fns";
import prismadb from "@/lib/prismadb";
import ColorClient from "./components/color-client";
import { ColorsColumnType } from "./components/columns";

async function Colors({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorsColumnType[] = colors.map((size) => {
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
        <ColorClient colors={formattedColors} />
      </div>
    </div>
  );
}

export default Colors;
