import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TipoPropiedad, EstadoPropiedad } from '../../../models/propiedad.model';

@Component({
  selector: 'app-propiedad-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './propiedad-lista.html',
  styles: [`
    .table th {
      font-weight: 600;
      color: #495057;
      border-top: none;
    }
    
    .badge-disponible {
      background-color: #d1e7dd;
      color: #0f5132;
    }
    
    .badge-ocupado {
      background-color: #cfe2ff;
      color: #084298;
    }
    
    .badge-mantenimiento {
      background-color: #fff3cd;
      color: #664d03;
    }
  `]
})
export class PropiedadListaComponent {
  // Datos falsos para propiedades
  propiedades = [
    {
      id: 1,
      nombre: "Apartamento Centro",
      direccion: {
        calle: "Av. Principal",
        numero: "123",
        ciudad: "Quito",
        estado: "Pichincha",
        codigoPostal: "170135",
        pais: "Ecuador"
      },
      tipo: TipoPropiedad.APARTAMENTO,
      caracteristicas: {
        habitaciones: 2,
        banos: 2,
        parqueaderos: 1,
        metrosCuadrados: 85
      },
      estado: EstadoPropiedad.OCUPADO,
      informacionFinanciera: {
        precioAlquiler: 450,
        moneda: "USD"
      }
    },
    {
      id: 2,
      nombre: "Casa Jardines",
      direccion: {
        calle: "Calle Flores",
        numero: "456",
        ciudad: "Guayaquil",
        estado: "Guayas",
        codigoPostal: "090150",
        pais: "Ecuador"
      },
      tipo: TipoPropiedad.CASA,
      caracteristicas: {
        habitaciones: 3,
        banos: 3,
        parqueaderos: 2,
        metrosCuadrados: 150
      },
      estado: EstadoPropiedad.DISPONIBLE,
      informacionFinanciera: {
        precioAlquiler: 750,
        moneda: "USD"
      }
    },
    {
      id: 3,
      nombre: "Local Comercial Plaza",
      direccion: {
        calle: "Av. Comercial",
        numero: "789",
        ciudad: "Cuenca",
        estado: "Azuay",
        codigoPostal: "010150",
        pais: "Ecuador"
      },
      tipo: TipoPropiedad.COMERCIAL,
      caracteristicas: {
        habitaciones: 1,
        banos: 1,
        parqueaderos: 3,
        metrosCuadrados: 120
      },
      estado: EstadoPropiedad.MANTENIMIENTO,
      informacionFinanciera: {
        precioAlquiler: 1200,
        moneda: "USD"
      }
    },
    {
      id: 4,
      nombre: "Townhouse Moderno",
      direccion: {
        calle: "Calle Nueva",
        numero: "321",
        ciudad: "Quito",
        estado: "Pichincha",
        codigoPostal: "170201",
        pais: "Ecuador"
      },
      tipo: TipoPropiedad.TOWNHOUSE,
      caracteristicas: {
        habitaciones: 4,
        banos: 3,
        parqueaderos: 2,
        metrosCuadrados: 180
      },
      estado: EstadoPropiedad.OCUPADO,
      informacionFinanciera: {
        precioAlquiler: 950,
        moneda: "USD"
      }
    },
    {
      id: 5,
      nombre: "Oficina Corporativa",
      direccion: {
        calle: "Av. Empresarial",
        numero: "654",
        ciudad: "Quito",
        estado: "Pichincha",
        codigoPostal: "170305",
        pais: "Ecuador"
      },
      tipo: TipoPropiedad.OFICINA,
      caracteristicas: {
        habitaciones: 5,
        banos: 2,
        parqueaderos: 4,
        metrosCuadrados: 200
      },
      estado: EstadoPropiedad.DISPONIBLE,
      informacionFinanciera: {
        precioAlquiler: 1800,
        moneda: "USD"
      }
    }
  ];

  // Opciones para filtros
  tiposPropiedad = Object.values(TipoPropiedad);
  estadosPropiedad = Object.values(EstadoPropiedad);
  ciudades = ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Manta'];

  // Métodos auxiliares
  contarPorEstado(estado: string): number {
    return this.propiedades.filter(p => p.estado === estado).length;
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'DISPONIBLE': return 'badge badge-disponible';
      case 'OCUPADO': return 'badge badge-ocupado';
      case 'MANTENIMIENTO': return 'badge badge-mantenimiento';
      default: return 'badge bg-secondary';
    }
  }
}