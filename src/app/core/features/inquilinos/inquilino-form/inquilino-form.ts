import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inquilino-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inquilino-form.html',
  styleUrls: ['./inquilino-form.scss'],
})
export class InquilinoFormComponent {
  inquilino = {
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaNacimiento: '',
    nacionalidad: '',
    email: '',
    telefono: '',
    telefonoAlternativo: '',
    estado: 'EN_PROCESO',
    empresa: '',
    cargo: '',
    ingresoMensual: 0,
    contactoLaboral: ''
  };

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'ACTIVO': return 'badge badge-activo';
      case 'EN_PROCESO': return 'badge badge-en-proceso';
      case 'INACTIVO': return 'badge badge-inactivo';
      default: return 'badge bg-secondary';
    }
  }

  guardarInquilino(): void {
    // Validación básica
    if (!this.inquilino.nombre || !this.inquilino.apellido || 
        !this.inquilino.tipoDocumento || !this.inquilino.numeroDocumento ||
        !this.inquilino.email || !this.inquilino.telefono) {
      alert('Por favor complete los campos obligatorios (*)');
      return;
    }

    console.log('Guardando inquilino:', this.inquilino);
    alert('Inquilino registrado exitosamente');
    
    // En una app real, redirigiríamos a la lista
    // this.router.navigate(['/inquilinos']);
  }
}