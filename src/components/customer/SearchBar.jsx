import React from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <motion.div 
      className="px-4 pt-2 pb-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search food..."
          className="input pl-10 text-sm py-2 w-full bg-white/90 backdrop-blur-sm border-gray-200 focus:bg-white focus:border-blue-400 transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X size={18} className="text-gray-500 hover:text-gray-700 transition-colors" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;
