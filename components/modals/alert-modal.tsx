"use client";

import React from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: AlertModalProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure?"
      description="This action cannot be undone"
    >
      <div className="pt-6 space-x-2 flex items-center justify-end">
        <Button variant="outline" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" disabled={isLoading} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default AlertModal;
