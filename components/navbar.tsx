import React from "react";
import { redirect } from "next/navigation";
import { UserButton, auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import MainNav from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { ThemeToggle } from "./ui/theme-toggle";

async function NavBar() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className="border-b flex">
      <section className="flex h-16 items-center px-4 w-full">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <section className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </section>
      </section>
    </nav>
  );
}

export default NavBar;
