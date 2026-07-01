import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Loader2, CheckCircle } from "lucide-react";
import { authService } from '../../services/authService';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [passwords, setPass] = useState({ p1: "", p2: "" });
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.p1 !== passwords.p2)
      return setError("Passwords do not match");

    setIsLoading(true);
    setError("");
    try {
      await authService.resetPassword({
        token: searchParams.get("token"),
        password: passwords.p1,
      });
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Reset failed. Link may be expired.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={30} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Set New Password</h2>
        </div>

        {isSuccess ? (
          <div className="text-center space-y-4 py-4 animate-in fade-in zoom-in">
            <CheckCircle size={60} className="text-green-500 mx-auto" />
            <p className="text-gray-700 font-bold text-lg">Password Updated!</p>
            <p className="text-gray-500 text-sm">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
                {error}
              </div>
            )}

            <div className="relative">
              <input
                type={showP1 ? "text" : "password"}
                placeholder="New Password"
                required
                className="w-full border border-gray-300 p-3 pl-10 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setPass({ ...passwords, p1: e.target.value })}
              />
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <button
                type="button"
                onClick={() => setShowP1(!showP1)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showP1 ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showP2 ? "text" : "password"}
                placeholder="Confirm New Password"
                required
                className="w-full border border-gray-300 p-3 pl-10 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setPass({ ...passwords, p2: e.target.value })}
              />
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <button
                type="button"
                onClick={() => setShowP2(!showP2)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showP2 ? <EyeOff size={20} /> : <Eye size={20} />}
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
                "Update Password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
