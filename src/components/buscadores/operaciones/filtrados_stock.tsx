import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, TextField, InputAdornment } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { Delete } from '@mui/icons-material';

interface WeekTissueSelectorProps {
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
  selectedTissue: string;
  setSelectedTissue: (tissue: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Filtrador: React.FC<WeekTissueSelectorProps> = ({
  selectedWeek,
  setSelectedWeek,
  selectedTissue,
  setSelectedTissue,
  searchQuery,
  setSearchQuery
}) => {

  const handleReset = () => {
    setSelectedWeek('semana');
    setSelectedTissue('tejeduria');
    setSearchQuery('');
  };

  return (
    <Box display="flex" alignItems="center" p={2} bgcolor="white"
         style={{ marginLeft: 50, width: 'calc(100% - 50px)', height: '130px', borderBottom: '1px solid #E0E0E0'}}>
      
      <ArchiveIcon style={{color:"black", fontSize: 100 }}/>
    
      <FormControl variant="outlined" style={{ marginLeft: '20px', width: '150px', height: '40px' }}>
        <InputLabel style={{ backgroundColor: 'white', padding: '0 5px' }}>Semana</InputLabel>
        <Select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value as string)}
          label="Semana"
          style={{ 
            borderRadius: '4px', 
            border: '1px solid #c4c4c4', 
            height: '40px', 
            backgroundColor: 'white',
            fontSize: '16px'
          }}
        >
          <MenuItem value={'1'}>1</MenuItem>
          <MenuItem value={'2'}>2</MenuItem>
          {/* Etc... */}
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ marginLeft: '20px', width: '150px', height: '40px' }}>
        <InputLabel style={{ backgroundColor: 'white', padding: '0 5px' }}>Tejeduría</InputLabel>
        <Select
          value={selectedTissue}
          onChange={(e) => setSelectedTissue(e.target.value as string)}
          label="Tejeduría"
          style={{ 
            borderRadius: '4px', 
            border: '1px solid #c4c4c4', 
            height: '40px', 
            backgroundColor: 'white',
            fontSize: '16px'
          }}
        >
          <MenuItem value={'Tricot Fine S.A.'}>Tricot Fine S.A.</MenuItem>
          <MenuItem value={'Textil Defranco E.I.R.L'}>Textil Defranco E.I.R.L</MenuItem>
          {/* Etc... */}
        </Select>
      </FormControl>
      {/* Botón para exportar a Google Sheets */}
      <IconButton style={{ marginLeft: '20px' }}>
        <Image
            src="/google-sheets-icon.png" 
            alt="Export to Google Sheets"
            width={30} 
            height={30} 
          />
      </IconButton>
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        placeholder="Orden"
        style={{width:"150px"}}
        sx={{
          height: 40,
          margin: '0 20px',
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
      <IconButton onClick={handleReset}>
        <Delete style={{color:"grey", fontSize: 25}}/>
      </IconButton>
    </Box>
  );
};

export default Filtrador;