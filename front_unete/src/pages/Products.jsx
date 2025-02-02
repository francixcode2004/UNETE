// Star Rating Component
import PropTypes from "prop-types";

function StarRating({ rating }) {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
};

// Product Card Component
function ProductCard({ name, price, rating, imageUrl }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm max-w-xs">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{name}</h3>
            <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900">${price}</span>
                <StarRating rating={rating} />
            </div>
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
                Añadir
            </button>
        </div>
    );
}

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

// Cart Total Component
function CartTotal({ total }) {
    return (
        <div className="flex items-center justify-end space-x-2">
            <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium">Total: ${total}</span>
        </div>
    );
}

CartTotal.propTypes = {
    total: PropTypes.number.isRequired,
};

// Main Product Page Component
function ProductPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <ProductCard
                        name="Pincel"
                        price={10}
                        rating={4}
                        imageUrl="https://images.unsplash.com/photo-1615914143778-1a1a6e50c5dd?auto=format&fit=crop&w=500&q=80"
                    />
                </div>
            </main>
        </div>
    );
}

export default ProductPage;
