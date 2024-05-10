import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface UltimoStockProps {
  tejeduriaSeleccionada: string;
  setTejeduriaSeleccionada: (tejeduria: string) => void;
  tintoreriaSeleccionada: string;
  setTintoreriaSeleccionada: (tintoreria: string) => void;
}

const OperacionesFiltroTejeduriaTintoreria: React.FC<UltimoStockProps> = ({
  tejeduriaSeleccionada,
  setTejeduriaSeleccionada,
  tintoreriaSeleccionada,
  setTintoreriaSeleccionada
}) => {
  return (
    <Box display="flex" alignItems="center" p={2} bgcolor="white" sx={{
      marginLeft: '55px',
      width: 'auto',
      px: 2,
      height: '130px',
      borderBottom: '1px solid #E0E0E0',
      maxWidth: 'calc(100%-10px)',
      boxSizing: 'border-box',
      overflowX: 'auto'
    }}>
      <AccessAlarmIcon sx={{ color: "black", fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem'}, ml: 1 }}/>
      <Box sx={{ display: 'flex', flexGrow: 1, mx: 2 }}>
        <FormControl variant="outlined" sx={{ width: 200, height: '40px', mr: 2 }}>
          <InputLabel id="tejeduria-label">Tejeduría</InputLabel>
          <Select
            labelId="tejeduria-label"
            value={tejeduriaSeleccionada}
            onChange={(e) => setTejeduriaSeleccionada(e.target.value as string)}
            label="Tejeduría"
            sx={{ height: '40px' }}
          >
            <MenuItem value={'Tricot Fine S.A.'}>Tricot Fine S.A.</MenuItem>
            <MenuItem value={'Textil Defranco E.I.R.L.'}>Textil Defranco E.I.R.L.</MenuItem>
            <MenuItem value={'Textiles Roca E.I.R.L.'}>Textiles Roca E.I.R.L.</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'black',
            color: 'white',
            py: 1,
            px: 2,
            minWidth: 230, 
            height: '35px',
            borderRadius: '4px',
            '&:hover': {
              bgcolor: 'gray.700',
            },
            ml: 2, 
            mb: 1,
            transition: 'background-color 300ms ease-in-out',
          }}
          className="bg-black text-white hover:bg-gray-700 transition duration-300 ease-in-out"
        >
          Actualizar Stock
        </Button>
        <LocalShippingIcon sx={{ color: "black", fontSize: '2rem', ml: 8, flexGrow: 0 }}/>
        <FormControl variant="outlined" sx={{ width: 200, height: '40px', ml: 2}}>
          <InputLabel id="tintoreria-label">Tintoreria</InputLabel>
          <Select
            labelId="tintoreria-label"
            value={tintoreriaSeleccionada}
            onChange={(e) => setTintoreriaSeleccionada(e.target.value as string)}
            label="Tintoreria"
            sx={{ height: '40px' }}
          >
            <MenuItem value={'Tricot Fine S.A.'}>Tricot Fine S.A.</MenuItem>
            <MenuItem value={'Color y Textura'}>Color y Textura</MenuItem>
            <MenuItem value={'Yadah'}>Yadah</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default OperacionesFiltroTejeduriaTintoreria;