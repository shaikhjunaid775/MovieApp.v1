import React from "react";

export const SearchBar = ({ query, setQuery, searchMovies }) => {
  return (
    <form onSubmit={searchMovies} className="flex-grow">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full p-2 pr-12 rounded-3xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 text-black placeholder-gray-600 focus:outline-none focus:ring-2  transition duration-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:to-blue-600 transition duration-300"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};