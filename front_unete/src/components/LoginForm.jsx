import React from 'react';

const LoginForm = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
            <form className="space-y-4">
                <div>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
