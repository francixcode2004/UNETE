import React from "react";

const Productos = ({ productos }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productos.map((producto) => (
                <div
                    key={producto.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <img
                        src={producto.imagen || "/placeholder.svg"}
                        alt={producto.nombre}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{producto.nombre}</h3>
                        <p className="text-gray-600">${producto.precio.toFixed(2)}</p>
                        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Productos;
