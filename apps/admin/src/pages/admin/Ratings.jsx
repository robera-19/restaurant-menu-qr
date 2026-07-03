import React, { useState, useEffect } from 'react';
import { ratingService } from '../../services/ratingService';
import AdminLayout from '../../components/AdminLayout';
import { useRatings } from '../../../hooks/useRatings';
import { Star, User, MessageSquare, Calendar, Loader2 } from 'lucide-react';

const Ratings = () => {
  const { data: feedbacks = [], isLoading: loading } = useRatings();
  return (
    <AdminLayout title="Customer Reviews">
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-orange-500" size={40} />
          </div>
        ) : (
          <div className="grid gap-6">
            {(feedbacks ?? []).map((f) => (
              <div
                key={f?.id || Math.random()}
                className="
                  bg-white 
                  p-8 
                  rounded-[2.5rem] 
                  border 
                  border-slate-100 
                  shadow-sm 
                  hover:shadow-md 
                  transition-all 
                  flex 
                  flex-col 
                  md:flex-row 
                  justify-between 
                  gap-6
                "
              >
                {/* Left Side */}
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 shrink-0">
                    <User size={28} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="font-black text-slate-800 uppercase tracking-tight">
                        {f?.customerName || 'Unknown'}
                      </h4>

                      <span className="text-[9px] bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                        {f?.menuItem?.name || 'N/A'}
                      </span>
                    </div>

                    <p className="text-slate-500 font-medium italic leading-relaxed">
                      "{f?.comment || 'The guest left no written comment.'}"
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1 text-slate-300 text-[10px] font-bold uppercase">
                        <Calendar size={12} />
                        {f?.createdAt
                          ? new Date(f.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </div>

                      <div className="flex items-center gap-1 text-slate-300 text-[10px] font-bold uppercase">
                        <MessageSquare size={12} />
                        Table: {f?.qrCode?.name || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex gap-1 text-yellow-400 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < (f?.ratingValue || 0) ? 'currentColor' : 'none'}
                      className={
                        i < (f?.ratingValue || 0)
                          ? 'text-yellow-400'
                          : 'text-slate-100'
                      }
                    />
                  ))}
                </div>
              </div>
            ))}

            {(feedbacks ?? []).length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                  No feedback received yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Ratings;
