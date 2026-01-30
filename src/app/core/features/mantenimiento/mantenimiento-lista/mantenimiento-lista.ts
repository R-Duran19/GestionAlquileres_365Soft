import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mantenimiento-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mantenimiento-lista.html',
  styleUrls: ['./mantenimiento-lista.scss']
})
export class MantenimientoListaComponent {
  // Datos falsos para mantenimientos
  mantenimientos = [
    {
      id: 1,
      titulo: 'Fuga de agua en baño principal',
      descripcion: 'El inquilino reporta fuga constante en el grifo del lavamanos del baño principal.',
      propiedadId: 1,
      propiedadNombre: 'Apartamento Centro',
      propiedadDireccion: 'Av. Principal 123',
      tipo: 'PLOMERÍA',
      prioridad: 'ALTA',
      estado: 'EN_PROCESO',
      tecnicoAsignado: 'Juan Pérez',
      fechaReporte: new Date('2024-01-15'),
      fechaInicio: new Date('2024-01-16'),
      fechaFin: null,
      costoEstimado: 120,
      costoReal: null
    },
    {
      id: 2,
      titulo: 'Puerta principal no cierra bien',
      descripcion: 'La puerta de entrada tiene problemas con el cerrojo, no cierra completamente.',
      propiedadId: 2,
      propiedadNombre: 'Casa Jardines',
      propiedadDireccion: 'Calle Flores 456',
      tipo: 'CARPINTERÍA',
      prioridad: 'MEDIA',
      estado: 'REPORTADO',
      tecnicoAsignado: null,
      fechaReporte: new Date('2024-01-20'),
      fechaInicio: null,
      fechaFin: null,
      costoEstimado: 80,
      costoReal: null
    },
    {
      id: 3,
      titulo: 'Aire acondicionado no enfría',
      descripcion: 'El sistema de aire acondicionado deja de enfriar después de 30 minutos de uso.',
      propiedadId: 5,
      propiedadNombre: 'Oficina Corporativa',
      propiedadDireccion: 'Av. Empresarial 654',
      tipo: 'ELECTRICIDAD',
      prioridad: 'CRITICA',
      estado: 'EN_PROCESO',
      tecnicoAsignado: 'Carlos Rodríguez',
      fechaReporte: new Date('2024-01-18'),
      fechaInicio: new Date('2024-01-19'),
      fechaFin: null,
      costoEstimado: 350,
      costoReal: null
    },
    {
      id: 4,
      titulo: 'Pintura exterior desgastada',
      descripcion: 'La pintura de la fachada necesita retoque por desgaste por intemperie.',
      propiedadId: 2,
      propiedadNombre: 'Casa Jardines',
      propiedadDireccion: 'Calle Flores 456',
      tipo: 'PINTURA',
      prioridad: 'BAJA',
      estado: 'COMPLETADO',
      tecnicoAsignado: 'María González',
      fechaReporte: new Date('2023-12-10'),
      fechaInicio: new Date('2023-12-15'),
      fechaFin: new Date('2023-12-20'),
      costoEstimado: 500,
      costoReal: 480
    },
    {
      id: 5,
      titulo: 'Instalación de persianas nuevas',
      descripcion: 'Instalación de persianas blackout en las 3 habitaciones principales.',
      propiedadId: 1,
      propiedadNombre: 'Apartamento Centro',
      propiedadDireccion: 'Av. Principal 123',
      tipo: 'INSTALACIÓN',
      prioridad: 'MEDIA',
      estado: 'COMPLETADO',
      tecnicoAsignado: 'Roberto López',
      fechaReporte: new Date('2023-11-25'),
      fechaInicio: new Date('2023-11-28'),
      fechaFin: new Date('2023-11-30'),
      costoEstimado: 300,
      costoReal: 320
    },
    {
      id: 6,
      titulo: 'Fuga en techo por lluvias',
      descripcion: 'Durante lluvias intensas se observa filtración de agua en el techo de la sala.',
      propiedadId: 4,
      propiedadNombre: 'Townhouse Moderno',
      propiedadDireccion: 'Calle Nueva 321',
      tipo: 'REPARACIÓN ESTRUCTURAL',
      prioridad: 'CRITICA',
      estado: 'REPORTADO',
      tecnicoAsignado: null,
      fechaReporte: new Date('2024-01-22'),
      fechaInicio: null,
      fechaFin: null,
      costoEstimado: 800,
      costoReal: null
    },
    {
      id: 7,
      titulo: 'Mantenimiento preventivo eléctrico',
      descripcion: 'Revisión y mantenimiento periódico del sistema eléctrico completo.',
      propiedadId: 3,
      propiedadNombre: 'Local Comercial Plaza',
      propiedadDireccion: 'Av. Comercial 789',
      tipo: 'ELECTRICIDAD',
      prioridad: 'MEDIA',
      estado: 'COMPLETADO',
      tecnicoAsignado: 'Ana Martínez',
      fechaReporte: new Date('2023-12-05'),
      fechaInicio: new Date('2023-12-08'),
      fechaFin: new Date('2023-12-10'),
      costoEstimado: 250,
      costoReal: 230
    }
  ];

  // Filtros
  mantenimientosFiltrados = [...this.mantenimientos];
  filtroTipo = '';
  filtroPrioridad = '';
  filtroPropiedad = '';

  // Opciones para filtros
  tipos = ['PLOMERÍA', 'ELECTRICIDAD', 'CARPINTERÍA', 'PINTURA', 'INSTALACIÓN', 'REPARACIÓN ESTRUCTURAL', 'MANTENIMIENTO PREVENTIVO'];
  prioridades = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];
  propiedades = ['Apartamento Centro', 'Casa Jardines', 'Local Comercial Plaza', 'Townhouse Moderno', 'Oficina Corporativa'];

  constructor() {
    // Configurar fechas
    this.mantenimientos.forEach(m => {
      m.fechaReporte = new Date(m.fechaReporte);
      if (m.fechaInicio) m.fechaInicio = new Date(m.fechaInicio);
      if (m.fechaFin) m.fechaFin = new Date(m.fechaFin);
    });
  }

  // Métodos auxiliares
  aplicarFiltros(): void {
    this.mantenimientosFiltrados = this.mantenimientos.filter(m => {
      let pasaFiltro = true;
      
      if (this.filtroTipo) {
        pasaFiltro = pasaFiltro && m.tipo === this.filtroTipo;
      }
      
      if (this.filtroPrioridad) {
        pasaFiltro = pasaFiltro && m.prioridad === this.filtroPrioridad;
      }
      
      if (this.filtroPropiedad) {
        pasaFiltro = pasaFiltro && m.propiedadNombre === this.filtroPropiedad;
      }
      
      return pasaFiltro;
    });
  }

  resetearFiltros(): void {
    this.filtroTipo = '';
    this.filtroPrioridad = '';
    this.filtroPropiedad = '';
    this.mantenimientosFiltrados = [...this.mantenimientos];
  }

  // Getters para estadísticas
  get mantenimientosUrgentes() {
    return this.mantenimientos.filter(m => 
      m.prioridad === 'CRITICA' || m.prioridad === 'ALTA'
    );
  }

  contarPorEstado(estado: string): number {
    return this.mantenimientos.filter(m => m.estado === estado).length;
  }

  contarPorPrioridad(prioridad: string): number {
    return this.mantenimientos.filter(m => m.prioridad === prioridad).length;
  }

  contarUrgentes(): number {
    return this.mantenimientosUrgentes.length;
  }

  mantenimientosPorEstado(estado: string) {
    return this.mantenimientos.filter(m => m.estado === estado);
  }

  filtrarPorEstado(estado: string): void {
    if (estado === 'TODOS') {
      this.mantenimientosFiltrados = [...this.mantenimientos];
    } else {
      this.mantenimientosFiltrados = this.mantenimientos.filter(m => m.estado === estado);
    }
  }

  filtrarPorPrioridad(prioridad: string): void {
    if (prioridad === 'URGENTES') {
      this.mantenimientosFiltrados = this.mantenimientosUrgentes;
    }
  }

  diasTranscurridos(fecha: Date): number {
    const hoy = new Date();
    const fechaReporte = new Date(fecha);
    const diferenciaMs = hoy.getTime() - fechaReporte.getTime();
    return Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
  }

  // Métodos para costos
  calcularTotalEstimado(): number {
    return this.mantenimientos.reduce((total, m) => total + (m.costoEstimado || 0), 0);
  }

  calcularTotalReal(): number {
    return this.mantenimientos.reduce((total, m) => total + (m.costoReal || 0), 0);
  }

  calcularDiferencia(): number {
    return this.calcularTotalEstimado() - this.calcularTotalReal();
  }

  get distribucionTipos() {
    const tipos: Partial<Record<string, number>> = {};
    this.mantenimientos.forEach(m => {
      const key = m.tipo as string;
      if (!tipos[key]) {
        tipos[key] = 0;
      }
      tipos[key]!++;
    });

    const colores = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14', '#20c997'];
    let colorIndex = 0;
    
    const entries = Object.entries(tipos) as [string, number][];
    return entries.map(([tipo, cantidad]) => {
      const porcentaje = Math.round((cantidad / this.mantenimientos.length) * 100);
      return {
        tipo,
        cantidad,
        porcentaje,
        color: colores[colorIndex++ % colores.length]
      };
    });
  }

  getBadgeEstado(estado: string): string {
    switch (estado) {
      case 'REPORTADO': return 'badge badge-reportado';
      case 'EN_PROCESO': return 'badge badge-en-proceso';
      case 'COMPLETADO': return 'badge badge-completado';
      default: return 'badge bg-secondary';
    }
  }

  getBadgePrioridad(prioridad: string): string {
    switch (prioridad) {
      case 'BAJA': return 'badge badge-prioridad-baja';
      case 'MEDIA': return 'badge badge-prioridad-media';
      case 'ALTA': return 'badge badge-prioridad-alta';
      case 'CRITICA': return 'badge badge-prioridad-critica';
      default: return 'badge bg-secondary';
    }
  }
}