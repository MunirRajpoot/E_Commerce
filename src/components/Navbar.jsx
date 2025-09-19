"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { IoCartOutline, IoSearch } from "react-icons/io5"
import { MdFavoriteBorder } from "react-icons/md"
import { FiUser } from "react-icons/fi"
import Image from 'next/image'
import { HiMenu, HiX } from "react-icons/hi"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [cartCount] = useState(5)
    const [favoriteCount] = useState(5)

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link href={"/"} className="flex">
                    <Image src="/icons/logo.png" alt="logo" width={120} height={50} />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 font-medium">
                    <Link href="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link href="/shop" className="hover:text-blue-600 transition">Shop</Link>
                    <Link href="/collection" className="hover:text-blue-600 transition">Collection</Link>
                    <Link href="/blog" className="hover:text-blue-600 transition">Blogs</Link>
                    <Link href="/about" className="hover:text-blue-600 transition">About Us</Link>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4 text-xl">
                    {/* Search Toggle */}
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="hover:text-blue-600 transition-colors duration-200"
                    >
                        <IoSearch />
                    </button>

                    <Link href="/profile" className="hover:text-blue-600 transition-colors duration-200">
                        <FiUser />
                    </Link>

                    {/* Favorites with Badge */}
                    <Link href="/favorites" className="relative hover:text-blue-600 transition-colors duration-200">
                        <MdFavoriteBorder />
                        {favoriteCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 py-0.2 rounded-full">
                                {favoriteCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart with Badge */}
                    <Link href="/cart" className="relative hover:text-blue-600 transition-colors duration-200">
                        <IoCartOutline />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 py-0.2 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* 🔍 Slide-down Search Bar */}
            <div
                className={`overflow-hidden transition-all duration-300 bg-gray-50 ${searchOpen ? "max-h-20 py-3" : "max-h-0 py-0"}`}
            >
                <div className="max-w-7xl mx-auto px-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-4 font-medium">
                    <Link href="/" className="block hover:text-blue-600">Home</Link>
                    <Link href="/shop" className="block hover:text-blue-600">Shop</Link>
                    <Link href="/collection" className="block hover:text-blue-600">Collection</Link>
                    <Link href="/blog" className="block hover:text-blue-600">Blogs</Link>
                    <Link href="/about" className="block hover:text-blue-600">About Us</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar
