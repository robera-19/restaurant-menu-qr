import React, { useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Header = ({ onMenuClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="px-4 pt-4 pb-2 bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-md border-b border-white/30 shadow-xl"
    >
      <div className="flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', damping: 30 }}
        >
          <Logo />
        </motion.div>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={onMenuClick}
          className="relative p-2 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40 active:bg-white/50 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} className="text-gray-800" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MenuIcon size={20} className="text-gray-800" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Ripple effect */}
          <motion.span
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Header;
