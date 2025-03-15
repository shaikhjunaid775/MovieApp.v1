import React from "react";
import { motion } from "framer-motion";

export const MovieItem = ({ movie, onClick, index }) => {
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-xl"
      variants={item}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
    >
      <div className="aspect-[2/3] overflow-hidden">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <span className="text-gray-300">No Poster Available</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <h2 className="text-lg font-semibold text-white truncate">
          {movie.Title}
        </h2>
        <div className="flex items-center mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-gray-200">IMDb</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-300">{movie.Year}</span>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
          {movie.Type}
        </span>
      </div>
    </motion.div>
  );
};
