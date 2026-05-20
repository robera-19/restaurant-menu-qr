import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  Utensils, QrCode, Menu, Plus, 
  Search, X, Activity, Tag, 
  BarChart3, Settings, FolderOpen, Layers,
  Upload, Menu as MenuIcon, AlertCircle, Clock, Flame,
  Trash2, Eye, EyeOff
} from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { items, categories, loading, deleteMenuItem, updateMenuItem } = useMenu();
  const [activeTab, setActiveTab] = useState('menu');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Multiple images state
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImagePreviews, setUploadedImagePreviews] = useState([]);
  
  // Menu item form fields
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPreparationTime, setItemPreparationTime] = useState('');
  const [itemSpicyLevel, setItemSpicyLevel] = useState('0');
  const [itemIsAvailable, setItemIsAvailable] = useState(true);
  
  // Ingredients
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  
  // Allergens
  const [allergens, setAllergens] = useState([]);
  const [newAllergen, setNewAllergen] = useState('');
  
  // Nutrition facts
  const [nutrition, setNutrition] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} size should be less than 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      const newImages = [...uploadedImages, ...validFiles];
      const newPreviews = [...uploadedImagePreviews, ...validFiles.map(file => URL.createObjectURL(file))];
      
      setUploadedImages(newImages);
      setUploadedImagePreviews(newPreviews);
      toast.success(`${validFiles.length} image(s) added successfully`);
    }
  }, [uploadedImages, uploadedImagePreviews]);

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    setUploadedImagePreviews(uploadedImagePreviews.filter((_, i) => i !== index));
    toast.success('Image removed');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    maxFiles: 5
  });

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addAllergen = () => {
    if (newAllergen.trim()) {
      setAllergens([...allergens, newAllergen.trim()]);
      setNewAllergen('');
    }
  };

  const removeAllergen = (index) => {
    setAllergens(allergens.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setItemCategory('');
    setItemPreparationTime('');
    setItemSpicyLevel('0');
    setItemIsAvailable(true);
    setIngredients([]);
    setAllergens([]);
    setNutrition({ calories: '', protein: '', carbs: '', fat: '' });
    setUploadedImages([]);
    setUploadedImagePreviews([]);
    setEditingItem(null);
  };

  const handleAddItem = () => {
    if (!itemName || !itemPrice) {
      toast.error('Please fill in item name and price');
      return;
    }
    
    toast.success('Item added successfully!');
    resetForm();
    setShowAddModal(false);
  };

  // Toggle item visibility
  const handleToggleVisibility = async (item) => {
    const updatedItem = { ...item, is_available: !item.is_available };
    await updateMenuItem(item.id, updatedItem);
    toast.success(`${item.name} is now ${!item.is_available ? 'hidden from menu' : 'visible on menu'}`);
  };

  const stats = [
    { title: 'Menu Items', value: items?.length || 0, icon: Utensils, color: 'bg-blue-500' },
    { title: 'Categories', value: categories?.length || 0, icon: Tag, color: 'bg-green-500' },
    { title: 'QR Codes', value: '24', icon: QrCode, color: 'bg-purple-500' },
    { title: 'Total Scans', value: '1,284', icon: Activity, color: 'bg-orange-500' },
  ];

  const handleDeleteItem = async (id) => {
    if (window.confirm('Delete this item?')) {
      await deleteMenuItem(id);
      toast.success('Item deleted');
    }
  };

  const filteredItems = items?.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const tabs = [
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'qr', label: 'QR Codes', icon: QrCode },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-20">
        <div className="px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
            <p className="text-xs text-gray-500">Restaurant Manager</p>
          </div>
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <MenuIcon size={24} />
          </button>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:flex gap-1 px-4 pb-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Menu</h3>
                  <button onClick={() => setShowMobileMenu(false)} className="p-1">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`${stat.color} p-1.5 rounded-lg`}>
                  <stat.icon size={16} className="text-white" />
                </div>
              </div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Menu Management Tab */}
        {activeTab === 'menu' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-800">Menu Items</h2>
                <p className="text-xs text-gray-500">Manage your menu</p>
              </div>
              <button 
                onClick={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search items..."
                  className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-3 py-2 text-sm border rounded-lg bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Items Grid with Visibility Toggle */}
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredItems?.map((item) => (
                  <div key={item.id} className={`border rounded-lg p-3 ${!item.is_available ? 'opacity-75 bg-gray-50' : ''}`}>
                    <div className="relative">
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-full h-32 object-cover rounded-lg mb-2" 
                      />
                      {!item.is_available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                          <span className="text-white text-xs font-bold bg-red-600 px-2 py-1 rounded">Hidden</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-bold text-blue-600">ETB {item.price}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.is_available ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => handleToggleVisibility(item)}
                        className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1 ${
                          item.is_available 
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {item.is_available ? <EyeOff size={14} /> : <Eye size={14} />}
                        {item.is_available ? 'Hide' : 'Show'}
                      </button>
                      <button 
                        onClick={() => {
                          setEditingItem(item);
                          setShowAddModal(true);
                        }} 
                        className="flex-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.id)} 
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-gray-800">Categories</h2>
              <button onClick={() => setShowCategoryModal(true)} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1">
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories?.map((category, index) => (
                <div key={index} className="border rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FolderOpen size={20} className="text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">{category}</p>
                      <p className="text-xs text-gray-500">{items?.filter(i => i.category === category).length || 0} items</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-xs">Edit</button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR Codes Tab */}
        {activeTab === 'qr' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-base font-semibold text-gray-800 mb-3">QR Codes</h2>
            <div className="table-container overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Scans</th><th className="px-3 py-2 text-left">Status</th><th className="px-3 py-2 text-left">Actions</th></tr>
                </thead>
                <tbody>
                  <tr><td className="px-3 py-2">Main Menu</td><td className="px-3 py-2">456</td><td className="px-3 py-2"><span className="text-xs px-2 py-0.5 bg-green-100 rounded-full">Active</span></td><td className="px-3 py-2"><button className="text-blue-600">Edit</button></td></tr>
                  <tr><td className="px-3 py-2">Table 1</td><td className="px-3 py-2">89</td><td className="px-3 py-2"><span className="text-xs px-2 py-0.5 bg-green-100 rounded-full">Active</span></td><td className="px-3 py-2"><button className="text-blue-600">Edit</button></td></tr>
                  <tr><td className="px-3 py-2">Table 2</td><td className="px-3 py-2">67</td><td className="px-3 py-2"><span className="text-xs px-2 py-0.5 bg-green-100 rounded-full">Active</span></td><td className="px-3 py-2"><button className="text-blue-600">Edit</button></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-base font-semibold text-gray-800 mb-3">Analytics</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg"><p className="text-xs text-gray-600">Daily</p><p className="text-xl font-bold text-blue-600">234</p></div>
              <div className="text-center p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-600">Weekly</p><p className="text-xl font-bold text-green-600">1,456</p></div>
              <div className="text-center p-3 bg-purple-50 rounded-lg"><p className="text-xs text-gray-600">Monthly</p><p className="text-xl font-bold text-purple-600">5,234</p></div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-base font-semibold text-gray-800 mb-3">Settings</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Restaurant Name" className="input text-sm" defaultValue="Ethio Buna" />
              <input type="email" placeholder="Email" className="input text-sm" defaultValue="info@ethiobuna.com" />
              <input type="tel" placeholder="Phone" className="input text-sm" defaultValue="+251-XXX-XXXXXX" />
              <textarea placeholder="Address" className="input text-sm" rows="2">Bole Road, Addis Ababa</textarea>
              <button className="btn-primary w-full text-sm">Save Changes</button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                <button onClick={() => setShowAddModal(false)} className="p-1"><X size={20} /></button>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Basic Information */}
                <div className="space-y-3">
                  <h3 className="text-md font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                    <input type="text" className="input text-sm" placeholder="e.g., Doro Wat" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="input text-sm" rows="2" placeholder="Describe your dish..." value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (ETB) *</label>
                      <input type="number" className="input text-sm" placeholder="0.00" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select className="input text-sm" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories?.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Images (Multiple)</label>
                  <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
                    <input {...getInputProps()} />
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-xs text-gray-500 mt-1">Drag & drop or click to upload (Max 5 images)</p>
                    <p className="text-xs text-gray-400">Supports: JPG, PNG, GIF, WEBP (Max 5MB each)</p>
                  </div>
                  
                  {uploadedImagePreviews.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Images ({uploadedImagePreviews.length})</p>
                      <div className="grid grid-cols-3 gap-2">
                        {uploadedImagePreviews.map((preview, idx) => (
                          <div key={idx} className="relative group">
                            <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                            <button
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Preparation & Spiciness */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Clock size={14} /> Preparation Time (min)</label>
                    <input type="number" className="input text-sm" placeholder="e.g., 15" value={itemPreparationTime} onChange={(e) => setItemPreparationTime(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Flame size={14} /> Spicy Level</label>
                    <select className="input text-sm" value={itemSpicyLevel} onChange={(e) => setItemSpicyLevel(e.target.value)}>
                      <option value="0">Not Spicy</option>
                      <option value="1">Mild</option>
                      <option value="2">Medium</option>
                      <option value="3">Hot</option>
                      <option value="4">Very Hot</option>
                    </select>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" className="input text-sm flex-1" placeholder="e.g., Chicken, Berbere, Onions" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} />
                    <button type="button" onClick={addIngredient} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((ing, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center gap-1">
                        {ing}
                        <button type="button" onClick={() => removeIngredient(idx)} className="text-red-500 hover:text-red-700">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Allergens */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><AlertCircle size={14} /> Allergens</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" className="input text-sm flex-1" placeholder="e.g., Nuts, Dairy, Gluten" value={newAllergen} onChange={(e) => setNewAllergen(e.target.value)} />
                    <button type="button" onClick={addAllergen} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allergens.map((all, idx) => (
                      <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
                        {all}
                        <button type="button" onClick={() => removeAllergen(idx)} className="text-red-500 hover:text-red-700">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nutrition Facts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nutrition Facts (per serving)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" className="input text-sm" placeholder="Calories (e.g., 850)" value={nutrition.calories} onChange={(e) => setNutrition({ ...nutrition, calories: e.target.value })} />
                    <input type="text" className="input text-sm" placeholder="Protein (g)" value={nutrition.protein} onChange={(e) => setNutrition({ ...nutrition, protein: e.target.value })} />
                    <input type="text" className="input text-sm" placeholder="Carbs (g)" value={nutrition.carbs} onChange={(e) => setNutrition({ ...nutrition, carbs: e.target.value })} />
                    <input type="text" className="input text-sm" placeholder="Fat (g)" value={nutrition.fat} onChange={(e) => setNutrition({ ...nutrition, fat: e.target.value })} />
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="available" checked={itemIsAvailable} onChange={(e) => setItemIsAvailable(e.target.checked)} className="w-4 h-4" />
                  <label htmlFor="available" className="text-sm text-gray-700">Item is available for ordering</label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button onClick={handleAddItem} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                  <button onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Category Modal */}
      <AnimatePresence>
        {showCategoryModal && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCategoryModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">Add Category</h2>
                <button onClick={() => setShowCategoryModal(false)} className="p-1"><X size={20} /></button>
              </div>
              <div className="p-4 space-y-3">
                <input type="text" placeholder="Category Name" className="input text-sm" />
                <textarea placeholder="Description" className="input text-sm" rows="2" />
                <button className="btn-primary w-full text-sm">Add Category</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
