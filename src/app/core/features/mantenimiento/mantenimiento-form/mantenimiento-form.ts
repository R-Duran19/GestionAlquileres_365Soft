import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mantenimiento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mantenimiento-form.html',
  styleUrls: ['./mantenimiento-form.scss'],
})

export class MantenimientoFormComponent {
  fechaHoy = new Date().toISOString().split('T')[0];

  // Modelo del reporte
  reporte = {
    titulo: '',
    tipo: '',
    prioridad: 'MEDIA',
    descripcion: '',
    areaAfectada: '',
    fechaProblema: this.fechaHoy,
    propiedadId: '',
    inquilinoId: '',
    reportadoPor: '',
    contactoReportante: '',
    accesoPropiedad: 'INQUILINO',
    tecnicoId: '',
    fechaEstimada: '',
    costoEstimado: 0,
    limitePresupuesto: 0,
    notasTecnico: '',
    estado: 'REPORTADO'
  };

  // Checklist de seguridad
  checklist = {
    riesgoElectrico: false,
    riesgoEstructural: false,
    riesgoAgua: false,
    accesoRestringido: false,
    equipoEspecial: false
  };

  // Archivos adjuntos
  archivosAdjuntos: any[] = [];

  // Datos de muestra
  propiedades = [
    { id: 1, nombre: 'Apartamento Centro', direccion: 'Av. Principal 123' },
    { id: 2, nombre: 'Casa Jardines', direccion: 'Calle Flores 456' },
    { id: 3, nombre: 'Local Comercial Plaza', direccion: 'Av. Comercial 789' }
  ];

  inquilinos = [
    { id: 1, nombre: 'Juan Pérez', contacto: 'juan.perez@email.com' },
    { id: 2, nombre: 'María González', contacto: 'maria.gonzalez@email.com' },
    { id: 3, nombre: 'Ana Martínez', contacto: 'ana.martinez@email.com' }
  ];

  tecnicos = [
    { id: 1, nombre: 'Carlos Rodríguez', especialidad: 'Plomería' },
    { id: 2, nombre: 'Roberto López', especialidad: 'Electricidad' },
    { id: 3, nombre: 'María Fernández', especialidad: 'Carpintería' }
  ];

  propiedadSeleccionada: any = null;
  inquilinoSeleccionado: any = null;

  // Opciones
  tiposMantenimiento = ['PREVENTIVO', 'CORRECTIVO', 'URGENTE', 'MEJORA', 'INSPECCIÓN'];
  prioridades = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];

  actualizarUrgencia(): void {
    if (this.reporte.prioridad === 'ALTA' || this.reporte.prioridad === 'CRITICA') {
      this.reporte.estado = 'URGENTE';
    }
  }

  esUrgente(): boolean {
    return this.reporte.prioridad === 'ALTA' || this.reporte.prioridad === 'CRITICA';
  }

  cargarInformacionPropiedad(): void {
    const propiedad = this.propiedades.find(p => p.id === Number(this.reporte.propiedadId));
    this.propiedadSeleccionada = propiedad || null;
  }

  cargarInformacionInquilino(): void {
    const inquilino = this.inquilinos.find(i => i.id === Number(this.reporte.inquilinoId));
    this.inquilinoSeleccionado = inquilino || null;
  }

  getBadgeEstado(): string {
    if (this.reporte.prioridad === 'ALTA' || this.reporte.prioridad === 'CRITICA') {
      return 'badge bg-danger';
    }
    return 'badge badge-reportado';
  }

  getBadgePrioridad(): string {
    switch (this.reporte.prioridad) {
      case 'BAJA': return 'badge badge-prioridad-baja';
      case 'MEDIA': return 'badge badge-prioridad-media';
      case 'ALTA': return 'badge badge-prioridad-alta';
      case 'CRITICA': return 'badge badge-prioridad-critica';
      default: return 'badge bg-secondary';
    }
  }

  estimarTiempoReparacion(): string {
    switch (this.reporte.tipo) {
      case 'URGENTE': return '24-48 horas';
      case 'CORRECTIVO': return '3-7 días';
      case 'PREVENTIVO': return '1-2 semanas';
      case 'MEJORA': return '2-4 semanas';
      default: return 'Por determinar';
    }
  }

  simularSubidaFoto(): void {
    const nuevoArchivo = {
      nombre: `foto-problema-${Date.now()}.jpg`,
      tipo: 'imagen',
      fecha: new Date().toLocaleDateString()
    };
    this.archivosAdjuntos.push(nuevoArchivo);
    alert('Foto subida exitosamente');
  }

  eliminarArchivo(archivo: any): void {
    const index = this.archivosAdjuntos.indexOf(archivo);
    if (index > -1) {
      this.archivosAdjuntos.splice(index, 1);
    }
  }

  tieneRiesgos(): boolean {
    return this.checklist.riesgoElectrico || 
           this.checklist.riesgoEstructural || 
           this.checklist.riesgoAgua ||
           this.checklist.accesoRestringido;
  }

  marcarComoUrgente(): void {
    this.reporte.prioridad = 'ALTA';
    this.reporte.estado = 'URGENTE';
    alert('Reporte marcado como URGENTE');
  }

  guardarBorrador(): void {
    console.log('Guardando borrador de mantenimiento:', this.reporte);
    alert('Borrador guardado exitosamente');
  }

  crearReporte(): void {
    // Validación
    if (!this.reporte.titulo || !this.reporte.tipo || !this.reporte.prioridad || 
        !this.reporte.descripcion || !this.reporte.areaAfectada || 
        !this.reporte.propiedadId || !this.reporte.reportadoPor || !this.reporte.contactoReportante) {
      alert('Por favor complete los campos obligatorios (*)');
      return;
    }

    console.log('Creando reporte de mantenimiento:', this.reporte);
    
    // Simulación de creación
    const mensaje = this.esUrgente() 
      ? '¡Reporte URGENTE creado! El equipo de mantenimiento ha sido notificado.' 
      : 'Reporte creado exitosamente. Será procesado en las próximas 24 horas.';
    
    alert(mensaje);
    
    // En una app real, redirigiríamos a la lista
    // this.router.navigate(['/mantenimiento']);
  }
}