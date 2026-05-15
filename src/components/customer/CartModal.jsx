import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartModal = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) => {
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id, delta) => {
    const newQuantity = delta;
    if (newQuantity <= 0) {
      onRemoveItem(id);
    } else {
      onUpdateQuantity(id, newQuantity);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white rounded-t-3xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-4 border-b rounded-t-3xl flex justify-between items-center">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button onClick={onClose} className="p-2">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-3 pb-20">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="text-gray-500 text-sm">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {cart.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-between items-start gap-3 pb-3 border-b"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>
                        {item.specialInstructions && (
                          <p className="text-xs text-gray-400 mt-1">Note: {item.specialInstructions}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">ETB {(item.price * item.quantity).toLocaleString()}</p>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 text-xs mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-base">Total</span>
                      <span className="font-bold text-xl text-blue-600">ETB {cartTotal.toLocaleString()}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full text-center"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
