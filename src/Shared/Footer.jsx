import React from "react";

const Footer = () => {
    return (
        <footer className="bg-base-300 py-6 mt-20">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="text-lg font-semibold">📱 SmartShop - Your Trusted Phone Store</p>
                <p className="text-sm mt-2">
                    © {new Date().getFullYear()} SmartShop. All Rights Reserved.
                </p>
                <div className="flex justify-center mt-4 space-x-4">
                    <a href="#" className="hover:text-orange-400">Privacy Policy</a>
                    <span>|</span>
                    <a href="#" className="hover:text-orange-400">Terms of Service</a>
                    <span>|</span>
                    <a href="#" className="hover:text-orange-400">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
