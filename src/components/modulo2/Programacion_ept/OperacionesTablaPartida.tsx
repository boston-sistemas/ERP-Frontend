import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Toolbar, IconButton, TextField, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

interface OperacionesTablaPartidaProps {
  partidas: SubOrden[];
  onRollosChange: (id: string, newRollos: number) => void;
  onDeletePartida: (id: string) => void;
  onColorChange: (id: string, newColor: string) => void;
}

const columns = [
  { id: 'partida', label: 'Partida', minWidth: 100, align: 'center' },
  { id: 'hilanderia', label: 'Hilanderia', minWidth: 100, align: 'center' },
  { id: 'suborden', label: 'Suborden', minWidth: 100, align: 'center' },
  { id: 'ancho', label: 'Ancho', minWidth: 100, align: 'center' },
  { id: 'restante', label: 'A disponer', minWidth: 100, align: 'center' },
  { id: 'rollos', label: 'Rollos', minWidth: 100, align: 'center' },
  { id: 'peso', label: 'Peso', minWidth: 100, align: 'center' },
  { id: 'tintoreria', label: 'Tintoreria', minWidth: 100, align: 'center' },
  { id: 'color', label: 'Color', minWidth: 100, align: 'center' },
  { id: 'actions', label: '', minWidth: 50, align: 'center' },
];

const OperacionesTablaPartida: React.FC<OperacionesTablaPartidaProps> = ({ partidas, onRollosChange, onDeletePartida, onColorChange }) => {
  return (
    <Paper sx={{ width: 'calc(100% - 130px)', overflow: 'hidden', marginLeft: '95px', marginTop: '20px', marginBottom: '90px' }}>
      <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, backgroundColor: 'white' }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="body1" id="tableTitle" component="div" color="black">
          PARTIDAS AGREGADAS
        </Typography>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 601 }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="center" style={{ backgroundColor: 'rgb(20, 67, 131)', color: 'white', minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {partidas.length > 0 ? (
              partidas.map((partida) => (
                <TableRow hover tabIndex={-1} key={partida.id}>
                  <TableCell align="center">{partida.partida}</TableCell>
                  <TableCell align="center">{partida.hilanderia}</TableCell>
                  <TableCell align="center">{partida.suborden}</TableCell>
                  <TableCell align="center">{partida.ancho}</TableCell>
                  <TableCell align="center">{partida.restante}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      value={partida.rollos}
                      onChange={(e) => onRollosChange(partida.id, parseInt(e.target.value, 10))}
                      inputProps={{ min: 0 }}
                      sx={{ width: '100px' }}
                    />
                  </TableCell>
                  <TableCell align="center">{partida.rollos * partida.peso_por_rollo}</TableCell>
                  <TableCell align="center">{partida.tintoreria}</TableCell>
                  <TableCell align="center">
                    <Select
                      value={partida.color}
                      onChange={(e) => onColorChange(partida.id, e.target.value as string)}
                      sx={{ width: '100px' }}
                    >
                      <MenuItem value="Rojo">Rojo</MenuItem>
                      <MenuItem value="Azul">Azul</MenuItem>
                      <MenuItem value="Verde">Verde</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => onDeletePartida(partida.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
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
    </Paper>
  );
};

export default OperacionesTablaPartida;