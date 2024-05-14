import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Button, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AlertaCerradoStock from './OperacionesAlertaCerradoStock';
import { rows, columns} from '../data/data_pendiente';
import { useMemo } from 'react';
import { useState } from 'react'
import OperacionesSubtablaStockPendiente from './OperacionesSubtablaStockPendiente';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import LoadingButton from '@mui/lab/LoadingButton';

interface TablaStockPendienteProps {
  TejeduriaSeleccionada: string;
  OrdenBusqueda: string;
}

export default function Tabla_stock_pendiente({ TejeduriaSeleccionada, OrdenBusqueda }: TablaStockPendienteProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSubOrders, setOpenSubOrders] = React.useState<Record<string, boolean>>({});

  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const getSelectedRows = () => {
    return Object.keys(selected)
      .filter((key) => selected[key])
      .map((key) => rows.find((row) => row.order === key)!)
      .filter(Boolean)
      .map((row) => ({
        order: row.order,
        textile: row.textile,
        consumed: row.consumed,
        programmed: row.programmed,
        progress: row.progress
      }));
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

  const handleClick = (event: React.MouseEvent<unknown>, order: string) => {
    const newSelected = { ...selected, [order]: !selected[order] };
    if (newSelected[order]) {
      setSelected(newSelected);
    } else {
      const remainingSelected = { ...newSelected };
      delete remainingSelected[order];
      setSelected(remainingSelected);
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
      (TejeduriaSeleccionada === 'tejeduria' && OrdenBusqueda === '') ||  
      (TejeduriaSeleccionada !== 'tejedurIa' && row.textile === TejeduriaSeleccionada) &&  
      (OrdenBusqueda === '' || row.order.toLowerCase().includes(OrdenBusqueda.toLowerCase())) 
    );
  }, [TejeduriaSeleccionada, OrdenBusqueda]);


  return (
    <Paper sx={{ width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px', marginTop: '20px', marginBottom: '90px' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="collapsible table">
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
                      <Checkbox color="primary" checked={!!selected[row.order]}/>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.order}
                      <IconButton aria-label="expand row" size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleToggleSubOrder(event, row.order);
                        }}
                      >
                        {openSubOrders[row.order] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.textile}</TableCell>
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
                          <Typography variant="body2" color="textSecondary">{`${row.progress.toFixed(2)}%`}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell 
                      align="center" 
                      style={{ backgroundColor: getStateColor(row.state), color: 'white' }}
                    >
                      {row.state}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                  <OperacionesSubtablaStockPendiente
                    open={!!openSubOrders[row.order]}
                    subOrders={row.subOrders}
                    getStateColor={getStateColor}
                    totalColumns={columns.length + 1}
                  />
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button 
          variant="contained"
          className="mt-4 mb-4 ml-4 w-50 bg-black text-white py-1 rounded hover:bg-gray-700 transition duration-300 ease-in-out"
          onClick={handleClickOpen}
        >
          CERRAR ORDEN
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
      <AlertaCerradoStock open={openDialog} onClose={handleClose} selectedRows={getSelectedRows()} />
    </Paper>
  );
}