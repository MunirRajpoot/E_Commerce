import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <div className="border rounded-lg shadow hover:shadow-lg transition p-4">
            <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <Link
                href={`/product/${product.id}`} 
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
                View
            </Link>
        </div>
    );
}
