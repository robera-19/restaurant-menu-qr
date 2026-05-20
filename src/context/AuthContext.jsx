import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock user data (replace with actual API calls)
const MOCK_USERS = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@ethiobuna.com',
    password: 'admin123',
    role: 'admin',
    createdAt: '2024-01-01'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resetTokens, setResetTokens] = useState({});

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
        toast.success('Login successful!');
        return { success: true, user: userWithoutPassword };
      } else {
        toast.error('Invalid email or password');
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  // Signup
  const signup = async (name, email, password, confirmPassword) => {
    try {
      // Validate
      if (!name || !email || !password) {
        toast.error('Please fill in all fields');
        return { success: false };
      }
      
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return { success: false };
      }
      
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return { success: false };
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      const userExists = MOCK_USERS.find(u => u.email === email);
      if (userExists) {
        toast.error('User already exists with this email');
        return { success: false };
      }
      
      // Create new user
      const newUser = {
        id: MOCK_USERS.length + 1,
        name,
        email,
        password,
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      
      MOCK_USERS.push(newUser);
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
      
      toast.success('Account created successfully!');
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  // Forgot Password - Send reset email
  const forgotPassword = async (email) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = MOCK_USERS.find(u => u.email === email);
      if (!user) {
        toast.error('No account found with this email');
        return { success: false };
      }
      
      // Generate reset token
      const resetToken = Math.random().toString(36).substring(2, 15);
      setResetTokens({ ...resetTokens, [email]: resetToken });
      
      // In real app, send email with reset link
      console.log(`Reset link: http://localhost:3000/reset-password?token=${resetToken}&email=${email}`);
      
      toast.success('Password reset link sent to your email!');
      return { success: true, token: resetToken };
    } catch (error) {
      toast.error('Failed to send reset link');
      return { success: false };
    }
  };

  // Reset Password
  const resetPassword = async (email, token, newPassword, confirmPassword) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        return { success: false };
      }
      
      if (newPassword.length < 6) {
        toast.error('Password must be at least 6 characters');
        return { success: false };
      }
      
      const storedToken = resetTokens[email];
      if (!storedToken || storedToken !== token) {
        toast.error('Invalid or expired reset token');
        return { success: false };
      }
      
      // Update password
      const userIndex = MOCK_USERS.findIndex(u => u.email === email);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex].password = newPassword;
        delete resetTokens[email];
        toast.success('Password reset successfully! Please login.');
        return { success: true };
      }
      
      toast.error('Failed to reset password');
      return { success: false };
    } catch (error) {
      toast.error('Failed to reset password');
      return { success: false };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };

  // Update profile
  const updateProfile = async (updates) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userIndex = MOCK_USERS.findIndex(u => u.id === user?.id);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates };
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully');
        return { success: true };
      }
      
      toast.error('Failed to update profile');
      return { success: false };
    } catch (error) {
      toast.error('Failed to update profile');
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      forgotPassword,
      resetPassword,
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
