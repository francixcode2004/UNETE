import React, { useState } from "react"
import { Search } from "lucide-react"

function BarraBusqueda() {
    const [terminoBusqueda, setTerminoBusqueda] = useState("")

    const manejarBusqueda = (e) => {
        e.preventDefault()
        console.log("Buscando:", terminoBusqueda)
    }

    return (
        <form onSubmit={manejarBusqueda} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                    className="w-full p-4 pr-12 text-gray-900 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                    <Search size={24} className="text-gray-400 hover:text-gray-600 transition duration-300" />
                </button>
            </div>
        </form>
    )
}

export default BarraBusqueda

