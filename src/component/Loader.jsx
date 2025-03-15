import React from "react";
import { motion } from "framer-motion";



export const Loader = () => {
  return (
    <div className="flex justify-center items-center my-12">
      <motion.div
        className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};