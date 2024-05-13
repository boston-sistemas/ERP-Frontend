export interface SubOrden {
  id: string;
  suborden: string;  // Suborden
  fibra: string;     // Fibra
  rollos: number;    // Rollos
  restante: number;  // Restante (kg)
  pesoOrden: number;
  restanteTejeduria: number;  // Restante Tejeduría (kg)
  estado: string;    // Estado
}
  
 
export function createSubOrden(
  orden: string,
  subOrdenData: {
      suborden: string,
      fibra: string,
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
    createSubOrden('TRI1607', {
      suborden: 'JLL13590', fibra: 'Algodon', rollos: 22, restante: 22, pesoOrden: 1000, restanteTejeduria: 1000, estado: 'Listo'
    }),
    createSubOrden('TRI1607', {
      suborden: 'JLL13591', fibra: 'Algodon', rollos: 20, restante: 20, pesoOrden: 1000, restanteTejeduria: 1000, estado: 'Listo'
    }),
  ];