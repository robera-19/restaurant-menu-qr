import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiClient as api } from '@ethio-buna/shared';
import toast from 'react-hot-toast';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [menuRes, catRes] = await Promise.all([
        api.get('/menu?adminView=true'),
        api.get('/categories'),
      ]);

      setItems(menuRes.data?.data || menuRes.data || []);
      setCategories(catRes.data?.data || catRes.data || []);
    } catch (error) {
      console.log(error);
      toast.error('Failed to sync with server');
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (payload) => {
    try {
      await api.post('/menu', payload);
      toast.success('Dish Published!');
      await fetchData();
    } catch (err) {
      throw err;
    }
  };

  const updateMenuItem = async (id, payload) => {
    try {
      await api.put(`/menu/${id}`, payload);
      toast.success('Dish Updated!');
      await fetchData();
    } catch (err) {
      throw err;
    }
  };

  const toggleAvailability = async (id, isAvailable) => {
    try {
      await api.patch(`/menu/${id}/toggle`, { isAvailable });

      setItems((prev) =>
        Array.isArray(prev)
          ? prev.map((item) =>
              item.id === id ? { ...item, isAvailable } : item,
            )
          : [],
      );

      toast.success('Status Updated');
    } catch (error) {
      toast.error('Toggle failed');
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await api.delete(`/menu/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Deleted');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        items,
        categories,
        loading,
        addMenuItem,
        updateMenuItem,
        toggleAvailability,
        deleteMenuItem,
        fetchData,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
