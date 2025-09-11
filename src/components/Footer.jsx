import React from 'react'

const currentYear = new Date().getFullYear();
const Footer = () => {
    return (
        <footer className='bg-gray-100 text-center py-4 mt-8 text-sm text-gray-600'>
            © {currentYear} E-Shop. All rights reserved.
        </footer>
    )
}

export default Footer; 