import React, { useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import { Plus, Search, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import MenuCard from '../../components/admin/MenuCard';
import MenuFormModal from '../../components/admin/MenuFormModal';

export default function MenuManagement() {
  const { items, toggleAvailability, deleteMenuItem, loading } = useMenu();

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const itemsArray = Array.isArray(items) ? items : [];

  const filteredItems = itemsArray.filter((item) => {
    const name = item?.name?.toLowerCase() || '';
    const category = item?.category?.name?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    return name.includes(search) || category.includes(search);
  });

  if (loading) {
    return (
      <AdminLayout title="Menu Management">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-orange-500" size={48} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Menu Management">
      {/* HEADER */}
<div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

  {/* SEARCH */}
  <div className="relative w-full">
    <Search
      className="absolute left-4 top-3.5 text-slate-300"
      size={18}
    />

    <input
      type="text"
      placeholder="Search items..."
      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500/20 shadow-sm"
      onChange={(e) => setSearchTerm(e.target.value)}
      value={searchTerm}
    />
  </div>

  {/* BUTTON */}
  <button
    onClick={() => {
      setEditingItem(null);
      setShowModal(true);
    }}
    className="w-full md:w-auto bg-orange-600 text-white px-8 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-700 shadow-xl transition-all"
  >
    <Plus size={22} /> NEW DISH
  </button>

</div>

      {/* EMPTY */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl">
          No dishes found
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onDelete={deleteMenuItem}
            onToggle={toggleAvailability}
          />
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <MenuFormModal
          editItem={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
        />
      )}
    </AdminLayout>
  );
}
