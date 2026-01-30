export interface Propiedad {
  id: number;
  nombre: string;
  direccion: Direccion;
  tipo: TipoPropiedad;
  caracteristicas: Caracteristicas;
  estado: EstadoPropiedad;
  informacionFinanciera: InformacionFinanciera;
  imagenes: string[];
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export interface Direccion {
  calle: string;
  numero: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: string;
  coordenadas?: {
    latitud: number;
    longitud: number;
  };
}

export enum TipoPropiedad {
  APARTAMENTO = 'APARTAMENTO',
  CASA = 'CASA',
  DUPLEX = 'DUPLEX',
  TOWNHOUSE = 'TOWNHOUSE',
  COMERCIAL = 'COMERCIAL',
  OFICINA = 'OFICINA',
  LOCAL = 'LOCAL'
}

export interface Caracteristicas {
  metrosCuadrados: number;
  habitaciones: number;
  banos: number;
  parqueaderos: number;
  piso?: number;
  amoblado: boolean;
  mascotasPermitidas: boolean;
  serviciosIncluidos: string[];
}

export enum EstadoPropiedad {
  DISPONIBLE = 'DISPONIBLE',
  OCUPADO = 'OCUPADO',
  MANTENIMIENTO = 'MANTENIMIENTO',
  RESERVADO = 'RESERVADO',
  VACIO = 'VACIO'
}

export interface InformacionFinanciera {
  precioAlquiler: number;
  depositoGarantia: number;
  moneda: string;
  gastosAdministracion?: number;
  serviciosBasicosIncluidos: boolean;
  impuestosIncluidos: boolean;
}