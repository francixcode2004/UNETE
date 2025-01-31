import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Autenticacion = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="relative flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Sección izquierda: Bienvenido */}
                <div
                    className={`w-1/2 p-8 flex flex-col justify-center items-center transition-all duration-500 ${
                        isLogin ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                >
                    <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
                        {isLogin ? 'Bienvenido' : 'Únete'}
                    </h2>
                    <p className="text-gray-600 mb-8 text-center">
                        {isLogin
                            ? 'Para unirte a nuestra comunidad por favor inicia sesión con tus datos'
                            : 'Por favor, llena el formulario para crear una cuenta'}
                    </p>
                    <button
                        onClick={toggleForm}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>
                </div>

                {/* Sección derecha: Formulario */}
                <div className="w-1/2 p-8">
                    <div
                        className={`transition-all duration-500 transform ${
                            isLogin ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        {isLogin ? <LoginForm /> : <RegisterForm />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Autenticacion;
