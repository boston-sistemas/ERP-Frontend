import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
  // Example row, this should be replaced with actual data
  createData('TRI1607', '06-01-2024', 'Tricot Fine S.A.', 22564, 19936, 2628, 2.34, 80.00, 'En curso'),
  createData('TRI1601', '06-01-2024', 'Tricot Fine S.A.', 22564, 19936, 2628, 2.34, 80.00, 'Listo'),
  createData('TRI1608', '06-01-2024', 'Tricot Fine S.A.', 22564, 19936, 2628, 2.34, 80.00, 'Detenido'),
];

export default function Tabla_stock_pendiente() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

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
    setSelected((prevSelected) => ({
      ...prevSelected,
      [order]: !prevSelected[order],
    }));
  };

  const isSelected = (order: string) => !!selected[order];

  const getStateColor = (state: any) => {
    switch (state) {
      case 'No Iniciado':
        return '#838383';
      case 'Detenido':
        return '#DD2E44';
      case 'En curso':
        return '#FBD304';
      case 'Listo':
        return '#3EC564';
      default:
        return 'none';
    }
  };

  {/* DESCOMENTAR SI QUIERES LEYENDA
  const Legend = () => {
    const legendItems = [
      { label: 'No Iniciado', color: '#838383' },
      { label: 'Detenido', color: '#DD2E44' },
      { label: 'En curso', color: '#FBD304' },
      { label: 'Listo', color: '#3EC564' },
    ];
  
    return (
      <Grid container alignItems="center" spacing={2} marginTop={0} marginLeft={0} marginBottom={2}>
        {legendItems.map((item) => (
          <Grid item key={item.label} display="flex" alignItems="center">
            <Box
              width={16}
              height={16}
              bgcolor={item.color}
              marginRight={1}
              borderRadius="10%"
            />
            <Typography variant="body2">{item.label}</Typography>
          </Grid>
        ))}
      </Grid>
    );
  };

  */}
  
  

  return (
    <Paper sx={{ width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px', marginTop: '20px', marginBottom: '90px'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell padding="checkbox" style={{ backgroundColor: 'rgb(20, 67, 131)'}}>
              <Checkbox
                color="default" // Establecer el color predeterminado para poder aplicar estilos personalizados
                indeterminate={Object.keys(selected).length > 0 && Object.keys(selected).length < rows.length}
                checked={rows.length > 0 && Object.keys(selected).length === rows.length}
                onChange={handleSelectAllClick}
                sx={{
                  color: 'white', // Color por defecto del icono
                  '&.MuiCheckbox-root': { // Estilos para el estado no marcado
                    color: 'white', // Color del borde del checkbox cuando no está seleccionado
                  },
                  '&.Mui-checked': { // Estilos para el estado marcado
                    color: 'white', // Color del checkbox cuando está seleccionado
                  },
                  '& .MuiSvgIcon-root': { // Estilos para el icono dentro del checkbox
                    fill: 'white', // Color del interior del checkbox
                  },
                }}
              />
            </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ backgroundColor: 'rgb(20, 67, 131)', color: 'white', minWidth: column.minWidth }}
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
                          {column.format && value  !== null && value !== undefined
                            ? column.format(value)
                            : value}
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
      {/* DESCOMENTAR SI QUIEREN COLOCAR LEYENDA
      <Box sx={{ flex: '1 1 auto' }}> 
        <Legend />
      </Box>
      */}
      <Box sx={{ flex: '1 1 auto' }}> 
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
    </Paper>
  );
}