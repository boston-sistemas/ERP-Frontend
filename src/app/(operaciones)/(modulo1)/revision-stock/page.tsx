"use client"


import React, { useState } from 'react';
import Sidebar from '@/components/SideBar';
import UserBanner from '@/components/BannerUsuario';
import { usePathname } from 'next/navigation';
import OperacionesFiltroStockPendiente from '@/components/modulo1/revision_stock/OperacionesFiltroStockPendiente';
import Tabla_stock_pendiente from '@/components/modulo1/revision_stock/OperacionesTablaStockPendiente';
import Tabla_stock_cerrado from '@/components/modulo1/revision_stock/OperacionesTablaStockCerrado';



export default function Panel() {

  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [TejeduriaSeleccionada, SetTejeduriaSeleccionada] = useState<string>('tejeduria');
  const [OrdenBusqueda, SetOrdenBusqueda] = useState<string>('');


  return (
    <div className="flex flex-col min-h-screen bg-white relative width: 100%">
      <UserBanner userProfilePic={'userCat.jpg'} pageName={''}/>
      <OperacionesFiltroStockPendiente
        TejeduriaSeleccionada={TejeduriaSeleccionada}
        SetTejeduriaSeleccionada={SetTejeduriaSeleccionada}
        OrdenBusqueda={OrdenBusqueda}
        SetOrdenBusqueda={SetOrdenBusqueda}

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
      {/*
      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'black', margin: '20px 0', textAlign: 'left' ,width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px'}}>
        Reporte de stock de tejeduría PENDIENTE
      </Typography>
      */}

      <Tabla_stock_pendiente
        TejeduriaSeleccionada={TejeduriaSeleccionada}
        OrdenBusqueda={OrdenBusqueda}
      />
      
      {/*
      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'black', margin: '20px 0', textAlign: 'left' ,width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px'}}>
        Reporte de stock de tejeduría CERRADO
      </Typography>
      */}
      {/*  
      <Filtrador
        TejeduriaSeleccionada={TejeduriaSeleccionada2}
        SetTejeduriaSeleccionada={SetTejeduriaSeleccionada2}
        OrdenBusqueda={OrdenBusqueda2}
        SetOrdenBusqueda={SetOrdenBusqueda2}
      />*/}

      <Tabla_stock_cerrado/>


      </div>

     
 

    </div>
  );
}