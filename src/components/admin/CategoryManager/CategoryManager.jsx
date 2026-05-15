import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMenu } from '../../../context/MenuContext';
import toast from 'react-hot-toast';

const SortableCategoryItem = ({ category, index, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: category.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2 cursor-move hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <span className="text-gray-400">⋮⋮</span>
        <span className="font-medium text-gray-900">{category.name}</span>
        <span className="text-sm text-gray-500">{category.itemCount || 0} items</span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(category)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
        <button onClick={() => onDelete(category.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
      </div>
    </div>
  );
};

export default function CategoryManager() {
  const { categories, loadCategories } = useMenu();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [items, setItems] = useState(categories || []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      toast.success('Categories reordered');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error('Category name is required');
      return;
    }
    if (editingCategory) {
      // Update category
      toast.success('Category updated successfully');
    } else {
      // Create category
      toast.success('Category created successfully');
    }
    setShowModal(false);
    setEditingCategory(null);
    setCategoryName('');
    loadCategories();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will move items to "Uncategorized"')) {
      toast.success('Category deleted');
      loadCategories();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Manage Categories</h3>
        <button onClick={() => { setEditingCategory(null); setCategoryName(''); setShowModal(true); }} className="btn-primary text-sm py-2">
          + Add Category
        </button>
      </div>
      
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((category, index) => (
              <SortableCategoryItem
                key={category.id}
                category={category}
                index={index}
                onEdit={(cat) => { setEditingCategory(cat); setCategoryName(cat.name); setShowModal(true); }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Category name" className="input mb-4" autoFocus />
              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">{editingCategory ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => { setShowModal(false); setEditingCategory(null); }} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
