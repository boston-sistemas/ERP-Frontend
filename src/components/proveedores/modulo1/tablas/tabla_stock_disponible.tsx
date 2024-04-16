import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, TextField, Typography, makeStyles } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AlertaEnviarStock from './alertas/alerta_enviar_stock';
import { rows, columns} from './data/data_disponible';
import Collapse from '@mui/material/Collapse';
import { useMemo } from 'react';
import { useState, useEffect } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@emotion/react';





interface TablaStockPendienteProps {
  searchQuery: string;
}

interface RollAndWeightInputs {
  [suborderId: string]: number;
}

export default function Tabla_stock_disponible({searchQuery }: TablaStockPendienteProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSubOrders, setOpenSubOrders] = React.useState<Record<string, boolean>>({});
  const handleClickOpen = () => setOpenDialog(true);
  const [menuDirectionUp, setMenuDirectionUp] = useState(false);
  const theme = useTheme()
  const [rollInputs, setRollInputs] = useState<RollAndWeightInputs>({});
  const [weightInputs, setWeightInputs] = useState<RollAndWeightInputs>({});


  const handleRollChange = (suborderId: string, value: string) => {
    const numericValue = value ? parseInt(value, 10) : 0; // Convierte a número, usa 0 si el valor es falsy
    setRollInputs(prev => ({ ...prev, [suborderId]: numericValue }));
  };
  
  const handleWeightChange = (suborderId: string, value: string) => {
    const numericValue = value ? parseInt(value, 10) : 0; // Convierte a número, usa 0 si el valor es falsy
    setWeightInputs(prev => ({ ...prev, [suborderId]: numericValue }));
  };
  
  const handleMenuEnter = (node: { clientHeight: any; }) => {
    if (anchorEl && node) {
      const rect = anchorEl.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // Estima la altura del menú basado en el nodo del menú
      const estimatedMenuHeight = node.clientHeight;
      
      // Si no hay suficiente espacio debajo y hay más espacio arriba, abre hacia arriba
      setMenuDirectionUp(spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow);
    }
  };
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [stateLabels, setStateLabels] = React.useState<{ [key: string]: string }>({
  'Listo': 'Listo',
  'En curso': 'En curso',
  'Detenido': 'Detenido',
  '-': '-'
  });

  const handleClickStateMenu = (event: React.MouseEvent<HTMLElement>, order: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseStateMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = () => setOpenDialog(false);

  const getSelectedRows = () => {
    return Object.keys(selected)
      .filter(key => selected[key])
      .flatMap(key => {
        const row = rows.find(r => r.order === key);
        if (row) {
          return row.subOrders.map(subOrder => ({
            id: subOrder.id,
            order: row.order,
            textile: row.textile,
            consumed: subOrder.consumed,
            programmed: subOrder.programmed,
            progress: subOrder.progress,
            suborder: subOrder.suborder,
            ancho: subOrder.ancho,
            remaining: subOrder.remaining,
            rolls: rollInputs[subOrder.id] || 0,
            weight: weightInputs[subOrder.id] || 0
          }));
        }
        return [];
      });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
 
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.reduce((acc, row) => {
        acc[row.order] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setSelected(newSelected);
    } else {
      setSelected({});
    }
  };

  const handleToggleSubOrder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, order: string) => {
    event.stopPropagation();
    setOpenSubOrders(prev => ({
      ...prev,
      [order]: !prev[order]
    }));
  };
  
  const getStateColor = (state: any) => {
    switch (state) {
      case '-':
        return '#9C9DA1';
      case 'Detenido':
        return '#DD2E44';
      case 'En curso':
        return '#FFC225';
      case 'Listo':
        return '#3EC564';
      default:
        return 'none';
    }
  };

  const filteredRows = useMemo(() => {
    return rows.filter(row =>
      (searchQuery === '' || row.order.toLowerCase().includes(searchQuery.toLowerCase()))  // Filtrar por orden si hay búsqueda
    );
  }, [searchQuery]);

  const menuStyles = {
    menuItem: (state: any) => ({
      backgroundColor: getStateColor(state),
      color: 'white',
      '&:hover': {
        backgroundColor: 'getStateColor(state)',
      
      },
      margin: '4px 0', 
      borderRadius: '4px', 
    }),
    menu: {
      marginTop: '8px', 
      boxShadow: '0 10px 15px rgba(0,0,0,0.7)', 
    },
  };



  return (
    <Paper sx={{ width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px', marginTop: '20px', marginBottom: '90px' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        
          {/*TABLA PRINCIPAL*/}
        
        <Table  stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center" padding="checkbox" style={{ backgroundColor: 'rgb(20, 67, 131)' }}>
                <Checkbox
                  color="default"
                  indeterminate={Object.keys(selected).length > 0 && Object.keys(selected).length < rows.length}
                  checked={rows.length > 0 && Object.keys(selected).length === rows.length}
                  onChange={(event) => {
                    if (event.target.checked) {
                      const newSelected = rows.reduce((acc, row) => {
                        acc[row.order] = true;
                        return acc;
                      }, {} as Record<string, boolean>);
                      setSelected(newSelected);
                    } else {
                      setSelected({});
                    }
                  }}
                  sx={{
                    color: 'white',
                    '&.MuiCheckbox-root': { color: 'white' },
                    '&.Mui-checked': { color: 'white' },
                    '& .MuiSvgIcon-root': { fill: 'white' },
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ backgroundColor: 'rgb(20, 67, 131)', color: 'white', minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <React.Fragment key={row.order}>
                  <TableRow
                    hover
                    onClick={(event) => {
                      
                      if (event.target instanceof HTMLElement && event.target.closest('.ignore-row-click')) {
                        return;
                      }
                    
                      const newSelected = { ...selected, [row.order]: !selected[row.order] };
                      if (newSelected[row.order]) {
                        setSelected(newSelected);
                      } else {
                        const remainingSelected = { ...newSelected };
                        delete remainingSelected[row.order];
                        setSelected(remainingSelected);
                      }
                    }}
                    role="checkbox"
                    aria-checked={!!selected[row.order]}
                    tabIndex={-1}
                    selected={!!selected[row.order]}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={!!selected[row.order]}
                      />
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.order}
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleToggleSubOrder(event, row.order);
                        }}
                      >
                        {openSubOrders[row.order] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.programmed.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center">{row.consumed.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center">{row.remaining.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center">{`${row.waste.toFixed(2)} %`}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                          <LinearProgress variant="determinate" value={row.progress} />
                        </Box>
                        <Box minWidth={35}>
                          <Typography variant="body2" color="textSecondary">{`${Math.round(row.progress)}%`}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell 
                    align="center" 
                    style={{ backgroundColor: getStateColor(row.state), color: 'white' }}
                    aria-controls="simple-menu" 
                    aria-haspopup="true" 
                    onClick={(event) => handleClickStateMenu(event, row.order)}
                    >
                      {row.state}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 60}} colSpan={columns.length + 2}>
                      
                      {/*TABLA COLAPSADA*/}
                      
                      <Collapse in={!!openSubOrders[row.order]} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                        <Box margin={1}>
                          <Table  size="small" aria-label="sub-orders">
                            <TableHead>
                              <TableRow>
                                <TableCell padding="checkbox"></TableCell>
                                <TableCell align="center">Tejido</TableCell>
                                <TableCell align="center">Ancho</TableCell>
                                <TableCell align="center">Hilandería</TableCell>
                                <TableCell align="center">Programado (kg)</TableCell>
                                <TableCell align="center">Consumido (kg)</TableCell>
                                <TableCell align="center">Restante (kg)</TableCell>
                                <TableCell align="center">Rollos</TableCell>
                                <TableCell align="center">Peso (kg)</TableCell>
                            
                                <TableCell align="center">Estado</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.subOrders.map((subOrder, index) => (
                                <TableRow key={index}>
                                <TableCell padding="checkbox"></TableCell>
                                <TableCell align="center">{subOrder.suborder}</TableCell>
                                <TableCell align="center">{subOrder.ancho}</TableCell>
                                <TableCell align="center">{subOrder.hilanderia}</TableCell>
                                <TableCell align="center">{subOrder.programmed.toLocaleString('en-US')}</TableCell>
                                <TableCell align="center">{subOrder.consumed.toLocaleString('en-US')}</TableCell>
                                <TableCell align="center">{subOrder.remaining.toLocaleString('en-US')}</TableCell>
                                <TableCell align="center">
                                <TextField
                                    value={rollInputs[subOrder.id] || ''}
                                    onChange={(e) => handleRollChange(subOrder.id, e.target.value)}
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ style: { textAlign: 'center' } }}
                                    style={{width:'140px',}}
                                />
                                </TableCell>
                                <TableCell align="center">
                                <TextField
                                    value={weightInputs[subOrder.id] || ''}
                                    onChange={(e) => handleWeightChange(subOrder.id, e.target.value)}
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ style: { textAlign: 'center' } }}
                                    style={{width:'140px'}}
                                />
                                </TableCell>
                                <TableCell 
                                onClick={(event) => handleClickStateMenu(event, row.order)}
                                sx={{ width: 130, maxWidth: '100%' }}  
                                align="center" 
                                style={{ backgroundColor: getStateColor(subOrder.state), color: 'white' }}
                                >
                                {subOrder.state}
                                </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No existen datos para esta consulta
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/*MENU ESTADOS*/}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseStateMenu}
        TransitionProps={{ onEntering: handleMenuEnter }}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'white',
              overflow: 'visible',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
              mt: menuDirectionUp ? null : '8px',
              mb: menuDirectionUp ? '8px' : null,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: menuDirectionUp ? '242px' : '-6px',
                bottom: menuDirectionUp ? 'calc(100% - 7px)' : null,
                left: '50%',
                transform: menuDirectionUp ? 'translateX(-50%) rotate(225deg)' : 'translateX(-50%) rotate(45deg)',
                width: '13px',
                height: '13px',
                bgcolor: 'white',
             
                zIndex: 1,
              },
            },
            '& .MuiList-root': {
              padding: '4px 8px',
              bgcolor: 'background.paper',
              borderRadius: '4px',
              boxShadow: 'none', 
              width: {
                xs: '10rem', // Aquí haces que el ícono desaparezca en pantallas extra pequeñas
                sm: '10rem', // Tamaño más pequeño para pantallas pequeñas
                md: '10rem', // Tamaño mediano 
                lg: '11rem',
              }// optional: removes box shadow if you don't want it
            },
          }}
          anchorOrigin={{
            vertical: menuDirectionUp ? 'top' : 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: menuDirectionUp ? 'bottom' : 'top',
            horizontal: 'center',
          }}
        >

        {Object.entries(stateLabels).map(([stateValue, stateLabel]) => (
          <MenuItem 
            key={stateValue} 
            onClick={() => {
              handleCloseStateMenu();
              // Aquí podrías agregar lógica para manejar la selección del estado si es necesario
            }}
            sx={{
              justifyContent: 'center', // Centra el contenido del MenuItem horizontalmente
              backgroundColor: getStateColor(stateValue), // Usa la función para determinar el color de fondo
              color: 'white',
              '&:hover': {
                backgroundColor: getStateColor(stateValue), // Mantener el mismo color en hover
              },
              textAlign: 'center', // Asegura que el texto esté centrado
              width: '100%', // Ocupa todo el ancho del menú
              padding: '15px',
              margin: '5px 0px', 
            }}
            >
            {stateLabel}
          </MenuItem>
        ))}
      </Menu>   

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="contained" className="mt-4 mb-4 ml-4 w-50 bg-black text-white py-1 rounded hover:bg-gray-700 transition duration-300 ease-in-out" onClick={() => setOpenDialog(true)}>
          Enviar Stock
        </Button>
        <Box sx={{ flex: '1 1 auto' }}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            }}
            className="mt-0"
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
          />
        </Box>
      </Box>
      <AlertaEnviarStock open={openDialog} onClose={handleClose} selectedRows={getSelectedRows()} />
    </Paper>
  );
}