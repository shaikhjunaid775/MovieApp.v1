import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import toast from "react-hot-toast";

function Header({ query, setQuery, searchMovies, filterType, setFilterType }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("userData");
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the user data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData"); // Remove user data from localStorage
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <>
      <div className="fixed z-10 w-full bg-gray-900/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border-b border-gray-100 ">
        <div className=" px-6 py-3 mx-auto">
          <div className="flex justify-between md:items-center items-center">
            <motion.h1
              className="text-4xl font-bold   bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CineScope
            </motion.h1>
            {user ? (
              <div className="relative inline-block text-left md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2  text-sm tracking-wider text-white px-1 py-1 rounded-lg   transition-all duration-300 transform hover:scale-105  "
                >
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-6 h-6 rounded-full border border-white"
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700  cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 stroke-red-500" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="md:hidden">
                <button className=" shadow-lg text-sm tracking-wider text-white uppercase px-5 py-2 rounded-lg bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/50 hover:shadow-xl focus:outline-none relative overflow-hidden before:absolute before:inset-0 before:bg-blue-500/30 before:blur-md before:scale-125 before:opacity-0 hover:before:opacity-100 before:transition-opacity">
                  Login
                </button>
              </Link>
            )}

            <div className="hidden md:block">
              <div className="flex gap-3">
                <form onSubmit={searchMovies} className="flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for movies..."
                      className="w-full p-2 pr-12 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 text-black placeholder-gray-300  transition duration-300"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full  transition duration-300"
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
                    className="block appearance-none w-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 text-black p-2.5 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
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
                {user ? (
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center gap-2 text-sm tracking-wider text-white px-5 py-2 rounded-lg  transition-all duration-300 transform hover:scale-105  focus:outline-none"
                    >
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-white"
                      />
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700  cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 stroke-red-500" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login">
                    <button className=" shadow-lg text-sm tracking-wider text-white uppercase px-5 py-2 rounded-lg bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/50 hover:shadow-xl focus:outline-none relative overflow-hidden before:absolute before:inset-0 before:bg-blue-500/30 before:blur-md before:scale-125 before:opacity-0 hover:before:opacity-100 before:transition-opacity">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
