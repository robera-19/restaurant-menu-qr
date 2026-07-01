import { apiClient } from '@ethio-buna/shared';

export const customerRatingService = {
  submitFeedback: async (feedbackData) => {
    const res = await apiClient.post('/ratings', feedbackData);

    return res.data;
  },

};
