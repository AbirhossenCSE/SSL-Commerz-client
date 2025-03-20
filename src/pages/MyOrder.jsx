
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import AuthContext from "../context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const MyOrder = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosPublic.get("/orders");
                const userOrders = response.data.filter(order => order.cus_email === user.email);
                setOrders(userOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user, axiosPublic]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-3xl mx-auto mt-12 p-6">
                <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
                    My Orders
                </h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-center text-gray-600">You have no orders yet.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div 
                                key={order._id} 
                                className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start"
                            >
                                <img
                                    src={order.product.product_image}
                                    alt={order.product.product_title}
                                    className="w-32 h-32 object-cover rounded-md sm:mr-6"
                                />
                                <div className="flex-1 mt-4 sm:mt-0">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {order.product.product_title}
                                    </h3>
                                    <p className="text-gray-600">
                                        Price: <span className="font-medium">${order.product.price}</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Transaction ID: <span className="text-sm text-gray-500">{order.tranjectionId}</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Quantity: <span className="font-medium">{order.purchase}</span>
                                    </p>
                                    <p className="text-gray-800 font-semibold">
                                        Total Paid: ${order.purchase * order.product.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrder;
