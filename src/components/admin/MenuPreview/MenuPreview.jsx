import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function MenuPreview({ items, categories, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = items?.filter(item => selectedCategory === 'all' || item.category === selectedCategory);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Menu Preview</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex overflow-x-auto pb-4 mb-6 gap-2">
            <button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>All Items</button>
            {categories?.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>{cat}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems?.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2"><h3 className="text-lg font-semibold">{item.name}</h3><span className="text-xl font-bold text-blue-600">${item.price}</span></div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.is_available ? 'Available' : 'Out of Stock'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
