import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

interface Column {
  id: 'order' | 'date' | 'textile' | 'programmed' | 'consumed' | 'remaining' | 'waste' | 'balance';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'order', label: 'Orden', minWidth: 100, align: 'left' },
  { id: 'date', label: 'Fecha', minWidth: 100, align: 'left' },
  { id: 'textile', label: 'Tejeduría', minWidth: 130, align: 'left' },
  { id: 'programmed', label: 'Programado (kg)', minWidth: 130, align: 'left', format: (value: number) => value.toLocaleString('en-US') },
  { id: 'consumed', label: 'Consumido (kg)', minWidth: 130, align: 'left', format: (value: number) => value.toLocaleString('en-US') },
  { id: 'remaining', label: 'Restante (kg)', minWidth: 130, align: 'left', format: (value: number) => value.toLocaleString('en-US') },
  { id: 'waste', label: 'Merma', minWidth: 100, align: 'left', format: (value: number) => `${value.toFixed(2)} %` },
  { id: 'balance', label: 'Saldo Recogido', minWidth: 120, align: 'left'},
];

interface Data {
  order: string;
  date: string;
  textile: string;
  programmed: number;
  consumed: number;
  remaining: number;
  waste: number;
  balance: boolean;
}

function createData(
  order: string,
  date: string,
  textile: string,
  programmed: number,
  consumed: number,
  remaining: number,
  waste: number,
  balance: boolean,
): Data {
  return { order, date, textile, programmed, consumed, remaining, waste, balance };
}

// Replace with your actual data rows
const rows = [
  createData('TRI1704', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, 1.2, false),
  createData('TRI1705', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, 1.2, false),
  createData('TRI1707', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, 1.2, false),
  createData('TRI1708', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, 1.2, false),
  createData('TRI17010', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, 1.2, false),
];

export default function Tabla_stock_cerrado() {
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

  return (
    <Paper sx={{ width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px', marginTop: '20px', marginBottom: '160px'}}>
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
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}