import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
        </>
    );

    return (
        <nav className="bg-base-300 shadow-md">
            <div className="container mx-auto px-5 lg:px-20 flex items-center justify-between py-3">
                <Link to="/" className="flex items-center justify-center gap-2">

                    <span className="text-2xl font-bold">MyShop</span>
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
