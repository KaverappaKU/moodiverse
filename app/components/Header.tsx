"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const Header: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/logout");
      localStorage.removeItem("userData");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex justify-between items-center p-10 bg-[#050325] text-white">
      <div className="text-xl font-bold">
        <Link className="font-bold" href="/">
          MOODIVERSE
        </Link>
      </div>
      <nav>
        <ul className="flex items-center space-x-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/movies">Movies</Link>
          </li>
          <li>
            <Link href="/series">Series</Link>
          </li>
          <li>
            <Link href="/games">Games</Link>
          </li>
          {loading ? (
            <li>Logging you out...</li>
          ) : (
            <li>
              {userData?.fullname ? (
                <div className="flex items-center gap-4">
                  <Link href="/myAccount">Welcome {userData?.fullname}!</Link>
                  {/* <p>Welcome {userData?.fullname}!</p> */}
                  <button
                    className="bg-white text-[#050325] px-4 py-2 rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <button className="bg-white text-[#050325] px-4 py-2 rounded">
                    Login
                  </button>
                </Link>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
