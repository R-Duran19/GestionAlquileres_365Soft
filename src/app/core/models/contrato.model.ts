export interface Contrato {
  id: number;
  codigo: string;
  propiedadId: number;
  inquilinoId: number;
  informacionContrato: InformacionContrato;
  terminos: TerminosContrato;
  documentos: DocumentoContrato[];
  estado: EstadoContrato;
  renovaciones: Renovacion[];
  fechaCreacion: Date;
  fechaFirma?: Date;
}

export interface InformacionContrato {
  fechaInicio: Date;
  fechaFin: Date;
  duracionMeses: number;
  tipoContrato: TipoContrato;
  descripcion?: string;
}

export enum TipoContrato {
  FIJO = 'FIJO',
  INDEFINIDO = 'INDEFINIDO',
  TEMPORAL = 'TEMPORAL'
}

export interface TerminosContrato {
  precioAlquiler: number;
  moneda: string;
  diaPago: number; // día del mes
  depositoGarantia: number;
  multas: Multa[];
  clausulasEspeciales: string[];
  serviciosIncluidos: string[];
  responsabilidadesInquilino: string[];
}

export interface Multa {
  concepto: string;
  monto: number;
  condiciones: string;
}

export interface DocumentoContrato {
  nombre: string;
  tipo: string;
  url: string;
  fechaSubida: Date;
  tamaño: number;
}

export enum EstadoContrato {
  PENDIENTE = 'PENDIENTE',
  ACTIVO = 'ACTIVO',
  VENCIDO = 'VENCIDO',
  RENOVADO = 'RENOVADO',
  TERMINADO = 'TERMINADO',
  CANCELADO = 'CANCELADO'
}

export interface Renovacion {
  fechaRenovacion: Date;
  nuevoFechaFin: Date;
  cambios: string[];
  documentoUrl?: string;
}