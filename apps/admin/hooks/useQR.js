import { useQuery } from '@tanstack/react-query';
import { qrService } from '../../admin/src/services/qrService';

export const useQR = () => {
  const query = useQuery({
    queryKey: ['qr-list'],
    queryFn: async () => {
      const res = await qrService.getAll();

      const data = res?.data ?? res;

      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.data)) return data.data;

      return [];
    },
    staleTime: 1000 * 60 * 2, // 2 min cache
    refetchOnWindowFocus: false,
  });

  return {
    qrs: query.data || [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
