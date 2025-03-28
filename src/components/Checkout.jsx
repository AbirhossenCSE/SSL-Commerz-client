// import React, { useContext, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "../Shared/Navbar";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import AuthContext from "../context/AuthContext";

// const Checkout = () => {
//     const location = useLocation();
//     const axiosPublic = useAxiosPublic();
//     const product = location.state?.product;
//     const purchaseQuantity = location.state?.purchaseQuantity || 1;
//     const totalPrice = location.state?.totalPrice || 0;
//     const { user } = useContext(AuthContext);

//     const [customer, setCustomer] = useState({
//         name: "",
//         phone: "",
//         address: ""
//     });

//     const handleChange = (e) => {
//         setCustomer({ ...customer, [e.target.name]: e.target.value });
//     };


//     const handleConfirmPurchase = async () => {
//         const orderData = {
//             productId: product._id,
//             productName: product.product_title,
//             price: product.price,
//             purchaseQuantity,
//             totalPrice,
//             customerName: customer.name,
//             customerPhone: customer.phone,
//             customerAddress: customer.address,
//             customerEmail: customer.email,
//         };

//         try {
//             const response = await axiosPublic.post("/order", orderData);
//             console.log("Order Successfully:", response.data);
//             if (response.data.url) {
//                 // window.location.herf = response.data.url;
//                 window.location.replace(response.data.url)
//             } else {
//                 alert("Failed to get payment gateway URL. Please try again later.");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Order failed. Please check your connection and try again.");
//         }
//     };


//     return (
//         <div>
//             <Navbar></Navbar>
//             <div className="max-w-4xl mx-auto px-6 py-10">
//                 <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">
//                     Checkout
//                 </h2>

//                 <div className="bg-base-200 shadow-lg rounded-lg border border-gray-200 p-8 flex flex-col md:flex-row gap-8">
//                     {/* Customer Details*/}
//                     <div className="w-full md:w-1/2">
//                         <h3 className="text-xl font-semibold  mb-4">Customer Details</h3>
//                         <input
//                             type="text"
//                             name="name"
//                             value={customer.name}
//                             onChange={handleChange}
//                             placeholder="Full Name"
//                             className="border border-base-300 rounded-md px-3 py-2 w-full mb-4"
//                             required
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             value={customer.email}
//                             onChange={handleChange}
//                             placeholder="Email"
//                             className="border border-base-300 rounded-md px-3 py-2 w-full mb-4"
//                             required
//                         />
//                         <input
//                             type="tel"
//                             name="phone"
//                             value={customer.phone}
//                             onChange={handleChange}
//                             placeholder="Phone Number"
//                             className="border border-base-300 rounded-md px-3 py-2 w-full mb-4"
//                             required
//                         />
//                         <textarea
//                             name="address"
//                             value={customer.address}
//                             onChange={handleChange}
//                             placeholder="Delivery Address"
//                             className="border border-base-300 rounded-md px-3 py-2 w-full mb-4"
//                             required
//                         />
//                     </div>

//                     {/*Order*/}
//                     <div className="w-full md:w-1/2 bg-base-100 p-6 rounded-lg">
//                         <h3 className="text-xl font-semibold  mb-4">Order Summary</h3>
//                         <p><span className="font-semibold">Product:</span> {product.product_title}</p>
//                         <p><span className="font-semibold">Price per unit:</span> ${product.price}</p>
//                         <p><span className="font-semibold">Quantity:</span> {purchaseQuantity}</p>
//                         <p className="text-xl font-bold mt-4">
//                             Total Price: <span className="text-orange-500">${totalPrice}</span>
//                         </p>

//                         <button
//                             className="mt-6 w-full bg-green-500 text-white font-medium py-2 px-4 rounded-lg transition hover:bg-green-600"
//                             onClick={handleConfirmPurchase}
//                         >
//                             Payment
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;


import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AuthContext from "../context/AuthContext";

const Checkout = () => {
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const product = location.state?.product;
    const purchaseQuantity = location.state?.purchaseQuantity || 1;
    const totalPrice = location.state?.totalPrice || 0;
    const { user } = useContext(AuthContext);

    // Set default values from user context
    const [customer, setCustomer] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleConfirmPurchase = async () => {
        const orderData = {
            productId: product._id,
            productName: product.product_title,
            price: product.price,
            purchaseQuantity,
            totalPrice,
            customerName: customer.name,
            customerPhone: customer.phone,
            customerAddress: customer.address,
            customerEmail: customer.email,
        };

        try {
            const response = await axiosPublic.post("/order", orderData);
            console.log("Order Successfully:", response.data);
            if (response.data.url) {
                window.location.replace(response.data.url);
            } else {
                alert("Failed to get payment gateway URL. Please try again later.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Order failed. Please check your connection and try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">
                    Checkout
                </h2>

                <div className="bg-base-200 shadow-lg rounded-lg border border-gray-200 p-8 flex flex-col md:flex-row gap-8">
                    {/* Customer Details */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
                        <input
                            type="text"
                            name="name"
                            value={customer.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="border border-base-300 rounded-md px-3 py-2 w-full mb-4"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={customer.email}
                            disabled
                            className="border border-base-300 rounded-md px-3 py-2 w-full mb-4 bg-base-200 cursor-not-allowed"
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={customer.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="border border-base-300 rounded-md px-3 py-2 w-full mb-4"
                            required
                        />
                        <textarea
                            name="address"
                            value={customer.address}
                            onChange={handleChange}
                            placeholder="Delivery Address"
                            className="border border-base-300 rounded-md px-3 py-2 w-full mb-4"
                            required
                        />
                    </div>

                    {/* Order Summary */}
                    <div className="w-full md:w-1/2 bg-base-100 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                        <p><span className="font-semibold">Product:</span> {product.product_title}</p>
                        <p><span className="font-semibold">Price per unit:</span> ${product.price}</p>
                        <p><span className="font-semibold">Quantity:</span> {purchaseQuantity}</p>
                        <p className="text-xl font-bold mt-4">
                            Total Price: <span className="text-orange-500">${totalPrice}</span>
                        </p>

                        <button
                            className="mt-6 w-full bg-green-500 text-white font-medium py-2 px-4 rounded-lg transition hover:bg-green-600"
                            onClick={handleConfirmPurchase}
                        >
                            Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

