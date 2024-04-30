import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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

  interface Props {
    open: boolean;
    onClose: () => void;
    selectedRows: Data[];
  }
  
  const OperacionesAlertaLiquidarStock: React.FC<Props> = ({ open, onClose, selectedRows }) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          style: { borderRadius: 8, overflow: 'hidden', maxWidth: '680px', width: '100%' },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <ErrorOutlineIcon color="error" sx={{ fontSize: '10rem', top: 10, left: 'calc(50% - 20px)' }} />
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
            <>
              <Typography gutterBottom textAlign="center" mb="20px" fontSize="18px">
                ¿Estás seguro de <strong>LIQUIDAR</strong> estas órdenes?
              </Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <Table size="small">
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
                    {selectedRows.map((row) => (
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
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          {selectedRows.length > 0 && (
            <Button onClick={onClose} color="error">Aceptar</Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };
  
  export default OperacionesAlertaLiquidarStock;