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

  // Search + debounce
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("");

  // Mobile sidebar toggle
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounce search input (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Re-fetch products whenever filters change
  useEffect(() => {
    fetchProducts(selectedCategory, debouncedSearch, sort);
  }, [selectedCategory, debouncedSearch, sort]);

  // Fetch categories
  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (!error) setCategories(data);
  };

  // Fetch products with filters
  const fetchProducts = async (
    categoryId = null,
    searchTerm = "",
    sortOrder = ""
  ) => {
    setLoading(true);
    let query = supabase.from("products").select("*");

    if (categoryId) query = query.eq("category_id", categoryId);
    if (searchTerm) query = query.ilike("name", `%${searchTerm}%`);

    if (sortOrder === "low")
      query = query.order("price", { ascending: true });
    if (sortOrder === "high")
      query = query.order("price", { ascending: false });
    if (sortOrder === "newest")
      query = query.order("created_at", { ascending: false });

    const { data, error } = await query;
    if (!error) setProducts(data);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 px-4 py-2 bg-black text-white rounded-lg shadow"
        onClick={() => setMobileSidebar(!mobileSidebar)}
      >
        {mobileSidebar ? "Close" : "Categories"}
      </button>

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setMobileSidebar(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${!selectedCategory
                ? "bg-black text-white font-semibold"
                : "hover:bg-gray-100"
                }`}
            >
              All Products
            </button>
          </li>
          {categories.length === 0 ? (
            <li className="text-gray-500 px-3">No categories found</li>
          ) : (
            categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setMobileSidebar(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${selectedCategory === cat.id
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-gray-100"
                    }`}
                >
                  {cat.name}
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>

      {/* Product Section */}
      <main className="flex-1 p-6">
        {/* Header: Title + Search + Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Shop</h1>
          <div className="flex gap-3 w-full sm:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Sort by</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="newest">Newest</option>
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
              <div
                key={product.id}
                className="animate-fadeIn"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fade-in animation (custom Tailwind) */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
