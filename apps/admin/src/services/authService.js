import { apiClient } from '@ethio-buna/shared';

export const authService = {
  // 1. LOGIN
  login: async (email, password) => {
    const res = await apiClient.post('/auth/login', {
      email,
      password,
    });

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }

    return res.data;
  },

  // 2. REGISTER (Signup)
  register: async (userData) => {
    const res = await apiClient.post('/auth/register', userData);

    return res.data;
  },

  // 3. VERIFY EMAIL
  verifyEmail: async (token) => {
    const res = await apiClient.get(`/auth/verify-email?token=${token}`);

    return res.data;
  },

  // 4. FORGOT PASSWORD
  forgotPassword: async (email) => {
    const res = await apiClient.post('/auth/forgot-password', {
      email,
    });

    return res.data;
  },

  // 5. RESET PASSWORD
  resetPassword: async (token, password) => {
    const res = await apiClient.post('/auth/reset-password', {
      token,
      password,
    });

    return res.data;
  },

  // 6. GET CURRENT ADMIN PROFILE
  getMe: async () => {
    const res = await apiClient.get('/auth/me');

    return res.data.admin;
  },

  // 7. LOGOUT
  logout: () => {
    localStorage.removeItem('token');

    // Forces a clean state by redirecting to login
    window.location.href = '/login';
  },
};
