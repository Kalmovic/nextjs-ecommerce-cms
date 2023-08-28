import React from "react";
import * as date from "date-fns";
import prismadb from "@/lib/prismadb";
import ProductPageContent from "./content";
import { priceFormatter } from "@/lib/utils";
import { ProductColumnType } from "./components/columns";

async function ProductsPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumnType[] = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price: priceFormatter.format(product.price.toNumber()),
      category: product.category.name,
      size: product.size.name,
      color: product.color.value,
      createdAt: date.format(product.createdAt, "MMM do, yyyy"),
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductPageContent products={formattedProducts} />
      </div>
    </div>
  );
}

export default ProductsPage;
