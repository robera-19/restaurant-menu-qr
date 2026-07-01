import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  FolderOpen,
  Edit3,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { menuApi } from "@ethio-buna/shared";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";
import { useMenu } from "../../context/MenuContext";

const Categories = () => {
  // Use global context to keep the whole app in sync
  const { categories, fetchData, loading } = useMenu();

  const [newName, setNewName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inline Editing State
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Ensure categories are loaded when page opens
  useEffect(() => {
    if (categories.length === 0) fetchData();
  }, []);

  // 1. CREATE CATEGORY (With Duplicate Check)
  const handleAdd = async (e) => {
    e.preventDefault();
    const cleanName = newName.trim();
    if (!cleanName) return;

    // Local Duplicate Check (Case-Insensitive)
    const exists = categories.some(
      (c) => c.name.toLowerCase() === cleanName.toLowerCase(),
    );

    if (exists) {
      return toast.error(`"${cleanName}" already exists!`, {
        icon: <AlertCircle className="text-red-500" />,
      });
    }

    setIsSubmitting(true);
    try {
      await menuApi.createCategory(cleanName);
      setNewName("");
      toast.success("Category added successfully");
      await fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. UPDATE CATEGORY (With Duplicate Check)
  const handleUpdate = async (id) => {
    const cleanEdit = editValue.trim();
    if (!cleanEdit) return setEditingId(null);

    // Check if the new name is taken by ANOTHER category
    const exists = categories.some(
      (c) => c.id !== id && c.name.toLowerCase() === cleanEdit.toLowerCase(),
    );

    if (exists) {
      return toast.error("Another category already has this name");
    }

    try {
      await menuApi.updateCategory(id, editValue);
      toast.success("Category updated");
      setEditingId(null);
      await fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // 3. DELETE CATEGORY
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this category? Items will remain but lose this label.",
      )
    )
      return;
    try {
      await menuApi.deleteCategory(id);
      toast.success("Category removed");
      await fetchData();
    } catch (error) {
      toast.error("Could not delete category");
    }
  };

  return (
    <AdminLayout title="Menu Categories">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* CREATE CARD */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] mb-4 ml-1">
              Add New Label
            </h3>
            <form onSubmit={handleAdd} className="flex gap-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Traditional Food, Hot Drinks..."
                className="flex-1 border-none bg-slate-50 p-4 rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-500 transition-all font-medium text-slate-700 placeholder:text-slate-300"
                required
              />
              <button
                disabled={isSubmitting}
                className="bg-orange-600 text-white px-10 rounded-2xl font-black uppercase tracking-tighter hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all active:scale-95 flex items-center justify-center min-w-[120px]"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={22} />
                ) : (
                  <>
                    <Plus size={22} className="mr-1" /> Add
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        </div>

        {/* LIST SECTION */}
        <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
              Organized Categories ({categories.length})
            </h3>
            {loading && (
              <Loader2 className="animate-spin text-orange-500" size={20} />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`flex justify-between items-center p-5 border rounded-[2rem] transition-all group ${
                  editingId === cat.id
                    ? "border-orange-500 ring-4 ring-orange-50 bg-white"
                    : "border-slate-100 bg-white hover:border-orange-200 hover:shadow-xl"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      editingId === cat.id
                        ? "bg-orange-600 text-white"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    <FolderOpen size={22} />
                  </div>

                  {editingId === cat.id ? (
                    <input
                      autoFocus
                      className="flex-1 bg-transparent border-none outline-none font-bold text-slate-800 text-lg"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleUpdate(cat.id)
                      }
                    />
                  ) : (
                    <span className="font-bold text-slate-700 text-lg tracking-tight uppercase">
                      {cat.name}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {editingId === cat.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        className="p-3 bg-green-500 text-white rounded-xl shadow-lg shadow-green-200 hover:bg-green-600 transition-all"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200 transition-all"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditValue(cat.name);
                        }}
                        className="p-3 text-slate-300 hover:text-orange-600 hover:bg-orange-50 rounded-2xl transition-all"
                        title="Edit Name"
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        title="Delete Category"
                      >
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {categories.length === 0 && !loading && (
              <div className="col-span-full text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                  The shelf is empty. Start adding categories!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Categories;
