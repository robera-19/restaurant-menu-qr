import React from 'react';

const MenuHeader = () => {
  return (
    <header
      className="
        bg-white 
        pt-8 
        pb-4 
        px-6 
        sticky 
        top-0 
        z-40 
        border-b 
        border-slate-50
      "
    >
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        <div
          className="
            w-12 h-12 
            bg-orange-600 
            rounded-2xl 
            flex items-center justify-center 
            text-white font-black text-xl 
            shadow-xl shadow-orange-100
          "
        >
          EB
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
            Ethio Buna
          </h1>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            Traditional Taste
          </p>
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
