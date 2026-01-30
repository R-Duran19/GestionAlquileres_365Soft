export interface Mantenimiento {
  id: number;
  codigo: string;
  propiedadId: number;
  tipo: TipoMantenimiento;
  prioridad: PrioridadMantenimiento;
  estado: EstadoMantenimiento;
  detalles: DetallesMantenimiento;
  asignacion?: AsignacionMantenimiento;
  costos?: CostosMantenimiento;
  documentacion: DocumentoMantenimiento[];
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export enum TipoMantenimiento {
  PREVENTIVO = 'PREVENTIVO',
  CORRECTIVO = 'CORRECTIVO',
  URGENTE = 'URGENTE',
  MEJORA = 'MEJORA',
  INSPECCION = 'INSPECCION'
}

export enum PrioridadMantenimiento {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  CRITICA = 'CRITICA'
}

export enum EstadoMantenimiento {
  REPORTADO = 'REPORTADO',
  ASIGNADO = 'ASIGNADO',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO',
  PENDIENTE_APROBACION = 'PENDIENTE_APROBACION'
}

export interface DetallesMantenimiento {
  titulo: string;
  descripcion: string;
  areaAfectada: string;
  fechaReporte: Date;
  fechaEstimadaFin?: Date;
  reportadoPor: string;
  contactoReportante?: string;
}

export interface AsignacionMantenimiento {
  tecnicoId?: number;
  tecnicoNombre: string;
  fechaAsignacion: Date;
  fechaInicio?: Date;
  fechaFin?: Date;
  notasTecnico?: string;
}

export interface CostosMantenimiento {
  estimado: number;
  real?: number;
  moneda: string;
  facturaUrl?: string;
  aprobadoPor?: string;
  fechaAprobacion?: Date;
}

export interface DocumentoMantenimiento {
  tipo: string;
  nombre: string;
  url: string;
  fechaSubida: Date;
}