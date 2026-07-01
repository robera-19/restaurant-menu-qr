import { apiClient } from '@ethio-buna/shared';

export const qrService = {
  // Get all QR codes
  getAll: async () => {
    const res = await apiClient.get('/qr');
    return res.data;
  },

  // Create a QR code
  create: async (data) => {
    const res = await apiClient.post('/qr', data);
    return res.data;
  },

  // Get QR image
  getPrintableImage: async (shortId) => {
    const res = await apiClient.get(`/qr/${shortId}/image`);
    return res.data;
  },

  // Delete QR
  remove: async (id) => {
    const res = await apiClient.delete(`/qr/${id}`);
    return res.data;
  },
};
