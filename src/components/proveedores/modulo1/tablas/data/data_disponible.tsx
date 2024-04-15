export interface SubOrder {
    suborder: string;
    date: string;
    textile: string;
    programmed: number;
    consumed: number;
    remaining: number;
    waste: number;
    progress: number;
    state: string;
    ancho: string;       
    hilanderia: string;   
}
  
  export interface Data {
    order: string;
    date: string;
    textile: string;
    programmed: number;
    consumed: number;
    remaining: number;
    waste: number;
    progress: number; 
    state: string;
    subOrders: SubOrder[];
  }
  
  
  function createData(
    order: string,
    date: string,
    textile: string,
    state: string,
    subOrdersInput: Array<{
        suborder: string;
        date: string;
        textile: string;
        programmed: number;
        consumed: number;
        state: string;
        ancho: string;      // Incluir estos campos en el input
        hilanderia: string; // Incluir estos campos en el input
    }>
    ): Data {
        const subOrders = subOrdersInput.map(subOrder => {
            const remaining = subOrder.programmed - subOrder.consumed;
            const waste = (remaining / subOrder.programmed) * 100;
            const progress = (subOrder.consumed / subOrder.programmed) * 100;
            return {
                ...subOrder,
                remaining,
                waste,
                progress
            };
        });

        const programmed = subOrders.reduce((acc, cur) => acc + cur.programmed, 0);
        const consumed = subOrders.reduce((acc, cur) => acc + cur.consumed, 0);
        const remaining = programmed - consumed;
        const waste = (remaining / programmed) * 100;
        const progress = (consumed / programmed) * 100;

        return {
            order,
            date,
            textile,
            programmed,
            consumed,
            remaining,
            waste,
            progress,
            state,
            subOrders
        };
    }
  
  interface Column {
    id: 'order' | 'date' | 'programmed' | 'consumed' | 'remaining' | 'waste' | 'progress' | 'state';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => string;
  }
  
  export const columns: readonly Column[] = [
    { id: 'order', label: 'Orden', minWidth: 110, align: 'center' },
    { id: 'date', label: 'Fecha', minWidth: 110, align: 'center' },

    { id: 'programmed', label: 'Programado (kg)', minWidth: 130, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
    { id: 'consumed', label: 'Consumido (kg)', minWidth: 130, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
    { id: 'remaining', label: 'Restante (kg)', minWidth: 130, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
    { id: 'waste', label: 'Merma', minWidth: 100, align: 'center', format: (value: number) => `${value.toFixed(2)} %` },
    { id: 'progress', label: 'Progreso', minWidth: 130, align: 'center', format: (value: number) => `${value.toFixed(2)} %` },
    { id: 'state', label: 'Estado', minWidth: 110, align: 'center' },
  ];
    
  
  export const rows = [
    createData('TRI1607', '01-06-2024', 'Tricot Fine S.A.', 'Listo', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 22500, state: 'Listo', ancho: '80', hilanderia: 'San Ignacio'},
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 20000, consumed: 19900, state: 'Listo', ancho: '90', hilanderia: 'San Ignacio'}
    ]),
    createData('TRI1601', '02-06-2024', 'Tricot Fine S.A.', 'En curso', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 22564, state: 'Listo', ancho: '80', hilanderia: 'Texcope S.A.C.'},
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 19936, state: 'En curso', ancho: '90', hilanderia: 'Texcope S.A.C.'}
    ]),
    createData('TRI1610', '05-06-2024', 'Tricot Fine S.A.', 'En curso', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 9936, state: 'En curso', ancho: '80', hilanderia: 'Filasur S.A.'},
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 11936, state: 'En curso', ancho: '80', hilanderia: 'Filasur S.A.'}
    ]),
    createData('TRI1612', '08-06-2024', 'Tricot Fine S.A.', 'En curso', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 10936, state: 'En curso', ancho: '80', hilanderia: 'Texcope S.A.C.'},
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 11936, state: 'En curso', ancho: '80', hilanderia: 'Texcope S.A.C.'}
    ]),
    createData('TRI1613', '11-06-2024', 'Tricot Fine S.A.', '-', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 0, state: '-', ancho: '80', hilanderia: 'Empresa Algodonera S.A.'},
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 0, state: '-', ancho: '80', hilanderia: 'Empresa Algodonera S.A.'}
    ]),
    createData('TRI1614', '14-06-2024', 'Tricot Fine S.A.', '-', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 0, state: '-', ancho: '80', hilanderia: 'Texcope S.A.C.'},
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 0, state: '-', ancho: '80', hilanderia: 'Texcope S.A.C.'}
    ]),
    createData('TRI1615', '17-06-2024', 'Tricot Fine S.A.', '-', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 0, state: '-', ancho: '80', hilanderia: 'San Ignacio'},
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 0, state: '-', ancho: '80', hilanderia: 'San Ignacio'}
    ]),
    createData('TRI1616', '20-06-2024', 'Tricot Fine S.A.', '-', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programmed: 22564, consumed: 0, state: '-', ancho: '80', hilanderia: 'San Ignacio'},
    ]),
  ];