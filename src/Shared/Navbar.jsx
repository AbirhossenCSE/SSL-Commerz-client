import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOutUser} = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('Sign out successful');
            })
            .catch(() => {
                console.log('Sign out failed');
            });
    };


    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "text-orange-400 font-bold" : ""}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contactUs"
                    className={({ isActive }) => isActive ? "text-orange-400 font-bold" : ""}
                >
                    Contact Us
                </NavLink>
            </li>
        </>
    );

    return (
        <nav className="bg-base-300 shadow-md">
            <div className="container mx-auto px-5 lg:px-20 flex items-center justify-between py-3">
                <Link to="/" className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold">📱 SmartShop</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden lg:flex space-x-6 text-lg">{links}</ul>

                {/* Theme*/}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost"
                        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    >
                        {theme === "light" ? <FaMoon /> : <FiSun />}
                    </button>

                    {user ? (
                        <div className="relative">
                            <img
                                onClick={toggleDropdown}
                                className="w-8 h-8 rounded-full cursor-pointer"
                                src={user?.photoURL || 'https://via.placeholder.com/150'}
                                alt={user?.displayName || 'User Profile'}
                            />
                            {isDropdownOpen && (
                                <ul className="absolute -right-24 mt-4 w-48 bg-white rounded-lg shadow-lg z-50">
                                    <li>
                                        <NavLink
                                            to="/myProfile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/myOrder"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            My Orders
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                        onClick={handleSignOut}
                                        >Sign Out</NavLink>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <Link to="/signin" className="btn">Sign-In</Link>
                    )}


                    {/* Mobile Menu Button */}
                    <button onClick={toggleMenu} className="lg:hidden btn btn-ghost">
                        {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-base-100 w-full py-4">
                    <ul className="flex flex-col items-center space-y-4">{links}</ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
