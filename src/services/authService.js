import api from './api';

const USE_MOCK_DATA = true;

// Mock user for development
const mockUser = {
  id: 1,
  name: "Admin User",
  email: "admin@restaurant.com",
  role: "admin",
  avatar: "https://ui-avatars.com/api/?name=Admin+User&background=blue&color=white"
};

export const authService = {
  login: async (email, password) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (email && password) {
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { token, user: mockUser };
      }
      throw new Error('Invalid credentials');
    }
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    if (USE_MOCK_DATA) return mockUser;
    return null;
  },

  isAuthenticated: () => {
    if (USE_MOCK_DATA) return true;
    return !!localStorage.getItem('token');
  },
};
