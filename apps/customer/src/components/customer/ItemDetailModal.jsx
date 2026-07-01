import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Star,
  Info,
  ShieldAlert,
  TrendingDown,
  Leaf,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ItemDetailModal = ({ item, onClose, onRate }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const images = item?.images || [];

  // Auto-play the carousel smoothly
  useEffect(() => {
    if (!item || images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length, item]);

  if (!item) return null;

  const getImgUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/600';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000/${path.replace(/\\/g, '/')}`;
  };

  const discount = item.oldPrice
    ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
    : 0;

  return (
    <div
      className="
        fixed 
        inset-0 
        z-[100] 
        flex 
        items-end 
        md:items-center 
        justify-center 
        p-0 
        md:p-4
      "
    >
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        className="
          bg-white 
          w-full 
          max-w-2xl 
          h-[92vh] 
          md:h-auto 
          md:max-h-[90vh] 
          rounded-t-[3.5rem] 
          md:rounded-[4rem] 
          overflow-hidden 
          flex 
          flex-col 
          z-10 
          shadow-2xl
        "
      >
        {/* SECTION 1: INTERACTIVE CAROUSEL */}
        <div className="relative h-80 md:h-[450px] shrink-0 bg-slate-100 group">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              src={getImgUrl(images[activeIdx]?.imageUrl)}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover"
              alt={item.name}
            />
          </AnimatePresence>

          {/* Top Floating Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl shadow-sm border border-white/20">
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
                {item.category?.name || 'Dish'}
              </p>
            </div>
            {discount > 0 && (
              <div className="bg-green-500 text-white px-3 py-1 rounded-xl shadow-lg flex items-center gap-1 animate-bounce">
                <TrendingDown size={14} />
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {discount}% OFF
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-black/20 backdrop-blur-xl rounded-full text-white z-20"
          >
            <X size={24} />
          </button>

          {/* Carousel Nav Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveIdx(
                    (prev) => (prev - 1 + images.length) % images.length,
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-orange-600 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() =>
                  setActiveIdx((prev) => (prev + 1) % images.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-orange-600 transition-all"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIdx ? 'bg-orange-500 w-10' : 'bg-white/40 w-2'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* SECTION 2: SCROLLABLE INFO BODY */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 pb-32 custom-scrollbar">
          {/* Main Identity */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                {item.name}
              </h2>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <Clock size={14} /> {item.preparationTime || '0'} MINS
                </div>
                {item.spicyLevel > 0 && (
                  <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full text-[10px] font-black text-red-500 uppercase">
                    <Flame size={14} className="fill-current" /> SPICY{' '}
                    {item.spicyLevel}
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full text-[10px] font-black text-yellow-600 uppercase tracking-widest">
                  <Star size={14} className="fill-current" />{' '}
                  {item.ratingAverage || '0.0'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-orange-600">
                ETB {item.price}
              </p>
              {item.oldPrice && (
                <p className="text-sm text-slate-300 line-through font-bold">
                  ETB {item.oldPrice}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onRate}
            className="w-full py-5 rounded-[2rem] border-2 border-dashed border-orange-200 bg-orange-50/30 text-orange-600 font-black uppercase text-xs flex items-center justify-center gap-3 hover:bg-orange-100 transition-all active:scale-95 shadow-sm"
          >
            <Star size={18} /> Tap here to Rate this dish
          </button>

          {/* Description */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <Info size={14} /> The Story
            </h4>
            <p className="text-slate-600 leading-relaxed font-medium text-lg italic border-l-4 border-orange-100 pl-6 py-2">
              "{item.description || 'Our signature dish prepared with passion.'}
              "
            </p>
          </div>

          {/* NUTRITION PROFILE */}
          <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden">
            <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em] text-center mb-8">
              Nutrition Facts
            </h4>
            <div className="grid grid-cols-4 gap-6 relative z-10">
              {[
                { label: 'Cal', val: item.calories },
                { label: 'Prot', val: item.protein },
                { label: 'Carb', val: item.carbs },
                { label: 'Fat', val: item.fat },
              ].map((n, i) => (
                <div key={i} className="text-center group">
                  <p className="text-2xl font-black text-white group-hover:text-orange-500 transition-colors leading-none">
                    {n.val || '--'}
                  </p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-2 tracking-widest">
                    {n.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl"></div>
          </div>

          {/* INGREDIENTS & ALLERGENS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-10">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 ml-2">
                <Leaf size={14} className="text-green-500" /> Ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {item.ingredients?.length > 0 ? (
                  item.ingredients.map((ing, i) => (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      key={i}
                      className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 shadow-sm lowercase"
                    >
                      {ing}
                    </motion.span>
                  ))
                ) : (
                  <p className="text-xs text-slate-300 italic ml-2">
                    Fresh local produce
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em] flex items-center gap-2 ml-2">
                <ShieldAlert size={14} /> Allergen safety
              </p>
              <div className="flex flex-wrap gap-2">
                {item.allergens?.length > 0 ? (
                  item.allergens.map((all, i) => (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      key={i}
                      className="px-5 py-2.5 bg-red-50 rounded-2xl text-xs font-black text-red-600 shadow-sm border border-red-100 uppercase tracking-tighter"
                    >
                      {all}
                    </motion.span>
                  ))
                ) : (
                  <p className="text-[10px] text-green-500 font-bold uppercase ml-2 tracking-widest">
                    No allergens detected
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ItemDetailModal;
