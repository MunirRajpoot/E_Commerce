'use client'
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image_url: "",
    });

    //fetch products from supabase
    const fetchProducts = async () => {
        const { data } = await supabase.from('products').select('*');
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    //add product to supabase
    const addProduct = async () => {
        await supabase.from("products").insert([form]);
        setForm({
            name: "",
            description: "",
            price: "",
            image_url: "",
        });
        fetchProducts();
    };

    //delete product from supabase
    const deleteProduct = async (id) => {
        await supabase.from("products").delete().eq("id", id);
        fetchProducts();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

            <div className="space-y-2 mb-6">
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2 rounded w-full"
                />

                {/* ✅ Description Field Added */}
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="border p-2 rounded w-full"
                    rows={3}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    className="border p-2 rounded w-full"
                />

                <button
                    onClick={addProduct}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Add Product
                </button>
            </div>

            <ul className="space-y-2">
                {products.map((p) => (
                    <li key={p.id} className="flex justify-between border p-2 rounded">
                        <span>{p.name}</span>
                        <button
                            onClick={() => deleteProduct(p.id)}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
