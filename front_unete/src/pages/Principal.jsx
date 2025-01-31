import React from "react"
import BarraNavegacion from "../components/BarraNavegacion.jsx"
import BarraBusqueda from "../components/BarraBusqueda"
import ProductosDestacados from "../components/ProductosDestacados"
import PiePagina from "../components/PiePagina.jsx"
function Principal() {
    return (
            <>
                <BarraNavegacion/>
                <main className="container mx-auto px-4 py-12">
                    <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
                        Descubre lo Extraordinario
                    </h1>
                    <BarraBusqueda/>
                    <ProductosDestacados/>
                </main>
                <PiePagina></PiePagina>
            </>
    )
}
export default Principal