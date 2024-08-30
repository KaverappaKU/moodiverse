"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const data =
      typeof window !== "undefined" && localStorage.getItem("userData");
    const jsonData = JSON.parse(data || "{}");
    setUserData(jsonData);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/logout");
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    console.log(userData);
    if (!userData) {
      setIsLoggedIn(false);
    }
  }, [userData]);

  return (
    <header className="flex justify-between items-center p-10 bg-[#050325] text-white">
      <div className="text-xl font-bold">
        <Link className="font-bold text-[#FFCC00]" href="/">
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
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <Link href="/myAccount">My Account</Link>
                  {/* <Link href="/myAccount">Welcome {userData?.fullname}!</Link> */}
                  <button
                    className="bg-white text-[#050325] px-4 py-2 rounded"
                    onClick={handleLogout}
                    disabled={loading}
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
