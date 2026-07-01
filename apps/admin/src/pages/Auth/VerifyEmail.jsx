import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { authService } from '../../services/authService';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  const hasRequested = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    const verify = async () => {
      if (hasRequested.current) return;
      hasRequested.current = true;

      try {
        await authService.verifyEmail(`${token}`);
        setStatus("success");

        // Show success for 2 seconds then redirect
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
      }
    };

    if (token) {
      verify();
    } else {
      setStatus("error");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg text-center border border-gray-100">
        {status === "verifying" && (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">
              Verifying your account...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="text-green-500 text-7xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-800">Verified!</h2>
            <p className="text-gray-500 mt-2">Your email has been confirmed.</p>
            <p className="text-xs text-gray-400 mt-4 italic">
              Redirecting to login...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="text-red-500 text-7xl mb-4">×</div>
            <h2 className="text-2xl font-bold text-gray-800">
              Verification Failed
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              The link is invalid, expired, or your account is already verified.
            </p>
            <Link
              to="/login"
              className="mt-8 inline-block w-full bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
