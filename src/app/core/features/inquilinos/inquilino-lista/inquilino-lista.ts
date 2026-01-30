import { Component } from '@angular/core';
import { EstadoInquilino } from '../../../models';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inquilino-lista',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './inquilino-lista.html',
  styleUrl: './inquilino-lista.scss',
})
export class InquilinoListaComponent {
  // Datos falsos para inquilinos
  inquilinos = [
    {
      id: 1,
      informacionPersonal: {
        nombre: 'Juan',
        apellido: 'Pérez',
        tipoDocumento: 'CEDULA',
        numeroDocumento: '1723456789'
      },
      informacionContacto: {
        email: 'juan.perez@email.com',
        telefono: '+593 99 123 4567'
      },
      propiedadesAlquiladas: [1, 4],
      estado: EstadoInquilino.ACTIVO,
      ultimoPagoEstado: 'AL DÍA',
      fechaRegistro: new Date('2023-01-15'),
      deuda: 0
    },
    {
      id: 2,
      informacionPersonal: {
        nombre: 'María',
        apellido: 'González',
        tipoDocumento: 'CEDULA',
        numeroDocumento: '1729876543'
      },
      informacionContacto: {
        email: 'maria.gonzalez@email.com',
        telefono: '+593 98 765 4321'
      },
      propiedadesAlquiladas: [2],
      estado: EstadoInquilino.MOROSO,
      ultimoPagoEstado: 'ATRASADO',
      fechaRegistro: new Date('2023-03-20'),
      deuda: 850
    },
    {
      id: 3,
      informacionPersonal: {
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        tipoDocumento: 'PASAPORTE',
        numeroDocumento: 'AB123456'
      },
      informacionContacto: {
        email: 'carlos.rodriguez@email.com',
        telefono: '+593 97 555 1234'
      },
      propiedadesAlquiladas: [],
      estado: EstadoInquilino.EN_PROCESO,
      ultimoPagoEstado: 'PENDIENTE',
      fechaRegistro: new Date('2024-01-10'),
      deuda: 0
    },
    {
      id: 4,
      informacionPersonal: {
        nombre: 'Ana',
        apellido: 'Martínez',
        tipoDocumento: 'CEDULA',
        numeroDocumento: '1721112233'
      },
      informacionContacto: {
        email: 'ana.martinez@email.com',
        telefono: '+593 96 444 5566'
      },
      propiedadesAlquiladas: [3],
      estado: EstadoInquilino.ACTIVO,
      ultimoPagoEstado: 'AL DÍA',
      fechaRegistro: new Date('2022-11-05'),
      deuda: 0
    },
    {
      id: 5,
      informacionPersonal: {
        nombre: 'Roberto',
        apellido: 'López',
        tipoDocumento: 'RUC',
        numeroDocumento: '1798765432001'
      },
      informacionContacto: {
        email: 'roberto.lopez@empresa.com',
        telefono: '+593 95 777 8899'
      },
      propiedadesAlquiladas: [5],
      estado: EstadoInquilino.INACTIVO,
      ultimoPagoEstado: 'CANCELADO',
      fechaRegistro: new Date('2022-06-15'),
      deuda: 0
    },
    {
      id: 6,
      informacionPersonal: {
        nombre: 'Laura',
        apellido: 'Fernández',
        tipoDocumento: 'CEDULA',
        numeroDocumento: '1725556677'
      },
      informacionContacto: {
        email: 'laura.fernandez@email.com',
        telefono: '+593 94 333 2211'
      },
      propiedadesAlquiladas: [],
      estado: EstadoInquilino.EN_PROCESO,
      ultimoPagoEstado: 'PENDIENTE',
      fechaRegistro: new Date('2024-02-01'),
      deuda: 0
    }
  ];

  // Métodos auxiliares
  contarPorEstado(estado: string): number {
    return this.inquilinos.filter(i => i.estado === estado).length;
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'ACTIVO': return 'badge badge-activo';
      case 'MOROSO': return 'badge badge-moroso';
      case 'INACTIVO': return 'badge badge-inactivo';
      case 'EN_PROCESO': return 'badge badge-en-proceso';
      default: return 'badge bg-secondary';
    }
  }

  getPagoClass(estadoPago: string): string {
    switch (estadoPago) {
      case 'AL DÍA': return 'pago-al-dia';
      case 'ATRASADO': return 'pago-pendiente';
      case 'PENDIENTE': return 'pago-pendiente';
      default: return '';
    }
  }
}