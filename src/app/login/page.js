"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Login Page Component
 * Handles user authentication with hardcoded admin credentials
 * On successful login, redirects to dashboard
 * On failed login, displays error message
 */
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  /**
   * Handle login form submission
   * Validates credentials and navigates to dashboard on success
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setShowError(false);

    // Validate input fields
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      setShowError(true);
      return;
    }

    // Attempt login
    const isSuccess = login(username, password);
    if (isSuccess) {
      router.push("/dashboard");
    } else {
      setError(
        "Invalid credentials. Please try again. (Username: Admin, Password: 123456)"
      );
      setShowError(true);
      setPassword("");
    }
  };

  /**
   * Handle demo login - auto-fill correct credentials
   */
  const handleDemoLogin = () => {
    setUsername("Admin");
    setPassword("123456");
    setError("");
    setShowError(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-50">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">E-Commerce Store</h1>
          <p className="text-gray-600 mt-2">Admin Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Error Alert */}
          {showError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-in shake">
              <span className="text-xl">⚠️</span>
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Username Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all disabled:bg-gray-100"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={showError}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all disabled:bg-gray-100"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={showError}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-red-600 via-red-600 to-red-600 hover:from-red-700 hover:via-red-700 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 mt-6"
          >
            Login
          </button>
        </form>

        {/* Demo Login Helper */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center space-y-3">
          <p className="text-sm text-gray-600 font-semibold">
            Demo Credentials:
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg transition-all border border-blue-200"
          >
            Use Demo Credentials
          </button>
          <div className="space-y-1 text-xs text-gray-600">
            <div>
              Username: <strong className="text-gray-900">Admin</strong>
            </div>
            <div>
              Password: <strong className="text-gray-900">123456</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
