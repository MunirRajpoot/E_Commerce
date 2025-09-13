"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCart();
    const [isCheckout, setIsCheckout] = useState(false);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        setIsCheckout(true);
        toast.success("Order Placed Successfully");
        clearCart();

    }

    if (cart.length === 0) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Your Cart is Empty 🛒</h1>
                <p className="mt-2 text-gray-600">
                    Go back and add some products to your cart.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            <div className="space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border rounded-lg p-4 shadow"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-gray-600">
                                    ${item.price} × {item.quantity}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
                <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
                <div className="space-x-2">
                    <button
                        onClick={clearCart}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Clear Cart
                    </button>
                    <button
                        onClick={handleCheckout}
                        disabled={isCheckout}
                        className={`px-6 py-2 rounded text-white ${isCheckout
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
