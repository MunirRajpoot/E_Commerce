"use client"
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";


export default function ProductCard({ product }) {
    const { user } = useUser();
    const [loading, setLoading] = useState();
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
                setAdded(true)
            }

        };
        checkFavorite();

    }, [user, product.id])

    //add to favorite
    const addToFavorites = async () => {
        if (!user) {
            alert("Please Login to add Favorite");
            return
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

    }

    return (
        <div className="border rounded-lg shadow hover:shadow-lg transition p-4">
            <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>

            <div className="flex gap-2 mt-3">
                <Link
                    href={`/product/${product.id}`}
                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded"
                >
                    View
                </Link>
                <button
                    onClick={addToFavorites}
                    disabled={loading || added}
                    className={`flex-1 px-4 py-2 rounded text-white ${added
                            ? "bg-pink-500"
                            : "bg-pink-600 hover:bg-pink-700"
                        }`}
                >
                    {added ? "Added ❤️" : "Favorite"}
                </button>
            </div>
        </div>
    );
}
