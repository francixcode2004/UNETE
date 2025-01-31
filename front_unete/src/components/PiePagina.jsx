import React from "react"
import { MapPin, Phone, Mail } from "lucide-react"

function PiePagina() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Phone size={20} className="mr-2" />
                                <span>+593 0986266139</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="mr-2" />
                                <a href="mailto:info@ecochic.com" className="hover:text-blue-300 transition duration-300">
                                    patricia7@gamil.com
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
                        <p className="flex items-start">
                            <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                            <span>
                Av. Libertadores- Simón Bolivar parroquia de guayllabamba
                <br />
                N12-225 Quito, Ecuador
              </span>
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Horario</h3>
                        <p>Lunes a Viernes: 08:00 - 20:00</p>
                        <p>Sábados: 10:00 - 14:00</p>
                        <p>Domingos: 10:00 - 12:00</p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p>&copy; {new Date().getFullYear()} Todos los derechos reservados por Francisco López</p>
                </div>
            </div>
        </footer>
    )
}

export default PiePagina

