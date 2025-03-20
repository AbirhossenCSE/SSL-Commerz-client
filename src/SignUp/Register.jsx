import { } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../Shared/SocialLogin";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get("name");
        const email = form.get("email");
        const password = form.get("password");
        const photoURL = form.get("photoURL");

        // Password Validation
        if (password.length < 6) {
            return showError("Password must be at least 6 characters.");
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            await updateProfile(user, { displayName: name, photoURL });

            const userData = {
                uid: user.uid,
                name,
                email,
                photoURL,
                createdAt: new Date(),
                role: "user"
            };

            await axiosPublic.post("/users", userData);

            Swal.fire({
                title: "Success!",
                text: "Registration successful!",
                icon: "success",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });

            navigate(location?.state ? location.state : "/");
        } catch (error) {
            showError(formatFirebaseError(error.message));
        }
    };

    // error messages
    const formatFirebaseError = (errorMessage) => {
        if (errorMessage.includes("email-already-in-use")) {
            return "This email is already registered. Try logging in.";
        } else if (errorMessage.includes("invalid-email")) {
            return "Invalid email format. Please enter a valid email.";
        } else if (errorMessage.includes("weak-password")) {
            return "Password is too weak. Try using a stronger one.";
        } else {
            return "Something went wrong. Please try again.";
        }
    };

    // error alert
    const showError = (message) => {
        Swal.fire({
            title: "Error!",
            text: message,
            icon: "error",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600">Register Now</h2>
                <form onSubmit={handleRegister} className="mt-4">
                    <div>
                        <label className="block font-medium">Name</label>
                        <input type="text" name="name" required className="w-full border p-2 rounded-md" />
                    </div>
                    <div className="mt-3">
                        <label className="block font-medium">Email</label>
                        <input type="email" name="email" required className="w-full border p-2 rounded-md" />
                    </div>
                    <div className="mt-3">
                        <label className="block font-medium">Password</label>
                        <input type="password" name="password" required className="w-full border p-2 rounded-md" />
                    </div>
                    <div className="mt-3">
                        <label className="block font-medium">Photo URL</label>
                        <input type="text" name="photoURL" placeholder="Enter profile photo URL" className="w-full border p-2 rounded-md" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white mt-4 py-2 rounded-md hover:bg-blue-600">
                        Register
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-500 hover:underline">Login</Link>
                </p>
                <div className="mt-4">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;
