"use client"


import React, { useState } from 'react';
import Sidebar from '../../../components/sidebar';
import UserBanner from '@/components/banner_usuario';
import { usePathname } from 'next/navigation';
import Tabla_stock_disponible from '@/components/proveedores/modulo1/tablas/tabla_stock_disponible';
import Filtrador_Disponible from '@/components/proveedores/modulo1/filtros/filtro_stock_disponible';



export default function Panel() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');


  return (
    <div className="flex flex-col min-h-screen bg-white relative width: 100%">
      <UserBanner userProfilePic={'userCat.jpg'} pageName={''}/>
      <Filtrador_Disponible
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}

      />
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

      <Tabla_stock_disponible
        searchQuery={searchQuery}
      />
      </div>
    
    </div>
  );
}