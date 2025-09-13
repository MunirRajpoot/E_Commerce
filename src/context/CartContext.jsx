"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCheckout, setIsCheckout] = useState(false);

    const addToCart = (product) => {
        if (isCheckout) return; // Prevent adding items during checkout
        setCart((prev) => {
            const existingProduct = prev.find((item) => item.id === product.id);
            if (existingProduct) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };


    const checkout = () => {
        setIsCheckout(true);
    }
    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, checkout, isCheckout }}
        >
            {children}
        </CartContext.Provider>
    );
}
