"use client"


import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sideBar';
import UserBanner from '@/components/BannerUsuario';
import { usePathname } from 'next/navigation';
import { middleware } from '@/utils/middleware';



interface User {
  username: string;
  display_name: string;
  email: string;
  accesos: string[];
}

interface RoleAccess {
  roles: string[];
  accesos: string[];
}




export default function  Panel({ user = { username: '', display_name: '', email: '', accesos: [] } }: { user: User }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleAccess, setRoleAccess] = useState<RoleAccess>({ roles: [], accesos: [] });

  useEffect(() => {

    if (!user || !user.username) {
      console.log('User data is not available');
      return;
    }

    async function fetchRolesAndAccess() {
      const response = await fetch(`/api/v1/usuarios/${user.username}/roles-accesos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}` // Extrae el token de la cookie
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Okay');
        setRoleAccess(data);
      } else {
        console.error('Failed to fetch roles and access data');
      }
    }
    fetchRolesAndAccess();
  }, [user.username]);
  
  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <UserBanner userProfilePic={'userCat.jpg'} pageName={''}/>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activePage={pathname} />
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo gris semitransparente
            zIndex: 100, 
          }}
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      <div className={sidebarOpen ? "content-overlay" : ""}>
      <h1 className="text-center mt-10 text-xl font-bold">Hola, {user.username}!</h1>
        {/* Resto del contenido de tu página */}
      </div>
    </div>
  );
}