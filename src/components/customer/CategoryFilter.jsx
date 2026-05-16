import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const categoryNames = {
  hot_drink: 'Hot Drinks',
  breakfast: 'Breakfast',
  marqaa: 'Marqaa',
  food: 'Food',
  lunch: 'Lunch',
  dinner: 'Dinner',
  burger: 'Burger',
  pizza: 'Pizza',
  traditional_food: 'Traditional Food',
  traditional_drink: 'Traditional Drink',
  sandwich: 'Sandwich',
  juice: 'Juice',
  softdrink: 'Soft Drink'
};

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get selected category display name
  const getSelectedCategoryName = () => {
    if (selectedCategory === 'all') return 'All Categories';
    return categoryNames[selectedCategory] || selectedCategory;
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    setIsDropdownOpen(false);
  };

  // Desktop view - horizontal scroll buttons
  if (!isMobile) {
    return (
      <div className="w-full px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide pb-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            All
          </button>
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {categoryNames[cat] || cat}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Mobile view - dropdown
  return (
    <div className="w-full px-4 pb-3 relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg flex justify-between items-center shadow-sm"
      >
        <span className="text-sm font-medium text-gray-700">{getSelectedCategoryName()}</span>
        {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      {isDropdownOpen && (
        <div className="absolute top-full left-4 right-4 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
              selectedCategory === 'all' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
            }`}
          >
            All Categories
          </button>
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                selectedCategory === cat ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              {categoryNames[cat] || cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
