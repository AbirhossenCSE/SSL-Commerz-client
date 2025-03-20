
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
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <div className="max-w-3xl mx-auto mt-12 p-6">
                <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
                    My Orders
                </h2>

                {loading ? (
                    <p className="text-center">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-center">You have no orders yet.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div 
                                key={order._id} 
                                className="bg-base-300 shadow-lg rounded-lg p-10 flex flex-col sm:flex-row items-center sm:items-start"
                            >
                                <img
                                    src={order.product.product_image}
                                    alt={order.product.product_title}
                                    className="w-32 h-32 object-cover rounded-md sm:mr-6"
                                />
                                <div className="flex-1 mt-4 sm:mt-0">
                                    <h3 className="text-lg font-semibold ">
                                        {order.product.product_title}
                                    </h3>
                                    <p className="">
                                        Price: <span className="font-medium">${order.product.price}</span>
                                    </p>
                                    <p className="">
                                        Transaction ID: <span className="text-sm ">{order.tranjectionId}</span>
                                    </p>
                                    <p className="">
                                        Quantity: <span className="font-medium">{order.purchase}</span>
                                    </p>
                                    <p className=" font-semibold">
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
