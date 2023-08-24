"use client";

import React from "react";
import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

function StoreModal() {
  const storeModal = useStoreModal();
  return (
    <Modal
      title="Create Store"
      description="Add new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create Store Form
    </Modal>
  );
}

export default StoreModal;
