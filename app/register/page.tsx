"use client"
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {

  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit =  async( e: any) => {
    e.preventDefault(); 
    const fullname = e.target[0].value;
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
    
    try{
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullname, email, password })
      })
      
      if (res.status === 400){
        setError("This email already exists");
      }
      if (res.status === 200){
        setError("")
        router.push('/login');
      }
    }
    catch (error) {
      setError("Error, try again!!")
      console.error(error)
    }
  }; 

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5 bg-[#050325] text-white text-center">
        <h1 className="text-2xl font-bold mb-8">Register New Account</h1>
        <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="fullname">
                Fullname
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="Fullname"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
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
                Register
              </button>
              <Link href="/login">
                <button
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  type="button"
                >
                  Back to Login
                </button>
              </Link>
            </div>
            <div>
              <p className="text-red-600 text-[16px] mt-4">{error && error}</p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;

