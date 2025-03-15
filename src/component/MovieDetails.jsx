import React from "react";
import { motion } from "framer-motion";

export const MovieDetails = ({ movie, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-5xl w-full max-h-screen overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <div className="relative p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full z-20 transition duration-300"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="md:flex gap-8">
            {/* Movie Poster */}
            <div className="md:w-1/3 mb-6 md:mb-0">
              <motion.div
                className="rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-800 rounded-xl">
                    <span className="text-gray-300">No Poster Available</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Movie Details */}
            <div className="md:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {movie.Title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {movie.Year && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{movie.Year}</span>
                    </div>
                  )}

                  {movie.Runtime && movie.Runtime !== "N/A" && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{movie.Runtime}</span>
                    </div>
                  )}

                  {movie.imdbRating && movie.imdbRating !== "N/A" && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{movie.imdbRating}/10</span>
                    </div>
                  )}

                  {movie.Rated && movie.Rated !== "N/A" && (
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full">
                      {movie.Rated}
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.Genre && movie.Genre !== "N/A" && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {movie.Genre.split(", ").map((genre, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700 text-white text-sm font-medium rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Plot */}
                {movie.Plot && movie.Plot !== "N/A" && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">
                      Plot
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {movie.Plot}
                    </p>
                  </div>
                )}

                {/* Director */}
                {movie.Director && movie.Director !== "N/A" && (
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">
                      Director
                    </h3>
                    <p className="text-gray-300">{movie.Director}</p>
                  </div>
                )}

                {/* Writer */}
                {movie.Writer && movie.Writer !== "N/A" && (
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">
                      Writer
                    </h3>
                    <p className="text-gray-300">{movie.Writer}</p>
                  </div>
                )}

                {/* Actors */}
                {movie.Actors && movie.Actors !== "N/A" && (
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">
                      Cast
                    </h3>
                    <p className="text-gray-300">{movie.Actors}</p>
                  </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {movie.Language && movie.Language !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-300">
                        Language
                      </h4>
                      <p className="text-gray-300">{movie.Language}</p>
                    </div>
                  )}

                  {movie.Country && movie.Country !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-300">
                        Country
                      </h4>
                      <p className="text-gray-300">{movie.Country}</p>
                    </div>
                  )}

                  {movie.Awards && movie.Awards !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-300">
                        Awards
                      </h4>
                      <p className="text-gray-300">{movie.Awards}</p>
                    </div>
                  )}

                  {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-300">
                        Box Office
                      </h4>
                      <p className="text-gray-300">{movie.BoxOffice}</p>
                    </div>
                  )}

                  {movie.Production && movie.Production !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-300">
                        Production
                      </h4>
                      <p className="text-gray-300">{movie.Production}</p>
                    </div>
                  )}

                  {movie.DVD && movie.DVD !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-300">
                        DVD Release
                      </h4>
                      <p className="text-gray-300">{movie.DVD}</p>
                    </div>
                  )}
                </div>

                {/* IMDb Link */}
                {movie.imdbID && (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300"
                  >
                    View on IMDb
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};