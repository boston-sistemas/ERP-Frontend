import React from 'react';
import {
  Box, Table, TableCell, TableHead, TableRow, TableBody, Collapse, Typography,
  LinearProgress
} from '@mui/material';

interface SubOrder {
  suborder: string;
  programmed: number;
  consumed: number;
  remaining: number;
  waste: number;
  progress: number;
  state: string;
}

interface Props {
  open: boolean;
  subOrders: SubOrder[];
  getStateColor: (state: string) => string;
}

const OperacionesSubtablaStockPendiente: React.FC<Props> = ({ open, subOrders, getStateColor }) => {
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 60 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
        <Box margin={1}>
          <Table size="small" aria-label="sub-orders">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell align="center">Suborden</TableCell>
                <TableCell align="center">Programado (kg)</TableCell>
                <TableCell align="center">Consumido (kg)</TableCell>
                <TableCell align="center">Restante (kg)</TableCell>
                <TableCell align="center">Merma</TableCell>
                <TableCell align="center">Progreso</TableCell>
                <TableCell align="center">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subOrders.map((subOrder, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell align="center">{subOrder.suborder}</TableCell>
                  <TableCell align="center">{subOrder.programmed.toLocaleString('en-US')}</TableCell>
                  <TableCell align="center">{subOrder.consumed.toLocaleString('en-US')}</TableCell>
                  <TableCell align="center">{subOrder.remaining.toLocaleString('en-US')}</TableCell>
                  <TableCell align="center">{`${subOrder.waste.toFixed(2)} %`}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center">
                      <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate" value={subOrder.progress} />
                      </Box>
                      <Box minWidth={35}>
                        <Typography variant="body2" color="textSecondary">{`${subOrder.progress.toFixed(1)}%`}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell 
                    align="center" 
                    style={{ backgroundColor: getStateColor(subOrder.state), color: 'white' }}
                  >
                    {subOrder.state}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  );
};

export default OperacionesSubtablaStockPendiente;