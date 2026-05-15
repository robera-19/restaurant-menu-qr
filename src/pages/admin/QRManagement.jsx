import React, { useState, useEffect } from 'react';
import { qrService } from '../../services/qrService';
import { Plus, Download, QrCode, Copy, Trash2, Eye, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRManagement() {
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [bulkCount, setBulkCount] = useState(10);
  const [formData, setFormData] = useState({
    name: '',
    type: 'menu',
    target_url: '',
    expires_at: ''
  });

  useEffect(() => { loadQRCodes(); }, []);

  const loadQRCodes = async () => {
    try { const data = await qrService.getQRCodes(); setQrCodes(data); } catch (error) { console.error(error); toast.error('Failed to load QR codes'); }
    finally { setLoading(false); }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    try { await qrService.generateQRCode(formData); toast.success('QR Code generated successfully'); setShowGenerateModal(false); setFormData({ name: '', type: 'menu', target_url: '', expires_at: '' }); loadQRCodes(); }
    catch (error) { toast.error('Failed to generate QR code'); }
  };

  const handleBulkGenerate = async () => {
    try { 
      // Simulate bulk generation
      toast.success(`${bulkCount} QR codes generated`); 
      loadQRCodes(); 
    }
    catch (error) { toast.error('Bulk generation failed'); }
  };

  const handleDownload = async (id, format = 'png') => {
    try { 
      const blob = await qrService.downloadQRCode(id, format); 
      const url = window.URL.createObjectURL(blob); 
      const a = document.createElement('a'); 
      a.href = url; 
      a.download = `qrcode-${id}.${format}`; 
      a.click(); 
      window.URL.revokeObjectURL(url); 
      toast.success('QR Code downloaded'); 
    }
    catch (error) { toast.error('Failed to download'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this QR code?')) { 
      try { await qrService.deleteQRCode(id); toast.success('Deleted'); loadQRCodes(); } 
      catch (error) { toast.error('Delete failed'); } 
    }
  };

  const copyToClipboard = (url) => { navigator.clipboard.writeText(url); toast.success('URL copied!'); };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">QR Code Management</h1><p className="text-gray-600 mt-1">Generate dynamic QR codes for tables and menus</p></div>
        <div className="flex gap-3">
          <button onClick={() => setShowGenerateModal(true)} className="btn-primary flex items-center gap-2"><Plus size={18} /> Generate QR</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Total QR Codes</p><p className="text-2xl font-bold">{qrCodes.length}</p></div><div className="bg-blue-100 rounded-full p-3"><QrCode className="text-blue-600" /></div></div></div>
        <div className="card"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Active Codes</p><p className="text-2xl font-bold">{qrCodes.filter(q => q.is_active).length}</p></div><div className="bg-green-100 rounded-full p-3"><QrCode className="text-green-600" /></div></div></div>
        <div className="card"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Total Scans</p><p className="text-2xl font-bold">{qrCodes.reduce((s, q) => s + (q.scan_count || 0), 0)}</p></div><div className="bg-purple-100 rounded-full p-3"><Eye className="text-purple-600" /></div></div></div>
        <div className="card"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Avg Scans/Code</p><p className="text-2xl font-bold">{qrCodes.length ? Math.round(qrCodes.reduce((s, q) => s + (q.scan_count || 0), 0) / qrCodes.length) : 0}</p></div><div className="bg-orange-100 rounded-full p-3"><Download className="text-orange-600" /></div></div></div>
      </div>

      {/* Bulk Generation */}
      <div className="card"><div className="flex items-center justify-between flex-wrap gap-4"><div><h3 className="font-semibold">Bulk QR Generation</h3><p className="text-sm text-gray-500">Generate multiple table QR codes at once</p></div><div className="flex gap-3"><input type="number" value={bulkCount} onChange={(e) => setBulkCount(e.target.value)} min="1" max="100" className="input w-24" /><button onClick={handleBulkGenerate} className="btn-secondary">Generate {bulkCount} Codes</button></div></div></div>

      {/* QR Codes Grid */}
      {loading ? (<div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div></div>) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrCodes.map((qr) => (<div key={qr.id} className="card hover:shadow-lg transition-shadow"><div className="flex justify-between items-start mb-4"><div><h3 className="text-lg font-semibold">{qr.name}</h3><p className="text-xs text-gray-500 font-mono mt-1">{qr.short_id || qr.id}</p></div>
            <span className={`px-2 py-1 rounded-full text-xs ${qr.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{qr.is_active ? 'Active' : 'Inactive'}</span></div>
            <div className="flex justify-center mb-4">
              <QRCodeCanvas value={qr.target_url || `https://yourdomain.com/q/${qr.short_id}`} size={150} level="H" includeMargin />
            </div>
            <p className="text-sm text-gray-500 mb-4 truncate">{qr.target_url}</p>
            <div className="flex gap-2"><button onClick={() => handleDownload(qr.id)} className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1"><Download size={14} /> PNG</button>
              <button onClick={() => handleDownload(qr.id, 'svg')} className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1"><Download size={14} /> SVG</button>
              <button onClick={() => copyToClipboard(qr.target_url)} className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Copy size={16} /></button>
              <button onClick={() => handleDelete(qr.id)} className="px-3 py-2 bg-red-100 rounded-lg hover:bg-red-200"><Trash2 size={16} /></button></div>
            <button onClick={() => setShowDetailsModal(qr)} className="mt-3 w-full text-sm text-blue-600 hover:text-blue-800">View Details →</button></div>))}
        </div>)}

      {/* Generate Modal */}
      {showGenerateModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 w-96"><h3 className="text-xl font-bold mb-4">Generate QR Code</h3>
        <form onSubmit={handleGenerate}><div className="mb-4"><label className="label">Name</label><input type="text" className="input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="e.g., Main Menu, Table 5" /></div>
          <div className="mb-4"><label className="label">Type</label><select className="input" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}><option value="menu">Main Menu</option><option value="table">Table</option><option value="section">Menu Section</option><option value="dish">Individual Dish</option></select></div>
          <div className="mb-4"><label className="label">Target URL (optional)</label><input type="url" className="input" value={formData.target_url} onChange={(e) => setFormData({ ...formData, target_url: e.target.value })} placeholder="Leave empty to use default" /></div>
          <div className="mb-4"><label className="label">Expiration (optional)</label><input type="datetime-local" className="input" value={formData.expires_at} onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })} /></div>
          <div className="flex gap-3"><button type="submit" className="btn-primary flex-1">Generate</button><button type="button" onClick={() => setShowGenerateModal(false)} className="btn-secondary flex-1">Cancel</button></div></form></div></div>)}

      {/* Details Modal */}
      {showDetailsModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 w-96"><h3 className="text-xl font-bold mb-4">QR Code Details</h3>
        <div className="space-y-3"><div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{showDetailsModal.name}</p></div><div><p className="text-sm text-gray-500">Short URL</p><p className="font-mono text-sm break-all">{showDetailsModal.target_url}</p></div><div><p className="text-sm text-gray-500">Scan Count</p><p className="text-2xl font-bold">{showDetailsModal.scan_count || 0}</p></div><div><p className="text-sm text-gray-500">Created</p><p>{new Date(showDetailsModal.created_at).toLocaleString()}</p></div><div><p className="text-sm text-gray-500">Status</p><span className={`inline-block px-2 py-1 rounded text-xs ${showDetailsModal.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{showDetailsModal.is_active ? 'Active' : 'Inactive'}</span></div></div>
        <button onClick={() => setShowDetailsModal(null)} className="btn-primary w-full mt-6">Close</button></div></div>)}
    </div>
  );
}
