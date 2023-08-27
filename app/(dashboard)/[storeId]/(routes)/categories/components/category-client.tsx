"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { CategoryColumnType, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

function CategoryClient({ categories }: { categories: CategoryColumnType[] }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage categories for your store."
        />
        <Button onClick={() => router.push(`${pathname}/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={categories} searchKey="name" />
      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories" />
    </>
  );
}

export default CategoryClient;
