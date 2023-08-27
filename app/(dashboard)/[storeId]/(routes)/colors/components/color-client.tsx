"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ColorsColumnType, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

function ColorClient({ colors }: { colors: ColorsColumnType[] }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colors.length})`}
          description="Manage colors for your store."
        />
        <Button onClick={() => router.push(`${pathname}/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Color
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={colors} searchKey="name" />
      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList entityIdName="colorId" entityName="colors" />
    </>
  );
}

export default ColorClient;
