import { apiClient } from '@ethio-buna/shared';

export const ratingService = {
  // Fetch full guest reviews (Names + Comments)
  getAdminFeedback: async () => {
    const res = await apiClient.get('/ratings/admin/all');

    return res.data;
  },

  // Delete a review if it is inappropriate
  removeFeedback: async (id) => {
    const res = await apiClient.delete(`/ratings/${id}`);

    return res.data;
  },
};
