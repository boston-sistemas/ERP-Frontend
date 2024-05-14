import React, { useCallback, useMemo, useState } from 'react';
import { Box, Button, Checkbox, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Toolbar } from '@mui/material';
import { rows as initialRows, columns } from './data/data_stock';

interface SubOrden {
  id: string;
  hilanderia: string;
  suborden: string;
  ancho: string;
  partida: number;
  restante: number;
  rollos: number;
  peso: number;
  tintoreria: string;
  color: string;
  peso_por_rollo: number;
}

interface TalbaUltimoStockProps {
  searchQuery: string;
  onAddPartida: (selectedRows: SubOrden[]) => void;
  onUpdateRollos: (id: string, newRollos: number) => void;
  partidas: SubOrden[];
}

export default function OperacionesTablaUltimoStock({ searchQuery, onAddPartida, onUpdateRollos, partidas }: TalbaUltimoStockProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [rows, setRows] = useState(initialRows);

  const stateLabels = {
    'Listo': 'Listo',
    'En curso': 'En curso',
    'Detenido': 'Detenido',
    '-': '-'
  };

  const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.reduce((acc, row) => {
        acc[row.id] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setSelected(newSelected);
    } else {
      setSelected({});
    }
  }, [rows]);

  const handleClick = (id: string) => {
    const newSelected = { ...selected, [id]: !selected[id] };
    if (newSelected[id]) {
      setSelected(newSelected);
    } else {
      const remainingSelected = { ...newSelected };
      delete remainingSelected[id];
      setSelected(remainingSelected);
    }
  };

  const getStateColor = useCallback((state: string) => ({
    '-': '#9C9DA1',
    'Detenido': '#DD2E44',
    'En curso': '#FFC225',
    'Listo': '#3EC564'
  }[state] || 'none'), []);

  const filteredRows = useMemo(() => rows.filter(row =>
    searchQuery === '' || row.suborden.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery, rows]);

  const handleAddPartida = () => {
    const nextPartidaNumber = partidas.length > 0 ? Math.max(...partidas.map(p => p.partida)) + 1 : 1;
    const selectedRows = Object.keys(selected)
      .filter(key => selected[key])
      .map(key => {
        const row = rows.find(r => r.id === key);
        return {
          id: `${row?.id}-${nextPartidaNumber}`,  // ID único
          hilanderia: row?.hilanderia ?? '',
          suborden: row?.suborden ?? '',
          ancho: row?.ancho ?? '',
          partida: nextPartidaNumber,
          restante: row?.restante ?? 0,
          peso_por_rollo: row?.pesoOrden / row?.rollos ?? 0,
          rollos: 0,
          peso: 0,
          tintoreria: 'N/A',
          color: 'N/A'
        };
      });
    onAddPartida(selectedRows);
  };

  return (
    <Paper sx={{ width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px', marginTop: '20px', marginBottom: '40px' }}>
      <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, backgroundColor: 'white' }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="body1" id="tableTitle" component="div" color="black">
          REPORTE DE STOCK #__ ENVIADO EL __/__/__
        </Typography>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 601 }}>
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
                <TableCell key={column.id} align="center" style={{ backgroundColor: 'rgb(20, 67, 131)', color: 'white', minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    aria-checked={!!selected[row.id]}
                    tabIndex={-1}
                    selected={!!selected[row.id]}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={!!selected[row.id]} />
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.fibra}</TableCell>
                    <TableCell align="center">{row.rollos.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center">{row.restante.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center">{row.pesoOrden.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center">{row.restanteTejeduria.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center" style={{ backgroundColor: getStateColor(row.estado), color: 'white' }}>
                      {row.estado}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No existen datos para esta consulta
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="contained" className="mt-4 mb-4 ml-4 w-50 bg-black text-white py-1 rounded hover:bg-gray-700 transition duration-300 ease-in-out" onClick={handleAddPartida}>
          Agregar Partida
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
    </Paper>
  );
}