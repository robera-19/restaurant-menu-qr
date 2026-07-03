import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../src/services/analyticsService';

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const res = await analyticsService.getLiveStats('/analytics/live');
      const payload = res?.data;
      return payload?.data || payload;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes cache (VERY important)
    refetchOnWindowFocus: false,
  });
};
