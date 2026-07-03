import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAnalytics } from '../../../hooks/useAnalytics';
import {
  TrendingUp,
  Users,
  Clock,
  Award,
  Loader2,
  Star,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const { data, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <AdminLayout title="Analytics">
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="animate-spin text-orange-500" size={40} />
        </div>
      </AdminLayout>
    );
  }

  if (error || !data) {
    return (
      <AdminLayout title="Analytics">
        <div className="h-96 flex flex-col items-center justify-center text-center">
          <AlertCircle className="text-red-300 mb-3" size={40} />
          <p className="text-sm text-slate-500">Analytics not available</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Performance Analytics">
      <div className="space-y-10 animate-in fade-in duration-700">
        {/* KPI CARDS (Using Optional Chaining data?.prop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <Clock className="text-blue-500 mb-4" size={28} />
            <p className="text-3xl font-black text-slate-800">
              {data?.peakTime || '--:--'}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Busiest Scan Hour
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <Users className="text-green-500 mb-4" size={28} />
            <p className="text-3xl font-black text-slate-800">
              {data?.completionRate || 0}%
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Feedback Conversion
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <Award className="text-orange-500 mb-4" size={28} />
            <p className="text-3xl font-black text-slate-800 truncate">
              {data?.topDish || 'None'}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Top Rated Item
            </p>
          </div>
        </div>

        {/* POPULARITY RANKING */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">
              Dish Popularity Ranking
            </h3>
          </div>

          <div className="space-y-8">
            {data?.ranking?.length > 0 ? (
              data.ranking.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-3xl font-black text-slate-100 group-hover:text-orange-100 transition-colors">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-800 uppercase text-sm tracking-tight">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Based on {item.count} customer reviews
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900">
                        {item.avg}
                      </p>
                      <div className="flex text-yellow-400">
                        <Star size={10} fill="currentColor" />
                      </div>
                    </div>
                    <div className="w-24 md:w-48 h-2 bg-slate-50 rounded-full overflow-hidden hidden sm:block">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.avg / 5) * 100}%` }}
                        className="h-full bg-orange-500"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-300 py-10 font-bold uppercase text-xs tracking-widest">
                No ratings collected yet
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
