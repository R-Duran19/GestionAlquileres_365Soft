import { Component } from '@angular/core';
import { EstadoPago, MetodoPago } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pago-lista',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pago-lista.html',
  styleUrl: './pago-lista.scss',
})
export class PagoListaComponent {
  // Datos falsos para pagos
  pagos = [
    {
      id: 1,
      inquilinoId: 1,
      inquilinoNombre: 'Juan Pérez',
      inquilinoDocumento: '1723456789',
      propiedadId: 1,
      propiedadNombre: 'Apartamento Centro',
      propiedadDireccion: 'Av. Principal 123',
      mes: 'Enero',
      anio: 2024,
      monto: 450,
      moneda: 'USD',
      estado: EstadoPago.PAGADO,
      fechaPago: new Date('2024-01-05'),
      fechaVencimiento: new Date('2024-01-10'),
      metodoPago: MetodoPago.TRANSFERENCIA,
      diasAtraso: 0
    },
    {
      id: 2,
      inquilinoId: 2,
      inquilinoNombre: 'María González',
      inquilinoDocumento: '1729876543',
      propiedadId: 3,
      propiedadNombre: 'Local Comercial Plaza',
      propiedadDireccion: 'Av. Comercial 789',
      mes: 'Enero',
      anio: 2024,
      monto: 1200,
      moneda: 'USD',
      estado: EstadoPago.ATRASADO,
      fechaPago: null,
      fechaVencimiento: new Date('2024-01-10'),
      metodoPago: MetodoPago.EFECTIVO,
      diasAtraso: 15
    },
    {
      id: 3,
      inquilinoId: 4,
      inquilinoNombre: 'Ana Martínez',
      inquilinoDocumento: '1721112233',
      propiedadId: 2,
      propiedadNombre: 'Casa Jardines',
      propiedadDireccion: 'Calle Flores 456',
      mes: 'Enero',
      anio: 2024,
      monto: 750,
      moneda: 'USD',
      estado: EstadoPago.PAGADO,
      fechaPago: new Date('2024-01-03'),
      fechaVencimiento: new Date('2024-01-05'),
      metodoPago: MetodoPago.TARJETA_CREDITO,
      diasAtraso: 0
    },
    {
      id: 4,
      inquilinoId: 1,
      inquilinoNombre: 'Juan Pérez',
      inquilinoDocumento: '1723456789',
      propiedadId: 4,
      propiedadNombre: 'Townhouse Moderno',
      propiedadDireccion: 'Calle Nueva 321',
      mes: 'Enero',
      anio: 2024,
      monto: 950,
      moneda: 'USD',
      estado: EstadoPago.PENDIENTE,
      fechaPago: null,
      fechaVencimiento: new Date('2024-02-05'),
      metodoPago: MetodoPago.TRANSFERENCIA,
      diasAtraso: 0
    },
    {
      id: 5,
      inquilinoId: 5,
      inquilinoNombre: 'Roberto López',
      inquilinoDocumento: '1798765432001',
      propiedadId: 5,
      propiedadNombre: 'Oficina Corporativa',
      propiedadDireccion: 'Av. Empresarial 654',
      mes: 'Diciembre',
      anio: 2023,
      monto: 1800,
      moneda: 'USD',
      estado: EstadoPago.PAGADO,
      fechaPago: new Date('2023-12-28'),
      fechaVencimiento: new Date('2023-12-31'),
      metodoPago: MetodoPago.DEPOSITO,
      diasAtraso: 0
    },
    {
      id: 6,
      inquilinoId: 3,
      inquilinoNombre: 'Carlos Rodríguez',
      inquilinoDocumento: 'AB123456',
      propiedadId: 2,
      propiedadNombre: 'Casa Jardines',
      propiedadDireccion: 'Calle Flores 456',
      mes: 'Febrero',
      anio: 2024,
      monto: 800,
      moneda: 'USD',
      estado: EstadoPago.PENDIENTE,
      fechaPago: null,
      fechaVencimiento: new Date('2024-02-10'),
      metodoPago: MetodoPago.TRANSFERENCIA,
      diasAtraso: 0
    },
    {
      id: 7,
      inquilinoId: 4,
      inquilinoNombre: 'Ana Martínez',
      inquilinoDocumento: '1721112233',
      propiedadId: 2,
      propiedadNombre: 'Casa Jardines',
      propiedadDireccion: 'Calle Flores 456',
      mes: 'Febrero',
      anio: 2024,
      monto: 750,
      moneda: 'USD',
      estado: EstadoPago.PAGADO,
      fechaPago: new Date('2024-02-02'),
      fechaVencimiento: new Date('2024-02-05'),
      metodoPago: MetodoPago.CHEQUE,
      diasAtraso: 0
    },
    {
      id: 8,
      inquilinoId: 1,
      inquilinoNombre: 'Juan Pérez',
      inquilinoDocumento: '1723456789',
      propiedadId: 1,
      propiedadNombre: 'Apartamento Centro',
      propiedadDireccion: 'Av. Principal 123',
      mes: 'Febrero',
      anio: 2024,
      monto: 450,
      moneda: 'USD',
      estado: EstadoPago.PAGADO,
      fechaPago: new Date('2024-02-06'),
      fechaVencimiento: new Date('2024-02-10'),
      metodoPago: MetodoPago.TRANSFERENCIA,
      diasAtraso: 0
    }
  ];

  // Filtros
  pagosFiltrados = [...this.pagos];
  filtroEstado = '';
  filtroMes = '';
  filtroMetodo = '';

  // Opciones para filtros
  estadosPago = Object.values(EstadoPago);
  metodosPago = Object.values(MetodoPago);
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor() {
    // Configurar fechas
    this.pagos.forEach(pago => {
      if (pago.fechaPago) pago.fechaPago = new Date(pago.fechaPago);
      pago.fechaVencimiento = new Date(pago.fechaVencimiento);
    });
  }

  // Métodos auxiliares
  aplicarFiltros(): void {
    this.pagosFiltrados = this.pagos.filter(pago => {
      let pasaFiltro = true;
      
      if (this.filtroEstado) {
        pasaFiltro = pasaFiltro && pago.estado === this.filtroEstado;
      }
      
      if (this.filtroMes) {
        pasaFiltro = pasaFiltro && pago.mes === this.filtroMes;
      }
      
      if (this.filtroMetodo) {
        pasaFiltro = pasaFiltro && pago.metodoPago === this.filtroMetodo;
      }
      
      return pasaFiltro;
    });
  }

  resetearFiltros(): void {
    this.filtroEstado = '';
    this.filtroMes = '';
    this.filtroMetodo = '';
    this.pagosFiltrados = [...this.pagos];
  }

  // Getters para estadísticas
  get pagosAtrasados() {
    return this.pagos.filter(p => p.estado === 'ATRASADO');
  }

  contarPorEstado(estado: string): number {
    return this.pagos.filter(p => p.estado === estado).length;
  }

  calcularIngresosMensuales(): number {
    const pagosEneroFebrero = this.pagos.filter(p => 
      (p.mes === 'Enero' || p.mes === 'Febrero') && p.anio === 2024 && p.estado === 'PAGADO'
    );
    return pagosEneroFebrero.reduce((total, pago) => total + pago.monto, 0);
  }

  calcularTotalAtrasados(): number {
    return this.pagosAtrasados.reduce((total, pago) => total + pago.monto, 0);
  }

  calcularTotalFiltrado(): number {
    return this.pagosFiltrados.reduce((total, pago) => total + pago.monto, 0);
  }

  calcularPromedio(): number {
    if (this.pagosFiltrados.length === 0) return 0;
    return Math.round(this.calcularTotalFiltrado() / this.pagosFiltrados.length);
  }

  get distribucionMetodos() {
    const metodos: Partial<Record<MetodoPago, number>> = {};
    this.pagos.forEach(pago => {
      const key = pago.metodoPago as MetodoPago;
      if (!metodos[key]) {
        metodos[key] = 0;
      }
      metodos[key]!++;
    });

    const colores = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14'];
    let colorIndex = 0;
    
    const entries = Object.entries(metodos) as [MetodoPago, number][];
    return entries.map(([metodo, cantidad]) => {
      const porcentaje = Math.round((cantidad / this.pagos.length) * 100);
      return {
        metodo,
        cantidad,
        porcentaje,
        color: colores[colorIndex++ % colores.length]
      };
    });
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'PAGADO': return 'badge badge-pagado';
      case 'PENDIENTE': return 'badge badge-pendiente';
      case 'ATRASADO': return 'badge badge-atrasado';
      case 'PARCIAL': return 'badge badge-parcial';
      default: return 'badge bg-secondary';
    }
  }

  getIconoMetodo(metodo: string): string {
    switch (metodo) {
      case 'TRANSFERENCIA': return 'bi bi-bank';
      case 'EFECTIVO': return 'bi bi-cash';
      case 'TARJETA_CREDITO': return 'bi bi-credit-card';
      case 'TARJETA_DEBITO': return 'bi bi-credit-card-2-front';
      case 'CHEQUE': return 'bi bi-receipt';
      case 'DEPOSITO': return 'bi bi-building';
      case 'PAYPAL': return 'bi bi-paypal';
      default: return 'bi bi-currency-exchange';
    }
  }
}