"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import ProductList from "@/components/ProductList"
import { useUser } from "@/context/UserContext"

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;

        const fetchFavorites = async () => {
            const { data, error } = await supabase
                .from("favorites")
                .select(`
                    id,
                    product:products(*)
                `)
                .eq("user_id", user.id);

            if (error) {
                console.error(error);
            } else {
                setFavorites(data.map(item => item.product));
            }
        };

        fetchFavorites();
    }, [user]);

    if (!user) {
        return <p className="p-6">Please login to see your favorites ❤️</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
            <ProductList products={favorites} />
        </div>
    )
}
