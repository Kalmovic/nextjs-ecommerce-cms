"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ProductColumnType, columns } from "./components/columns";
import ApiList from "@/components/ui/api-list";

function ProductPageContent({ products }: { products: ProductColumnType[] }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage products for your store."
        />
        <Button onClick={() => router.push(`${pathname}/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={products} searchKey="name" />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
}

export default ProductPageContent;
