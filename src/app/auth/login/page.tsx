"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { FormSubmitEvent } from '../../../types/component-types';
import Banner from '../../../components/banner';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter();

  const handleSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();
    console.log('Inicio de sesión solicitado');
    router.push('/menu/panel');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Banner/>
      {/* Contenedor principal para las tarjetas */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="flex space-x-4 max-w-4xl w-full">
          {/* Tarjeta de login*/}
          <div className="flex flex-col w-full md:w-1/2 bg-white p-8 rounded-3xl shadow-3xl">
            <div className="flex flex-col items-center">
              <Image src="/userSVG.svg" alt='User' width={160} height={96} />
              <h2 className="text-2xl font-bold text-black mt-4">¡BIENVENIDO!</h2>
              <p className="text-black mb-8">Ingrese su usuario para ingresar al portal</p>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                  <input
                    type="text"
                    id="username"
                    placeholder="usuario"
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded text-black"
                  />
                </div>
                <div className="mb-4 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="contraseña"
                    required
                    className="p-2 w-full border border-gray-300 rounded text-black"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm text-gray-600 bg-transparent"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full bg-black text-white py-2 rounded-full hover:bg-blue-800"
                >
                  Ingresar
                </button>
              </form>
            </div>
          </div>

          {/* Tarjeta de bienvenida - Se oculta en pantallas pequeñas */}
          <div className="hidden md:flex md:w-1/2 bg-white p-6 rounded-3xl shadow-3xl justify-center items-center" style={{ backgroundColor: '#1A266A' }}>
            <Image src="/bostonSticker.jpg" alt="Boston Sticker" width={428} height={428} />
          </div>
        </div>
      </div>
    </div>
  );
}
