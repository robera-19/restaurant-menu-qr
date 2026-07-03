import React, { useState } from 'react';
import { qrService } from '../../services/qrService';
import { QrCode as QrIcon, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useQR } from '../../../hooks/useQR';
import toast from 'react-hot-toast';

export default function QRManagement() {
  const { qrs, loading, refetch } = useQR();
  const [name, setName] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await qrService.create({ name });

      toast.success('New Entry Created');
      setName('');

      refetch(); // 🔥 refresh data instantly
    } catch (err) {
      toast.error('Generation failed');
    }
  };

  const downloadQR = async (shortId, qrName) => {
    try {
      const result = await qrService.getPrintableImage(shortId);

      const link = document.createElement('a');
      link.href = result.image;
      link.download = `QR-${qrName}.png`;
      link.click();
    } catch (err) {
      toast.error('Download failed');
    }
  };

  return (
    <AdminLayout title="QR & Analytics">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-slate-800 uppercase tracking-tight">
            Generate Dynamic QR
          </h2>
          <form
            onSubmit={handleCreate}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Location name (e.g. Table 1, VIP-01...)"
              className="w-full flex-1 p-4 bg-slate-50 border-none rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-500 transition-all"
              required
            />
            <button className="w-full sm:w-auto bg-orange-600 text-white px-6 sm:px-10 py-4 rounded-2xl font-black hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all">
              GENERATE
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <Loader2 className="animate-spin mx-auto col-span-full mt-20" />
          ) : (
            qrs.map((qr) => (
              <div
                key={qr.id}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all"
              >
                <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <QrIcon size={40} />
                </div>
                <h3 className="font-black text-slate-800 uppercase tracking-tight">
                  {qr.name}
                </h3>
                <p className="text-[10px] font-mono text-slate-400 mb-6">
                  {qr.shortId}
                </p>

                <div className="w-full bg-slate-50 p-4 rounded-3xl mb-6">
                  <p className="text-3xl font-black text-slate-900 leading-none">
                    {qr._count?.scans || 0}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Total Scans
                  </p>
                </div>

                <button
                  onClick={() => downloadQR(qr.shortId, qr.name)}
                  className="w-full bg-slate-900 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95"
                >
                  Download PNG
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
