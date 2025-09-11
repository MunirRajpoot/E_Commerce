import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "E-Commerce Starter",
  description: "Next.js + Supabase + Tailwind E-Commerce",
};

export default function RootLayout({ children }) {
  return (
   <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <CartProvider>
          <Navbar />
          <main className="flex-1 container mx-auto p-4">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
