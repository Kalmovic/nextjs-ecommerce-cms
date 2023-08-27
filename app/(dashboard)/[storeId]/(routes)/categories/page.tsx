import React from "react";
import * as date from "date-fns";
import prismadb from "@/lib/prismadb";
import CategoryClient from "./components/category-client";
import { CategoryColumnType } from "./components/columns";

async function Category({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumnType[] = categories.map(
    (category) => {
      return {
        id: category.id,
        name: category.name,
        billboardLabel: category.billboard?.label ?? null,
        createdAt: date.format(category.createdAt, "MMM do, yyyy"),
      };
    }
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient categories={formattedCategories} />
      </div>
    </div>
  );
}

export default Category;
