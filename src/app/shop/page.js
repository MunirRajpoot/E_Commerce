"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (!error) setCategories(data);
  };

  const fetchProducts = async (categoryId = null) => {
    setLoading(true);
    let query = supabase.from("products").select("*");

    if (categoryId) query = query.eq("category_id", categoryId);

    const { data, error } = await query;
    if (!error) setProducts(data);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Categories */}
      <aside className="hidden md:block w-64 p-6 border-r bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => {
                setSelectedCategory(null);
                fetchProducts(null);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${!selectedCategory
                  ? "bg-black text-white font-semibold"
                  : "hover:bg-gray-100"
                }`}
            >
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => {
                  setSelectedCategory(cat.id);
                  fetchProducts(cat.id);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === cat.id
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-gray-100"
                  }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Section */}
      <main className="flex-1 p-6">
        {/* Header: Search + Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Shop</h1>
          <div className="flex gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
