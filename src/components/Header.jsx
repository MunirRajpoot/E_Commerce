import React from "react";
import { FiPhone, FiMail } from "react-icons/fi"
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"
import Link from "next/link";

const Header = () => {
    return (
        <div className="bg-gray-900 text-gray-200 text-sm py-2">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">

                {/* Left Side Contact Info */}
                <div className="flex space-x-6">
                    <div className="flex items-center space-x-2">
                        <FiPhone />
                        <span>+92 314 3415578</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FiMail />
                        <span>munirrajpoot1012@gmail.com</span>
                    </div>
                </div>

                {/* Right Side: Social Links */}
                <div className="flex space-x-4">
                    <Link href="/" className="hover:text-blue-500"><FaFacebookF/></Link>
                    <Link href="/" className="hover:text-blue-500"><FaInstagram/></Link>
                    <Link href="/" className="hover:text-blue-500"><FaTwitter/></Link>
                </div>
            </div>
        </div>
    )
}

export default Header;