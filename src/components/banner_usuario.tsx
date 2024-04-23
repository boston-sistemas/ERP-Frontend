
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';

interface UserBannerProps {
  pageName: string;
  userProfilePic: string;
  sidebarWidth?: string;
}

export default function UserBanner({userProfilePic, sidebarWidth }: UserBannerProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login')
    console.log('Cerrar sesión');
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="white"
         style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.3s', width: '100%' , height: '65px',borderBottom: '1px solid #E0E0E0'}}>
      <Box display="flex" alignItems="center" >
      <div style={{ paddingLeft: '59px'}}>
        <Image
          src="/logoBostonAzul.svg"
          alt="Logo Boston"
          width={180}
          height={50}
        />

      </div>
      </Box>
      <Box display="flex" alignItems="center">
        <Avatar src={userProfilePic} alt="Perfil del usuario" />
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}