export interface Inquilino {
  id: number;
  informacionPersonal: InformacionPersonal;
  informacionContacto: InformacionContacto;
  informacionLaboral?: InformacionLaboral;
  documentos: Documento[];
  estado: EstadoInquilino;
  historialPagos: HistorialPago[];
  propiedadesAlquiladas: number[];
  fechaRegistro: Date;
  fechaActualizacion: Date;
}

export interface InformacionPersonal {
  nombre: string;
  apellido: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  fechaNacimiento?: Date;
  nacionalidad?: string;
  estadoCivil?: string;
}

export interface InformacionContacto {
  email: string;
  telefono: string;
  telefonoAlternativo?: string;
//   direccion?: Direccion;
}

export interface InformacionLaboral {
  empresa: string;
  cargo: string;
  ingresoMensual: number;
  tiempoLaborando?: number; // en meses
  contactoLaboral?: string;
}

export interface Documento {
  tipo: TipoDocumento;
  numero: string;
  archivoUrl?: string;
  fechaVencimiento?: Date;
  verificado: boolean;
}

export enum TipoDocumento {
  CEDULA = 'CEDULA',
  PASAPORTE = 'PASAPORTE',
  RUC = 'RUC',
  LICENCIA = 'LICENCIA'
}

export enum EstadoInquilino {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  MOROSO = 'MOROSO',
  EN_PROCESO = 'EN_PROCESO',
  RECHAZADO = 'RECHAZADO'
}

export interface HistorialPago {
  mes: string;
  anio: number;
//   estado: EstadoPago;
  monto: number;
  fechaPago?: Date;
}