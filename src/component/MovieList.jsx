import React from "react";
import { motion } from "framer-motion";
import { MovieItem } from "./MovieItem";

export const MovieList = ({ movies, onMovieClick }) => {
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
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {movies.map((movie, index) => (
        <MovieItem
          key={movie.imdbID || index}
          movie={movie}
          onClick={() => onMovieClick(movie.imdbID)}
          index={index}
        />
      ))}
    </motion.div>
  );
};