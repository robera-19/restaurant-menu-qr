import { apiClient } from '@ethio-buna/shared';

export const analyticsService = {
  // Data for the main Dashboard Landing Page
  getOverview: async () => {
    const res = await apiClient.get('/analytics/overview');

    return res.data;
  },

  // Data for the deep Performance/KPI page
  getLiveStats: async () => {
    const res = await apiClient.get('/analytics/live');

    return res.data;
  },
};
