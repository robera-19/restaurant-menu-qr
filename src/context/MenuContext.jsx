import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { menuService } from '../services/menuService';
import toast from 'react-hot-toast';

const MenuContext = createContext();

const menuReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MENU_ITEMS':
      return { ...state, items: action.payload, loading: false };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [action.payload, ...state.items] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, {
    items: [],
    categories: [],
    loading: true,
  });

  const loadMenuItems = async () => {
    try {
      const data = await menuService.getMenuItems();
      dispatch({ type: 'SET_MENU_ITEMS', payload: data });
    } catch (error) {
      console.error('Error loading menu:', error);
      toast.error('Failed to load menu');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadCategories = async () => {
    try {
      const data = await menuService.getCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: data });
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const addMenuItem = async (menuData) => {
    try {
      const newItem = await menuService.createMenuItem(menuData);
      dispatch({ type: 'ADD_ITEM', payload: newItem });
      toast.success('Menu item added successfully');
      return newItem;
    } catch (error) {
      toast.error('Failed to add menu item');
      throw error;
    }
  };

  const updateMenuItem = async (id, menuData) => {
    try {
      const updatedItem = await menuService.updateMenuItem(id, menuData);
      dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
      toast.success('Menu item updated successfully');
      return updatedItem;
    } catch (error) {
      toast.error('Failed to update menu item');
      throw error;
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await menuService.deleteMenuItem(id);
      dispatch({ type: 'DELETE_ITEM', payload: id });
      toast.success('Menu item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete menu item');
      throw error;
    }
  };

  useEffect(() => {
    loadMenuItems();
    loadCategories();
  }, []);

  return (
    <MenuContext.Provider value={{ 
      ...state, 
      loadMenuItems, 
      addMenuItem, 
      updateMenuItem, 
      deleteMenuItem 
    }}>
      {children}
    </MenuContext.Provider>
  );
};
