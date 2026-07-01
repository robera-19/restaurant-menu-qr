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
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [ratingItem, setRatingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  useEffect(() => {
    const init = async () => {
      if (!shortId || hasFetched.current) return;
      hasFetched.current = true;

      try {
        setLoading(true);

        const [menuRes, categoryRes] = await Promise.all([
          menuApi.getByQr(shortId),
          categoryService.getAll(),
        ]);

        setMenu(menuRes.data ?? menuRes ?? []);
        setCategories(categoryRes.data ?? categoryRes ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [shortId]);

  const filtered = menu.filter((item) => {
    const matchCat =
      activeCategory === 'all' || item.categoryId === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-32">
      <MenuHeader />
      <div className="px-6 mb-4">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <CategoryFilter
        categories={categories}
        activeId={activeCategory}
        onSelect={setActiveCategory}
      />

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
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
      )}

      <AnimatePresence>
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
        {ratingItem && (
          <RatingModal item={ratingItem} onClose={() => setRatingItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerMenu;
