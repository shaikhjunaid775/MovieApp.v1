import React, { useState, useEffect } from "react";

function Banner({ movies: propMovies, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null);

  // Sample movie titles to fetch from OMDB
  const movieTitles = [
    "Captain Marvel",
    "Avengers: Endgame",
    "Black Panther",
    "Thor: Ragnarok",
    "Spider-Man: No Way Home",
  ];

  // Replace this with your own API key from OMDB (http://www.omdbapi.com/)
  const API_KEY = "6c6150e3";

  useEffect(() => {
    // Use prop movies if provided, otherwise fetch your own
    if (propMovies && propMovies.length > 0) {
      // If propMovies only contains basic info, fetch full details
      if (!propMovies[0].Director) {
        fetchMovieDetails(propMovies);
      } else {
        setMovies(propMovies);
        setLoading(false);
      }
    } else {
      fetchMoviesByTitles();
    }
  }, [propMovies]);

  const fetchMoviesByTitles = async () => {
    try {
      setLoading(true);
      const movieData = await Promise.all(
        movieTitles.map(async (title) => {
          const response = await fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(
              title
            )}&apikey=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching ${title}`);
          }
          return response.json();
        })
      );

      setMovies(movieData.filter((movie) => movie.Response !== "False"));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (basicMovies) => {
    try {
      setLoading(true);
      // Get full details for the first 5 movies
      const detailedMovies = await Promise.all(
        basicMovies.slice(0, 5).map(async (movie) => {
          const response = await fetch(
            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching ${movie.Title}`);
          }
          return response.json();
        })
      );

      setMovies(detailedMovies.filter((movie) => movie.Response !== "False"));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (isAnimating || movies.length <= 1) return;
    setIsAnimating(true);
    setDirection("next");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating || movies.length <= 1) return;
    setIsAnimating(true);
    setDirection("prev");
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
      );
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 500);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showTrailer && !isAnimating) { // Only auto-slide when trailer isn't showing and not animating
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [movies, showTrailer, isAnimating]);

  // Function to get YouTube trailer URL based on movie title and year
  const getTrailerUrl = (movie) => {
    const searchQuery = `${movie.Title} ${movie.Year} official trailer`;
    return `https://www.youtube.com/embed?search=query&q=${encodeURIComponent(searchQuery)}&autoplay=1`;
  };

  if (loading) {
    return (
      <header className="bg-gray-900 text-white">
        <div className="container px-6 py-16 mx-auto text-center">
          <div className="w-16 h-16 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4">Loading movie data...</p>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="bg-gray-900 text-white">
        <div className="container px-6 py-16 mx-auto text-center">
          <p className="text-red-500">Error: {error}</p>
          <p className="mt-2">
            Please check your API key or network connection
          </p>
        </div>
      </header>
    );
  }

  if (movies.length === 0) {
    return (
      <header className="bg-gray-900 text-white">
        <div className="container px-6 py-16 mx-auto text-center">
          <p>No movies found</p>
        </div>
      </header>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <>
      <div className="relative rounded-lg block md:flex items-center bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-3xl mb-5 ">
        <div className={`aspect-[2/3] overflow-hidden transition-all duration-500 ${isAnimating ? 
          (direction === 'next' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0') : 
          'translate-x-0 opacity-100'}`}>
          <img
            alt={currentMovie.Title}
            className="w-full h-full object-cover transform transition-transform duration-500 rounded-md"
            src={
              currentMovie.Poster !== "N/A"
                ? currentMovie.Poster
                : "/api/placeholder/300/450"
            }
          />
        </div>
        <svg 
            className={`transition-all duration-500 hidden md:block absolute left-78 inset-y-0 h-full w-24 fill-[#101828] text-gray-100 -ml-12  ${isAnimating ? 
          (direction === 'next' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0') : 
          'translate-x-0 opacity-100'}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
        <div className="absolute inset-0 w-full h-full opacity-75 shadow-lg"></div>

        <div className={`w-full md:w-3/5 h-full flex items-center rounded-lg transition-all duration-500 ${isAnimating ? 
          (direction === 'next' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0') : 
          'translate-x-0 opacity-100'}`}>
          <div className="px-3 py-4 md:px-12 md:pr-24 md:pl-16">
            <h1 className="text-gray-200 text-3xl mb-3 font-semibold">{currentMovie.Title}</h1>
            <p className="text-gray-400">
              <span className="text-gray-900"></span> {currentMovie.Plot}
            </p>
            <div className="flex items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="ml-1 text-yellow-400 font-semibold">
                {currentMovie.imdbRating}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-200">{currentMovie.Year}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-200">{currentMovie.Runtime}</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {currentMovie.Genre && currentMovie.Genre.split(", ").map((genre, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-700 rounded-full text-white"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-gray-200">
                <span className="font-medium text-gray-200">Director:</span>{" "}
                {currentMovie.Director}
              </p>
              <p className="text-gray-200">
                <span className="font-medium text-gray-200">Starring:</span>{" "}
                {currentMovie.Actors}
              </p>
            </div>

            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowTrailer(true)}
                className="shadow-lg px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-gradient-to-br from-gray-900 to-blue-900 rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
              >
                Watch Trailer
              </button>
              <button 
                onClick={() => onMovieClick && onMovieClick(currentMovie.imdbID)}
                className="shadow-lg px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-gradient-to-bl from-gray-900 to-blue-900 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                See More
              </button>
            </div>
          </div>
          
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-[50%] z-10 bottom-[50%] left-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline disabled:opacity-50"
          disabled={isAnimating}
        >
          <span className="block" style={{ transform: "rotate(180deg)" }}>&#x279c;</span>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-[50%] z-10 bottom-[50%] right-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline disabled:opacity-50"
          disabled={isAnimating}
        >
          <span className="block">&#x279c;</span>
        </button>
      </div>

      {/* YouTube Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-75">
          <div className="relative w-full max-w-4xl mx-4 overflow-hidden">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowTrailer(false)}
                className="bg-white rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#000"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-black">
              <iframe
                className="w-full h-full"
                src={getTrailerUrl(currentMovie)}
                title={`${currentMovie.Title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;