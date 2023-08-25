"use client";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type SettingsFormProps = {
  initialData: Store;
};

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

function SettingsForm({ initialData }: SettingsFormProps) {
  const params = useParams();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const origin = useOrigin();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (formData: SettingsFormValues) => {
    try {
      setIsUpdating(true);
      await axios.patch(`/api/stores/${params.storeId}`, formData);
      router.refresh();
      toast.success("Store updated successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted successfully");
    } catch (error) {
      toast.error(
        "Make sure you have no products nor categories in your store before deleting it."
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
      <section className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your store preferences" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </section>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Store name"
                      disabled={isUpdating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isUpdating} className="ml-auto">
            {isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </form>
        <Separator />
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${params.storeId}`}
          variant="public"
        />
      </Form>
    </>
  );
}

export default SettingsForm;
