import api from './api';
import { mockQRCodes } from './mockData';

const USE_MOCK_DATA = true; // Set to false when backend is ready

export const qrService = {
  getQRCodes: async (params) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockQRCodes;
    }
    const response = await api.get('/qr-codes', { params });
    return response.data;
  },

  generateQRCode: async (data) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const newQR = {
        id: Date.now(),
        ...data,
        short_id: data.name.toLowerCase().replace(/\s/g, '-'),
        is_active: true,
        scan_count: 0,
        created_at: new Date().toISOString()
      };
      mockQRCodes.push(newQR);
      return newQR;
    }
    const response = await api.post('/qr-codes', data);
    return response.data;
  },

  getQRCode: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockQRCodes.find(qr => qr.id === parseInt(id));
    }
    const response = await api.get(`/qr-codes/${id}`);
    return response.data;
  },

  updateQRCode: async (id, data) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockQRCodes.findIndex(qr => qr.id === parseInt(id));
      if (index !== -1) {
        mockQRCodes[index] = { ...mockQRCodes[index], ...data };
        return mockQRCodes[index];
      }
      throw new Error('QR code not found');
    }
    const response = await api.put(`/qr-codes/${id}`, data);
    return response.data;
  },

  deleteQRCode: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockQRCodes.findIndex(qr => qr.id === parseInt(id));
      if (index !== -1) {
        mockQRCodes.splice(index, 1);
        return { success: true };
      }
      throw new Error('QR code not found');
    }
    const response = await api.delete(`/qr-codes/${id}`);
    return response.data;
  },

  downloadQRCode: async (id, format = 'png') => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Create a mock blob for download
      const blob = new Blob(['mock qr code data'], { type: 'image/png' });
      return blob;
    }
    const response = await api.get(`/qr-codes/${id}/download`, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },

  getQRAnalytics: async (id, period = 'week') => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        scans: Math.floor(Math.random() * 100),
        period: period,
        data: [12, 19, 3, 5, 2, 3, 7]
      };
    }
    const response = await api.get(`/qr-codes/${id}/analytics`, {
      params: { period },
    });
    return response.data;
  },

  bulkGenerate: async (data) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newQRCodes = [];
      for (let i = 1; i <= data.count; i++) {
        newQRCodes.push({
          id: Date.now() + i,
          name: `${data.prefix || 'table'} ${i}`,
          short_id: `${data.prefix || 'table'}-${i}`,
          target_url: `https://yourdomain.com/q/${data.prefix || 'table'}-${i}`,
          is_active: true,
          scan_count: 0,
          created_at: new Date().toISOString()
        });
      }
      mockQRCodes.push(...newQRCodes);
      return newQRCodes;
    }
    const response = await api.post('/qr-codes/bulk-generate', data);
    return response.data;
  }
};
