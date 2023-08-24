"use client";
import React from "react";
import { Store } from "@prisma/client";
import { PopoverTriggerProps } from "@radix-ui/react-popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

function StoreSwitcher({ items, className }: StoreSwitcherProps) {
  const [isSwitcherOpen, setIsSwitcherOpen] = React.useState(false);
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { label: string; value: string }) => {
    setIsSwitcherOpen(true);
    router.push(`/${store.value}`);
  };

  return (
    <Popover
      open={isSwitcherOpen}
      onOpenChange={(isOpen) => setIsSwitcherOpen(isOpen)}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isSwitcherOpen}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label ?? "Select a store"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => onStoreSelect(item)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === item.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsSwitcherOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create a new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default StoreSwitcher;
