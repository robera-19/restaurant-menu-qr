import { useQuery, useQueryClient } from '@tanstack/react-query';
import { menuApi } from '@ethio-buna/shared';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await menuApi.getCategories();
      return res; // already array
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return {
    categories: data,
    loading: isLoading,

    createCategory: async (name) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      const previous = queryClient.getQueryData(['categories']) || [];

      const temp = {
        id: Date.now().toString(),
        name,
      };

      queryClient.setQueryData(['categories'], [...previous, temp]);

      try {
        const res = await menuApi.createCategory(name);
        await queryClient.invalidateQueries({ queryKey: ['categories'] });
        return res;
      } catch (err) {
        queryClient.setQueryData(['categories'], previous);
        throw err;
      }
    },

    updateCategory: async ({ id, name }) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      const previous = queryClient.getQueryData(['categories']) || [];

      queryClient.setQueryData(['categories'], (old = []) =>
        old.map((c) => (c.id === id ? { ...c, name } : c)),
      );

      try {
        const res = await menuApi.updateCategory(id, name);
        return res;
      } catch (err) {
        queryClient.setQueryData(['categories'], previous);
        throw err;
      }
    },

    deleteCategory: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      const previous = queryClient.getQueryData(['categories']) || [];

      queryClient.setQueryData(
        ['categories'],
        previous.filter((c) => c.id !== id),
      );

      try {
        const res = await menuApi.deleteCategory(id);
        await queryClient.invalidateQueries({ queryKey: ['categories'] });
        return res;
      } catch (err) {
        queryClient.setQueryData(['categories'], previous);
        throw err;
      }
    },
  };
};
