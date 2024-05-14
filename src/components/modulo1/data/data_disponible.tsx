export interface SubOrder {
    id: string;
    suborder: string;
    date: string;
    textile: string;
    programado: number;
    consumido: number;
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
    programado: number;
    consumido: number;
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
        programado: number;
        consumido: number;
        state: string;
        ancho: string;      
        hilanderia: string; 
    }>
    ): Data {
        const subOrders = subOrdersInput.map((subOrder) => {
            const id = `${order}-${subOrder.suborder}`;
            const remaining = subOrder.programado - subOrder.consumido;
            const waste = (remaining / subOrder.programado) * 100;
            const progress = (subOrder.consumido / subOrder.programado) * 100;
            return {
                ...subOrder,
                id,
                remaining,
                waste,
                progress
            };
        });

        const programado = subOrders.reduce((acc, cur) => acc + cur.programado, 0);
        const consumido = subOrders.reduce((acc, cur) => acc + cur.consumido, 0);
        const remaining = programado - consumido;
        const waste = (remaining / programado) * 100;
        const progress = (consumido / programado) * 100;

        return {
            order,
            date,
            textile,
            programado,
            consumido,
            remaining,
            waste,
            progress,
            state,
            subOrders
        };
    }
  
  interface Column {
    id: 'order' | 'date' | 'programado' | 'consumido' | 'remaining' | 'waste' | 'progress' | 'state';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => string;
  }
  
  export const columns: readonly Column[] = [
    { id: 'order', label: 'Orden', minWidth: 129, align: 'center' },
    { id: 'date', label: 'Fecha', minWidth: 110, align: 'center' },

    { id: 'programado', label: 'Programado (kg)', minWidth: 140, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
    { id: 'consumido', label: 'Consumido (kg)', minWidth: 140, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
    { id: 'remaining', label: 'Restante (kg)', minWidth: 130, align: 'center', format: (value: number) => value.toLocaleString('en-US') },
    { id: 'waste', label: 'Merma', minWidth: 100, align: 'center', format: (value: number) => `${value.toFixed(2)} %` },
    { id: 'progress', label: 'Progreso', minWidth: 130, align: 'center', format: (value: number) => `${value.toFixed(2)} %` },
    { id: 'state', label: 'Estado', minWidth: 130, align: 'center' },
  ];
    
  
  export const rows = [
    createData('TRI1607', '01-06-2024', 'Tricot Fine S.A.', 'Listo', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 22500, state: 'Listo', ancho: '80', hilanderia: 'San Ignacio'},
      { suborder: 'JLL13591', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 20000, consumido: 19900, state: 'Listo', ancho: '90', hilanderia: 'San Ignacio'}
    ]),
    createData('TRI1601', '02-06-2024', 'Tricot Fine S.A.', 'En curso', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 22564, state: 'Listo', ancho: '80', hilanderia: 'Texcope S.A.C.'},
      { suborder: 'JLL13591', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 19936, state: 'En curso', ancho: '90', hilanderia: 'Texcope S.A.C.'}
    ]),
    createData('TRI1610', '05-06-2024', 'Tricot Fine S.A.', 'En curso', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 9936, state: 'En curso', ancho: '80', hilanderia: 'Filasur S.A.'},
      { suborder: 'JLL13591', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 11936, state: 'En curso', ancho: '80', hilanderia: 'Filasur S.A.'}
    ]),
    createData('TRI1612', '08-06-2024', 'Tricot Fine S.A.', 'En curso', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 10936, state: 'En curso', ancho: '80', hilanderia: 'Texcope S.A.C.'},
      { suborder: 'JLL13591', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 11936, state: 'En curso', ancho: '80', hilanderia: 'Texcope S.A.C.'}
    ]),
    createData('TRI1613', '11-06-2024', 'Tricot Fine S.A.', '-', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 0, state: '-', ancho: '80', hilanderia: 'Empresa Algodonera S.A.'},
      { suborder: 'JLL13591', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 0, state: '-', ancho: '80', hilanderia: 'Empresa Algodonera S.A.'}
    ]),
    createData('TRI1614', '14-06-2024', 'Tricot Fine S.A.', '-', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 0, state: '-', ancho: '80', hilanderia: 'Texcope S.A.C.'},
      { suborder: 'JLL13591', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 0, state: '-', ancho: '80', hilanderia: 'Texcope S.A.C.'}
    ]),
    createData('TRI1615', '17-06-2024', 'Tricot Fine S.A.', '-', [
      { suborder: 'JLL13590', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 0, state: '-', ancho: '80', hilanderia: 'San Ignacio'},
      { suborder: 'JLL13591', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 0, state: '-', ancho: '80', hilanderia: 'San Ignacio'}
    ]),
    createData('TRI1616', '20-06-2024', 'Tricot Fine S.A.', '-', [
      { suborder: 'JLL13591', date: '01-06-2024', textile: 'Tricot Fine S.A.', programado: 22564, consumido: 0, state: '-', ancho: '80', hilanderia: 'San Ignacio'},
    ]),
  ];