  import apiClient from './apiClient';
  export const menuApi = {
    // Get all dishes (Supports filtering by category/search)
    getAll: async (params) => {
      const res = await apiClient.get('/menu', { params });
      return res.data;
    },

    // Get a single dish for the Detail Popup
    getById: async (id) => {
      const res = await apiClient.get(`/menu/${id}`);
      return res.data;
    },

    // Get menu for a specific table (Used by Customer)
    getByQr: async (shortId) => {
      const res = await apiClient.get(`/menu/qr/${shortId}`);
      return res.data;
    },

    // Create new dish (Used by Admin)
    create: async (formData) => {
      const res = await apiClient.post('/menu', formData);
      return res.data;
    },

    // Update dish (Used by Admin)
    update: async (id, formData) => {
      const res = await apiClient.put(`/menu/${id}`, formData);
      return res.data;
    },

    // Toggle switch (Used by Admin)
    toggle: async (id, isAvailable) => {
      const res = await apiClient.patch(`/menu/${id}/toggle`, { isAvailable });
      return res.data;
    },

    // Permanent Delete (Used by Admin)
    remove: async (id) => {
      const res = await apiClient.delete(`/menu/${id}`);
      return res.data;
    },

      // =========================
    // CATEGORY METHODS 
    // =========================

    getCategories: async () => {
      const res = await apiClient.get('/categories');
      
      return res.data;
    },

    createCategory: async (name) => {
      const res = await apiClient.post('/categories', { 
        name 
      });
      
      return res.data;
    },

    updateCategory: async (id, name) => {
      const res = await apiClient.patch(`/categories/${id}`, { 
        name 
      });
      
      return res.data;
    },

    deleteCategory: async (id) => {
      const res = await apiClient.delete(`/categories/${id}`);
      
      return res.data;
    },
  };
