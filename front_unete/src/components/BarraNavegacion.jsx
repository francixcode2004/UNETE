import React, { useState } from "react"
import Carrito from "./Carrito"
import { Menu, X } from "lucide-react"

function BarraNavegacion() {
    const [menuAbierto, setMenuAbierto] = useState(false)

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <a href="/" className="text-2xl font-bold text-gray-800">
                        ¡Unéte!
                    </a>
                    <div className="hidden md:flex space-x-8">
                        <a href="/" className="text-gray-600 hover:text-gray-800 transition duration-300">
                            Inicio
                        </a>
                        <a href="/productos" className="text-gray-600 hover:text-gray-800 transition duration-300">
                            Productos
                        </a>
                        <a href="/cuenta" className="text-gray-600 hover:text-gray-800 transition duration-300">
                            Iniciar Sesion
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Carrito/>
                        <button onClick={() => setMenuAbierto(!menuAbierto)} className="md:hidden">
                            {menuAbierto ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {menuAbierto && (
                <div className="md:hidden">
                    <a href="/" className="block py-2 px-4 text-sm hover:bg-gray-100">
                        Inicio
                    </a>
                    <a href="/productos" className="block py-2 px-4 text-sm hover:bg-gray-100">
                        Productos
                    </a>
                    <a href="/contacto" className="block py-2 px-4 text-sm hover:bg-gray-100">
                        Contacto
                    </a>
                </div>
            )}
        </nav>
    )
}

export default BarraNavegacion

