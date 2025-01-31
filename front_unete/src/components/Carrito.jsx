import React, { useState } from "react"
import { ShoppingBag } from "lucide-react"

function Carrito() {
    const [abierto, setAbierto] = useState(false)
    const [articulos, setArticulos] = useState([])

    const alternarCarrito = () => {
        setAbierto(!abierto)
    }

    return (
        <div className="relative">
            <button
                onClick={alternarCarrito}
                className="flex items-center text-gray-600 hover:text-gray-800 transition duration-300"
            >
                <ShoppingBag size={24} />
                <span className="ml-2 text-sm font-medium">{articulos.length}</span>
            </button>
            {abierto && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-10 transition duration-300 ease-in-out transform">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Tu Carrito</h3>
                        {articulos.length === 0 ? (
                            <p className="text-gray-600">Tu carrito está vacío</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {articulos.map((articulo, indice) => (
                                    <li key={indice} className="py-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-800">{articulo.nombre}</span>
                                            <span className="text-gray-600">${articulo.precio}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                            Ir al Pago
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Carrito

