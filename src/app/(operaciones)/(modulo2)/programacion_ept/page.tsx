"use client"

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import UserBanner from '@/components/BannerUsuario';
import { usePathname } from 'next/navigation';
import OperacionesFiltroTejeduriaTintoreria from '@/components/modulo2/programacion_ept/OperacionesFiltroTejeduriaTintoreria';
import OperacionesTablaUltimoStock from '@/components/modulo2/programacion_ept/OperacionesTablaUltimoStock';
import OperacionesTablaPartida from '@/components/modulo2/programacion_ept/OperacionesTablaPartida';

interface SubOrden {
  id: string;
  hilanderia: string;
  suborden: string;
  ancho: string;
  partida: number;
  restante: number;
  rollos: number;
  peso: number;
  tintoreria: string;
  color: string;
  peso_por_rollo: number;
}

export default function Programacion_ept() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tejeduriaSeleccionada, setTejeduriaSeleccionada] = useState<string>(' ');
  const [tintoreriaSeleccionada, setTintoreriaSeleccionada] = useState<string>(' ');
  const [searchQuery, setSearchQuery] = useState<string>(' ');
  const [partidas, setPartidas] = useState<SubOrden[]>([]);

  const handleAddPartida = (selectedRows: SubOrden[]) => {
    const nextPartidaNumber = partidas.length > 0 ? partidas[partidas.length - 1].partida + 1 : 1;
    setPartidas((prevPartidas) => [
      ...prevPartidas,
      ...selectedRows.map((row) => ({
        ...row,
        id: `${row.id}-${nextPartidaNumber}`,  // ID único
        partida: nextPartidaNumber
      }))
    ]);
  };

  const handleRollosChange = (id: string, newRollos: number) => {
    setPartidas(prevPartidas =>
      prevPartidas.map(partida =>
        partida.id === id ? { ...partida, rollos: newRollos, peso: newRollos * partida.peso_por_rollo } : partida
      )
    );
  };

  const handleDeletePartida = (id: string) => {
    setPartidas(prevPartidas => prevPartidas.filter(partida => partida.id !== id));
  };

  const handleColorChange = (id: string, newColor: string) => {
    setPartidas(prevPartidas =>
      prevPartidas.map(partida =>
        partida.id === id ? { ...partida, color: newColor } : partida
      )
    );
  };

  const handleResetFilters = () => {
    setTejeduriaSeleccionada(' ');
    setTintoreriaSeleccionada(' ');
    setSearchQuery(' ');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative" style={{ width: '100%' }}>
      <UserBanner userProfilePic={'userCat.jpg'} pageName={''} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activePage={pathname} />
      <OperacionesFiltroTejeduriaTintoreria
        tejeduriaSeleccionada={tejeduriaSeleccionada}
        setTejeduriaSeleccionada={setTejeduriaSeleccionada}
        tintoreriaSeleccionada={tintoreriaSeleccionada}
        setTintoreriaSeleccionada={setTintoreriaSeleccionada}
      />
      
      <OperacionesTablaUltimoStock
        searchQuery={searchQuery}
        onAddPartida={handleAddPartida}
        onUpdateRollos={handleRollosChange}
        partidas={partidas}
        tintoreriaSeleccionada={tintoreriaSeleccionada}
      />

      <OperacionesTablaPartida
        partidas={partidas}
        onRollosChange={handleRollosChange}
        onDeletePartida={handleDeletePartida}
        onColorChange={handleColorChange}
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