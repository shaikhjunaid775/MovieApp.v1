import React from "react";
import { motion } from "framer-motion";

export const ErrorMessage = ({ message }) => {
  return (
    <motion.div
      className="max-w-7xl mx-auto bg-red-900 bg-opacity-60 border-l-4 border-red-500 text-white p-4 mb-6 rounded-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>{message}</p>
      </div>
    </motion.div>
  );
};
