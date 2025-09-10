import { supabase } from "@/lib/supabaseClient";
import ProductList from "@/components/ProductList";
export default async function Home() {
  const { data: products, error } = await supabase.from("products").select("*")
  if (error) {
    console.error(error);
    return <p className="text-red-500">Failed to load products</p>
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Prodcuts</h1>
      <ProductList products={products}/>
    </div>
  );
}
