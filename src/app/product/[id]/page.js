"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error(error);
            } else {
                setProduct(data);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p className="p-4">Loading...</p>;
    }

    return (
        <div className="p-6">
            <button
                onClick={() => router.push("/")}
                className="mb-4 text-blue-600 underline"
            >
                ← Back to Products
            </button>

            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <img
                src={product.image_url}
                alt={product.name}
                className="w-80 h-80 object-cover rounded mb-4"
            />
            <p className="text-lg font-semibold mb-1">Price: ${product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>

            <button
                onClick={() => addToCart(product)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                Add to Cart
            </button>
        </div>
    );
}
