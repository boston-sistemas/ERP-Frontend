import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface SubOrder {
  id:string;
  order: string;
  textile: string;
  consumed: number;
  programmed: number;
  progress: number;
  suborder: string; 
  ancho: string;
  remaining: number;
  rolls: number;  
  weight: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  selectedRows: SubOrder[];
}

const AlertaEnviarStock: React.FC<Props> = ({ open, onClose, selectedRows }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { borderRadius: 8, overflow: 'hidden', maxWidth: '680px', width: '100%' },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <ErrorOutlineIcon color="warning" sx={{ fontSize: '10rem', top: 10, left: 'calc(50% - 20px)' }} />
        <IconButton
          aria-label="close"
          onClick={onClose}
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
        {selectedRows.length === 0 ? (
          <Typography gutterBottom textAlign="center" mt="10px" fontSize="18px">
            No hay subórdenes seleccionadas.
          </Typography>
        ) : (
          <>
          <Typography gutterBottom textAlign="center" mb="20px" fontSize="18px">
              ¿Estás seguro de <strong>ENVIAR</strong> estas subórdenes?
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Suborden</TableCell>
                <TableCell align="center">Ancho</TableCell>
                <TableCell align="center">Rollos</TableCell>
                <TableCell align="center">Peso (kg)</TableCell>
                <TableCell align="center">Restante</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.ancho}</TableCell>
                  <TableCell align="center">{row.rolls}</TableCell>
                  <TableCell align="center">{row.weight}</TableCell>
                  <TableCell align="center">{row.remaining}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onClose} color="primary">Enviar</Button>
      </DialogActions>
    </Dialog>
  );
};
export default AlertaEnviarStock;