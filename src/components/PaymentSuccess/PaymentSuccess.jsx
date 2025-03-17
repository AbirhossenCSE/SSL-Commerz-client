import { useParams, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    const { tranId } = useParams();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-8" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Payment Successful!
                </h2>
                <p className="text-gray-600 mb-2">
                    Your transaction was completed successfully.
                </p>
                <p className="text-gray-800 font-semibold mb-6">
                    Transaction ID: <span className="text-blue-500">{tranId}</span>
                </p>
                <Link to="/">
                    <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
