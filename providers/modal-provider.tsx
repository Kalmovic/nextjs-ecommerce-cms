"use client";
import React from "react";
import StoreModal from "@/components/modals/store-modal";

function ModalProvider() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
}

export default ModalProvider;
