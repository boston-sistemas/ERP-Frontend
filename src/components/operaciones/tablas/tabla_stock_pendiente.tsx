import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LinearProgress from '@mui/material/LinearProgress';



interface Column {
  id: 'order' | 'date' | 'textile' | 'programmed' | 'consumed' | 'remaining' | 'waste' | 'progress' | 'state';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: 'order', label: 'Orden', minWidth: 100, align: 'center' },
  { id: 'date', label: 'Fecha', minWidth: 100, align: 'center' },
  { id: 'textile', label: 'Tejeduría', minWidth: 130, align: 'center' },
  { id: 'programmed', label: 'Programado (kg)', minWidth: 130, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
  { id: 'consumed', label: 'Consumido (kg)', minWidth: 130, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
  { id: 'remaining', label: 'Restante (kg)', minWidth: 130, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
  { id: 'waste', label: 'Merma', minWidth: 100, align: 'center', format: (value: number) => `${value.toFixed(2)} %` },
  { id: 'progress', label: 'Progreso', minWidth: 120, align: 'center', format: (value: number) => `${value.toFixed(2)} %` },
  { id: 'state', label: 'Estado', minWidth: 100, align: 'center' },
];

interface Data {
  order: string;
  date: string;
  textile: string;
  programmed: number;
  consumed: number;
  remaining: number;
  waste: number;
  progress: number;
  state: string;
}

function createData(
  order: string,
  date: string,
  textile: string,
  programmed: number,
  consumed: number,
  remaining: number,
  waste: number,
  progress: number,
  state: string,
): Data {
  return { order, date, textile, programmed, consumed, remaining, waste, progress, state};
}

const rows = [
  createData('TRI1607', '06-01-2024', 'Tricot Fine S.A.', 22564, 19936, 2628, 2.34, 10.00, 'En curso'),
  createData('TRI1601', '06-01-2024', 'Tricot Fine S.A.', 22564, 19936, 2628, 2.34, 60.00, 'Listo'),
  createData('TRI1608', '06-01-2024', 'Tricot Fine S.A.', 22564, 19936, 2628, 2.34, 40.00, 'Detenido'),
  createData('TRI1610', '06-01-2024', 'Tricot Fine S.A.', 22564, 19936, 2628, 2.34, 90.00, '-')
];

export default function Tabla_stock_pendiente() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => setOpenDialog(true);

  
  const handleClose = () => setOpenDialog(false);

  const isSelected = (order: string) => selected === order;
  const getSelectedRows = () => {
    if (!selected) return [];
    const row = rows.find((row) => row.order === selected);
    return row ? [row] : [];
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
 
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

{/*  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
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
*/}

const handleClick = (event: React.MouseEvent<unknown>, order: string) => {
  // Si la fila ya está seleccionada, la deselecciona. De lo contrario, selecciona la nueva fila.
  if (selected === order) {
    setSelected(null);
  } else {
    setSelected(order);
  }
};

  const selectedRows = getSelectedRows();
  const isAnyOrderSelected = selectedRows.length > 0;

 

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

  return (
    <Paper sx={{ width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px', marginTop: '20px', marginBottom: '90px'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell padding="normal" style={{ backgroundColor: 'rgb(20, 67, 131)'}}/>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ backgroundColor: 'rgb(20, 67, 131)', color: 'white', minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.order);
                const stateColor = getStateColor(row.state);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.order)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.order}
                    selected={isItemSelected}
                    sx={{ '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell 
                          key={column.id} 
                          align={column.align} 
                          style={{
                            minWidth: column.minWidth,
                            ...(column.id === 'state' ? { backgroundColor: stateColor, color: 'white' } : {}),
                          }}>
                          {column.id === 'progress' ? (
                            <Box display="flex" alignItems="center">
                              <Box width="100%" mr={1}>
                              
                                <LinearProgress variant="determinate" value={typeof value === 'number' ? value : 0} />
                              </Box>
                              <Box minWidth={35}>
                                <Typography variant="body2" color="textSecondary">
                                
                                  {`${Math.round(typeof value === 'number' ? value : 0)}%`}
                                </Typography>
                              </Box>
                            </Box>
                          ) : column.format && value !== null && value !== undefined ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap', 
        }}>
          <Button 
            variant="contained"
            className="mt-4 mb-4 ml-4 w-50 bg-gray-700 text-white py-1 rounded hover:bg-black transition duration-300 ease-in-out"
            onClick={handleClickOpen}
          >
            Cerrar
          </Button>
          <Box sx={{ flex: '1 1 auto' }}> 
          
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="mt-0"
            />
          </Box>
        </Box>


    {/*ALERTA POPUP*/}
    {/* Dialog */}

    <Dialog
      open={openDialog}
      onClose={handleClose}
      PaperProps={{
        style: { borderRadius: 8, overflow: 'hidden', maxWidth: '680px', width: '100%' }, // Ajusta el ancho aquí
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <ErrorOutlineIcon color="warning" sx={{ fontSize: '10rem', top: 10, left: 'calc(50% - 20px)' }} />
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ overflowX: 'auto', width: '100%' }}>
        {!isAnyOrderSelected ? (
          <Typography gutterBottom textAlign="center" mt="10px" fontSize="18px">
            No hay nada seleccionado
          </Typography>
        ) : (
          <>
            <Typography gutterBottom textAlign="center" mb="20px" fontSize="18px">
              ¿Estás seguro de <strong>cerrar</strong> esta orden?
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small" sx={{ margin: 'auto', maxWidth: '700px' }}> 
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Orden</TableCell>
                    <TableCell align="center">Tejeduría</TableCell>
                    <TableCell align="center">Consumido (kg)</TableCell>
                    <TableCell align="center">Programado (kg)</TableCell>
                    <TableCell align="center">Progreso (%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSelectedRows().map((row) => (
                    <TableRow key={row.order}>
                      <TableCell align="center">{row.order}</TableCell>
                      <TableCell align="center">{row.textile}</TableCell>
                      <TableCell align="center">{row.consumed}</TableCell>
                      <TableCell align="center">{row.programmed}</TableCell>
                      <TableCell align="center">{row.progress.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        {selected !== null && (
          <Button onClick={handleClose} color="error">
            Aceptar
          </Button>
        )}
      </DialogActions>
    </Dialog>
    </Paper>

  );
}