import React from 'react';
import { Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const FoodCard = ({ item, onClick }) => {
  // We only show the first image (primary) on the main menu grid
  const primaryImage = item.images?.[0];

  const getImgUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/500';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000/${path.replace(/\\/g, '/')}`;
  };

  return (
    <motion.div
      layout
      onClick={onClick}
      className="bg-white rounded-[2.8rem] p-5 border border-slate-100 shadow-sm active:scale-95 transition-all cursor-pointer hover:shadow-2xl hover:border-orange-200 group"
    >
      {/* 1. STATIC IMAGE SECTION */}
      <div className="relative h-64 w-full rounded-[2.2rem] overflow-hidden mb-5 bg-slate-50">
        <img
          src={getImgUrl(primaryImage?.imageUrl)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={item.name}
        />

        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-2xl shadow-sm border border-white/20">
          <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.15em]">
            {item.category?.name || 'General'}
          </p>
        </div>

        {item.spicyLevel > 0 && (
          <div className="absolute bottom-4 left-4 bg-red-600 p-2.5 rounded-2xl shadow-lg">
            <Flame size={16} className="text-white fill-current" />
          </div>
        )}
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="px-1 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-black text-slate-900 text-xl uppercase tracking-tighter leading-tight truncate flex-1">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-xl border border-yellow-100 shrink-0">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-xs font-black text-yellow-700">
              {item.ratingAverage || '0.0'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-medium line-clamp-1">
          {item.description || 'Experience the authentic taste of Ethiopia.'}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Available
            </span>
          </div>

          <div className="text-right">
            <p className="text-2xl font-black text-orange-600 leading-none">
              ETB {item.price}
            </p>
            {item.oldPrice &&
              parseFloat(item.oldPrice) > parseFloat(item.price) && (
                <p className="text-xs text-slate-300 line-through font-bold mt-1 tracking-tighter">
                  Was ETB {item.oldPrice}
                </p>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
