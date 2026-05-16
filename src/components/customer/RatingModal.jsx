import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const RatingModal = ({ isOpen, onClose, item, onSubmitRating }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const ratingData = {
      menu_item_id: item.id,
      rating_value: rating,
      comment: comment,
      customer_name: customerName || 'Anonymous',
      table_number: tableNumber || 'N/A',
      created_at: new Date().toISOString()
    };
    
    onSubmitRating(ratingData);
    toast.success('Thank you for your rating!');
    
    // Reset form
    setRating(0);
    setComment('');
    setCustomerName('');
    setTableNumber('');
    onClose();
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white p-4 border-b rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Rate This Item</h2>
                <p className="text-sm text-gray-500 mt-1">{item.name}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Rating Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Star Rating */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Rating *
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none transform transition-transform hover:scale-110"
                    >
                      <Star
                        size={40}
                        className={`${
                          (hoverRating || rating) >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        } transition-colors duration-150`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    You selected {rating} star{rating !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Customer Name (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">This will help us improve</p>
              </div>

              {/* Table Number (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Table Number (Optional)
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Table 5"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>

              {/* Comment (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback (Optional)
                </label>
                <textarea
                  className="input"
                  rows="4"
                  placeholder="Tell us what you think about this dish..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  'Submit Rating'
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingModal;
