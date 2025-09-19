// components/CartItem.jsx
export default function CartItem({ item, onRemove }) {
    return (
        <div className="flex justify-between border p-4 rounded">
            <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">
                    ${item.price} × {item.quantity}
                </p>
            </div>
            <button onClick={() => onRemove(item.id)} className="text-red-600">
                Remove
            </button>
        </div>
    );
}
