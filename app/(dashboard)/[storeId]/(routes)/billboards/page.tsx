import React from "react";
import BillboardClient from "./components/billboard-client";

function Billboard() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
}

export default Billboard;
