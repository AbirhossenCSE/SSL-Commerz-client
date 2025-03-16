import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const AddToCart = () => {
    const location = useLocation();
    const product = location.state?.product;
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);
    const navigate = useNavigate();

    if (!product) {
        return (
            <div>
                <Navbar></Navbar>
                <div className="flex justify-center items-center h-screen">
                    <h2 className="text-2xl font-semibold text-gray-600">
                        No product added to cart.
                    </h2>
                </div>
            </div>
        );
    }

    const handlePurchase = () => {
        navigate("/checkout", {
            state: {
                product,
                purchaseQuantity,
                totalPrice: product.price * purchaseQuantity
            }
        });
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">
                    Cart Details
                </h2>

                <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Product Image - Top Left */}
                    <div className="w-full md:w-1/3">
                        <img
                            src={product.product_image}
                            alt={product.product_title}
                            className="w-full h-64 object-cover rounded-md"
                        />
                    </div>

                    {/* Product Details - Right Side */}
                    <div className="w-full md:w-2/3 space-y-4">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {product.product_title}
                        </h3>
                        <p className="text-gray-600 text-lg">
                            <span className="font-semibold">Price:</span> ${product.price}
                        </p>
                        <p className="text-gray-700">{product.description}</p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Available Quantity:</span> {product.quantity}
                        </p>

                        {/* Purchase Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <label className="text-gray-700 font-medium">Purchase Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                max={product.quantity}
                                value={purchaseQuantity}
                                onChange={(e) => setPurchaseQuantity(Math.min(product.quantity, Math.max(1, e.target.value)))}
                                className="border border-gray-300 rounded-md px-3 py-2 w-20 text-center"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 mt-4">
                            <button
                                className="btn w-1/2 bg-orange-500 text-white font-medium py-2 px-4 rounded-lg transition hover:bg-orange-600"
                                onClick={handlePurchase}
                            >
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
