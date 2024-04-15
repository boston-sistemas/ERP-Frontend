"use client"

//https://mui.com/material-ui/react-drawer/

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import TimerIcon from '@mui/icons-material/Timer';
import ArchiveIcon from '@mui/icons-material/Archive';
import { Factory } from '@mui/icons-material';
import Link from 'next/link';
import { SidebardProps } from '../types/component-types';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const drawerWidth = 255;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  position: 'relative',
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    marginRight: -30,
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebard({open,setOpen,activePage}: SidebardProps) {
  const theme = useTheme();
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Panel', icon: <HomeIcon />, href: '/panel' },
    { text: 'Resumen', icon: <Factory />, href: '/resumen_operaciones' },
    { text: 'Revisión de Stock', icon: <ArchiveIcon />, href: '/revision_stock' },
    { text: 'Programación EPT', icon: <TimerIcon />, href: '/programacion_ept' },
    { text: 'Reporte de Stock', icon: <UnarchiveIcon />, href: '/reporte_stock' },
  ];

  return (
    <Box sx={{ display: 'flex', p: 0, m: 0 }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start', 
            alignItems: 'center',
            width: '100%', 
            overflow: 'hidden',
          }}>
            <div style={{
              marginLeft: open ? 0 : 7,
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }}>
              <Image
                src="/logoBostonAzul.svg"
                alt="Logo Boston"
                width={180} 
                height={50} 
              />
            </div>
          </div>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <Link key={item.text} href={item.href} passHref>
               <ListItem disablePadding sx={{ display: 'block', backgroundColor: activePage === item.href ? 'rgb(20, 67, 131)' : 'inherit' }}>
                <ListItemButton
                  sx={{
                    color: activePage === item.href ? 'white' : 'inherit', // Cambia el color del texto a blanco si el botón está activo
                    '&:hover': {
                      backgroundColor: activePage === item.href ? 'grey' : 'rgba(0, 0, 0, 0.04)', // Cambia el color de fondo al azul si el botón está activo
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: activePage === item.href ? 'white' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}