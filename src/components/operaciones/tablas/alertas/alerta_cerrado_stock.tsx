import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface SubOrder {
  order: string;
  textile: string;
  consumed: number;
  programmed: number;
  progress: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  selectedRows: SubOrder[];
}

const AlertaCerradoStock: React.FC<Props> = ({ open, onClose, selectedRows }) => {
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
            No hay nada seleccionado.
          </Typography>
        ) : (
          <Box sx={{ overflowX: 'auto' }}>
            <Table size="small">
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
                {selectedRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.order}</TableCell>
                    <TableCell align="center">{row.textile}</TableCell>
                    <TableCell align="center">{row.consumed}</TableCell>
                    <TableCell align="center">{row.programmed}</TableCell>
                    <TableCell align="center">{`${row.progress.toFixed(2)}%`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertaCerradoStock;