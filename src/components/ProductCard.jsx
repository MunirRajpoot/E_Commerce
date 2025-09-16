"use client"
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

export default function ProductCard({ product }) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from("favorites")
                .select("id")
                .eq("user_id", user.id)
                .eq("product_id", product.id)
                .single();

            if (!error && data) {
                setAdded(true);
            }
        };
        checkFavorite();
    }, [user, product.id]);

    // Add to favorite
    const addToFavorites = async () => {
        if (!user) {
            alert("Please login to add to favorites");
            return;
        }
        setLoading(true);

        const { error } = await supabase
            .from("favorites")
            .insert([{ user_id: user.id, product_id: product.id }])
            .select();

        if (error) {
            console.error(error);
            alert("Already in favorites or something went wrong...");
        } else {
            setAdded(true);
        }
        setLoading(false);
    };

    // Add to Cart (dummy logic for now)
    const addToCart = () => {
        alert(`✅ ${product.name} added to cart!`);
    };

    return (
        <div className="group relative rounded-2xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 bg-white overflow-hidden">
            {/* Product Image */}
            <Link href={`/product/${product.id}`}>
                <div className="relative w-full h-56 overflow-hidden cursor-pointer">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>

            {/* Favorite Button Floating */}
            <button
                onClick={addToFavorites}
                disabled={loading || added}
                className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
            >
                {added ? (
                    <FaHeart className="text-red-600" size={18} />
                ) : (
                    <MdFavoriteBorder className="text-gray-700" size={18} />
                )}
            </button>

            {/* Product Info */}
            <div className="p-4">
                <Link href={`/product/${product.id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 truncate hover:underline cursor-pointer">
                        {product.name}
                    </h2>
                </Link>
                <p className="text-blue-600 font-bold text-lg mt-1">
                    ${product.price}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={addToCart}
                        className="flex items-center justify-center flex-1 gap-2 px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-800  cursor-pointer"
                    >
                        <FiShoppingCart size={18} />
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
    );
}
