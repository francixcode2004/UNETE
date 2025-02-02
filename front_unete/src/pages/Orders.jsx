import React from 'react';
import PropTypes from 'prop-types';
import { Trash2, Plus, Minus } from 'lucide-react';

// CartItem Component
function CartItem({ name, price, quantity, onIncrease, onDecrease, onRemove }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
                <div>
                    <h3 className="font-medium text-gray-900">{name}</h3>
                    <p className="text-gray-600">${price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={onDecrease}
                        className="p-1 hover:bg-gray-100 rounded-md"
                    >
                        <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                        onClick={onIncrease}
                        className="p-1 hover:bg-gray-100 rounded-md"
                    >
                        <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
                <span className="w-20 text-right">${(price * quantity).toFixed(2)}</span>
                <button
                    onClick={onRemove}
                    className="p-1 hover:bg-gray-100 rounded-md text-red-500"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

// Cart Component
function Cart({ items, onUpdateQuantity, onRemoveItem }) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>

            <div className="space-y-4">
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        {...item}
                        onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        onRemove={() => onRemoveItem(item.id)}
                    />
                ))}
            </div>

            <div className="mt-8 flex justify-between items-center border-t pt-4">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-xl">${total.toFixed(2)}</span>
            </div>

            <button className="mt-6 w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors">
                Proceder al Pago
            </button>
        </div>
    );
}

Cart.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
};

// Main CartPage Component
function CartPage() {
    const [cartItems, setCartItems] = React.useState([
        { id: 1, name: 'Pincel', price: 10.00, quantity: 1 },
        { id: 2, name: 'Labial', price: 15.00, quantity: 1 },
        { id: 3, name: 'Base', price: 30.00, quantity: 1 },
    ]);

    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    return (
        <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
        />
    );
}

export default CartPage;