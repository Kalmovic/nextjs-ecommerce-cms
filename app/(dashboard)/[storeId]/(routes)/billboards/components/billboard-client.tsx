"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BillboardColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

function BillboardClient({ billboards }: { billboards: BillboardColumn[] }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store."
        />
        <Button onClick={() => router.push(`${pathname}/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Billboard
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={billboards} searchKey="label" />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
}

export default BillboardClient;
