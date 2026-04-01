"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeroBackground from "@/components/custom/ShaderBackground";
import { ROUTES } from "@/lib/routes";
import { useAuth } from "@/components/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading, error: authError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, authLoading, router]);

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", general: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({ email: "", password: "", general: "" });
      
      await login({
        email: formData.email,
        password: formData.password,
      });
      
      // Router push is handled in the auth provider's login function
    } catch (err: any) {
      console.error("Login error:", err);
      setErrors({
        email: "",
        password: "",
        general: err.message || authError || "Failed to login. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex lg:w-[55%] p-4 relative flex-col justify-end overflow-hidden">
        <div className="relative w-full h-full overflow-hidden flex flex-col justify-end p-12">
          {/* Gradient Background */}
          <div className="absolute inset-0 z-0 bg-(--color-primary)">
            <HeroBackground />
          </div>

          {/* Overlay Content */}
          <div className="relative z-10 w-full max-w-lg mb-8">
            <h1 className="text-6xl font-medium tracking-tight mb-6">
              Admin <br /> Portal
            </h1>
            <p className="text-white/60 text-lg max-w-sm">
              Access the admin dashboard to manage users and oversee all complaints.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-medium">Login</h2>
            <p className="text-white/50">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* General Error */}
            {errors.general && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-500">{errors.general}</p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs text-white/70 ml-1">Email</label>
              <Input
                placeholder="eg. quelldesk@gmail.com"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`${
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-xs text-red-500 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs text-white/70 ml-1">Password</label>
              <div className="relative">
                <Input
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  } pr-10`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 ml-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-md font-medium text-base mt-4"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
