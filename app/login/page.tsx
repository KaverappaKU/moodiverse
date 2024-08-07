"use client"
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React ,{ useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

const Login: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/");
    }
  }, [session, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async ( e: any) => {
    e.preventDefault(); 
    const email = e.target[1].value;
    const password = e.target[2].value;

    if (!isValidEmail(email)){
      setError("Invalid email")
      return;
    }

    if (!password || password.length < 8){
      setError("Password should be at least 8 characters long or Invalid Password");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError("Invalid User or Password");
      if (res?.url) router.replace("/")
    }else{
   setError("")
  }

  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5 bg-[#050325] text-white text-center">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <p className="text-l italic mb-8">Login to your account</p>
        <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
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
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
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

