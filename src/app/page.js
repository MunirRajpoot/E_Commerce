"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductList from "@/components/ProductList";

export default function HomePage() {
  const [products, seProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (!error) seProducts(data);
    };
    fetchProducts();
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList products={products} />

    </div>
  )
}
