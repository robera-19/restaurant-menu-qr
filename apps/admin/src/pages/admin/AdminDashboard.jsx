import React, { useState, useEffect } from 'react';
// import { useMenu } from '../../context/MenuContext';
import {
  Utensils,
  Tag,
  QrCode,
  Plus,
  AlertCircle,
  Zap,
  MessageSquare,
  ArrowRight,
  Loader2,
  Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { analyticsService } from '../../services/analyticsService';

const AdminDashboard = () => {
  // 1. Local State for live analytics
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Live Data
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await analyticsService.getOverview();

        if (res?.success) {
          setData(res.data);
        } else if (res?.data?.success) {
          setData(res.data.data);
        } else if (res?.data) {
          setData(res.data);
        } else {
          console.log('Unexpected response:', res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  // 3. Loading View
  if (loading) {
    return (
      <AdminLayout title="Operational Overview">
        <div className="h-96 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-orange-600" size={40} />
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
            Syncing Live Data...
          </p>
        </div>
      </AdminLayout>
    );
  }

  // 4. Map real data to KPI cards
  const stats = [
    {
      label: "Today's Scans",
      value: data?.todayScans || 0,
      icon: Zap,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      label: 'Out of Stock',
      value: data?.outOfStock || 0,
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Total Categories',
      value: data?.totalCategories || 0,
      icon: Tag,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Total Dishes',
      value: data?.totalItems || 0,
      icon: Utensils,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
  ];

  return (
    <AdminLayout title="Operational Overview">
      <div className="space-y-10 animate-in fade-in duration-700">
        {/* KPI SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div
                className={`
                  ${stat.bg} ${stat.color} 
                  w-10 h-10 
                  rounded-2xl 
                  flex 
                  items-center 
                  justify-center 
                  mb-4
                `}
              >
                <stat.icon size={20} />
              </div>
              <p className="text-3xl font-black text-slate-800 leading-none">
                {stat.value}
              </p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* QUICK ACTIONS CARD */}
            <div className="bg-orange-600 rounded-[3rem] p-8 text-white shadow-xl shadow-orange-200 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Zap size={20} /> Quick Management
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <Link
                    to="/dashboard/menu"
                    className="bg-white/10 hover:bg-white/20 p-5 rounded-[1.5rem] transition-all group border border-white/5"
                  >
                    <Plus className="mb-2 group-hover:rotate-90 transition-transform" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-100">
                      Add New Dish
                    </p>
                  </Link>

                  <Link
                    to="/dashboard/qr"
                    className="bg-white/10 hover:bg-white/20 p-5 rounded-[1.5rem] transition-all group border border-white/5"
                  >
                    <QrCode className="mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-100">
                      Generate QR
                    </p>
                  </Link>

                  <Link
                    to="/dashboard/categories"
                    className="bg-white/10 hover:bg-white/20 p-5 rounded-[1.5rem] transition-all group border border-white/5"
                  >
                    <Tag className="mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-100">
                      New Category
                    </p>
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            </div>

            {/* REAL LATEST INVENTORY LIST */}
            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-slate-800 uppercase text-xs tracking-[0.3em]">
                  Recently Added
                </h3>
                <Link
                  to="/dashboard/menu"
                  className="text-orange-600 text-[10px] font-black flex items-center gap-1 uppercase tracking-widest hover:underline"
                >
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-4">
                {data?.latestInventory?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-slate-50/50 rounded-[1.8rem] hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.images?.[0]?.imageUrl.startsWith('http')
                            ? item.images[0].imageUrl
                            : `http://localhost:5000/${item.images?.[0]?.imageUrl}`
                        }
                        className="w-12 h-12 rounded-2xl object-cover bg-white"
                        alt={item.name}
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                          {item.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">
                          {item.category?.name || 'No Category'}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`
                        text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter
                        ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                      `}
                    >
                      {item.isAvailable ? 'Active' : 'Out'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT RATINGS WIDGET */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-800 uppercase text-sm tracking-widest flex items-center gap-2">
                <MessageSquare size={18} className="text-orange-500" />
                Recent Feedback
              </h3>
              {/* 👈 LINK TO THE FULL PAGE */}
              <Link
                to="/dashboard/ratings"
                className="text-orange-600 text-[10px] font-black uppercase hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-8">
              {/* Map through the latest 3 ratings from your data object */}
              {data?.recentRatings?.length > 0 ? (
                data.recentRatings.map((rating) => (
                  <div
                    key={rating.id}
                    className="border-b border-slate-50 pb-6 last:border-0"
                  >
                    <div className="flex gap-1 text-yellow-400 mb-2">
                      {[...Array(rating.ratingValue)].map((_, i) => (
                        <Star key={i} size={10} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-slate-800 leading-relaxed italic">
                      "{rating.comment || 'Excellent service!'}"
                    </p>
                    <p className="text-[9px] text-slate-400 mt-2 font-black uppercase tracking-widest">
                      By {rating.customerName} on {rating.menuItem?.name}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-300 py-10 font-bold text-xs uppercase italic">
                  No ratings today
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
