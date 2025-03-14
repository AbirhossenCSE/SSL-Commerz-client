import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const AddToCart = () => {
    const location = useLocation();
    const product = location.state?.product;
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-2xl font-semibold text-gray-600">
                    No product added to cart.
                </h2>
            </div>
        );
    }

    const handleQuantityChange = (e) => {
        const value = Math.min(Math.max(1, Number(e.target.value)), product.quantity); // Restrict range
        setPurchaseQuantity(value);
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">
                    Cart Details
                </h2>

                <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 flex flex-col md:flex-row items-center md:items-start">
                    {/* Image Section */}
                    <div className="w-full md:w-1/3">
                        <img
                            src={product.product_image}
                            alt={product.product_title}
                            className="w-full h-72 object-cover rounded-lg"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-2/3 md:pl-6 mt-6 md:mt-0">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {product.product_title}
                        </h3>
                        <p className="text-gray-600 mt-2">
                            <span className="font-bold">Price:</span> ${product.price}
                        </p>
                        <p className="text-gray-700 mt-2">{product.description}</p>
                        <p className="text-gray-600 mt-2">
                            <span className="font-bold">Available Quantity:</span> {product.quantity}
                        </p>

                        {/* Purchase Quantity Selector */}
                        <div className="mt-4">
                            <label className="font-semibold text-gray-700">Purchase Quantity:</label>
                            <input
                                type="number"
                                className="w-20 rounded-lg p-2 text-center"
                                value={purchaseQuantity}
                                min="1"
                                max={product.quantity}
                                onChange={handleQuantityChange}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col md:flex-row gap-4 mt-6">
                            <button className="btn w-full md:w-auto bg-orange-500 text-white font-medium py-2 px-10 rounded-lg transition hover:bg-orange-600">
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToCart;
