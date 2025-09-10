"use client"
import React from 'react'
import Link from 'next/link'
const ProductCard = ({ product }) => {
    return (
        <div className='bg-white rounded-lg shadow hover:shadow-lg transition p-4'>
            <img 
            src='{product.image_url || 
            "/placeholder.png"}'
            alt='{product.name}'
            className='w-full h-48 objec-cover rounded'

            />
            <h2 className='text-lg font-semibold mt-3 '>{product.name}</h2>
            <p className='text-gray-600 text-sm line-clamp-2'>{product.description}</p>
            <p className='font-bold mt-2'>${product.price}</p>
            <Link href={`/product/${product.id}`}
            className='mt-3 inline-bock bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
                View Details
            </Link>
        </div>
    )
}

export default ProductCard