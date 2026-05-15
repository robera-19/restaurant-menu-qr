import React, { useEffect, useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import { qrService } from '../../services/qrService';

export default function AdminDashboard() {
  const { items, loading } = useMenu();
  const [qrStats, setQrStats] = useState({ total: 0, scans: 0 });
  
  useEffect(() => {
    const loadQrStats = async () => {
      try {
        const qrCodes = await qrService.getQRCodes();
        setQrStats({
          total: qrCodes.length || 0,
          scans: qrCodes.reduce((sum, qr) => sum + (qr.scan_count || 0), 0)
        });
      } catch (error) {
        console.error('Error loading QR stats:', error);
      }
    };
    loadQrStats();
  }, []);

  const stats = [
    {
      title: 'Total Menu Items',
      value: loading ? '...' : items?.length || 0,
      icon: '📝',
      color: 'bg-blue-500'
    },
    {
      title: 'Active QR Codes',
      value: qrStats.total,
      icon: '📱',
      color: 'bg-green-500'
    },
    {
      title: 'Total Scans',
      value: qrStats.scans,
      icon: '👁️',
      color: 'bg-purple-500'
    },
    {
      title: 'Categories',
      value: '4',
      icon: '📂',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your restaurant management dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Menu Items</h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : items?.slice(0, 5).map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <p className="font-semibold text-gray-900">${item.price}</p>
              </div>
            ))}
            {(!items || items.length === 0) && !loading && (
              <p className="text-gray-500 text-center py-4">No menu items yet</p>
            )}
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="btn-primary w-full text-left flex items-center justify-between">
              <span>➕ Add New Menu Item</span>
              <span>→</span>
            </button>
            <button className="btn-secondary w-full text-left flex items-center justify-between">
              <span>📱 Generate QR Code</span>
              <span>→</span>
            </button>
            <button className="btn-success w-full text-left flex items-center justify-between">
              <span>📊 View Analytics</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
