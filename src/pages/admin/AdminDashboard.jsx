import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  Utensils, QrCode, Menu, Plus, 
  Search, X, Activity, Tag, 
  BarChart3, Settings, FolderOpen, Layers,
  Upload, Menu as MenuIcon
} from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { items, categories, loading, deleteMenuItem } = useMenu();
  const [activeTab, setActiveTab] = useState('menu');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [uploadedImagePreview, setUploadedImagePreview] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setUploadedImagePreview(previewUrl);
      toast.success('Image uploaded successfully');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    maxFiles: 1
  });

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
                onClick={() => setShowAddModal(true)}
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

            {/* Items Grid */}
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredItems?.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-full h-32 object-cover rounded-lg mb-2" 
                    />
                    <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-bold text-blue-600">ETB {item.price}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.is_available ? 'Available' : 'Out'}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => {
                          setEditingItem(item);
                          setShowAddModal(true);
                        }} 
                        className="flex-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.id)} 
                        className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                      >
                        Delete
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

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">{editingItem ? 'Edit Item' : 'Add Item'}</h2>
                <button onClick={() => setShowAddModal(false)} className="p-1"><X size={20} /></button>
              </div>
              <div className="p-4 space-y-3">
                <input type="text" placeholder="Item Name" className="input text-sm" />
                <textarea placeholder="Description" className="input text-sm" rows="2" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Price" className="input text-sm" />
                  <select className="input text-sm"><option>Select Category</option></select>
                </div>
                <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer">
                  <input {...getInputProps()} />
                  {uploadedImagePreview ? (
                    <img src={uploadedImagePreview} alt="Preview" className="max-h-32 mx-auto rounded" />
                  ) : (
                    <><Upload className="mx-auto h-8 w-8 text-gray-400" /><p className="text-xs mt-1">Upload Image</p></>
                  )}
                </div>
                <button className="btn-primary w-full text-sm">{editingItem ? 'Update' : 'Add'} Item</button>
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
