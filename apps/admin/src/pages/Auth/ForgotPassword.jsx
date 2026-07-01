import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, Send } from 'lucide-react';
import { authService } from '../../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await authService.forgotPassword({ email });
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
            <Mail size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Link Sent!</h2>
          <p className="text-gray-600">
            If an account exists for <span className="font-bold">{email}</span>,
            you will receive a password reset link shortly.
          </p>
          <Link
            to="/login"
            className="block w-full bg-orange-600 text-white py-3 rounded-xl font-bold shadow-lg"
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          No worries, we'll send you reset instructions.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 p-3 pl-10 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Send size={18} /> Send Reset Link
              </>
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-orange-600 font-medium"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
