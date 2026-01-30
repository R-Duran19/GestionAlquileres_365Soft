export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: RolUsuario;
  estado: EstadoUsuario;
  avatarUrl?: string;
  ultimoAcceso?: Date;
  fechaRegistro: Date;
}

export enum RolUsuario {
  ADMINISTRADOR = 'ADMINISTRADOR',
  AGENTE = 'AGENTE',
  CONTADOR = 'CONTADOR',
  TECNICO = 'TECNICO',
  INQUILINO = 'INQUILINO'
}

export enum EstadoUsuario {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  SUSPENDIDO = 'SUSPENDIDO',
  PENDIENTE = 'PENDIENTE'
}