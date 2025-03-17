import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFail = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-8" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Payment Failed
                </h2>
                <p className="text-gray-600 mb-6">
                    Unfortunately, your payment was not successful. Please try again or contact support.
                </p>
                <Link to="/">
                    <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentFail;
