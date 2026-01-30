import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contrato-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contrato-form.html',
  styleUrls: ['./contrato-form.scss'],
})


export class ContratoFormComponent {
  // Datos del contrato
  contrato = {
    propiedadId: '',
    inquilinoId: '',
    fechaInicio: this.getFechaHoy(),
    fechaFin: '',
    duracionMeses: 12,
    tipoContrato: 'FIJO',
    precioAlquiler: 0,
    depositoGarantia: 0,
    diaPago: 5,
    moneda: 'USD',
    clausulasEspeciales: '',
    serviciosIncluidos: [] as string[],
    responsabilidadesInquilino: '',
    estado: 'PENDIENTE',
    renovacionAutomatica: true,
    notificarVencimiento: true,
    diasRecordatorio: 3
  };

  // Datos de muestra
  propiedades = [
    { id: 1, nombre: 'Apartamento Centro', direccion: 'Av. Principal 123', detalles: '2 habitaciones, 85m²' },
    { id: 2, nombre: 'Casa Jardines', direccion: 'Calle Flores 456', detalles: '3 habitaciones, 150m²' },
    { id: 3, nombre: 'Local Comercial Plaza', direccion: 'Av. Comercial 789', detalles: '120m², planta baja' }
  ];

  inquilinos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', documento: '1723456789', contacto: 'juan.perez@email.com' },
    { id: 2, nombre: 'María', apellido: 'González', documento: '1729876543', contacto: 'maria.gonzalez@email.com' },
    { id: 3, nombre: 'Carlos', apellido: 'Rodríguez', documento: 'AB123456', contacto: 'carlos.rodriguez@email.com' }
  ];

  propiedadSeleccionada: any = null;
  inquilinoSeleccionado: any = null;

  // Opciones
  diasDelMes = Array.from({length: 28}, (_, i) => i + 1);
  servicios = ['Agua', 'Luz', 'Internet', 'Gas', 'Limpieza', 'Mantenimiento'];
  
  plantillas = [
    { nombre: 'Contrato Residencial Estándar', tipo: 'Residencial', descripcion: 'Para apartamentos y casas' },
    { nombre: 'Contrato Comercial', tipo: 'Comercial', descripcion: 'Para locales y oficinas' },
    { nombre: 'Contrato de Temporada', tipo: 'Temporal', descripcion: 'Para alquileres cortos' }
  ];

  constructor() {
    this.calcularFechaFin();
  }

  getFechaHoy(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  calcularFechaFin(): void {
    if (this.contrato.fechaInicio && this.contrato.duracionMeses > 0) {
      const fechaInicio = new Date(this.contrato.fechaInicio);
      fechaInicio.setMonth(fechaInicio.getMonth() + this.contrato.duracionMeses);
      this.contrato.fechaFin = fechaInicio.toISOString().split('T')[0];
    }
  }

  cargarInquilino(event: any): void {
    const inquilinoId = event.target.value;
    this.inquilinoSeleccionado = this.inquilinos.find(i => i.id == inquilinoId);
  }

  toggleServicio(servicio: string, event: any): void {
    if (event.target.checked) {
      if (!this.contrato.serviciosIncluidos.includes(servicio)) {
        this.contrato.serviciosIncluidos.push(servicio);
      }
    } else {
      const index = this.contrato.serviciosIncluidos.indexOf(servicio);
      if (index > -1) {
        this.contrato.serviciosIncluidos.splice(index, 1);
      }
    }
  }

  cargarPlantilla(plantilla: any): void {
    // Cargar configuración según plantilla
    alert(`Cargando plantilla: ${plantilla.nombre}`);
    
    if (plantilla.tipo === 'Residencial') {
      this.contrato.serviciosIncluidos = ['Agua', 'Luz', 'Internet'];
      this.contrato.clausulasEspeciales = 'Cláusulas estándar para propiedades residenciales.';
    } else if (plantilla.tipo === 'Comercial') {
      this.contrato.serviciosIncluidos = ['Luz', 'Internet'];
      this.contrato.clausulasEspeciales = 'Cláusulas especiales para uso comercial.';
    }
  }

  calcularTotalInicial(): number {
    return (this.contrato.precioAlquiler || 0) + (this.contrato.depositoGarantia || 0);
  }

  guardarBorrador(): void {
    console.log('Guardando borrador:', this.contrato);
    alert('Borrador guardado exitosamente');
  }

  generarContrato(): void {
    // Validación
    if (!this.contrato.propiedadId || !this.contrato.inquilinoId || 
        !this.contrato.fechaInicio || !this.contrato.precioAlquiler) {
      alert('Por favor complete los campos obligatorios (*)');
      return;
    }

    console.log('Generando contrato:', this.contrato);
    alert('Contrato generado exitosamente. Redirigiendo a vista previa...');
    
    // En una app real, redirigiríamos a la vista previa o lista
    // this.router.navigate(['/contratos']);
  }
}