import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, TextField, InputAdornment } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import SearchIcon from '@mui/icons-material/Search';
import { Delete } from '@mui/icons-material';


interface PropsFiltros {
  TejeduriaSeleccionada: string;
  SetTejeduriaSeleccionada: (tissue: string) => void;
  OrdenBusqueda: string;
  SetOrdenBusqueda: (query: string) => void;
}

const OperacionesFiltroStockPendiente: React.FC<PropsFiltros> = ({
  TejeduriaSeleccionada,
  SetTejeduriaSeleccionada,
  OrdenBusqueda,
  SetOrdenBusqueda
}) => {

  const QuitarFiltros = () => {
    SetTejeduriaSeleccionada('tejeduria');
    SetOrdenBusqueda('');
  };

  return (
    <Box display="flex" alignItems="center" p={2} bgcolor="white"
      sx={{
      marginLeft:'55px',
      width: 'auto',
      px: 2, 
      height: '130px', borderBottom: '1px solid #E0E0E0',
      maxWidth: 'calc(100%-10px)', 
      boxSizing: 'border-box', 
      overflowX: 'auto' 
      }}
    >
      <ArchiveIcon sx={{ color: "black", fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem',}, transition: 'font-size 0.5s ease', marginLeft: '13px' }}/>
      <Box flexGrow={1} display="flex" justifyContent="flex-end" marginRight="15px">
        <FormControl variant="outlined" style={{ width: '150px', height: '40px', marginLeft: '20px' }}>
          <InputLabel style={{ backgroundColor: 'white', padding: '0 5px' }}>Tejeduría</InputLabel>
          <Select
            value={TejeduriaSeleccionada}
            onChange={(e) => SetTejeduriaSeleccionada(e.target.value as string)}
            label="Tejeduría"
            sx={{ height: '40px', backgroundColor: 'white', fontSize: '16px' }}
          >
            <MenuItem value={'Tricot Fine S.A.'}>Tricot Fine S.A.</MenuItem>
            <MenuItem value={'Textil Defranco E.I.R.L.'}>Textil Defranco E.I.R.L</MenuItem>
            <MenuItem value={'Textiles Roca E.I.R.L.'}>Textiles Roca E.I.R.L</MenuItem>
          </Select>
        </FormControl>
              
        <TextField
          value={OrdenBusqueda}    
          onChange={(e) => SetOrdenBusqueda(e.target.value)}
          variant="outlined"
          placeholder="Orden"
          style={{ backgroundColor: 'white',  padding: '0 15px', width:"190px" }}
          sx={{
            height: 40,'.MuiInputBase-root': { height: '40px' },  '.MuiOutlinedInput-input': { padding: '10px 14px' }, '.MuiSvgIcon-root': { fontSize: '1.25rem' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <IconButton onClick={QuitarFiltros}>
          <Delete style={{color:"grey", fontSize: 25}}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default OperacionesFiltroStockPendiente;