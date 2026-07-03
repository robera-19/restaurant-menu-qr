import { useQuery } from '@tanstack/react-query';
import { ratingService } from '../src/services/ratingService';

export const useRatings = () => {
  return useQuery({
    queryKey: ['ratings'],
    queryFn: async () => {
      const res = await ratingService.getAdminFeedback('/ratings/admin/all');

      const payload = res?.data;
      const data = payload?.data ?? payload ?? [];

      return Array.isArray(data) ? data : [];
    },
    staleTime: 1000 * 60 * 2, // cache 2 min
    refetchOnWindowFocus: false,
  });
};
