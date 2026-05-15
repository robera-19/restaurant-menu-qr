import api from './api';
import { mockMenuItems, mockCategories } from './mockData';

const USE_MOCK_DATA = true;

export const menuService = {
  getMenuItems: async (params) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockMenuItems;
    }
    const response = await api.get('/menu-items', { params });
    return response.data;
  },

  getMenuItem: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockMenuItems.find(item => item.id === parseInt(id));
    }
    const response = await api.get(`/menu-items/${id}`);
    return response.data;
  },

  createMenuItem: async (data) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newItem = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      mockMenuItems.push(newItem);
      return newItem;
    }
    const response = await api.post('/menu-items', data);
    return response.data;
  },

  updateMenuItem: async (id, data) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockMenuItems.findIndex(item => item.id === parseInt(id));
      if (index !== -1) {
        mockMenuItems[index] = { ...mockMenuItems[index], ...data };
        return mockMenuItems[index];
      }
      throw new Error('Item not found');
    }
    const response = await api.put(`/menu-items/${id}`, data);
    return response.data;
  },

  deleteMenuItem: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockMenuItems.findIndex(item => item.id === parseInt(id));
      if (index !== -1) {
        mockMenuItems.splice(index, 1);
        return { success: true };
      }
      throw new Error('Item not found');
    }
    const response = await api.delete(`/menu-items/${id}`);
    return response.data;
  },

  toggleAvailability: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const item = mockMenuItems.find(item => item.id === parseInt(id));
      if (item) {
        item.is_available = !item.is_available;
        return item;
      }
      throw new Error('Item not found');
    }
    const response = await api.patch(`/menu-items/${id}/availability`);
    return response.data;
  },

  getCategories: async () => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCategories;
    }
    const response = await api.get('/menu-items/categories');
    return response.data;
  },
};
