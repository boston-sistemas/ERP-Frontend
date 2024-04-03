"use client"


import React, { useState } from 'react';
import Sidebar from '../../../components/sidebar';
import UserBanner from '@/components/banner_usuario';
import { usePathname } from 'next/navigation';
import Filtrador from '@/components/operaciones/filtros/filtrados_stock';
import Tabla_stock_pendiente from '@/components/operaciones/tablas/tabla_stock_pendiente';
import Typography from '@mui/material/Typography';
import Tabla_stock_cerrado from '@/components/operaciones/tablas/tabla_stock_cerrado';



export default function Panel() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('semana');
  const [selectedTissue, setSelectedTissue] = useState('tejeduria');
  const [searchQuery, setSearchQuery] = useState('');


  return (
    <div className="flex flex-col min-h-screen bg-white relative width: 100%">
      <UserBanner userProfilePic={'userCat.jpg'} pageName={''}/>
      <Filtrador
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        selectedTissue={selectedTissue}
        setSelectedTissue={setSelectedTissue}
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
      
      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'black', margin: '20px 0', textAlign: 'left' ,width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px'}}>
        REPORTE DE STOCK DE TEJEDURÍA PENDIENTE
      </Typography>


      <Tabla_stock_pendiente/>
      
      <Filtrador
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        selectedTissue={selectedTissue}
        setSelectedTissue={setSelectedTissue}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'black', margin: '20px 0', textAlign: 'left' ,width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px'}}>
        REPORTE DE STOCK DE TEJEDURÍA PENDIENTE
      </Typography>

      <Tabla_stock_cerrado/>


      </div>

     
     
      <div>
        
 
      </div>

    </div>
  );
}