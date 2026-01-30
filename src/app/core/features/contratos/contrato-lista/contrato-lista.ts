import { Component } from '@angular/core';
import { EstadoContrato } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contrato-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contrato-lista.html',
  styleUrl: './contrato-lista.scss',
})
export class ContratoListaComponent {
  // Datos falsos para contratos
  contratos = [
    {
      id: 1,
      propiedadId: 1,
      propiedadNombre: 'Apartamento Centro',
      propiedadDireccion: 'Av. Principal 123',
      inquilinoId: 1,
      inquilinoNombre: 'Juan Pérez',
      inquilinoDocumento: '1723456789',
      fechaInicio: new Date('2023-06-01'),
      fechaFin: new Date('2024-05-31'),
      duracionMeses: 12,
      montoMensual: 450,
      moneda: 'USD',
      estado: EstadoContrato.ACTIVO
    },
    {
      id: 2,
      propiedadId: 2,
      propiedadNombre: 'Casa Jardines',
      propiedadDireccion: 'Calle Flores 456',
      inquilinoId: 4,
      inquilinoNombre: 'Ana Martínez',
      inquilinoDocumento: '1721112233',
      fechaInicio: new Date('2022-12-01'),
      fechaFin: new Date('2024-02-29'), // Próximo a vencer
      duracionMeses: 15,
      montoMensual: 750,
      moneda: 'USD',
      estado: EstadoContrato.ACTIVO
    },
    {
      id: 3,
      propiedadId: 3,
      propiedadNombre: 'Local Comercial Plaza',
      propiedadDireccion: 'Av. Comercial 789',
      inquilinoId: 2,
      inquilinoNombre: 'María González',
      inquilinoDocumento: '1729876543',
      fechaInicio: new Date('2023-03-15'),
      fechaFin: new Date('2023-12-14'), // Ya vencido
      duracionMeses: 9,
      montoMensual: 1200,
      moneda: 'USD',
      estado: EstadoContrato.VENCIDO
    },
    {
      id: 4,
      propiedadId: 4,
      propiedadNombre: 'Townhouse Moderno',
      propiedadDireccion: 'Calle Nueva 321',
      inquilinoId: 1,
      inquilinoNombre: 'Juan Pérez',
      inquilinoDocumento: '1723456789',
      fechaInicio: new Date('2024-01-01'),
      fechaFin: new Date('2024-03-31'), // Próximo a vencer
      duracionMeses: 3,
      montoMensual: 950,
      moneda: 'USD',
      estado: EstadoContrato.ACTIVO
    },
    {
      id: 5,
      propiedadId: 5,
      propiedadNombre: 'Oficina Corporativa',
      propiedadDireccion: 'Av. Empresarial 654',
      inquilinoId: 5,
      inquilinoNombre: 'Roberto López',
      inquilinoDocumento: '1798765432001',
      fechaInicio: new Date('2022-07-01'),
      fechaFin: new Date('2023-06-30'), // Terminado
      duracionMeses: 12,
      montoMensual: 1800,
      moneda: 'USD',
      estado: EstadoContrato.TERMINADO
    },
    {
      id: 6,
      propiedadId: 2,
      propiedadNombre: 'Casa Jardines',
      propiedadDireccion: 'Calle Flores 456',
      inquilinoId: 3,
      inquilinoNombre: 'Carlos Rodríguez',
      inquilinoDocumento: 'AB123456',
      fechaInicio: new Date('2024-02-01'),
      fechaFin: new Date('2024-08-31'),
      duracionMeses: 7,
      montoMensual: 800,
      moneda: 'USD',
      estado: EstadoContrato.PENDIENTE
    }
  ];

  contratosFiltrados = [...this.contratos];
  filtroActual = 'TODOS';

  constructor() {
    // Configurar fechas para cálculo
    this.contratos.forEach(contrato => {
      contrato.fechaInicio = new Date(contrato.fechaInicio);
      contrato.fechaFin = new Date(contrato.fechaFin);
    });
  }

  // Métodos auxiliares
  contarPorEstado(estado: string): number {
    return this.contratos.filter(c => c.estado === estado).length;
  }

  contarProximosVencer(): number {
    return this.contratos.filter(c => 
      c.estado === 'ACTIVO' && this.esProximoVencer(c.fechaFin)
    ).length;
  }

  contratosProximosVencer() {
    return this.contratos.filter(c => 
      c.estado === 'ACTIVO' && this.esProximoVencer(c.fechaFin)
    ).slice(0, 3);
  }

  esProximoVencer(fechaFin: Date): boolean {
    const hoy = new Date();
    const fechaVencimiento = new Date(fechaFin);
    const diferenciaDias = Math.ceil((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    return diferenciaDias <= 30 && diferenciaDias > 0;
  }

  diasRestantes(fechaFin: Date): number {
    const hoy = new Date();
    const fechaVencimiento = new Date(fechaFin);
    const diferenciaDias = Math.ceil((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    return diferenciaDias;
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'ACTIVO': return 'badge badge-activo';
      case 'PENDIENTE': return 'badge badge-pendiente';
      case 'VENCIDO': return 'badge badge-vencido';
      case 'TERMINADO': return 'badge badge-terminado';
      case 'CANCELADO': return 'badge badge-cancelado';
      default: return 'badge bg-secondary';
    }
  }

  filtrarPorEstado(estado: string): void {
    this.filtroActual = estado;
    if (estado === 'TODOS') {
      this.contratosFiltrados = [...this.contratos];
    } else {
      this.contratosFiltrados = this.contratos.filter(c => c.estado === estado);
    }
  }
}