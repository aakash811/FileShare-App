import { AlertCircle } from "lucide-react";
import React from "react";

function AlertMsg({ msg }) {
  return (
    <div className="p-4 bg-red-500 mt-5 text-white rounded-md flex items-center flex-col">
      <div className="flex gap-5">
        <AlertCircle />
        {msg}
      </div>
    </div>
  );
}

export default AlertMsg;
