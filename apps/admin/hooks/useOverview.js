import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../src/services/analyticsService';

export const useOverview = () => {
  return useQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      const res = await analyticsService.getOverview();

      const data = res?.data?.data || res?.data || res;

      return data;
    },
    staleTime: 1000 * 60 * 2, // 2 min cache
    refetchOnWindowFocus: false,
  });
};
