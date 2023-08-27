import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryColumnType } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import prismadb from "@/lib/prismadb";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

const onCopy = (id: string) => {
  navigator.clipboard.writeText(id);
  toast.success("ID Copied to clipboard");
};

function CellAction({ data }: { data: CategoryColumnType }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
      router.refresh();
      setIsDeleteModalOpen(false);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error(
        "Make sure you have all categories using this billboard first."
      );
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
        isLoading={isDeleting}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="w-4 h-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`${pathname}/${data.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default CellAction;
