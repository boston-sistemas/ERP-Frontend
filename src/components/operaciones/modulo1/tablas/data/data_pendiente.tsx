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
    subOrders: SubOrder[]
  }
  
  function createData(
    order: string,
    date: string,
    textile: string,
    programmed: number,
    consumed: number,
    remaining: number,
    waste: number,
    progress: number,
    state: string,
    subOrders: SubOrder[] = [],
  ): Data {
    return { order, date, textile, programmed, consumed, remaining, waste, progress, state, subOrders};
  }
  
  export const rows = [
    createData('TRI1607', '01-06-2024', 'Tricot Fine S.A.', 22564, 19936, 2628, 2.34, 10.00, 'En curso', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('TRI1601', '02-06-2024', 'Tricot Fine S.A.', 22560, 19830, 2630, 2.50, 60.00, 'Listo', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('RCA0349', '03-06-2024', 'Textiles Roca E.I.R.L.', 22570, 19900, 2650, 2.00, 40.00, 'En curso', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('FRA1402', '04-06-2024', 'Textil Defranco E.I.R.L.', 22580, 19950, 2600, 2.80, 90.00, 'En curso', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('TRI1610', '05-06-2024', 'Tricot Fine S.A.', 22590, 19880, 2610, 2.30, 85.00, 'En curso', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('FRA1403', '06-06-2024', 'Textil Defranco E.I.R.L.', 22540, 19870, 2640, 2.60, 70.00, 'Listo', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('RCA0350', '07-06-2024', 'Textiles Roca E.I.R.L.', 22550, 19920, 2660, 1.90, 50.00, 'Detenido', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('TRI1612', '08-06-2024', 'Tricot Fine S.A.', 22600, 19980, 2670, 2.70, 95.00, '-', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('RCA0351', '09-06-2024', 'Textiles Roca E.I.R.L.', 22520, 19840, 2680, 2.10, 75.00, 'En curso', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('FRA1404', '10-06-2024', 'Textil Defranco E.I.R.L.', 22530, 19890, 2690, 2.90, 65.00, 'Listo',[
      { suborder:'TRI1607', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
    ]),
    createData('TRI1613', '11-06-2024', 'Tricot Fine S.A.', 22510, 19820, 2611, 2.40, 55.00, 'Detenido', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('RCA0352', '12-06-2024', 'Textiles Roca E.I.R.L.', 22610, 19910, 2612, 2.20, 45.00, '-', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('FRA1405', '13-06-2024', 'Textil Defranco E.I.R.L.', 22620, 19940, 2613, 3.00, 35.00, 'En curso', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('TRI1614', '14-06-2024', 'Tricot Fine S.A.', 22630, 19850, 2614, 1.80, 25.00, 'Listo', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('RCA0353', '15-06-2024', 'Textiles Roca E.I.R.L.', 22640, 19960, 2615, 1.70, 15.00, 'Detenido', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('FRA1406', '16-06-2024', 'Textil Defranco E.I.R.L.', 22650, 19970, 2616, 3.10, 5.00, '-', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('TRI1615', '17-06-2024', 'Tricot Fine S.A.', 22660, 19860, 2617, 1.60, 20.00, 'En curso', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('RCA0354', '18-06-2024', 'Textiles Roca E.I.R.L.', 22670, 19930, 2618, 2.60, 30.00, 'Listo', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('FRA1407', '19-06-2024', 'Textil Defranco E.I.R.L.', 22680, 19940, 2619, 1.50, 40.00, 'Detenido', [
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
      { suborder:'JLL13590', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'}
    ]),
    createData('TRI1616', '20-06-2024', 'Tricot Fine S.A.', 22690, 19870, 2620, 1.40, 50.00, '-',[
      { suborder:'TRI1607', date:'01-06-2024', textile:'Tricot Fine S.A.', programmed: 22564, consumed: 19936, remaining: 2628, waste: 2.34, progress: 10.00, state: 'En curso'},
    ]),
  ];