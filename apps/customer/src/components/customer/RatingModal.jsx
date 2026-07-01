import React, { useState } from 'react';
import { Star, X, Check, Loader2, MessageSquareHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { customerRatingService } from '../../services/customerRatingService';
import toast from 'react-hot-toast';

const RatingModal = ({ item, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      return toast.error('Please select a star rating');
    }

    setLoading(true);

    try {
      await customerRatingService.submitFeedback({
        menuItemId: item.id,
        ratingValue: rating,
        customerName: name || 'Valued Guest',
        comment: comment,
      });

      setIsSuccess(true);

      // Auto-close after success message
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      toast.error('Could not submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed 
        inset-0 
        z-[110] 
        flex 
        items-center 
        justify-center 
        p-4
      "
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          absolute 
          inset-0 
          bg-slate-900/60 
          backdrop-blur-md
        "
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="
          bg-white 
          w-full 
          max-w-md 
          rounded-[3.5rem] 
          p-8 
          md:p-12 
          relative 
          z-10 
          text-center 
          shadow-2xl
        "
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="
            absolute 
            top-8 
            right-8 
            text-slate-300 
            hover:text-slate-900 
            transition-colors
          "
        >
          <X size={24} />
        </button>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col items-center">
                <div
                  className="
                    w-16 h-16 
                    bg-orange-50 
                    text-orange-500 
                    rounded-3xl 
                    flex 
                    items-center 
                    justify-center 
                    mb-4
                  "
                >
                  <MessageSquareHeart size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                  Rate your dish
                </h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                  {item?.name}
                </p>
              </div>

              {/* STAR SELECTOR */}
              <div className="flex justify-center gap-2 py-4">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onMouseEnter={() => setHover(v)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(v)}
                    className="transform transition-transform active:scale-90"
                  >
                    <Star
                      size={40}
                      className={`
                        transition-all duration-300
                        ${
                          v <= (hover || rating)
                            ? 'text-yellow-400 fill-current drop-shadow-md'
                            : 'text-slate-100'
                        }
                      `}
                    />
                  </button>
                ))}
              </div>

              {/* INPUT FIELDS */}
              <div className="space-y-4 pt-2">
                <div className="text-left space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-4">
                    Your Name (Optional)
                  </label>
                  <input
                    placeholder="Guest Name"
                    className="
                      w-full 
                      p-4 
                      bg-slate-50 
                      rounded-2xl 
                      outline-none 
                      font-bold 
                      text-slate-700 
                      placeholder:text-slate-300 
                      focus:ring-2 
                      focus:ring-orange-500/10 
                      transition-all
                    "
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="text-left space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-4">
                    Message to Manager
                  </label>
                  <textarea
                    placeholder="Tell us about your experience..."
                    rows="3"
                    className="
                      w-full 
                      p-4 
                      bg-slate-50 
                      rounded-3xl 
                      outline-none 
                      text-sm 
                      font-medium 
                      placeholder:text-slate-300 
                      resize-none 
                      focus:ring-2 
                      focus:ring-orange-500/10 
                      transition-all
                    "
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="
                    w-full 
                    bg-orange-600 
                    text-white 
                    py-5 
                    rounded-[2rem] 
                    font-black 
                    uppercase 
                    text-sm 
                    tracking-widest 
                    shadow-xl 
                    shadow-orange-200 
                    flex 
                    items-center 
                    justify-center 
                    gap-3 
                    hover:bg-orange-700 
                    active:scale-95 
                    transition-all
                  "
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Check size={20} />
                      Send Feedback
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            /* SUCCESS STATE */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10"
            >
              <div
                className="
                  w-20 h-20 
                  bg-green-100 
                  text-green-600 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  mx-auto 
                  mb-6
                "
              >
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                Thank You!
              </h3>
              <p className="text-slate-500 mt-2 font-medium">
                Your feedback helps us improve.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RatingModal;
