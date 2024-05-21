
import React, { useCallback, useMemo, useState } from 'react';
import {
  Box, Button, Checkbox, Collapse, IconButton, LinearProgress,
  Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { rows, columns } from '../data/data_disponible';
import AlertaEnviarStock from './TejeduriaAlertaEnviarStock';



interface TablaStockPendienteProps {
  searchQuery: string;
}

interface RollAndWeightInputs {
  [suborderId: string]: number;
}

export default function TablaStockDisponible({ searchQuery }: TablaStockPendienteProps) {
  // Estados de UI
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openSubOrders, setOpenSubOrders] = useState<Record<string, boolean>>({});
  const [menuDirectionUp, setMenuDirectionUp] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const stateLabels = {
    'Listo': 'Listo',
    'En curso': 'En curso',
    'Detenido': 'Detenido',
    '-': '-'
  };

  const [rollInputs, setRollInputs] = useState<RollAndWeightInputs>({});
  const [weightInputs, setWeightInputs] = useState<RollAndWeightInputs>({});


  const handleRollChange = useCallback((suborderId: string, value: string) => {
    const numericValue = value ? parseInt(value, 10) : 0;
    setRollInputs(prev => ({ ...prev, [suborderId]: numericValue }));
  }, []);

  const handleWeightChange = useCallback((suborderId: string, value: string) => {
    const numericValue = value ? parseInt(value, 10) : 0;
    setWeightInputs(prev => ({ ...prev, [suborderId]: numericValue }));
  }, []);

  // Manejo de menú
  const handleMenuEnter = useCallback((node: HTMLElement) => {
    if (anchorEl && node) {
      const rect = anchorEl.getBoundingClientRect();
      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const estimatedMenuHeight = node.clientHeight;
        setMenuDirectionUp(spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow);
      }
    }
  }, [anchorEl]);

  const handleClickStateMenu = useCallback((event: React.MouseEvent<HTMLElement>, order: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);


  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCloseStateMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Handlers para selección
  const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.reduce((acc, row) => {
        acc[row.order] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setSelected(newSelected);
    } else {
      setSelected({});
    }
  }, []);

  const handleToggleSubOrder = useCallback((event: React.MouseEvent<HTMLButtonElement>, order: string) => {
    event.stopPropagation();
    setOpenSubOrders(prev => ({
      ...prev,
      [order]: !prev[order]
    }));
  }, []);

  const getStateColor = useCallback((state: string) => ({
    '-': '#9C9DA1',
    'Detenido': '#DD2E44',
    'En curso': '#FFC225',
    'Listo': '#3EC564'
  }[state] || 'none'), []);

  const filteredRows = useMemo(() => rows.filter(row =>
    (searchQuery === '' || row.order.toLowerCase().includes(searchQuery.toLowerCase()))
  ), [searchQuery]);

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
            consumed: subOrder.consumido,
            programmed: subOrder.programado,
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

  return (
    <Paper sx={{ width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px', marginTop: '20px', marginBottom: '90px' }}>
      <TableContainer sx={{ maxHeight: 600 }}>

        {/* Tabla Principal */}
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center" padding="checkbox" style={{ backgroundColor: 'rgb(20, 67, 131)' }}>
                <Checkbox
                  color="default"
                  indeterminate={Object.keys(selected).length > 0 && Object.keys(selected).length < rows.length}
                  checked={rows.length > 0 && Object.keys(selected).length === rows.length}
                  onChange={handleSelectAllClick}
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
                      <Checkbox color="primary" checked={!!selected[row.order]} />
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
                    <TableCell align="center">{row.programado.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center">{row.consumido.toLocaleString('en-US')}</TableCell>
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

                    >
                      {row.state}
                    </TableCell>
                  </TableRow>

                  {/* Tabla Colapsada */}
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 60 }} colSpan={columns.length + 2}>
                      <Collapse in={!!openSubOrders[row.order]} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                        <Box margin={1}>
                          <Table size="small" aria-label="sub-orders">
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
                                  <TableCell align="center">{subOrder.programado.toLocaleString('en-US')}</TableCell>
                                  <TableCell align="center">{subOrder.consumido.toLocaleString('en-US')}</TableCell>
                                  <TableCell align="center">{subOrder.remaining.toLocaleString('en-US')}</TableCell>
                                  <TableCell align="center">
                                    <TextField
                                      value={rollInputs[subOrder.id] || ''}
                                      onChange={(e) => handleRollChange(subOrder.id, e.target.value)}
                                      type="number"
                                      variant="outlined"
                                      size="small"
                                      inputProps={{ style: { height: '25px', padding: '0px 0px', textAlign: 'center', fontSize: '0.875rem' } }}
                                      style={{ width: '100px' }}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <TextField
                                      value={weightInputs[subOrder.id] || ''}
                                      onChange={(e) => handleWeightChange(subOrder.id, e.target.value)}
                                      type="number"
                                      variant="outlined"
                                      size="small"
                                      inputProps={{ style: { height: '25px', padding: '0px 0px', textAlign: 'center', fontSize: '0.875rem' } }}
                                      style={{ width: '100px' }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    onClick={(event) => handleClickStateMenu(event, row.order)}
                                    sx={{ maxWidth: '100%' }}
                                    align="center"
                                    style={{ minWidth: '140px', backgroundColor: getStateColor(subOrder.state), color: 'white' }}
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

      {/* Menú de Estados */}
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
            width: '10rem'
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
            }}
            sx={{
              justifyContent: 'center',
              backgroundColor: getStateColor(stateValue),
              color: 'white',
              '&:hover': {
                backgroundColor: getStateColor(stateValue),
              },
              textAlign: 'center',
              width: '100%',
              padding: '15px',
              margin: '5px 0px',
            }}
          >
            {stateLabel}
          </MenuItem>
        ))}
      </Menu>

      {/* Controles de Paginación y Acciones */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="contained" className="mt-4 mb-4 ml-4 w-50 bg-black text-white py-1 rounded hover:bg-gray-700 transition duration-300 ease-in-out" onClick={() => setOpenDialog(true)}>
          Enviar Stock
        </Button>
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

      {/* Alerta de Envío de Stock */}
      <AlertaEnviarStock open={openDialog} onClose={handleClose} selectedRows={getSelectedRows()} />
    </Paper>
  );
}