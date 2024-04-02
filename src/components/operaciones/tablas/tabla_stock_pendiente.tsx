import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Definición de las columnas según los datos de la imagen
interface Column {
  id: 'orden' | 'fecha' | 'tejeduria' | 'programado' | 'consumido' | 'restante' | 'merma';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number | null) => string;
}

const columns: readonly Column[] = [
  { id: 'orden', label: 'Orden',align: 'right', minWidth: 100 },
  { id: 'fecha', label: 'Fecha',align: 'right', minWidth: 100 },
  { id: 'tejeduria',align: 'right', label: 'Tejeduría', minWidth: 170 },
  {
    id: 'programado',
    label: 'Programado (Kg)',
    minWidth: 130,
    align: 'right'
  },
  {
    id: 'consumido',
    label: 'Consumido (Kg)',
    minWidth: 130,
    align: 'right'
  },
  {
    id: 'restante',
    label: 'Restante (Kg)',
    minWidth: 130,
    align: 'right'
  },
  {
    id: 'merma',
    label: 'Merma',
    minWidth: 100,
    align: 'right',
    format: (value) => value !== null ? `${value.toFixed(1)}%` : '–',
  },
];

// Simulando los datos de la tabla
interface Data {
  orden: string;
  fecha: string;
  tejeduria: string;
  programado: number;
  consumido: number;
  restante: number;
  merma: number | null;
}

function createData(
  orden: string,
  fecha: string,
  tejeduria: string,
  programado: number,
  consumido: number,
  restante: number,
  merma: number | null,
): Data {
  return { orden, fecha, tejeduria, programado, consumido, restante, merma };
}

// Simulando filas de datos basadas en la imagen
const rows = [
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null),
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null),
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null),
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null),
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null),
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null),
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null),
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null),
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null),
  createData('TRI1703', '06-01-2024', 'Tricot Fine S.A.', 2222.64, 1979.36, 243.28, null),
  createData('TRI1598', '08-01-2024', 'Tricot Fine S.A.', 2222.64, 2000.00, 222.64, null)
  // ... añade más filas según sea necesario
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.orden}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && value !== null
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