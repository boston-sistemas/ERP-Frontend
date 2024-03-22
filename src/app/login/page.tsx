"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de que este es el módulo correcto según la versión de Next.js que estés utilizando
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
    </div>
  );
}
