"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductList from "@/components/ProductList";
import Carousel from "@/components/Carousel";
import Features from "@/components/Features";

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
    <>
      <Carousel />
      <Features/>
      <ProductList products={products} />

    </>
  )
}
