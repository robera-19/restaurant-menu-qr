import React from 'react';
import { X, MapPin, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SupportModal = ({ isOpen, onClose }) => {
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
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b dark:border-gray-700 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customer Support</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Contact Us</h3>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin size={18} />
                  <span className="text-sm">Bole Road, Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Phone size={18} />
                  <span className="text-sm">+251-XXX-XXXXXX</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail size={18} />
                  <span className="text-sm">info@restaurant.com</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Support Hours</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mon-Sun, 8:00 AM - 10:00 PM</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">✓ Delivery Available</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">✓ Reservation Available</p>
              </div>

              <div className="pt-4 border-t dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Facebook
                  </button>
                  <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm">
                    Instagram
                  </button>
                  <button className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm">
                    Twitter
                  </button>
                </div>
              </div>

              <button onClick={onClose} className="btn-primary w-full">Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;
