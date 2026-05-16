import React, { useState } from 'react';
import { Heart, Share2, AlertCircle, CheckCircle, Clock, Flame, Star, Minus, Plus, ChevronLeft, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import RatingModal from './RatingModal';

export default function ItemDetailModal({ item, onClose, onAddToCart, onRatingSubmit }) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  if (!item) return null;

  const nutritionInfo = item.nutrition || {
    calories: 'N/A',
    protein: 'N/A',
    carbs: 'N/A',
    fat: 'N/A'
  };

  const allergens = item.allergens || [];

  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      quantity,
      specialInstructions,
      totalPrice: item.price * quantity
    };
    onAddToCart(cartItem);
    toast.success(`${quantity}x ${item.name} added to cart!`, {
      duration: 2000,
      icon: '🛒'
    });
  };

  const handleRatingSubmit = (ratingData) => {
    if (onRatingSubmit) {
      onRatingSubmit(ratingData);
    }
    // Update local rating display
    toast.success('Rating submitted successfully!');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/75 z-50 flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img src={item.image_url} alt={item.name} className="w-full h-56 object-cover" />
            <button onClick={onClose} className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-full p-2">
              <ChevronLeft size={24} />
            </button>
            <motion.button 
              whileTap={{ scale: 0.9 }} 
              onClick={() => setIsLiked(!isLiked)} 
              className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2"
            >
              <Heart size={24} className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
            </motion.button>
          </div>

          <div className="p-5">
            <div className="mb-4">
              <div className="flex justify-between items-start gap-3">
                <h2 className="text-xl font-bold text-gray-900 flex-1">{item.name}</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">ETB {item.price.toLocaleString()}</div>
                  {item.original_price && <div className="text-xs text-gray-400 line-through">ETB {item.original_price.toLocaleString()}</div>}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {item.is_available ? (
                  <span className="inline-flex items-center gap-1 text-green-600 text-xs"><CheckCircle size={12} /> Available</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-600 text-xs"><AlertCircle size={12} /> Sold Out</span>
                )}
                {item.preparation_time && (
                  <span className="inline-flex items-center gap-1 text-gray-600 text-xs"><Clock size={12} /> {item.preparation_time} min</span>
                )}
                {item.spicy_level > 0 && (
                  <span className="inline-flex items-center gap-1 text-orange-600 text-xs"><Flame size={12} /> {'🌶️'.repeat(item.spicy_level)}</span>
                )}
                {item.rating && (
                  <span className="inline-flex items-center gap-1 text-yellow-600 text-xs">
                    <Star size={12} /> {item.rating} ⭐ ({item.total_ratings || 0} reviews)
                  </span>
                )}
              </div>
            </div>

            {/* Rating Button */}
            <div className="mb-5">
              <button
                onClick={() => setShowRatingModal(true)}
                className="w-full py-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-xl flex items-center justify-center gap-2 transition-colors border border-yellow-200"
              >
                <ThumbsUp size={18} />
                <span>Rate this item</span>
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Your feedback helps us improve!
              </p>
            </div>

            {item.description && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            )}

            {item.ingredients?.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-1.5">{item.ingredients.map((ing, idx) => <span key={idx} className="px-2 py-1 bg-gray-100 rounded-lg text-xs">{ing}</span>)}</div>
              </div>
            )}

            {allergens.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Allergens</h3>
                <div className="flex flex-wrap gap-1.5">{allergens.map((all, idx) => <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs">{all}</span>)}</div>
              </div>
            )}

            <div className="mb-5 p-3 bg-gray-50 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Nutrition Facts</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div><div className="text-base font-bold">{nutritionInfo.calories}</div><div className="text-xs text-gray-500">Calories</div></div>
                <div><div className="text-base font-bold">{nutritionInfo.protein}g</div><div className="text-xs text-gray-500">Protein</div></div>
                <div><div className="text-base font-bold">{nutritionInfo.carbs}g</div><div className="text-xs text-gray-500">Carbs</div></div>
                <div><div className="text-base font-bold">{nutritionInfo.fat}g</div><div className="text-xs text-gray-500">Fat</div></div>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Special Instructions</h3>
              <textarea className="input text-sm" rows="2" placeholder="Any special requests? (e.g., no onions, extra sauce)" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)} />
            </div>

            <div className="flex items-center justify-between gap-4 pt-3 border-t">
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"><Minus size={18} /></button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"><Plus size={18} /></button>
              </div>
              <button onClick={handleAddToCart} disabled={!item.is_available} className="flex-1 btn-primary py-3 text-sm disabled:opacity-50">Add to Cart • ETB {(item.price * quantity).toLocaleString()}</button>
            </div>

            <button onClick={() => { navigator.share?.({ title: item.name, text: item.description, url: window.location.href }); }} className="mt-4 text-gray-500 text-xs inline-flex items-center gap-1 w-full justify-center py-2"><Share2 size={14} /> Share this item</button>
          </div>
        </motion.div>
      </motion.div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        item={item}
        onSubmitRating={handleRatingSubmit}
      />
    </>
  );
}
