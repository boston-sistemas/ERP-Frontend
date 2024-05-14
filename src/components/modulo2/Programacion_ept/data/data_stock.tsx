export interface SubOrden {
  id: string;
  suborden: string; 
  fibra: string;
  ancho: string,
  hilanderia:string,     
  rollos: number;   
  restante: number; 
  pesoOrden: number;
  restanteTejeduria: number;  
  estado: string;    
}
  
 
export function createSubOrden(
  orden: string,
  subOrdenData: {
      suborden: string,
      fibra: string,
      ancho: string,
      hilanderia:string,
      rollos: number,
      restante: number,
      pesoOrden: number;
      restanteTejeduria: number,
      estado: string
  }
): SubOrden {
  const id = `${orden}-${subOrdenData.suborden}`;

  return {
    id,
    suborden: subOrdenData.suborden,
    fibra: subOrdenData.fibra,
    ancho: subOrdenData.ancho,
    hilanderia: subOrdenData.hilanderia,
    rollos: subOrdenData.rollos,
    restante: subOrdenData.restante,
    pesoOrden: subOrdenData.pesoOrden,
    restanteTejeduria: subOrdenData.restanteTejeduria,
    estado: subOrdenData.estado
  };
}
  
interface Column {
  id: 'suborden' | 'fibra' | 'rollos' | 'restante' | 'pesoOrden' | 'restanteTejeduria' | 'estado';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}
  
export const columns: readonly Column[] = [
  { id: 'suborden', label: 'Suborden', minWidth: 129, align: 'center' },
  { id: 'fibra', label: 'Fibra', minWidth: 110, align: 'center' },
  { id: 'rollos', label: 'Rollos', minWidth: 100, align: 'center' },
  { id: 'restante', label: 'Restante', minWidth: 130, align: 'center' },
  { id: 'pesoOrden', label: 'Peso Orden (kg)', minWidth: 130, align: 'center' },
  { id: 'restanteTejeduria', label: 'Restante Tejeduría (kg)', minWidth: 150, align: 'center' },
  { id: 'estado', label: 'Estado', minWidth: 130, align: 'center' }
];
    
  
  export const rows = [
    createSubOrden('FRA1492', {
      suborden: 'RBV165', fibra: 'Algodon', ancho:'39', hilanderia: 'Hilanderia 1', rollos: 22, restante: 22, pesoOrden: 1000, restanteTejeduria: 1000, estado: 'Listo'
    }),
    createSubOrden('FRA1492', {
      suborden: 'RBV166', fibra: 'Algodon', ancho:'40', hilanderia: 'Hilanderia 1', rollos: 20, restante: 20, pesoOrden: 1000, restanteTejeduria: 1000, estado: 'Listo'
    }),
    createSubOrden('FRA1492', {
      suborden: 'RBV167', fibra: 'Algodon', ancho:'39', hilanderia: 'Hilanderia 1', rollos: 22, restante: 22, pesoOrden: 1000, restanteTejeduria: 1000, estado: 'Listo'
    }),
    createSubOrden('FRA1492', {
      suborden: 'RBV188', fibra: 'Algodon', ancho:'40', hilanderia: 'Hilanderia 1', rollos: 20, restante: 20, pesoOrden: 1000, restanteTejeduria: 1000, estado: 'Listo'
    }),
    createSubOrden('FRA1492', {
      suborden: 'RBV169', fibra: 'Algodon', ancho:'39', hilanderia: 'Hilanderia 1', rollos: 22, restante: 22, pesoOrden: 1000, restanteTejeduria: 1000, estado: 'Listo'
    }),
    createSubOrden('FRA1492', {
      suborden: 'RBV170', fibra: 'Algodon', ancho:'40', hilanderia: 'Hilanderia 1', rollos: 20, restante: 20, pesoOrden: 1000, restanteTejeduria: 1000, estado: 'Listo'
    }),
  ];