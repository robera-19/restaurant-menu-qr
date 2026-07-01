import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { authService } from '../../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await authService.register(formData);
      setIsSubmitted(true); // Switch to success view
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-center">
            <CheckCircle2 size={80} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Check your email</h2>
          <p className="text-gray-600">
            We've sent a verification link to{' '}
            <span className="font-bold">{formData.email}</span>. Please verify
            your account to continue.
          </p>
          <Link
            to="/login"
            className="block w-full bg-orange-600 text-white py-3 rounded-xl font-bold"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Admin Registration
        </h2>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />

          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 p-3 pl-10 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already an admin?{' '}
          <Link
            to="/login"
            className="text-orange-600 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
