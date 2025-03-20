
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import AuthContext from "../context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosPublic.get("/users");
                const users = response.data;
                const currentUser = users.find((u) => u.email === user.email);
                if (currentUser) {
                    setUserData(currentUser);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (user?.email) {
            fetchUserData();
        }
    }, [user?.email, axiosPublic]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-2xl mx-auto p-6 mt-12">
                <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-orange-500 mb-6">
                        My Profile
                    </h2>

                    {userData ? (
                        <div className="w-full text-center">
                            {/* Profile Image */}
                            <div className="relative">
                                <img
                                    src={userData.photoURL || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="w-28 h-28 rounded-full shadow-md border-4 border-orange-400"
                                />
                            </div>

                            {/* User Info */}
                            <div className="mt-5 space-y-2">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {userData.name}
                                </h3>
                                <p className="text-gray-600 text-lg">{userData.email}</p>
                                <p className="text-gray-500 text-sm">
                                    Joined: {new Date(userData.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="w-full mt-6 bg-gray-50 rounded-lg p-5 shadow-sm">
                                <p className="text-gray-700 text-lg">
                                    <strong>Phone:</strong> {userData.phone || "N/A"}
                                </p>
                                <p className="text-gray-700 text-lg mt-2">
                                    <strong>Address:</strong> {userData.address || "N/A"}
                                </p>
                            </div>

                            {/* Update Profile Button */}
                            <button
                                onClick={() => navigate("/update-profile")}
                                className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
                            >
                                Update Profile
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-lg">Loading profile...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

