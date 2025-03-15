import React from "react";
import { motion } from "framer-motion";
import { MovieItem } from "./MovieItem";

export const TopRated = ({ movies, onMovieClick }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <div className="my-2">
        <h1>Top Rated</h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="relative group cursor-pointer overflow-hidden rounded-xl">
            <div className="aspect-[2/3] overflow-hidden">
              <img
                alt="Captain Marvel"
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                src="https://m.media-amazon.com/images/M/MV5BZDI1NGU2ODAtNzBiNy00MWY5LWIyMGEtZjUxZjUwZmZiNjBlXkEyXkFqcGc@._V1_SX300.jpg"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h2 className="text-lg font-semibold text-white truncate">
                Captain Marvel
              </h2>
              <div className="flex items-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="ml-1 text-gray-200">IMDb</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-300">2019</span>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                movie
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
