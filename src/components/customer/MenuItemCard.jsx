import React from 'react';
import { Clock, Flame, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const MenuItemCard = ({ item, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(item)}
      className="bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl active:shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 transform"
    >
      <div className="relative">
        <img 
          src={item.image_url} 
          alt={item.name} 
          className="w-full h-32 sm:h-36 md:h-40 object-cover"
          loading="lazy"
        />
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white text-xs font-bold bg-red-600 px-2 py-1 rounded">Sold Out</span>
          </div>
        )}
        {item.spicy_level > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 rounded-full p-1 shadow-md">
            <Flame size={12} className="text-white" />
          </div>
        )}
        {item.preparation_time && (
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur rounded-full px-2 py-0.5">
            <span className="text-white text-xs flex items-center gap-1">
              <Clock size={10} /> {item.preparation_time} min
            </span>
          </div>
        )}
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-1">{item.name}</h3>
        <p className="text-gray-600 text-xs mt-1 line-clamp-2 hidden sm:block">{item.description}</p>
        <p className="text-gray-600 text-xs mt-1 line-clamp-1 block sm:hidden">{item.description?.substring(0, 40)}...</p>
        <div className="flex justify-between items-center mt-2">
          <div>
            <span className="text-sm sm:text-base font-bold text-orange-600">ETB {item.price.toLocaleString()}</span>
            {item.original_price && (
              <span className="text-xs text-gray-500 line-through ml-1 hidden sm:inline">ETB {item.original_price.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {item.rating && (
              <div className="flex items-center gap-0.5">
                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs text-gray-700">{item.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
