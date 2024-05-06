"use client"


import React, { useState } from 'react';
import Sidebar from '@/components/sideBar';
import UserBanner from '@/components/BannerUsuario';
import { usePathname } from 'next/navigation';




export default function  Panel() {
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100, 
          }}
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      <div className={sidebarOpen ? "content-overlay" : ""}>

      <p className="pl-20 text-black mt-4 text-xl">
            HOLA <span className="font-bold">PANEL</span> USUARIO 
      </p>
      </div>
    </div>
  );
}