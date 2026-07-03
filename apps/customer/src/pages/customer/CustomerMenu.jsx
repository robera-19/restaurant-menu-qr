import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { menuApi } from '@ethio-buna/shared';
import { motion, AnimatePresence } from 'framer-motion';

import MenuHeader from '../../components/customer/MenuHeader';
import CategoryFilter from '../../components/customer/CategoryFilter';
import FoodCard from '../../components/customer/FoodCard';
import ItemDetailModal from '../../components/customer/ItemDetailModal';
import RatingModal from '../../components/customer/RatingModal';
import SearchBar from '../../components/customer/SearchBar';
import { categoryService } from '../../services/categoryService';

const CustomerMenu = () => {
  const { shortId } = useParams();

  // --- States ---
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // --- Modal States ---
  const [selectedItem, setSelectedItem] = useState(null);
  const [ratingItem, setRatingItem] = useState(null);

  // Ref to prevent double-fetching in React Strict Mode
  const hasFetched = useRef(false);

  // --- 1. DATA INITIALIZATION ---
  useEffect(() => {
    const init = async () => {
      // Prevent unnecessary calls
      if (!shortId || hasFetched.current) return;
      hasFetched.current = true;

      try {
        setLoading(true);

        // Fetch data from backend
        const [menuRes, categoryRes] = await Promise.all([
          menuApi.getByQr(shortId),
          categoryService.getAll(),
        ]);

        const itemsArray =
          menuRes.data || (Array.isArray(menuRes) ? menuRes : []);
        const catsArray =
          categoryRes.data || (Array.isArray(categoryRes) ? categoryRes : []);

        setMenu(itemsArray);
        setCategories(catsArray);
      } catch (err) {
        console.error('Menu Load Error:', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [shortId]);

  // --- 2. DYNAMIC FILTERING ---
  const filtered = menu.filter((item) => {
    // Check category match (UUID vs UUID)
    const matchCat =
      activeCategory === 'all' || item.categoryId === activeCategory;

    // Check search match (Name or Description)
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-32 overflow-x-hidden">
      {/* BRANDING HEADER */}
      <MenuHeader />

      {/* SEARCH SECTION */}
      <div className="px-6 mb-4">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {/* CATEGORY NAV */}
      <CategoryFilter
        categories={categories}
        activeId={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* --- CONTENT AREA --- */}
      {loading ? (
        /* Loading Animation */
        <div className="flex h-96 flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">
            Fetching flavors...
          </p>
        </div>
      ) : (
        <>
          {filtered.length > 0 ? (
            /* Items Grid */
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-6"
            >
              {filtered.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <div className="text-center py-32 px-10">
              <h3 className="text-slate-800 font-black uppercase">
                Nothing Found
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Try another category or search term.
              </p>
            </div>
          )}
        </>
      )}

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {/* Full Dish Details */}
        {selectedItem && (
          <ItemDetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onRate={() => {
              setRatingItem(selectedItem);
              setSelectedItem(null);
            }}
          />
        )}

        {/* Feedback/Rating Popup */}
        {ratingItem && (
          <RatingModal item={ratingItem} onClose={() => setRatingItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerMenu;
