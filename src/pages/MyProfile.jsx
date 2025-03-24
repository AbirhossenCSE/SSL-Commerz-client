
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
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 mt-12">
                <div className="bg-base-300 shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                    
                    {/*Image Section */}
                    <div className="flex-shrink-0">
                        <img
                            src={userData?.photoURL || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-40 h-40 rounded-full shadow-md border-4 border-orange-400 object-cover"
                        />
                    </div>

                    {/* User Details*/}
                    <div className="flex-1 w-full">
                        <h2 className="text-3xl font-bold text-orange-500">My Profile</h2>

                        {userData ? (
                            <div className="mt-5 space-y-3">
                                <h3 className="text-2xl font-semibold">{userData.name}</h3>
                                <p className="text-lg ">{userData.email}</p>
                                <p className="text-sm ">
                                    Joined: {new Date(userData.createdAt).toLocaleDateString()}
                                </p>

                                {/*Info */}
                                <div className="mt-4 p-4 rounded-lg shadow-sm">
                                    <p className="text-lg">
                                        <strong>Phone:</strong> {userData.phone || "N/A"}
                                    </p>
                                    <p className="text-lg mt-2">
                                        <strong>Address:</strong> {userData.address || "N/A"}
                                    </p>
                                </div>

                                {/* Update Profile*/}
                                <button
                                    onClick={() => navigate("/update-profile")}
                                    className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
                                >
                                    Update Profile
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-lg mt-4">Loading profile...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
