import prismadb from "@/lib/prismadb";
import React from "react";

type DashboardPageProps = {
  params: {
    storeId: string;
  };
};

async function DashboardPage({ params }: DashboardPageProps) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>Active store: {store?.name}</div>;
}

export default DashboardPage;
