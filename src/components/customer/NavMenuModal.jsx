import React, { useState } from 'react';
import { Headphones, Phone, Globe, ChevronRight, LogOut, User, ArrowLeft, Heart, Bell, Home, Shield, Info, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavMenuModal = ({ isOpen, onClose, onSupportClick, onLanguageClick }) => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const mainMenuItems = [
    { id: 'home', icon: Home, label: 'Home', color: 'text-blue-600', action: () => window.location.href = '/' },
    { id: 'profile', icon: User, label: 'My Profile', color: 'text-blue-600' },
    { id: 'favorites', icon: Heart, label: 'Favorites', color: 'text-red-600' },
    { id: 'notifications', icon: Bell, label: 'Notifications', color: 'text-pink-600' },
    { id: 'admin', icon: Shield, label: 'Admin Dashboard', color: 'text-purple-600', action: () => window.location.href = '/admin' },
    { id: 'language', icon: Globe, label: 'Language', color: 'text-indigo-600', action: onLanguageClick },
    { id: 'support', icon: Headphones, label: 'Support', color: 'text-orange-600', action: onSupportClick },
    { id: 'contact', icon: Phone, label: 'Contact', color: 'text-red-600', action: onSupportClick },
    { id: 'about', icon: Info, label: 'About Us', color: 'text-teal-600' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-gray-600' },
  ];

  const handleMenuClick = (item) => {
    if (item.action) {
      item.action();
      onClose();
    } else if (item.id === 'profile') {
      setActiveSubMenu('profile');
    } else if (item.id === 'favorites') {
      setActiveSubMenu('favorites');
    } else if (item.id === 'notifications') {
      setActiveSubMenu('notifications');
    } else if (item.id === 'about') {
      setActiveSubMenu('about');
    } else if (item.id === 'settings') {
      setActiveSubMenu('settings');
    }
  };

  const handleBack = () => {
    setActiveSubMenu(null);
  };

  const renderMainMenu = () => (
    <>
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
      
      <div className="border-t p-4">
        <p className="text-xs text-center text-gray-400">Version 1.0.0</p>
      </div>
    </>
  );

  const renderProfileMenu = () => (
    <>
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

  const renderFavoritesMenu = () => (
    <>
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

      <div className="p-4 space-y-3">
        <div className="text-center py-12">
          <div className="text-6xl mb-3">❤️</div>
          <p className="text-gray-500">No favorites yet</p>
          <p className="text-sm text-gray-400 mt-1">Save your favorite items here</p>
        </div>
      </div>
    </>
  );

  const renderNotificationsMenu = () => (
    <>
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

      <div className="p-4 space-y-3">
        <div className="text-center py-12">
          <div className="text-6xl mb-3">🔔</div>
          <p className="text-gray-500">No notifications</p>
          <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
        </div>
      </div>
    </>
  );

  const renderAboutMenu = () => (
    <>
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
          <h2 className="text-lg font-semibold">About Us</h2>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="text-center">
          <div className="text-6xl mb-3">🍽️</div>
          <h3 className="text-xl font-bold text-gray-800">Ethio Buna</h3>
          <p className="text-gray-500 text-sm mt-1">Restaurant & Cafe</p>
        </div>
        <div className="border-t pt-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            Ethio Buna offers authentic Ethiopian cuisine with a modern twist. 
            We serve freshly prepared dishes made from the finest ingredients.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mt-3">
            Our mission is to provide an exceptional dining experience with 
            traditional flavors and warm hospitality.
          </p>
        </div>
      </div>
    </>
  );

  const renderSettingsMenu = () => (
    <>
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
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">Language</p>
            <p className="text-xs text-gray-500">Change app language</p>
          </div>
          <button 
            onClick={() => {
              onLanguageClick();
              setActiveSubMenu(null);
            }}
            className="text-blue-600 text-sm"
          >
            Change
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">Notifications</p>
            <p className="text-xs text-gray-500">Enable push notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="font-medium text-gray-800">Version</p>
          <p className="text-xs text-gray-500">1.0.0</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="font-medium text-gray-800">Privacy Policy</p>
          <p className="text-xs text-gray-500">View our privacy policy</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="font-medium text-gray-800">Terms of Service</p>
          <p className="text-xs text-gray-500">View our terms</p>
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
            {activeSubMenu === 'favorites' && renderFavoritesMenu()}
            {activeSubMenu === 'notifications' && renderNotificationsMenu()}
            {activeSubMenu === 'about' && renderAboutMenu()}
            {activeSubMenu === 'settings' && renderSettingsMenu()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMenuModal;
