import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-indigo-950 from-20% via-sky-500 via-50% to-sky-950">
      <Helmet>
        <title>ScholarBridge | Error Page</title>
      </Helmet>
      <motion.h1
        className="text-6xl font-bold text-sky-950"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        Error...!!
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-sky-900 text-white rounded-lg shadow-md hover:bg-sky-950 focus:outline-none"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;