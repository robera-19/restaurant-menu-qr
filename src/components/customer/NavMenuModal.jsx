import React, { useState } from 'react';
import { X, Headphones, Phone, Globe, ChevronRight, LogOut, User, Settings, ArrowLeft, Star, History, CreditCard, HelpCircle, Bell, Home, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavMenuModal = ({ isOpen, onClose, onSupportClick, onLanguageClick }) => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeNestedMenu, setActiveNestedMenu] = useState(null);

  const mainMenuItems = [
    { id: 'home', icon: Home, label: 'Home', color: 'text-blue-600', action: () => onClose() },
    { id: 'profile', icon: User, label: 'My Profile', color: 'text-blue-600' },
    { id: 'orders', icon: ShoppingBag, label: 'My Orders', color: 'text-green-600' },
    { id: 'favorites', icon: Heart, label: 'Favorites', color: 'text-red-600' },
    { id: 'payments', icon: CreditCard, label: 'Payment Methods', color: 'text-purple-600' },
    { id: 'notifications', icon: Bell, label: 'Notifications', color: 'text-pink-600' },
    { id: 'language', icon: Globe, label: 'Language', color: 'text-indigo-600', action: onLanguageClick },
    { id: 'support', icon: Headphones, label: 'Support', color: 'text-orange-600', action: onSupportClick },
    { id: 'contact', icon: Phone, label: 'Contact', color: 'text-red-600', action: onSupportClick },
  ];

  const handleMenuClick = (item) => {
    if (item.action) {
      item.action();
      onClose();
    } else if (item.id === 'profile') {
      setActiveSubMenu('profile');
    } else if (item.id === 'orders') {
      setActiveSubMenu('orders');
    } else if (item.id === 'favorites') {
      setActiveSubMenu('favorites');
    } else if (item.id === 'payments') {
      setActiveSubMenu('payments');
    } else if (item.id === 'notifications') {
      setActiveSubMenu('notifications');
    }
  };

  const handleBack = () => {
    if (activeNestedMenu) {
      setActiveNestedMenu(null);
    } else {
      setActiveSubMenu(null);
    }
  };

  const renderMainMenu = () => (
    <>
      {/* User Profile Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <motion.div 
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl">👤</span>
          </motion.div>
          <div>
            <p className="font-semibold text-lg">Guest User</p>
            <p className="text-xs text-blue-100">Welcome to Ethio Buna</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white/20 rounded-lg py-2 text-sm font-medium hover:bg-white/30 transition-colors"
        >
          Sign In / Register
        </motion.button>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Main Menu
        </div>
        
        {mainMenuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleMenuClick(item)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
          >
            <item.icon size={20} className={item.color} />
            <span className="flex-1 text-left text-gray-700">{item.label}</span>
            <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        ))}
        
        <div className="border-t my-2"></div>
        
        <motion.button
          whileHover={{ x: 10 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 group text-red-600"
        >
          <LogOut size={20} />
          <span className="flex-1 text-left">Logout</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
      
      {/* Footer */}
      <div className="border-t p-4">
        <p className="text-xs text-center text-gray-400">Version 1.0.0</p>
      </div>
    </>
  );

  const renderProfileMenu = () => (
    <>
      {/* Back Button Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h2 className="text-lg font-semibold">My Profile</h2>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-4 space-y-4">
        <div className="flex flex-col items-center py-6">
          <motion.div 
            className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-4xl">👤</span>
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900">Guest User</h3>
          <p className="text-gray-500 text-sm">Member since 2024</p>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <label className="text-xs text-gray-500">Full Name</label>
            <p className="text-gray-900 font-medium">Guest User</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <label className="text-xs text-gray-500">Email</label>
            <p className="text-gray-900 font-medium">guest@ethiobuna.com</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <label className="text-xs text-gray-500">Phone</label>
            <p className="text-gray-900 font-medium">+251-XXX-XXXXXX</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full"
        >
          Edit Profile
        </motion.button>
      </div>
    </>
  );

  const renderOrdersMenu = () => (
    <>
      {/* Back Button Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h2 className="text-lg font-semibold">My Orders</h2>
        </div>
      </div>

      {/* Orders Content */}
      <div className="p-4 space-y-3">
        <div className="text-center py-12">
          <div className="text-6xl mb-3">📦</div>
          <p className="text-gray-500">No orders yet</p>
          <p className="text-sm text-gray-400 mt-1">Your orders will appear here</p>
        </div>
      </div>
    </>
  );

  const renderFavoritesMenu = () => (
    <>
      {/* Back Button Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h2 className="text-lg font-semibold">Favorites</h2>
        </div>
      </div>

      {/* Favorites Content */}
      <div className="p-4 space-y-3">
        <div className="text-center py-12">
          <div className="text-6xl mb-3">❤️</div>
          <p className="text-gray-500">No favorites yet</p>
          <p className="text-sm text-gray-400 mt-1">Save your favorite items here</p>
        </div>
      </div>
    </>
  );

  const renderPaymentsMenu = () => (
    <>
      {/* Back Button Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h2 className="text-lg font-semibold">Payment Methods</h2>
        </div>
      </div>

      {/* Payments Content */}
      <div className="p-4 space-y-3">
        <div className="text-center py-12">
          <div className="text-6xl mb-3">💳</div>
          <p className="text-gray-500">No payment methods added</p>
          <p className="text-sm text-gray-400 mt-1">Add your first payment method</p>
        </div>
      </div>
    </>
  );

  const renderNotificationsMenu = () => (
    <>
      {/* Back Button Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
      </div>

      {/* Notifications Content */}
      <div className="p-4 space-y-3">
        <div className="text-center py-12">
          <div className="text-6xl mb-3">🔔</div>
          <p className="text-gray-500">No notifications</p>
          <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
        </div>
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-start"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white w-80 h-full overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {activeSubMenu === null && renderMainMenu()}
            {activeSubMenu === 'profile' && renderProfileMenu()}
            {activeSubMenu === 'orders' && renderOrdersMenu()}
            {activeSubMenu === 'favorites' && renderFavoritesMenu()}
            {activeSubMenu === 'payments' && renderPaymentsMenu()}
            {activeSubMenu === 'notifications' && renderNotificationsMenu()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMenuModal;
