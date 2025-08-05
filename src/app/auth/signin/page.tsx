"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { GlassCard } from "@/components/ui/GlassCard";

// Import signIn and signOut functions from auth library
import { signIn } from "next-auth/react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: username.trim().toLowerCase(),
        password: password.trim(),
      });

      if (res?.error) {
        // Handle different error types
        switch (res.error) {
          case "CredentialsSignin":
            toast.error("Invalid username or password");
            break;
          case "AccessDenied":
            toast.error("Access denied");
            break;
          default:
            toast.error("Login failed. Please try again.");
        }
      } else if (res?.ok) {
        // Successful login, redirect manually
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
        }}
      />
      <GlassCard className="p-8 rounded-xl shadow-2xl w-full max-w-md relative z-10">
        {/* <div className="> */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          LOGIN
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 "
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
        {/* </div> */}
      </GlassCard>
      <Toaster position="top-center" />
    </div>
  );
}
