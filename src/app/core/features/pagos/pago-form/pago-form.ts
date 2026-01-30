import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pago-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pago-form.html',
  styleUrls: ['./pago-form.scss'],
})
export class PagoFormComponent {
  fechaHoy = new Date().toISOString().split('T')[0];

  pago = {
    inquilinoId: '',
    propiedadId: '',
    mes: '',
    anio: new Date().getFullYear().toString(),
    monto: 0,
    concepto: '',
    descripcion: '',
    metodoPago: '',
    fechaPago: this.fechaHoy,
    numeroTransaccion: '',
    numeroTarjeta: '',
    numeroCheque: '',
    comprobanteUrl: '',
    estado: 'PAGADO',
    notificarInquilino: true,
    crearRecordatorio: true
  };

  // Datos de muestra
  inquilinos = [
    { id: 1, nombre: 'Juan Pérez', propiedad: 'Apartamento Centro' },
    { id: 2, nombre: 'María González', propiedad: 'Local Comercial Plaza' },
    { id: 3, nombre: 'Ana Martínez', propiedad: 'Casa Jardines' }
  ];

  propiedades = [
    { id: 1, nombre: 'Apartamento Centro' },
    { id: 2, nombre: 'Casa Jardines' },
    { id: 3, nombre: 'Local Comercial Plaza' }
  ];

  pagosPendientes: any[] = [];

  // Opciones
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  anios = [2022, 2023, 2024, 2025];
  metodosPago = ['EFECTIVO', 'TRANSFERENCIA', 'TARJETA_CREDITO', 'TARJETA_DEBITO', 'CHEQUE', 'DEPOSITO'];

  cargarPagosPendientes(): void {
    // Simular carga de pagos pendientes
    if (this.pago.inquilinoId) {
      this.pagosPendientes = [
        { mes: 'Enero', anio: 2024, monto: 450, fechaVencimiento: '10/01/2024' },
        { mes: 'Febrero', anio: 2024, monto: 450, fechaVencimiento: '10/02/2024' }
      ];
    } else {
      this.pagosPendientes = [];
    }
  }

  seleccionarPendiente(pendiente: any): void {
    this.pago.mes = pendiente.mes;
    this.pago.anio = pendiente.anio.toString();
    this.pago.monto = pendiente.monto;
    this.pago.concepto = `Alquiler ${pendiente.mes} ${pendiente.anio}`;
  }

  simularSubida(): void {
    this.pago.comprobanteUrl = 'comprobante-pago-' + Date.now() + '.pdf';
    alert('Comprobante subido exitosamente');
  }

  calcularComision(): number {
    return this.pago.monto ? this.pago.monto * 0.02 : 0;
  }

  calcularIVA(): number {
    return this.pago.monto ? this.pago.monto * 0.12 : 0;
  }

  calcularTotal(): number {
    return this.pago.monto - this.calcularComision() - this.calcularIVA();
  }

  guardarBorrador(): void {
    console.log('Guardando borrador de pago:', this.pago);
    alert('Borrador guardado exitosamente');
  }

  registrarPago(): void {
    // Validación
    if (!this.pago.inquilinoId || !this.pago.propiedadId || !this.pago.mes || 
        !this.pago.anio || !this.pago.monto || !this.pago.concepto || !this.pago.metodoPago) {
      alert('Por favor complete los campos obligatorios (*)');
      return;
    }

    console.log('Registrando pago:', this.pago);
    alert('Pago registrado exitosamente');
    
    // En una app real, redirigiríamos a la lista
    // this.router.navigate(['/pagos']);
  }
}