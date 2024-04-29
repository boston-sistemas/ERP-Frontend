"use client"


import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import UserBanner from '@/components/BannerUsuario';
import { usePathname } from 'next/navigation';

export default function Panel() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        {/* Resto del contenido de tu página */}
      </div>
    </div>
  );
}