import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Switch, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';




interface Column {
  id: 'order' | 'date' | 'textile' | 'programmed' | 'consumed' | 'remaining' | 'waste' | 'pick';
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
  { id: 'pick', label: 'Saldo Recogido', minWidth: 100, align: 'center' },
];

interface Data {
  order: string;
  date: string;
  textile: string;
  programmed: number;
  consumed: number;
  remaining: number;
  waste: number;
  pick: boolean;
}

function createData(
  order: string,
  date: string,
  textile: string,
  programmed: number,
  consumed: number,
  remaining: number,
  waste: number,
  pick: boolean,
): Data {
  return { order, date, textile, programmed, consumed, remaining, waste,pick};
}

const rows = [
  createData('TRI1607', '01-06-2024', 'Tricot Fine S.A.', 22564, 19936, 2628, 2.34, true),
  createData('TRI1601', '02-06-2024', 'Tricot Fine S.A.', 22560, 19830, 2630, 2.50, true),
  createData('RCA0349', '03-06-2024', 'Textiles Roca E.I.R.L.', 22570, 19900, 2650, 2.00, false),
  createData('FRA1402', '04-06-2024', 'Textil Defranco E.I.R.L.', 22580, 19950, 2600, 2.80,true),
  createData('TRI1610', '05-06-2024', 'Tricot Fine S.A.', 22590, 19880, 2610, 2.30, false),
  createData('FRA1403', '06-06-2024', 'Textil Defranco E.I.R.L.', 22540, 19870, 2640, 2.60, false),
  createData('RCA0350', '07-06-2024', 'Textiles Roca E.I.R.L.', 22550, 19920, 2660, 1.90, false),
  createData('TRI1612', '08-06-2024', 'Tricot Fine S.A.', 22600, 19980, 2670, 2.70, false),
  createData('RCA0351', '09-06-2024', 'Textiles Roca E.I.R.L.', 22520, 19840, 2680, 2.10, false),
  createData('FRA1404', '10-06-2024', 'Textil Defranco E.I.R.L.', 22530, 19890, 2690, 2.90, false),
  createData('TRI1613', '11-06-2024', 'Tricot Fine S.A.', 22510, 19820, 2611, 2.40, true),
  createData('RCA0352', '12-06-2024', 'Textiles Roca E.I.R.L.', 22610, 19910, 2612, 2.20, true),
  createData('FRA1405', '13-06-2024', 'Textil Defranco E.I.R.L.', 22620, 19940, 2613, 3.00, true),
  createData('TRI1614', '14-06-2024', 'Tricot Fine S.A.', 22630, 19850, 2614, 1.80, false),
  createData('RCA0353', '15-06-2024', 'Textiles Roca E.I.R.L.', 22640, 19960, 2615, 1.70, false),
  createData('FRA1406', '16-06-2024', 'Textil Defranco E.I.R.L.', 22650, 19970, 2616, 3.10, false),
  createData('TRI1615', '17-06-2024', 'Tricot Fine S.A.', 22660, 19860, 2617, 1.60, true),
  createData('RCA0354', '18-06-2024', 'Textiles Roca E.I.R.L.', 22670, 19930, 2618, 2.60, true),
  createData('FRA1407', '19-06-2024', 'Textil Defranco E.I.R.L.', 22680, 19940, 2619, 1.50, false),
  createData('TRI1616', '20-06-2024', 'Tricot Fine S.A.', 22690, 19870, 2620, 1.40, false)
];

export default function Tabla_stock_pendiente() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const [switchStates, setSwitchStates] = React.useState<Record<string, boolean>>({});
  const handleClickOpen = () => setOpenDialog(true);

  
  const handleClose = () => setOpenDialog(false);

  

  React.useEffect(() => {
    const initialSwitchStates = rows.reduce((acc, row) => {
      acc[row.order] = row.pick;
      return acc;
    }, {} as Record<string, boolean>); 
    setSwitchStates(initialSwitchStates);
  }, []);

  const handleSwitchChange = (order: string | number) => {
    setSwitchStates(prev => ({
      ...prev,
      [order]: !prev[order]
    }));
  };

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
        pick: row.pick,
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

  const selectedRows = getSelectedRows();
  const isAnyOrderSelected = selectedRows.length > 0;

  const isSelected = (order: string) => !!selected[order];


  return (
    <Paper sx={{ width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px', marginTop: '20px', marginBottom: '90px'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell padding="checkbox" style={{ backgroundColor: 'rgb(20, 67, 131)'}}>
              <Checkbox
                color="default" 
                indeterminate={Object.keys(selected).length > 0 && Object.keys(selected).length < rows.length}
                checked={rows.length > 0 && Object.keys(selected).length === rows.length}
                onChange={handleSelectAllClick}
                sx={{
                  color: 'white', // Color por defecto del icono
                  '&.MuiCheckbox-root': { 
                    color: 'white', // Color del borde del checkbox cuando no está seleccionado
                  },
                  '&.Mui-checked': { 
                    color: 'white', // Color del checkbox cuando está seleccionado
                  },
                  '& .MuiSvgIcon-root': { 
                    fill: 'white', // Color del interior del checkbox
                  },
                }}
              />
            </TableCell>
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
                          style={{ minWidth: column.minWidth }}>
                          {column.id === 'pick' ? (
                            <Switch
                              checked={switchStates[row.order] || false}
                              onClick={(event) => event.stopPropagation()} 
                              onChange={() => handleSwitchChange(row.order)} 
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          ) : (column.format && value !== null && value !== undefined ? column.format(value) : value)}
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
            className="mt-4 mb-4 ml-4 w-50 bg-red-700 text-white py-1 rounded hover:bg-red-500 transition duration-300 ease-in-out"
            onClick={handleClickOpen}
          >
            Liquidar
          </Button>
          <Box sx={{ flex: '1 1 auto' }}> 
          
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
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
        style: { borderRadius: 8, overflow: 'hidden', maxWidth: '680px', width: '100%' }, // Ajustar ancho popup
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: '10rem', top: 10, left: 'calc(50% - 20px)' }} />
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
              ¿Estás seguro de <strong>LIQUIDAR</strong> estas órdenes?
            </Typography>
            <Table size="small" sx={{ margin: 'auto', maxWidth: '700px' }}> 
              <TableHead>
                <TableRow>
                  <TableCell align="center">Orden</TableCell>
                  <TableCell align="center">Tejeduría</TableCell>
                  <TableCell align="center">Consumido (kg)</TableCell>
                  <TableCell align="center">Programado (kg)</TableCell>
                  <TableCell align="center">Saldo Recogido</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getSelectedRows().map((row) => (
                  <TableRow key={row.order}>
                    <TableCell align="center">{row.order}</TableCell>
                    <TableCell align="center">{row.textile}</TableCell>
                    <TableCell align="center">{row.consumed}</TableCell>
                    <TableCell align="center">{row.programmed}</TableCell>
                    <TableCell align="center">{row.pick ? 'Sí' : 'No'}</TableCell> 
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
