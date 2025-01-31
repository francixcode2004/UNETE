import React from "react"
import Productos from "./Productos.jsx"
const productos = [
    { id: 1, nombre: "Camiseta Eco", precio: 29.99, imagen: "/placeholder.svg?height=200&width=200" },
    { id: 2, nombre: "Jeans Reciclados", precio: 59.99, imagen: "/placeholder.svg?height=200&width=200" },
    { id: 3, nombre: "Zapatillas Veganas", precio: 89.99, imagen: "/placeholder.svg?height=200&width=200" },
    { id: 4, nombre: "Bolso Sostenible", precio: 39.99, imagen: "/placeholder.svg?height=200&width=200" },
]
function ProductosDestacados() {
    return (
        <section className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Productos Destacados</h2>
            <Productos productos={productos} ></Productos>
        </section>
    )
}

export default ProductosDestacados