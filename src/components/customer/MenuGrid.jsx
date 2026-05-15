import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuItemCard from './MenuItemCard';

const MenuGrid = ({ items, loading, onItemClick }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
        <p className="mt-4 text-gray-500 text-sm">Loading delicious food...</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-500 text-sm">No items found</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
    >
      <AnimatePresence>
        {items.map((item, index) => (
          <MenuItemCard
            key={item.id}
            item={item}
            index={index}
            onClick={onItemClick}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuGrid;
