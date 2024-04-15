import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, TextField, InputAdornment } from '@mui/material';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import SearchIcon from '@mui/icons-material/Search';
import { Delete } from '@mui/icons-material';


interface WeekTissueSelectorProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Filtrador_Disponible: React.FC<WeekTissueSelectorProps> = ({
  searchQuery,
  setSearchQuery
}) => {

  const handleReset = () => {
    setSearchQuery('');
  };

  return (
    <Box 
    display="flex" alignItems="center" p={2} bgcolor="white"
    sx={{
      marginLeft:'55px',
      width: 'auto',
      px: 2, 
      height: '130px', borderBottom: '1px solid #E0E0E0',
      maxWidth: 'calc(100%-10px)', 
      boxSizing: 'border-box', 
      overflowX: 'auto', // Permite desplazamiento horizontal si el contenido es muy ancho
    }}
      >
      
      <UnarchiveIcon sx={{
        color: "black", 
        fontSize: {
          xs: '3rem', // Aquí haces que el ícono desaparezca en pantallas extra pequeñas
          sm: '4rem', // Tamaño más pequeño para pantallas pequeñas
          md: '5rem', // Tamaño mediano 
          lg: '6rem', // Tamaño más grande 
        }, 
        transition: 'font-size 0.5s ease', 
        marginLeft: '13px'
      }}/>
      
      <Box flexGrow={1} display="flex" justifyContent="flex-end" marginRight="15px">

       
        <TextField
          value={searchQuery}
          
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          placeholder="Orden"
          style={{ 
            backgroundColor: 'white', 
            padding: '0 15px',
            width:"190px" ,
          }}
          sx={{
            height: 40,
            '.MuiInputBase-root': { height: '40px' },
            '.MuiOutlinedInput-input': { padding: '10px 14px' },
            '.MuiSvgIcon-root': { fontSize: '1.25rem' },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

         {/* Botón para exportar a Google Sheets 
         <IconButton>
          <Image
              src="/google-sheets-icon.png" 
              alt="Export to Google Sheets"
              width={30} 
              height={30} 
            />
        </IconButton>
        */}
        
        <IconButton onClick={handleReset}>
          <Delete style={{color:"grey", fontSize: 25}}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Filtrador_Disponible;