"use client"

import React, { useState } from 'react';
import Sidebar from '@/components/sideBar';
import UserBanner from '@/components/BannerUsuario';
import { usePathname } from 'next/navigation';
import OperacionesFiltroTejeduriaTintoreria from '@/components/modulo2/Programacion_ept/OperacionesFiltroTejeduriaTintoreria';
import OperacionesTablaUltimoStock from '@/components/modulo2/Programacion_ept/OperacionesTablaUltimoStock';


export default function Programacion_ept() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tejeduriaSeleccionada, setTejeduriaSeleccionada] = useState<string>('Tejeduría Inicial');
  const [tintoreriaSeleccionada, setTintoreriaSeleccionada] = useState<string>('Tintoreria Inicial');
  const [searchQuery, setSearchQuery] = useState<string>(''); 

  return (
    <div className="flex flex-col min-h-screen bg-white relative" style={{width: '100%'}}>
      <UserBanner userProfilePic={'userCat.jpg'} pageName={''}/>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activePage={pathname} />
      <OperacionesFiltroTejeduriaTintoreria
        tejeduriaSeleccionada={tejeduriaSeleccionada}
        setTejeduriaSeleccionada={setTejeduriaSeleccionada}
        tintoreriaSeleccionada={tintoreriaSeleccionada}
        setTintoreriaSeleccionada={setTintoreriaSeleccionada}
      />
      
      <OperacionesTablaUltimoStock
        searchQuery={searchQuery}
      />

      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100, 
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}