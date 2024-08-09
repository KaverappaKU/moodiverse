"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";

const Login: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Invalid email");
      return;
    }

    if (!password || password.length < 8) {
      setError(
        "Password should be at least 8 characters long or Invalid Password"
      );
      return;
    }

    const { data } = await axios.post("/api/login", {
      email,
      password,
    });
    localStorage.setItem("userData", JSON.stringify(data?.data));
    if (!data) {
      setError("Invalid User or Password");
    } else {
      setError("");
      router.push("/");
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5 bg-[#050325] text-white text-center">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <p className="text-l italic mb-8">Login to your account</p>
        <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Enter your Email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
                <span
                  onClick={() => {
                    const passwordField = document.getElementById(
                      "password"
                    ) as HTMLInputElement;
                    passwordField.type =
                      passwordField.type === "password" ? "text" : "password";
                  }}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <div>
                <p className="text-red-600 text-[16px] mt-4">
                  {error && error}
                </p>
              </div>
              <Link href="/register">
                <button
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  type="button"
                >
                  Register New Account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
