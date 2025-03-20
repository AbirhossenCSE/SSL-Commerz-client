
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiImage, FiPhone, FiMapPin } from "react-icons/fi";
import Navbar from "../Shared/Navbar";
import AuthContext from "../context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [userData, setUserData] = useState({
        name: "",
        photoURL: "",
        phone: "",
        address: "",
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
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
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserData();
        }
    }, [user?.email, axiosPublic]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosPublic.put(`/users/${userData._id}`, userData);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => {
                navigate("/myProfile");
            }, 1500);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <div className="max-w-lg mx-auto mt-12 bg-base-300 shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
                    Update Profile
                </h2>

                {loading ? (
                    <p className="text-center">Loading profile...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        {/* Name Field */}
                        <div className="flex items-center border rounded-lg p-2">
                            <FiUser className=" mr-3" />
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full bg-transparent focus:outline-none"
                                required
                            />
                        </div>

                        {/* Profile Photo URL Field */}
                        <div className="flex items-center border rounded-lg p-2">
                            <FiImage className=" mr-3" />
                            <input
                                type="text"
                                name="photoURL"
                                value={userData.photoURL}
                                onChange={handleChange}
                                placeholder="Profile Photo URL"
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="flex items-center border rounded-lg p-2 ">
                            <FiPhone className=" mr-3" />
                            <input
                                type="text"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>

                        {/* Address Field */}
                        <div className="flex items-center border rounded-lg p-2">
                            <FiMapPin className=" mr-3" />
                            <input
                                type="text"
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <p className="text-green-500 text-center font-semibold">{successMessage}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
                        >
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateProfile;
