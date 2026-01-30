export interface Pago {
  id: number;
  codigo: string;
  contratoId: number;
  propiedadId: number;
  inquilinoId: number;
  informacionPago: InformacionPago;
  estado: EstadoPago;
  metodoPago: MetodoPago;
  comprobante?: ComprobantePago;
  notas?: string;
  fechaCreacion: Date;
  fechaPago?: Date;
}

export interface InformacionPago {
  mes: string;
  anio: number;
  monto: number;
  moneda: string;
  concepto: string;
  descripcion?: string;
  fechaVencimiento: Date;
  intereses?: number;
  descuentos?: number;
}

export enum EstadoPago {
  PENDIENTE = 'PENDIENTE',
  PAGADO = 'PAGADO',
  PARCIAL = 'PARCIAL',
  ATRASADO = 'ATRASADO',
  CANCELADO = 'CANCELADO',
  REEMBOLSADO = 'REEMBOLSADO'
}

export enum MetodoPago {
  TRANSFERENCIA = 'TRANSFERENCIA',
  EFECTIVO = 'EFECTIVO',
  TARJETA_CREDITO = 'TARJETA_CREDITO',
  TARJETA_DEBITO = 'TARJETA_DEBITO',
  CHEQUE = 'CHEQUE',
  DEPOSITO = 'DEPOSITO',
  PAYPAL = 'PAYPAL'
}

export interface ComprobantePago {
  numero: string;
  imagenUrl?: string;
  archivoUrl?: string;
  fechaEmision: Date;
  entidadEmisora: string;
}