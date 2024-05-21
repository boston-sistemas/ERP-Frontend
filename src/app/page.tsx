"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import axios from '@/config/axiosConfig';



export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/usuarios/login', {
        username,
        password,
      }, {
        withCredentials: true
      });
      router.push('/panel');
    } catch (error: any) {
      console.error('Error de inicio de sesión:', error.response ? error.response.data : error.message);
      alert('Error al iniciar sesión: ' + (error.response ? error.response.data.detail : error.message));
    }
  };


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };



  return (
    <div className="flex flex-wrap min-h-screen">
      {/* Parte izquierda con centrado vertical y horizontal */}
      <div className="md:w-1/2 w-full bg-blue-900 p-4 md:order-1 flex items-center justify-center">
        <div className="flex flex-col items-start max-w-md">
          {/* Logo */}
          <Image src="/logoBoston.png" alt="Logo de Boston" width={150} height={150} />
          <p className="text-white mt-4 text-xl">
            UN <span className="font-bold">PRODUCTO</span> ORIGINAL <br /><span className="font-bold">DEJA</span> <span className="font-bold">HUELLA</span>
          </p>
        </div>
      </div>
      {/* Parte derecha */}
      <div className="flex flex-col justify-center items-center w-full bg-white p-4 md:w-1/2 md:order-2">
        <div className="w-full max-w-md px-2 sm:px-6">
          <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full">
              <TextField
                type="text" id="username" label="Usuario" variant="standard" margin="normal" fullWidth value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                type={showPassword ? 'text' : 'password'} id="password" label="Contraseña" variant="standard" margin="normal" fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <button
                type="submit"
                className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 transition duration-300 ease-in-out"
              >
                Ingresar
              </button>
              {/* Íconos de redes sociales */}
              <div className="flex justify-around mt-4">
                <a href="https://www.instagram.com/bostonropainterior/" target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label="Instagram" color="primary">
                    <InstagramIcon />
                  </IconButton>
                </a>
                <a href="https://www.facebook.com/BostonOficial/" target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label="Facebook" color="primary">
                    <FacebookIcon />
                  </IconButton>
                </a>
                <a href="https://www.boston.com.pe/" target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label="Web page" color="primary">
                    <LanguageIcon />
                  </IconButton>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}