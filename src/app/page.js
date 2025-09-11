"use client";
import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import ProductList from "@/components/ProductList";

export default function HomePage() {
  // const [products, seProducts] = useState([]);
  const [count, setCount] = useState(0);


  function handleClick() {
    // console.log("start");

    // setTimeout(() => {
    //   console.log("timeout");
    // }, 10);

    // Promise.resolve().then(() => {
    //   console.log("promise");
    // });

    // console.log("end");




    console.log('script start');

    setTimeout(() => console.log('timeout1'), 2);

    Promise.resolve().then(() => {
      console.log('promise1');
      setTimeout(() => console.log('timeout2'), 10);
    }).then(() => console.log('promise2'));

    console.log('script end');
  }

  // useEffect(()=>{
  //   const fetchProducts = async () => {
  //     const {data, error} = await supabase.from('products').select('*');
  //     if(!error) seProducts(data);
  //   };
  //   fetchProducts(); 
  // },[])
  useEffect(() => {
    console.log("count in useEffect", count);
  }, [count])
  return (
    <div>
      {/* <h1 className="text-3xl font-bold mb-6">Products</h1> */}
      {/* <ProductList products={products}/> */}

      <div>
        <p>Count: {count}</p>
        <button onClick={handleClick} className="px-4 py-2 bg-blue-600 transition">
          Increment
        </button>
      </div>

    </div>
  )
}
