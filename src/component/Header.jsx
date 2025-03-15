import React from "react";
import { motion } from "framer-motion";

function Header({ query, setQuery, searchMovies, filterType, setFilterType }) {
  return (
    <>
      <div class="fixed z-10 w-full bg-gray-900/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border-b border-gray-100 ">
        <div class=" px-6 py-3 mx-auto">
          <div class="flex flex-col md:flex-row md:justify-between md:items-center">
            <motion.h1
              className="text-4xl font-bold   bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CineScope
            </motion.h1>

            <div class="hidden md:block">
              <div className="flex gap-3">
                <form onSubmit={searchMovies} className="flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for movies..."
                      className="w-full p-2 pr-12 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:from-purple-600 hover:to-blue-600 transition duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                <div className="relative min-w-[150px]">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="block appearance-none w-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 text-black p-2.5 pr-8 rounded-2xl leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                  >
                    <option value="all">All</option>
                    <option value="popular">Popular</option>
                    <option value="latest">Latest</option>
                    <option value="top_rated">Top Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                    <svg
                      className="fill-black h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
