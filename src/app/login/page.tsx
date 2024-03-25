"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Verifica que este sea el módulo correcto según la versión de Next.js que estés utilizando.
import { FormSubmitEvent } from '../../types/component-types';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();
    console.log('Inicio de sesión solicitado');
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="w-full py-4 bg-blue-600 text-center text-white font-bold text-xl">
        Bienvenido a Nuestra Plataforma
      </div>
      {/* Contenedor principal para las tarjetas */}
      <div className="flex-grow flex items-center justify-center">
        <div className="flex space-x-4 px-4">
          {/* Tarjeta de login */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                required
                className="mt-1 p-2 w-full border rounded-md text-black"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  className="p-2 w-full border rounded-md text-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-black bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Tarjeta de bienvenida - Se oculta en pantallas pequeñas */}
          <div className="hidden md:flex bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">WELCOME</h2>
          </div>
        </div>
      </div>
    </div>
  );
}