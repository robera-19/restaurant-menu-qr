import React from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import MenuImageCarousel from './MenuImageCarausel';

const MenuCard = ({ item, onEdit, onDelete, onToggle }) => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">
      {/* IMAGE */}
      <MenuImageCarousel images={item.images} />
      {/* CONTENT */}
      <div className="p-5 space-y-4">
        <div>
          <h2 className="text-lg font-black text-slate-800">{item.name}</h2>

          <p className="text-sm text-slate-500">{item.category?.name}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-600 font-black text-xl">
              ETB {item.price}
            </p>

            {item.oldPrice && (
              <p className="text-slate-400 line-through text-sm">
                ETB {item.oldPrice}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={item.isAvailable}
              onChange={() => onToggle(item.id, !item.isAvailable)}
              className="hidden"
            />

            {/* Toggle UI */}
            <div
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-all ${
                item.isAvailable ? 'bg-green-500' : 'bg-red-400'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all ${
                  item.isAvailable ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>

            <span className="text-xs font-bold text-slate-600">
              {item.isAvailable ? 'On' : 'Off'}
            </span>
          </label>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => onToggle(item.id, !item.isAvailable)}
            className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200"
          >
            {item.isAvailable ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>

          <button
            onClick={() => onEdit(item)}
            className="p-3 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
