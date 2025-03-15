import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";
import { FilterDropdown } from "./FilterDropdown";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { ErrorMessage } from "./Error";
import { Loader } from "./Loader";

// Main App Component
const MovieSearchApp = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterType, setFilterType] = useState("popular");

  // Replace with your own API key
  const OMDB_API_KEY = "6c6150e3";
  const OMDB_BASE_URL = "https://www.omdbapi.com";

  // Default search terms for different filter types
  const filterSearchTerms = {
    popular: "marvel",
    latest: "movie 2024",
    top_rated: "star wars",
  };

  // Load movies on initial render and when filter changes
  useEffect(() => {
    fetchMoviesByFilter(filterType);
  }, [filterType]);

  const fetchMoviesByFilter = async (filterType) => {
    setLoading(true);
    setError(null);

    // Use predefined search terms for each filter type
    const searchTerm = filterSearchTerms[filterType];

    try {
      const response = await fetch(
        `${OMDB_BASE_URL}/?s=${encodeURIComponent(
          searchTerm
        )}&type=movie&apikey=${OMDB_API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True" && data.Search) {
        // Sort the results based on filter type
        let sortedResults = [...data.Search];

        if (filterType === "latest") {
          // Sort by year, newest first
          sortedResults.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        } else if (filterType === "top_rated") {
          // For top_rated, we'll need to fetch IMDb rating for each movie
          // This is simplified - in a real app you might want to implement pagination
          // and more sophisticated sorting
          sortedResults = sortedResults.slice(0, 10); // Limit to 10 to reduce API calls
        }

        setMovies(sortedResults);
      } else {
        setError(data.Error || "Failed to fetch movies");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      fetchMoviesByFilter(filterType);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${OMDB_BASE_URL}/?s=${encodeURIComponent(
          query
        )}&type=movie&apikey=${OMDB_API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True" && data.Search) {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${OMDB_BASE_URL}/?i=${imdbID}&plot=full&apikey=${OMDB_API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
        setShowDetails(true);
      } else {
        setError("Failed to load movie details");
      }
    } catch (err) {
      setError("Failed to load movie details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CineScope
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Search & Filter Components */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <SearchBar
              query={query}
              setQuery={setQuery}
              searchMovies={searchMovies}
            />
            <FilterDropdown
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Loading Indicator */}
        {loading && <Loader />}

        {/* Movie List */}
        {!loading && movies.length > 0 && (
          <MovieList movies={movies} onMovieClick={fetchMovieDetails} />
        )}

        {/* Movie Details Modal */}
        {showDetails && selectedMovie && (
          <MovieDetails movie={selectedMovie} onClose={closeDetails} />
        )}
      </div>
    </div>
  );
};

export default MovieSearchApp;