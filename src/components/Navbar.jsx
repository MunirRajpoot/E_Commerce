"use client"
import React from 'react'
import Link from 'next/link'
const Navbar = () => {
    return (
        <nav className='bg-white shadow p-4 flex justify-between items-center'>
            <Link href={"/"} className='text-xl font-bold'>
                E-Commerce
            </Link>
            <div className='space-x-4'>
                <Link href="/cart" className='hover:text-blue-600'>Cart</Link>
                <Link href="/favorites" className='hover:text-blue-600'>Favorites</Link>
                <Link href="/profile" className='hover:text-blue-600'>Profile</Link>
                <Link href="/auth/login" className='hover:text-blue-600'>Login</Link>
            </div>
        </nav>
    )
}

export default Navbar