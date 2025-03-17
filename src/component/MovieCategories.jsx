import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const MovieCategories = ({ movies, allCategories, onMovieClick }) => {
  // If allCategories is provided, display all categories
  const showAllCategories =
    allCategories && Object.keys(allCategories).length > 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Category name mapping for display
  const categoryNames = {
    all: "All Movies",
    popular: "Popular Movies",
    latest: "Latest Releases",
    top_rated: "Top Rated"
  };

  // Function to render a single movie card
  const renderMovieCard = (movie) => (
    <motion.div
      key={movie.imdbID}
      variants={itemVariants}
      className="group relative w-36 sm:w-44 flex-shrink-0 cursor-pointer"
      onClick={() => onMovieClick(movie.imdbID)}
    >
      {" "}
      <div className="relative overflow-hidden rounded-lg">
        <Tilt>
          {movie.Poster && movie.Poster !== "N/A" ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-52 sm:h-64 object-cover transform  transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-52 sm:h-64 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Tilt>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium text-white truncate">
          {movie.Title}
        </h3>
        <p className="text-xs text-gray-400">{movie.Year}</p>
      </div>
    </motion.div>
  );

  // Function to render a single category section
  const renderCategory = (categoryName, categoryMovies) => (
    <div key={categoryName} className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">
        {categoryNames[categoryName] || categoryName}
      </h2>
      <motion.div
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {categoryMovies.map((movie) => renderMovieCard(movie))}
      </motion.div>
    </div>
  );

  // Render all categories if allCategories is provided
  if (showAllCategories) {
    return (
      <div className="mt-8">
        {Object.keys(allCategories).map(
          (categoryName) =>
            allCategories[categoryName] &&
            allCategories[categoryName].length > 0 &&
            renderCategory(categoryName, allCategories[categoryName])
        )}
      </div>
    );
  }

  // Otherwise, render a single category
  return (
    <div className="mt-8">
      {movies && movies.length > 0 ? (
        renderCategory("movies", movies)
      ) : (
        <div className="text-center text-gray-400 py-12">
          <p>No movies found.</p>
        </div>
      )}
    </div>
  );
};

export default MovieCategories;
