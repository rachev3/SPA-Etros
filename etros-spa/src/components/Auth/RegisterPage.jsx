import React, { useState, useActionState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialState = {
    error: null,
    success: false,
    passwordMatchError: false,
  };

  const [state, formAction, isPending] = useActionState(
    handleRegister,
    initialState
  );
  async function handleRegister(prevState, formData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      return { ...prevState, passwordMatchError: true };
    }

    try {
      await register({ username, email, password });
      navigate("/login");
      return { ...initialState, success: true };
    } catch (err) {
      return {
        ...prevState,
        error: err.message || "Registration failed.",
      };
    }
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Join <span className="text-yellow-500">Etros</span> Basketball
          </h2>
          <p className="mt-2 text-gray-600">
            Create your account to get started
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-black py-4 px-6">
            <h3 className="text-xl font-bold text-white">Register</h3>
            <div className="w-16 h-1 bg-yellow-400 mt-2"></div>
          </div>

          <div className="p-6">
            {/* Error message display */}
            {(state.error || state.passwordMatchError) && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {state.passwordMatchError
                  ? "Passwords do not match."
                  : state.error}
              </div>
            )}

            <form action={formAction} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                      state.passwordMatchError
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isPending}
                  className={`w-full py-3 px-4 bg-black hover:bg-gray-900 text-white font-bold rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
                    isPending ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isPending ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              {/* Sign in link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-purple-700 hover:text-purple-600"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
