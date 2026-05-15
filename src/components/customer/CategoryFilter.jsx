import React from 'react';
import { motion } from 'framer-motion';

const categoryNames = {
  hot_drink: 'Hot Drinks',
  breakfast: 'Breakfast',
  marqaa: 'Marqaa',
  food: 'Food',
  lunch: 'Lunch',
  dinner: 'Dinner',
  burger: 'Burger',
  pizza: 'Pizza',
  traditional_food: 'Traditional Food',
  traditional_drink: 'Traditional Drink',
  sandwich: 'Sandwich',
  juice: 'Juice',
  softdrink: 'Soft Drink'
};

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide px-4 pb-3">
      <motion.div 
        className="flex gap-2 min-w-max"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelectCategory('all')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all backdrop-blur-md ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'bg-white/80 text-gray-800 hover:bg-white/90 backdrop-blur-sm hover:shadow-md'
          }`}
        >
          All
        </motion.button>
        {categories?.map((cat, index) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onSelectCategory(cat)}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all backdrop-blur-md ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'bg-white/80 text-gray-800 hover:bg-white/90 backdrop-blur-sm hover:shadow-md'
            }`}
          >
            {categoryNames[cat] || cat}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryFilter;
