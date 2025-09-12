"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import ProductList from "@/components/ProductList"

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const { data, error } = await supabase.from(favorites).select(`
            id,
            product:products(*)
            `);
            if (!error) {
                setFavorites(data.map(item => item.product));
            }
        }
        fetchFavorites();
    }, []);
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
            <ProductList products={favorites} />
        </div>
    )
}