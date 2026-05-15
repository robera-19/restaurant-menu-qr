import React, { useState, useEffect } from 'react';
import { qrService } from '../../services/qrService';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const qrCodes = await qrService.getQRCodes();
      const totalScans = qrCodes.reduce((sum, qr) => sum + (qr.scan_count || 0), 0);
      setAnalytics({
        totalQRCodes: qrCodes.length,
        totalScans: totalScans,
        activeQRCodes: qrCodes.filter(qr => qr.is_active).length,
        averageScans: qrCodes.length ? Math.round(totalScans / qrCodes.length) : 0
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: 'Total QR Codes', value: analytics?.totalQRCodes || 0, icon: '📱', color: 'bg-blue-500' },
    { title: 'Total Scans', value: analytics?.totalScans || 0, icon: '👁️', color: 'bg-green-500' },
    { title: 'Active QR Codes', value: analytics?.activeQRCodes || 0, icon: '✅', color: 'bg-purple-500' },
    { title: 'Avg Scans per QR', value: analytics?.averageScans || 0, icon: '📊', color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your QR code performance and customer engagement</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? '...' : stat.value}
                </p>
              </div>
              <div className={`${stat.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h2>
        <p className="text-gray-600">Advanced analytics features will be available when the backend is integrated:</p>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>📈 • Real-time scan tracking</li>
          <li>📍 • Geographic scan locations</li>
          <li>⏰ • Peak scan hours analysis</li>
          <li>📊 • Menu item popularity metrics</li>
          <li>📅 • Daily, weekly, monthly reports</li>
        </ul>
      </div>
    </div>
  );
}
