import React from "react";
import { AlertTriangle } from "lucide-react"; 

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <p className="font-medium text-center">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
