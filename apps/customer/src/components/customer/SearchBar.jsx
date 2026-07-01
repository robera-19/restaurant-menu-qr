import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
        size={20}
      />
      <input
        type="text"
        placeholder="Search for your favorite food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full 
          bg-slate-50 
          border-none 
          rounded-2xl 
          py-4 
          pl-12 
          pr-4 
          outline-none 
          focus:ring-2 
          focus:ring-orange-500/20 
          transition-all 
          font-medium 
          placeholder:text-slate-300
        "
      />
    </div>
  );
};

export default SearchBar;
