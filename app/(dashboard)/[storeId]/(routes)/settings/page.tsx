import { homeRoute, signInRoute } from "@/constants/routes";
import prismadb from "@/lib/prismadb";
import { userInfo } from "@/utils/userInfo";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/settings-form";

type SettingsPageProps = {
  params: {
    storeId: string;
  };
};

async function SettingsPage({ params: { storeId } }: SettingsPageProps) {
  const { kind, userId } = userInfo();
  if (kind === "not-logged") redirect(signInRoute);
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
  if (!store) redirect(homeRoute);

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}

export default SettingsPage;
