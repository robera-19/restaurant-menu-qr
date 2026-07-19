import React from 'react';
import { Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const FoodCard = ({ item, onClick }) => {
  const primaryImage = item.images?.[0];

  const getImgUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/400';
    if (path.startsWith('http')) return path;
    // Replace with your production URL when ready
    return `https://restaurant-menu-qr-system-production.up.railway.app/${path.replace(/\\/g, '/')}`;
  };

  return (
    <motion.div
      layout
      onClick={onClick}
      className="bg-white rounded-[2rem] p-3 border border-slate-100 shadow-sm active:scale-95 transition-all cursor-pointer hover:shadow-xl hover:border-orange-200 group flex flex-col h-full"
    >
      {/* 1. BALANCED IMAGE (Reduced height for grid) */}
      <div className="relative h-40 sm:h-48 w-full rounded-[1.5rem] overflow-hidden mb-3 bg-slate-50 shrink-0">
        <img
          src={getImgUrl(primaryImage?.imageUrl)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={item.name}
        />

        {/* Floating Category */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm border border-white/20">
          <p className="text-[8px] font-black text-orange-600 uppercase tracking-widest">
            {item.category?.name || 'Dish'}
          </p>
        </div>

        {item.spicyLevel > 0 && (
          <div className="absolute bottom-2 left-2 bg-red-600 p-1.5 rounded-xl shadow-lg">
            <Flame size={12} className="text-white fill-current" />
          </div>
        )}
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex justify-between items-start gap-1 mb-1">
          <h3 className="font-black text-slate-900 text-sm sm:text-base uppercase tracking-tighter leading-tight line-clamp-2">
            {item.name}
          </h3>
          <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded-lg border border-yellow-100 shrink-0">
            <Star size={10} className="text-yellow-500 fill-current" />
            <span className="text-[10px] font-black text-yellow-700">
              {item.ratingAverage || '0.0'}
            </span>
          </div>
        </div>

        {/* 3. PRICE SECTION */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
              Live
            </span>
          </div>

          <div className="text-right">
            <p className="text-base sm:text-lg font-black text-orange-600 leading-none">
              ETB {item.price}
            </p>
            {item.oldPrice &&
              parseFloat(item.oldPrice) > parseFloat(item.price) && (
                <p className="text-[9px] text-slate-300 line-through font-bold mt-0.5">
                  {item.oldPrice}
                </p>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
