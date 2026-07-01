import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { authService } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await authService.login(email, password);

      setAdmin(data.admin);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-orange-600 italic">
            Ethio Buna
          </h2>
          <p className="text-gray-500 mt-2">Management Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your_example@gmail.com"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                name="forgot"
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2 shadow-lg shadow-orange-200"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-600">
          New manager?{' '}
          <Link
            to="/signup"
            className="text-orange-600 font-bold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
