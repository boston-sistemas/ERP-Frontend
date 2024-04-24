"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Acceso {
  nombre: string;
  acceso_id: number;
}

interface Rol {
  nombre: string;
  rol_id: number;
}

interface User {
  username: string;
  display_name: string;
  email: string;
  accesos: Acceso[];
  roles: Rol[];
}

interface UserContextType {
  user: User | null;
  loginUser: (userData: User, accessToken: string) => void;
  logoutUser: () => void;
}

// Proporciona un valor por defecto con funciones dummy para evitar errores al consumir el contexto
const defaultContextValue: UserContextType = {
  user: null,
  loginUser: () => {}, // No hace nada
  logoutUser: () => {}, // No hace nada
};

// Usa el valor por defecto al crear el contexto
const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const loginUser = (userData: User, accessToken: string) => {
    localStorage.setItem('token', accessToken);
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Puedes quitar el operador ! para evitar errores de TypeScript cuando el contexto sea null
export const useUser = () => useContext(UserContext);