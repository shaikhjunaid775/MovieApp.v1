import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Retrieve stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      toast.success("Login successful!");
      setTimeout(() => navigate("/home"), 2000);
    } else {
      toast.error("Invalid email or password");
    }
  };
  localStorage.setItem(
    "userData",
    JSON.stringify({ email: "test@example.com", password: "Test@123", firstName: "Test", lastName: "test" })
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const backgroundCircleVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: {
      scale: [0.8, 1.2, 1],
      opacity: [0.5, 0.8, 0.6],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-500 to-blue-900 overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            variants={backgroundCircleVariants}
            initial="initial"
            animate="animate"
            custom={0}
          ></motion.div>
          <motion.div
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            variants={backgroundCircleVariants}
            initial="initial"
            animate="animate"
            custom={2}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 10,
              ease: "easeInOut",
              delay: 1
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            variants={backgroundCircleVariants}
            initial="initial"
            animate="animate"
            custom={1}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 12,
              ease: "easeInOut",
              delay: 2
            }}
          ></motion.div>
        </div>

        <motion.div
          className="relative z-10 w-full max-w-sm sm:max-w-md p-4 sm:p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="bg-white/20 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 sm:p-8">
              <div className="flex justify-center mb-3">
                <motion.h1
                  className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  CineScope
                </motion.h1>
              </div>
              <motion.div
                className="flex justify-center mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h2
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Welcome Back
                </motion.h2>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.div className="mb-4" variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-1 "
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/20 border border-white border-opacity-30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent px-4 py-2 text-white placeholder-white placeholder-opacity-60"
                    placeholder="john@example.com"
                    required
                  />
                </motion.div>

                <motion.div className="mb-4" variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white/20 border border-white border-opacity-30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent px-4 py-2 text-white placeholder-white placeholder-opacity-60"
                    placeholder="••••••••"
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/20 hover:bg-opacity-30 border border-white border-opacity-30 text-white font-medium py-3 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-md"
                  variants={itemVariants}
                >
                  Sign In
                </motion.button>
              </motion.form>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/register" className="text-white text-opacity-80">
                  Don't have an account?
                  <motion.button
                    className="text-white font-medium underline focus:outline-none hover:text-opacity-90"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.button>
                </Link>
              </motion.div>

              <AnimatePresence>
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link className="text-white text-opacity-80 text-sm hover:text-opacity-100">
                    Forgot your password?
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
