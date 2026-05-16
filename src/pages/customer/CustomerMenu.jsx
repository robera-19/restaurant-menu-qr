import React, { useState, useEffect, useRef } from 'react';
import { useMenu } from '../../context/MenuContext';
import { AnimatePresence } from 'framer-motion';
import ItemDetailModal from '../../components/customer/ItemDetailModal';
import Header from '../../components/customer/Header';
import SearchBar from '../../components/customer/SearchBar';
import CategoryFilter from '../../components/customer/CategoryFilter';
import MenuGrid from '../../components/customer/MenuGrid';
import NavMenuModal from '../../components/customer/NavMenuModal';
import LanguageModal from '../../components/customer/LanguageModal';
import SupportModal from '../../components/customer/SupportModal';
import CartModal from '../../components/customer/CartModal';
import CartButton from '../../components/customer/CartButton';
import Footer from '../../components/customer/Footer';
import toast from 'react-hot-toast';

export default function CustomerMenu() {
  const { items, categories, loading } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredItems = items?.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.is_available;
  });

  const handleAddToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    console.log('Language changed to:', langCode);
  };

  const handleRatingSubmit = (ratingData) => {
    console.log('Rating submitted:', ratingData);
    toast.success(`Thank you for rating ${ratingData.rating_value} stars!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Header onMenuClick={() => setShowNavMenu(true)} />
        
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Modals */}
      <NavMenuModal 
        isOpen={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        onSupportClick={() => setShowSupport(true)}
        onLanguageClick={() => setShowLanguage(true)}
      />

      <LanguageModal 
        isOpen={showLanguage}
        onClose={() => setShowLanguage(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleLanguageChange}
      />

      <SupportModal 
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
      />

      <CartModal 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      {/* Main Content */}
      <main className="px-4 pb-32" style={{ paddingTop: `${headerHeight + 10}px` }}>
        <MenuGrid 
          items={filteredItems}
          loading={loading}
          onItemClick={setSelectedItem}
        />
        
        {(!filteredItems || filteredItems.length === 0) && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-sm">No items found</p>
            <button
              onClick={handleClearSearch}
              className="mt-4 text-blue-600 text-sm font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Button */}
      <CartButton 
        itemCount={cartItemCount}
        onClick={() => setShowCart(true)}
      />

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={handleAddToCart}
            onRatingSubmit={handleRatingSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
