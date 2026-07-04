"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { roleHomePath } from "@/lib/user_auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), 
    });

    const data = await res.json();

    if (!res.ok) {
  
      throw new Error(data.error || "Login failed"); 
    }

    const role = data.role || null;
    router.push(roleHomePath(role));
    
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
    setError(message);
  } finally {
    setIsLoading(false);
  }
};
  
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm z-10">
        <div className="flex items-center gap-4">
          {/* Logo Placeholder */}
              <Image
                    src="/image.png"
                    alt="logo"
                    width={50}
                    height={50}
                  />
               
          <div>
            <h1 className="text-xl font-bold text-black leading-tight">
              Magic Sheet Portal
            </h1>
            <p className="text-xs text-gray-600 font-semibold">
              Students Placement Office, IIT Kanpur
            </p>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          
          <Link href="https://spo.iitk.ac.in/placement-coordinators" className="hover:text-indigo-600">Contact Us</Link>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-8 md:px-24 py-12 gap-12">
        
        {/* Left Side: Illustration */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          {/* Replace src with your actual illustration path in the public folder */}
          <div className="relative w-full max-w-lg aspect-video bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
            <Image
              src="/signin.gif"
              alt="Login Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <h3 className="text-2xl font-bold mb-1">Sign in to</h3>
            <p className="text-gray-500">Magic Sheet Portal , SPO </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">
                Email ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                placeholder="web25.student@spo.iitk"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-blue-50/50 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {/* Eye Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  )}
                  {!showPassword && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                </svg>
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-600 gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                Remember Me
              </label>
              
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5d7380] hover:bg-[#4a5e6a] text-white font-medium py-3 rounded-md transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

        
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#4d5e68] text-white py-12 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Important Links</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><Link href="#" className="hover:text-white">Student Placement Office</Link></li>
              <li><Link href="#" className="hover:text-white">IIT Kanpur Home</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Links</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><Link href="#" className="hover:text-white">Student Placement Office</Link></li>
              <li><Link href="#" className="hover:text-white">Support</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}