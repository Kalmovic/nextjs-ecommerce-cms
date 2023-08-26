"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function BillboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for your store."
        />
        <Button onClick={() => router.push(`${pathname}/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Billboard
        </Button>
      </div>
      <Separator />
    </>
  );
}

export default BillboardClient;
