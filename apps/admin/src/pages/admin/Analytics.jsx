import React, { useState, useEffect } from 'react';
import { analyticsService } from '../../services/analyticsService';
import AdminLayout from '../../components/AdminLayout';
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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await analyticsService.getLiveStats('/analytics/live');

        const payload = res?.data;

        // handle multiple backend shapes safely
        const finalData = payload?.data || payload || null;

        if (finalData) {
          setData(finalData);
        } else {
          setError('Failed to parse analytics data');
        }
      } catch (err) {
        setError('Could not connect to the analytics service');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // 1. Loading State
  if (loading)
    return (
      <AdminLayout title="Analytics">
        <div className="h-96 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-orange-500" size={40} />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            Calculating Live Metrics...
          </p>
        </div>
      </AdminLayout>
    );

  // 2. Error State (Prevents crashing if data is null)
  if (error || !data)
    return (
      <AdminLayout title="Analytics">
        <div className="h-96 flex flex-col items-center justify-center text-center px-10">
          <AlertCircle size={48} className="text-red-200 mb-4" />
          <h3 className="text-slate-800 font-bold text-lg">
            Analytics Unavailable
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            {error || 'No data received from server'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
          >
            Retry Connection
          </button>
        </div>
      </AdminLayout>
    );

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
