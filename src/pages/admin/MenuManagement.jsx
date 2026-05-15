import React, { useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import { Plus, Search, Filter, Edit2, Trash2, Copy, Eye, Calendar, Download, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import CategoryManager from '../../components/admin/CategoryManager/CategoryManager';
import BulkActions from '../../components/admin/BulkActions/BulkActions';
import ScheduleManager from '../../components/admin/ScheduleManager/ScheduleManager';
import MenuPreview from '../../components/admin/MenuPreview/MenuPreview';

export default function MenuManagement() {
  const { items, categories, loading, deleteMenuItem, addMenuItem, updateMenuItem } = useMenu();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSchedule, setShowSchedule] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', original_price: '', category: '', 
    image_url: '', is_available: true, preparation_time: '', spicy_level: 0,
    ingredients: [], dietary_tags: [], allergens: [], rating: 0,
    nutrition: { calories: '', protein: '', carbs: '', fat: '' }
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [newDietaryTag, setNewDietaryTag] = useState('');
  const [newAllergen, setNewAllergen] = useState('');

  const filteredItems = items?.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error('Name and price are required');
      return;
    }
    if (editingItem) {
      await updateMenuItem(editingItem.id, formData);
    } else {
      await addMenuItem(formData);
    }
    setShowModal(false);
    setEditingItem(null);
    setFormData({ name: '', description: '', price: '', original_price: '', category: '', image_url: '', is_available: true, preparation_time: '', spicy_level: 0, ingredients: [], dietary_tags: [], allergens: [], rating: 0, nutrition: { calories: '', protein: '', carbs: '', fat: '' } });
  };

  const handleDuplicate = async (item) => {
    const duplicated = { ...item, name: `${item.name} (Copy)`, id: undefined };
    await addMenuItem(duplicated);
    toast.success('Item duplicated');
  };

  const handleExport = () => {
    const headers = ['Name', 'Category', 'Price', 'Original Price', 'Description', 'Available', 'Ingredients', 'Dietary Tags', 'Allergens', 'Prep Time', 'Spicy Level'];
    const csv = filteredItems.map(item => `${item.name},${item.category},${item.price},${item.original_price || ''},${item.description},${item.is_available},${(item.ingredients || []).join(';')},${(item.dietary_tags || []).join(';')},${(item.allergens || []).join(';')},${item.preparation_time || ''},${item.spicy_level || 0}`).join('\n');
    const blob = new Blob([headers + '\n' + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'menu-items.csv';
    a.click();
    toast.success('Export started');
  };

  const addIngredient = () => {
    if (newIngredient && !formData.ingredients.includes(newIngredient)) {
      setFormData({ ...formData, ingredients: [...formData.ingredients, newIngredient] });
      setNewIngredient('');
    }
  };

  const removeIngredient = (ing) => {
    setFormData({ ...formData, ingredients: formData.ingredients.filter(i => i !== ing) });
  };

  const addDietaryTag = () => {
    if (newDietaryTag && !formData.dietary_tags.includes(newDietaryTag)) {
      setFormData({ ...formData, dietary_tags: [...formData.dietary_tags, newDietaryTag] });
      setNewDietaryTag('');
    }
  };

  const removeDietaryTag = (tag) => {
    setFormData({ ...formData, dietary_tags: formData.dietary_tags.filter(t => t !== tag) });
  };

  const addAllergen = () => {
    if (newAllergen && !formData.allergens.includes(newAllergen)) {
      setFormData({ ...formData, allergens: [...formData.allergens, newAllergen] });
      setNewAllergen('');
    }
  };

  const removeAllergen = (allergen) => {
    setFormData({ ...formData, allergens: formData.allergens.filter(a => a !== allergen) });
  };

  const toggleSelect = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectAll = () => {
    if (selectedItems.length === filteredItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems?.map(i => i.id) || []);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Menu Management</h1><p className="text-gray-600 mt-1">Manage menu items with detailed information</p></div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="btn-secondary flex items-center gap-2"><Download size={18} /> Export</button>
          <button onClick={() => setShowPreview(true)} className="btn-secondary flex items-center gap-2"><Eye size={18} /> Preview</button>
          <button onClick={() => { setEditingItem(null); setFormData({ name: '', description: '', price: '', original_price: '', category: '', image_url: '', is_available: true, preparation_time: '', spicy_level: 0, ingredients: [], dietary_tags: [], allergens: [], rating: 0, nutrition: { calories: '', protein: '', carbs: '', fat: '' } }); setShowModal(true); }} className="btn-primary flex items-center gap-2"><Plus size={18} /> Add Item</button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /><input type="text" placeholder="Search menu items..." className="input pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="flex gap-3"><select className="input" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}><option value="all">All Categories</option>{categories?.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select>
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50"><Filter size={18} /></button></div>
        </div>
      </div>

      <div className="card"><CategoryManager /></div>

      <div className="card overflow-x-auto">
        <div className="mb-4 flex items-center gap-2"><input type="checkbox" checked={selectedItems.length === filteredItems?.length && filteredItems?.length > 0} onChange={selectAll} className="w-4 h-4" /><span className="text-sm text-gray-600">Select All</span></div>
        <table className="w-full">
          <thead className="border-b"><tr className="text-left text-gray-600"><th className="pb-3 w-12"></th><th className="pb-3">Name</th><th className="pb-3">Category</th><th className="pb-3">Price</th><th className="pb-3">Status</th><th className="pb-3">Details</th><th className="pb-3">Actions</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="7" className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div></td></tr> :
              filteredItems?.map((item) => (<tr key={item.id} className="border-b hover:bg-gray-50"><td className="py-3 w-12"><input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4" /></td>
                <td className="py-3"><div><p className="font-medium text-gray-900">{item.name}</p><p className="text-sm text-gray-500 line-clamp-1">{item.description?.substring(0, 50)}</p></div></td>
                <td className="py-3"><span className="px-2 py-1 bg-gray-100 rounded text-sm">{item.category}</span></td>
                <td className="py-3"><div className="font-semibold">${item.price}</div>{item.original_price && <div className="text-xs text-gray-400 line-through">${item.original_price}</div>}</td>
                <td className="py-3"><button className={`px-2 py-1 rounded text-xs ${item.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.is_available ? 'Available' : 'Out of Stock'}</button></td>
                <td className="py-3"><button onClick={() => setShowDetails(item)} className="text-info-600 hover:text-info-800 flex items-center gap-1"><Info size={16} /> View</button></td>
                <td className="py-3"><div className="flex gap-2"><button onClick={() => { setEditingItem(item); setFormData(item); setShowModal(true); }} className="text-blue-600 hover:text-blue-800"><Edit2 size={16} /></button>
                  <button onClick={() => handleDuplicate(item)} className="text-green-600 hover:text-green-800"><Copy size={16} /></button>
                  <button onClick={() => setShowSchedule(item)} className="text-purple-600 hover:text-purple-800"><Calendar size={16} /></button>
                  <button onClick={() => deleteMenuItem(item.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button></div></td></tr>))}
            {(!filteredItems || filteredItems.length === 0) && !loading && <tr><td colSpan="7" className="text-center py-8 text-gray-500">No menu items found. Click "Add Item" to create one.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Detailed View Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Item Details</h2>
              <button onClick={() => setShowDetails(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {showDetails.image_url && <img src={showDetails.image_url} alt={showDetails.name} className="w-full h-64 object-cover rounded-lg" />}
              <div><h3 className="text-2xl font-bold">{showDetails.name}</h3><p className="text-gray-600 mt-1">{showDetails.description}</p></div>
              <div className="grid grid-cols-2 gap-4"><div><p className="text-sm text-gray-500">Price</p><p className="text-xl font-bold text-blue-600">${showDetails.price}</p></div>
                {showDetails.original_price && <div><p className="text-sm text-gray-500">Original Price</p><p className="text-lg text-gray-400 line-through">${showDetails.original_price}</p></div>}
                <div><p className="text-sm text-gray-500">Category</p><p>{showDetails.category}</p></div>
                <div><p className="text-sm text-gray-500">Preparation Time</p><p>{showDetails.preparation_time || 'N/A'} minutes</p></div>
                <div><p className="text-sm text-gray-500">Spicy Level</p><p>{showDetails.spicy_level ? '🌶️'.repeat(showDetails.spicy_level) : 'Not spicy'}</p></div>
                <div><p className="text-sm text-gray-500">Rating</p><p>{showDetails.rating || 'Not rated'} ⭐</p></div></div>
              {showDetails.ingredients?.length > 0 && (<div><h4 className="font-semibold mb-2">Ingredients</h4><div className="flex flex-wrap gap-2">{showDetails.ingredients.map((ing, i) => <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-sm">{ing}</span>)}</div></div>)}
              {showDetails.dietary_tags?.length > 0 && (<div><h4 className="font-semibold mb-2">Dietary Information</h4><div className="flex flex-wrap gap-2">{showDetails.dietary_tags.map((tag, i) => <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">{tag}</span>)}</div></div>)}
              {showDetails.allergens?.length > 0 && (<div><h4 className="font-semibold mb-2">Allergens</h4><div className="flex flex-wrap gap-2">{showDetails.allergens.map((all, i) => <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">{all}</span>)}</div></div>)}
              {showDetails.nutrition && (<div><h4 className="font-semibold mb-2">Nutrition Facts</h4><div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg"><div className="text-center"><div className="font-bold">{showDetails.nutrition.calories || 'N/A'}</div><div className="text-xs text-gray-500">Calories</div></div><div className="text-center"><div className="font-bold">{showDetails.nutrition.protein || 'N/A'}g</div><div className="text-xs text-gray-500">Protein</div></div><div className="text-center"><div className="font-bold">{showDetails.nutrition.carbs || 'N/A'}g</div><div className="text-xs text-gray-500">Carbs</div></div><div className="text-center"><div className="font-bold">{showDetails.nutrition.fat || 'N/A'}g</div><div className="text-xs text-gray-500">Fat</div></div></div></div>)}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal with all fields */}
      {showModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"><div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"><h3 className="text-xl font-bold mb-4">{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
        <form onSubmit={handleSubmit}><div className="grid grid-cols-2 gap-4"><div className="col-span-2"><label className="label">Name *</label><input type="text" className="input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
          <div className="col-span-2"><label className="label">Description</label><textarea className="input" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
          <div><label className="label">Price *</label><input type="number" step="0.01" className="input" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required /></div>
          <div><label className="label">Original Price (for discount)</label><input type="number" step="0.01" className="input" value={formData.original_price} onChange={(e) => setFormData({ ...formData, original_price: e.target.value })} /></div>
          <div><label className="label">Category</label><select className="input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}><option value="">Select category</option>{categories?.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></div>
          <div><label className="label">Preparation Time (minutes)</label><input type="number" className="input" value={formData.preparation_time} onChange={(e) => setFormData({ ...formData, preparation_time: e.target.value })} /></div>
          <div><label className="label">Spicy Level (0-3)</label><select className="input" value={formData.spicy_level} onChange={(e) => setFormData({ ...formData, spicy_level: parseInt(e.target.value) })}><option value="0">Not Spicy</option><option value="1">Mild</option><option value="2">Medium</option><option value="3">Hot</option></select></div>
          <div><label className="label">Rating</label><input type="number" step="0.1" min="0" max="5" className="input" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} /></div>
          <div className="col-span-2"><label className="label">Image URL</label><input type="url" className="input" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} /></div>
          
          {/* Ingredients */}
          <div className="col-span-2"><label className="label">Ingredients</label><div className="flex gap-2 mb-2"><input type="text" className="input flex-1" placeholder="Add ingredient" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} /><button type="button" onClick={addIngredient} className="btn-primary">Add</button></div><div className="flex flex-wrap gap-2">{formData.ingredients.map((ing, idx) => (<span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">{ing}<button type="button" onClick={() => removeIngredient(ing)} className="text-red-600">✕</button></span>))}</div></div>

          {/* Dietary Tags */}
          <div className="col-span-2"><label className="label">Dietary Tags</label><div className="flex gap-2 mb-2"><input type="text" className="input flex-1" placeholder="e.g., vegetarian, vegan, gluten-free" value={newDietaryTag} onChange={(e) => setNewDietaryTag(e.target.value)} /><button type="button" onClick={addDietaryTag} className="btn-primary">Add</button></div><div className="flex flex-wrap gap-2">{formData.dietary_tags.map((tag, idx) => (<span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">{tag}<button type="button" onClick={() => removeDietaryTag(tag)} className="text-red-600">✕</button></span>))}</div></div>

          {/* Allergens */}
          <div className="col-span-2"><label className="label">Allergens</label><div className="flex gap-2 mb-2"><input type="text" className="input flex-1" placeholder="e.g., nuts, dairy, gluten" value={newAllergen} onChange={(e) => setNewAllergen(e.target.value)} /><button type="button" onClick={addAllergen} className="btn-primary">Add</button></div><div className="flex flex-wrap gap-2">{formData.allergens.map((all, idx) => (<span key={idx} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center gap-1">{all}<button type="button" onClick={() => removeAllergen(all)} className="text-red-600">✕</button></span>))}</div></div>

          {/* Nutrition */}
          <div className="col-span-2"><label className="label font-semibold">Nutrition Facts (per serving)</label><div className="grid grid-cols-4 gap-4"><div><label className="label text-xs">Calories</label><input type="text" className="input text-sm" placeholder="e.g., 250" value={formData.nutrition.calories} onChange={(e) => setFormData({ ...formData, nutrition: { ...formData.nutrition, calories: e.target.value } })} /></div>
            <div><label className="label text-xs">Protein (g)</label><input type="text" className="input text-sm" value={formData.nutrition.protein} onChange={(e) => setFormData({ ...formData, nutrition: { ...formData.nutrition, protein: e.target.value } })} /></div>
            <div><label className="label text-xs">Carbs (g)</label><input type="text" className="input text-sm" value={formData.nutrition.carbs} onChange={(e) => setFormData({ ...formData, nutrition: { ...formData.nutrition, carbs: e.target.value } })} /></div>
            <div><label className="label text-xs">Fat (g)</label><input type="text" className="input text-sm" value={formData.nutrition.fat} onChange={(e) => setFormData({ ...formData, nutrition: { ...formData.nutrition, fat: e.target.value } })} /></div></div></div>

          <div><label className="label flex items-center gap-2"><input type="checkbox" checked={formData.is_available} onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })} /> Available for ordering</label></div></div>
          <div className="flex gap-3 mt-6"><button type="submit" className="btn-primary flex-1">{editingItem ? 'Update' : 'Create'}</button><button type="button" onClick={() => { setShowModal(false); setEditingItem(null); }} className="btn-secondary flex-1">Cancel</button></div></form></div></div>)}

      {showSchedule && <ScheduleManager item={showSchedule} onClose={() => setShowSchedule(null)} onSave={(schedule) => { toast.success('Schedule saved'); setShowSchedule(null); }} />}
      {showPreview && <MenuPreview items={items} categories={categories} onClose={() => setShowPreview(false)} />}
      <BulkActions selectedItems={selectedItems} onClear={() => setSelectedItems([])} onRefresh={() => window.location.reload()} />
    </div>
  );
}
