// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import Swal from "sweetalert2";
// import auth from "../firebase/firebase.init";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import SocialLogin from "../Shared/SocialLogin";

// const Register = () => {
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation();
//     const axiosPublic = useAxiosPublic();

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         const form = new FormData(e.target);
//         const name = form.get("name");
//         const email = form.get("email");
//         const password = form.get("password");

//         if (password.length < 6) {
//             setError("Password must be at least 6 characters.");
//             return;
//         }

//         try {
//             const result = await createUserWithEmailAndPassword(auth, email, password);
//             const user = result.user;

//             await updateProfile(user, { displayName: name });

//             const userData = {
//                 uid: user.uid,
//                 name,
//                 email,
//                 createdAt: new Date(),
//                 role: "user"
//             };

//             await axiosPublic.post("/users", userData);

//             Swal.fire({
//                 title: "Success!",
//                 text: "Registration successful!",
//                 icon: "success",
//                 toast: true,
//                 position: "top-end",
//                 showConfirmButton: false,
//                 timer: 3000,
//             });

//             navigate(location?.state ? location.state : "/");
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <div className="bg-base-100 p-8 rounded-lg shadow-md w-2xl">
//                 <h2 className="text-3xl font-bold text-center">Register Now</h2>
//                 {error && <p className="text-red-500 text-center">{error}</p>}
//                 <form onSubmit={handleRegister} className="mt-4">
//                     <div>
//                         <label className="block font-medium">Name</label>
//                         <input type="text" name="name" required className="w-full border p-2 rounded-md" />
//                     </div>
//                     <div className="mt-3">
//                         <label className="block font-medium">Email</label>
//                         <input type="email" name="email" required className="w-full border p-2 rounded-md" />
//                     </div>
//                     <div className="mt-3">
//                         <label className="block font-medium">Password</label>
//                         <input type="password" name="password" required className="w-full border p-2 rounded-md" />
//                     </div>
//                     <button type="submit" className="w-full bg-blue-500 text-white mt-4 py-2 rounded-md hover:bg-blue-600">
//                         Register
//                     </button>
//                 </form>
//                 <p className="mt-3 text-center mb-10">
//                     Already have an account?{" "}
//                     <Link to="/signin" className="text-blue-500">Login</Link>
//                 </p>
//                 <SocialLogin></SocialLogin>
//             </div>
//         </div>
//     );
// };

// export default Register;

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../Shared/SocialLogin";

const Register = () => {
    const [error, setError] = useState("");
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

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
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
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-base-100 p-8 rounded-lg shadow-md w-2xl m-8">
                <h2 className="text-3xl font-bold text-center">Register Now</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
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
                <p className="mt-3 text-center mb-10">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-500">Login</Link>
                </p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;

