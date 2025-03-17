import React from "react";

export const FilterDropdown = ({ filterType, setFilterType }) => {
  return (
    <div className="relative min-w-[150px]">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="block appearance-none w-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 text-black p-3 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
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
  );
};
