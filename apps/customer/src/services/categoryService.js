import { apiClient } from '@ethio-buna/shared';

export const categoryService = {
  getAll: async () => {
    const res = await apiClient.get('/categories');
    return res.data;
  },
};
