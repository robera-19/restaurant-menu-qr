import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center gap-3 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
        <span className="text-white text-xl">🍽️</span>
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-800">
          Ethio Buna
        </h1>
        <p className="text-xs text-gray-500">
          Restaurant & Cafe
        </p>
      </div>
    </motion.div>
  );
};

export default Logo;
