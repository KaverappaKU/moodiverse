"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyAccount = () => {
  const [userData, setUserData] = useState<any>();

  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = localStorage.getItem("userData");
        const user = JSON.parse(storedData || "{}");
        console.log(user);
        // if (storedData) {

        //   setUserData({
        //     userId: user?._id || "",
        //     fullname: user.fullname || "",
        //     email: user.email || "",
        //     password: user.password || "",
        //   });
        // } else {
        //   console.error("No user data found in localStorage");
        // }
        const response = await axios.get(`/api/users/${user?._id}`);
        const { data } = response.data;
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleUpdate = async (userId: string) => {
    try {
      const storedData = localStorage.getItem("userData");

      if (storedData) {
        const user = JSON.parse(storedData);
        console.log(user);
        await axios.put(`/api/users/${userId}`, userData);
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        console.error("No user data found in localStorage");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      // Get user data from localStorage
      const storedData = localStorage.getItem("userData");

      if (storedData) {
        const user = JSON.parse(storedData);

        if (user) {
          await axios.delete(`/api/users/${userId}`, {
            data: {
              _id: userId,
            },
          });
          alert("Account deleted successfully!");
          localStorage.removeItem("userData");
          router.push("/");
        } else {
          console.error("Not found");
        }
      } else {
        console.error("No user data found in localStorage");
      }
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          My Account
        </h2>

        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullname"
            type="text"
            value={userData?.fullname || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border ${
              isEditing ? "border-gray-300" : "border-transparent"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black bg-gray-${
              isEditing ? "50" : "100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={userData?.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border ${
              isEditing ? "border-gray-300" : "border-transparent"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black bg-gray-${
              isEditing ? "50" : "100"
            }`}
          />
        </div>

        <div className="flex justify-between">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => handleUpdate(userData?._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </>
          )}
          <button
            onClick={() => handleDelete(userData?._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccount;
