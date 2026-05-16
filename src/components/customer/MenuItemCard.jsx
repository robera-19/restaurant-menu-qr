import React, { useState } from 'react';
import { Flame, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const MenuItemCard = ({ item, index, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success(`${item.name} added to favorites!`, {
        duration: 1500,
        icon: '❤️'
      });
    } else {
      toast.success(`${item.name} removed from favorites`, {
        duration: 1500,
        icon: '💔'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(item)}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 transform"
    >
      <div className="relative">
        <img 
          src={item.image_url} 
          alt={item.name} 
          className="w-full h-32 sm:h-36 md:h-40 object-cover"
          loading="lazy"
        />
        
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-bold bg-red-600 px-2 py-1 rounded">Sold Out</span>
          </div>
        )}
        
        <button
          onClick={handleLike}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-md"
        >
          <Heart 
            size={16} 
            className={`transition-all duration-200 ${
              isLiked 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600 hover:text-red-400'
            }`}
          />
        </button>
        
        {item.spicy_level > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 rounded-full p-1 shadow-md">
            <Flame size={12} className="text-white" />
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-1 mb-2">
          {item.name}
        </h3>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-base sm:text-lg font-bold text-blue-600">
              ETB {item.price.toLocaleString()}
            </span>
            {item.original_price && (
              <span className="text-xs text-gray-400 line-through ml-1 hidden sm:inline">
                ETB {item.original_price.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {item.rating && (
              <div className="flex items-center gap-0.5">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs text-gray-600 font-medium">
                  {item.rating}
                </span>
              </div>
            )}
            {!item.rating && (
              <div className="flex items-center gap-0.5">
                <Star size={14} className="text-gray-300" />
                <span className="text-xs text-gray-400">0.0</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
