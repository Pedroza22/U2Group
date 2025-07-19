"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_LOGIN = "/api/auth/login/";
const API_REGISTER = "/api/auth/register/";
const API_RESET = "/api/auth/password/reset/";
const PRIVACY_URL = "/privacidad";

export default function LoginRegisterPage() {
  const [panel, setPanel] = useState<"login" | "register" | "reset">("login");
  const [isAnimating, setIsAnimating] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginAccepted, setLoginAccepted] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerAccepted, setRegisterAccepted] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetError, setResetError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const switchPanel = (newPanel: "login" | "register" | "reset") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPanel(newPanel);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!loginAccepted) {
      setLoginError("You must accept the data policy.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: loginEmail,
          password: loginPassword 
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Invalid credentials");
      localStorage.setItem("token", data.access);
      
      // Obtener la URL de redirección de los parámetros de la URL
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get("redirect") || "/marketplace";
      router.push(redirectUrl);
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    if (!registerAccepted) {
      setRegisterError("You must accept the data policy.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: registerName,
          email: registerEmail, 
          password: registerPassword,
          profile: {
            accepted_policies: registerAccepted
          }
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.details) {
          const errorMessage = Object.entries(data.details)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
          throw new Error(errorMessage);
        }
        throw new Error(data.error || "Registration failed");
      }
      localStorage.setItem("token", data.access);
      
      // Obtener la URL de redirección de los parámetros de la URL
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get("redirect") || "/marketplace";
      router.push(redirectUrl);
    } catch (err: any) {
      setRegisterError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset handler
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMsg("");
    setResetError("");
    setLoading(true);
    try {
      const res = await fetch(API_RESET, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Could not send email");
      setResetMsg("If the email exists, you'll receive instructions to reset your password.");
    } catch (err: any) {
      setResetError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[900px] h-[550px] bg-white rounded-[2rem] shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Left Side - Blue Panel */}
          <div className={`relative transition-transform duration-1000 ease-in-out ${
            panel === "register" ? "translate-x-0" : "translate-x-full"
          }`}>
            <div className="absolute inset-0 bg-[#0D00FF] rounded-r-[8rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0D00FF] to-[#2563eb] opacity-50" />
            </div>
            
            <div className="relative z-10 h-full flex items-center justify-center text-center px-12">
              <div className="max-w-[320px]">
                <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
                <p className="text-white text-lg mb-8">To keep connected with us please login with your personal info.</p>
                <button 
                  className="px-12 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  onClick={() => switchPanel("login")}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div className={`relative transition-transform duration-1000 ease-in-out ${
            panel === "register" ? "translate-x-0" : "-translate-x-full"
          }`}>
            <div className="absolute inset-0 bg-white p-12 flex items-center justify-center">
              <div className="w-full max-w-[320px]">
                <h2 className="text-4xl font-bold text-[#0D00FF] mb-8">Sign Up</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D00FF]/20 focus:border-[#0D00FF]" 
                    value={registerName} 
                    onChange={e => setRegisterName(e.target.value)} 
                    required 
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D00FF]/20 focus:border-[#0D00FF]" 
                    value={registerEmail} 
                    onChange={e => setRegisterEmail(e.target.value)} 
                    required 
                  />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D00FF]/20 focus:border-[#0D00FF]" 
                    value={registerPassword} 
                    onChange={e => setRegisterPassword(e.target.value)} 
                    required 
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded text-[#0D00FF]" checked={registerAccepted} onChange={e => setRegisterAccepted(e.target.checked)} />
                    <span>I accept the <Link href={PRIVACY_URL} className="text-[#0D00FF] hover:underline" target="_blank">data policy</Link></span>
                  </label>
                  {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
                  <button 
                    type="submit" 
                    className="w-full bg-[#0D00FF] text-white py-3 rounded-lg font-semibold hover:bg-[#0D00FF]/90 transition-colors" 
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <button className="text-[#0D00FF] text-sm hover:underline" onClick={() => switchPanel("login")}>
                    Already have an account? Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Original Login Form and Blue Panel (hidden during register) */}
          <div className={`absolute inset-0 grid grid-cols-2 transition-transform duration-1000 ease-in-out ${
            panel === "register" ? "translate-x-full" : "translate-x-0"
          }`}>
            {/* Login Form */}
            <div className="relative bg-white p-12 flex items-center justify-center">
              <div className="w-full max-w-[320px]">
                <h2 className="text-4xl font-bold text-[#0D00FF] mb-8">Sign In</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <input 
                    type="text" 
                    placeholder="Username or Email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D00FF]/20 focus:border-[#0D00FF]" 
                    value={loginEmail} 
                    onChange={e => setLoginEmail(e.target.value)} 
                    required 
                  />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D00FF]/20 focus:border-[#0D00FF]" 
                    value={loginPassword} 
                    onChange={e => setLoginPassword(e.target.value)} 
                    required 
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded text-[#0D00FF]" checked={loginAccepted} onChange={e => setLoginAccepted(e.target.checked)} />
                    <span>I accept the <Link href={PRIVACY_URL} className="text-[#0D00FF] hover:underline" target="_blank">data policy</Link></span>
                  </label>
                  {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                  <button 
                    type="submit" 
                    className="w-full bg-[#0D00FF] text-white py-3 rounded-lg font-semibold hover:bg-[#0D00FF]/90 transition-colors" 
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
                <div className="mt-6 space-y-2 text-center">
                  <button className="text-[#0D00FF] text-sm hover:underline" onClick={() => switchPanel("reset")}>
                    Forgot your password?
                  </button>
                  <div className="block">
                    <button className="text-[#0D00FF] text-sm hover:underline" onClick={() => switchPanel("register")}>
                      Don't have an account? Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hello Friend Panel */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#0D00FF] rounded-l-[8rem]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D00FF] to-[#2563eb] opacity-50" />
              </div>
              
              <div className="relative z-10 h-full flex items-center justify-center text-center px-12">
                <div className="max-w-[320px]">
                  <h2 className="text-3xl font-bold text-white mb-4">Hello, Friend!</h2>
                  <p className="text-white text-lg mb-8">Register with your personal details to use all of site features.</p>
                  <button 
                    className="px-12 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                    onClick={() => switchPanel("register")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 