import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const axiosPublic = useAxiosPublic();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axiosPublic.get("/product");
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [axiosPublic]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner text-orange-400"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center mb-10 text-orange-500">
                Our Products
            </h2>

            {/* Centered Product Cards */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mx-auto justify-center">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="card bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300 mx-auto"
                    >
                        <figure className="relative">
                            <img
                                src={product.product_image}
                                alt={product.product_title}
                                className="w-full p-4 h-64 object-cover"
                            />
                            <span className="absolute top-2 right-2 bg-orange-400 text-white px-3 py-1 text-sm font-semibold rounded">
                                ${product.price}
                            </span>
                        </figure>

                        <div className="card-body p-5">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {product.product_title}
                            </h3>
                            <p className="text-gray-600 mt-2">{product.description.slice(0, 60)}...</p>

                            <button
                                className="mt-4 btn w-full bg-orange-500 text-white font-medium py-2 px-4 rounded-lg transition hover:bg-orange-600"
                                onClick={() => navigate("/add-to-cart", { state: { product } })}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
