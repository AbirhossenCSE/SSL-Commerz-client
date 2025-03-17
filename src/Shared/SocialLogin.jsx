import { useNavigate, useLocation } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const user = result.user;

                // Save user to database using axiosPublic
                await saveUserToDatabase(user.displayName, user.email, user.photoURL);

                Swal.fire({
                    title: "Success!",
                    text: "Logged in successfully!",
                    icon: "success",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });

                // Redirect user
                navigate(location?.state ? location.state : "/");
            })
            .catch((error) => {
                console.error("Google Sign-In Error:", error.message);
            });
    };

    // Function to save user data in the database using axiosPublic
    const saveUserToDatabase = async (name, email, photoURL) => {
        try {
            const response = await axiosPublic.post("/users", { name, email, photoURL });
            console.log("User saved:", response.data);
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <div className="mt-4 flex justify-center">
            <button
                onClick={handleGoogleSignIn}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default SocialLogin;
