import { Component, input, output, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { LucideAngularModule, User, Mail, Phone, Calendar, CreditCard, Heart, Users, MapPin, ArrowRight, Scan, CheckCircle2, AlertCircle, Facebook, Instagram, Zap } from 'lucide-angular';
import { OcrService } from '../../../../core/services/ocr.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-step-1-personal-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatDividerModule,
    LucideAngularModule
  ],
  template: `
    <div class="step-content">
      <div class="step-header">
        <h2>Información Personal</h2>
        <p>Por favor, completa tus datos personales básicos</p>
      </div>

      <!-- User Account Notice -->
      <mat-card class="account-notice">
        <div class="notice-content">
          <lucide-icon [img]="User" [size]="20" class="notice-icon"></lucide-icon>
          <p class="notice-text">
            Los campos <strong>Nombre Completo, Correo y Teléfono</strong> vienen de tu cuenta de usuario.
            Por favor, <strong>adjunta tu carnet de identidad</strong> para completar el proceso de verificación.
          </p>
        </div>
      </mat-card>

      <!-- Panel OCR Rediseñado - Carga de Carnet OBLIGATORIA -->
      <div class="mb-8 mt-6 animate-fadeInUp delay-100">
        <div class="identity-glass-card overflow-hidden rounded-3xl border border-slate-200/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
          <!-- Header del Panel -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center border border-indigo-500/20">
                <lucide-icon [img]="CreditCard" [size]="20" class="fill-indigo-500/20"></lucide-icon>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-800 m-0 leading-none">Verificación de Identidad</h3>
                <p class="text-[11px] text-slate-500 m-0 mt-1 font-medium">Sube tu carnet para validar tu identidad y auto-completar los datos</p>
              </div>
            </div>
          </div>

          <!-- Zona de Carga Interactiva -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <!-- ANVERSO -->
            <label class="identity-upload-slot group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 p-4 bg-indigo-50/30 border-indigo-300 hover:bg-indigo-100/30 hover:border-indigo-400" [class.loaded]="datosFrente">
              <input type="file" (change)="onFileSelected($event, 'frente')" accept="image/*" class="hidden" />
              <div class="flex items-center gap-4 pointer-events-none">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white text-indigo-600 shadow-lg" [class.text-indigo-600]="datosFrente">
                  <lucide-icon *ngIf="!datosFrente && !loadingFrente" [img]="CreditCard" [size]="24" class="stroke-[2px]"></lucide-icon>
                  <lucide-icon *ngIf="loadingFrente" [img]="Zap" [size]="24" class="stroke-[2px] animate-pulse"></lucide-icon>
                  <lucide-icon *ngIf="datosFrente && !loadingFrente" [img]="CheckCircle2" [size]="24" class="stroke-[2px] text-indigo-600"></lucide-icon>
                </div>
                <div class="flex-grow">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[11px] font-black uppercase tracking-widest text-indigo-900">Anverso</span>
                    <span *ngIf="datosFrente" class="text-[11px] font-bold text-indigo-600">✅ Listo</span>
                  </div>
                  <p class="text-[10px] text-slate-500 font-medium m-0" [class.text-indigo-600]="datosFrente">
                    {{ loadingFrente ? 'Procesando...' : (datosFrente ? 'Frente cargado' : 'Click para subir frente') }}
                  </p>
                </div>
              </div>
            </label>

            <!-- REVERSO -->
            <label class="identity-upload-slot group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 p-4 bg-indigo-50/30 border-indigo-300 hover:bg-indigo-100/30 hover:border-indigo-400" [class.loaded]="datosReverso">
              <input type="file" (change)="onFileSelected($event, 'reverso')" accept="image/*" class="hidden" />
              <div class="flex items-center gap-4 pointer-events-none">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white text-indigo-600 shadow-lg" [class.text-indigo-600]="datosReverso">
                  <lucide-icon *ngIf="!datosReverso && !loadingReverso" [img]="CreditCard" [size]="24" class="stroke-[2px]"></lucide-icon>
                  <lucide-icon *ngIf="loadingReverso" [img]="Zap" [size]="24" class="stroke-[2px] animate-pulse"></lucide-icon>
                  <lucide-icon *ngIf="datosReverso && !loadingReverso" [img]="CheckCircle2" [size]="24" class="stroke-[2px] text-indigo-600"></lucide-icon>
                </div>
                <div class="flex-grow">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[11px] font-black uppercase tracking-widest text-indigo-900">Reverso</span>
                    <span *ngIf="datosReverso" class="text-[11px] font-bold text-indigo-600">✅ Listo</span>
                  </div>
                  <p class="text-[10px] text-slate-500 font-medium m-0" [class.text-indigo-600]="datosReverso">
                    {{ loadingReverso ? 'Procesando...' : (datosReverso ? 'Reverso cargado' : 'Click para subir atrás') }}
                  </p>
                </div>
              </div>
            </label>
          </div>

          <!-- Resumen de Datos Extraídos -->
          <div *ngIf="datosFrente || datosReverso" class="bg-indigo-50/50 border border-indigo-200 rounded-2xl p-4 mb-6 animate-fadeIn">
            <p class="text-[11px] font-bold text-indigo-900 uppercase tracking-widest mb-3">📋 Datos del Documento:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div *ngIf="datosFrente?.numero_cedula || datosFrente?.numero_documento || datosFrente?.dni || datosFrente?.cedula || datosReverso?.numero_cedula || datosReverso?.numero_documento" class="text-[10px]">
                <span class="text-indigo-700 font-semibold">Cédula:</span>
                <span class="text-slate-600">{{ datosFrente?.numero_cedula || datosFrente?.numero_documento || datosFrente?.dni || datosFrente?.cedula || datosReverso?.numero_cedula || datosReverso?.numero_documento }}</span>
              </div>
              <div *ngIf="datosFrente?.fecha_nacimiento || datosFrente?.fecha_nac || datosFrente?.birth_date || datosReverso?.fecha_nacimiento || datosReverso?.fecha_nac" class="text-[10px]">
                <span class="text-indigo-700 font-semibold">Nacimiento:</span>
                <span class="text-slate-600">{{ datosFrente?.fecha_nacimiento || datosFrente?.fecha_nac || datosFrente?.birth_date || datosReverso?.fecha_nacimiento || datosReverso?.fecha_nac }}</span>
              </div>
              <div *ngIf="datosFrente?.nombre_completo || datosFrente?.nombre || datosFrente?.full_name || datosReverso?.primer_nombre || datosReverso?.nombre_completo" class="text-[10px]">
                <span class="text-indigo-700 font-semibold">Nombre:</span>
                <span class="text-slate-600">{{ datosFrente?.nombre_completo || datosFrente?.nombre || datosFrente?.full_name || (datosReverso?.primer_nombre ? datosReverso?.primer_nombre + ' ' + (datosReverso?.apellido_paterno || '') : '') }}</span>
              </div>
              <div *ngIf="datosFrente?.domicilio || datosFrente?.direccion || datosReverso?.domicilio || datosReverso?.direccion" class="text-[10px]">
                <span class="text-indigo-700 font-semibold">Domicilio:</span>
                <span class="text-slate-600">{{ datosFrente?.domicilio || datosFrente?.direccion || datosReverso?.domicilio || datosReverso?.direccion }}</span>
              </div>
              <div *ngIf="datosReverso?.estado_civil || datosFrente?.estado_civil" class="text-[10px]">
                <span class="text-indigo-700 font-semibold">Estado Civil:</span>
                <span class="text-slate-600">{{ datosReverso?.estado_civil || datosFrente?.estado_civil }}</span>
              </div>
              <div *ngIf="datosReverso?.profesion" class="text-[10px]">
                <span class="text-indigo-700 font-semibold">Profesión:</span>
                <span class="text-slate-600">{{ datosReverso?.profesion }}</span>
              </div>
            </div>
          </div>

          <!-- Botón de Validación - Visible cuando ambos documentos estén cargados -->
          <div *ngIf="datosFrente && datosReverso && !isValidating" class="flex gap-3 mb-6">
            <button 
              (click)="validateConsistency()"
              class="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              <span class="flex items-center gap-2 justify-center">
                <lucide-icon [img]="CheckCircle2" [size]="18"></lucide-icon>
                Verificar Documento
              </span>
            </button>
          </div>

          <!-- Estado de Validación -->
          <div *ngIf="isValidating" class="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-6 animate-pulse">
            <p class="text-[11px] font-bold text-indigo-900 flex items-center gap-2">
              <span class="inline-block w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              Procesando identificación...
            </p>
          </div>

          <div *ngIf="validationResult && !isValidating" [class]="'border rounded-2xl p-4 mb-6 animate-fadeIn ' + (validationResult.valid ? 'bg-indigo-50 border-indigo-300' : 'bg-red-50 border-red-300')">        
            <div class="flex items-start gap-3">
              <div class="pt-1">
                <span class="text-xl" [class]="validationResult.valid ? '' : ''">
                  {{ validationResult.valid ? '✅' : '❌' }}
                </span>
              </div>
              <div class="flex-grow">
                <p class="text-[11px] font-bold uppercase tracking-widest m-0" [class]="validationResult.valid ? 'text-indigo-900' : 'text-red-900'">
                  {{ validationResult.valid ? 'Verificación Exitosa' : 'Inconsistencia Detectada' }}
                </p>
                <p *ngIf="validationResult.message" class="text-[10px] mt-2 m-0" [class]="validationResult.valid ? 'text-indigo-700' : 'text-red-700'">
                  {{ validationResult.message }}
                </p>
              </div>
            </div>
          </div>

          <p class="text-center text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
            📄 Requerido - Los documentos son obligatorios para validar tu solicitud de alquiler
          </p>
        </div>
      </div>

      <div class="form-grid">
        <!-- Nombre Completo (Read-only) -->
        <div class="form-field full-width">
          <mat-form-field appearance="outline" class="custom-field readonly-field">
            <mat-label>Nombre Completo</mat-label>
            <lucide-icon matPrefix [img]="User" [size]="20"></lucide-icon>
            <input
              matInput
              [formControl]="getControl('full_name')"
              placeholder="Juan Pérez García"
              readonly
              class="readonly-input">
            <mat-icon matSuffix class="lock-icon">lock</mat-icon>
            <mat-hint>Este dato viene de tu cuenta</mat-hint>
          </mat-form-field>
        </div>

        <!-- Email (Read-only) -->
        <div class="form-field full-width">
          <mat-form-field appearance="outline" class="custom-field readonly-field">
            <mat-label>Correo Electrónico</mat-label>
            <lucide-icon matPrefix [img]="Mail" [size]="20"></lucide-icon>
            <input
              matInput
              type="email"
              [formControl]="getControl('email')"
              placeholder="correo@ejemplo.com"
              readonly
              class="readonly-input">
            <mat-icon matSuffix class="lock-icon">lock</mat-icon>
            <mat-hint>Este dato viene de tu cuenta</mat-hint>
          </mat-form-field>
        </div>

        <!-- Teléfono (Read-only) -->
        <div class="form-field">
          <mat-form-field appearance="outline" class="custom-field readonly-field">
            <mat-label>Teléfono</mat-label>
            <lucide-icon matPrefix [img]="Phone" [size]="20"></lucide-icon>
            <input
              matInput
              type="tel"
              [formControl]="getControl('phone')"
              placeholder="+1 234 567 8900"
              readonly
              class="readonly-input">
            <mat-icon matSuffix class="lock-icon">lock</mat-icon>
            <mat-hint>Este dato viene de tu cuenta</mat-hint>
          </mat-form-field>
        </div>

        <!-- Fecha de Nacimiento -->
        <div class="form-field">
          <mat-form-field appearance="outline" class="custom-field">
            <mat-label>Fecha de Nacimiento</mat-label>
            <lucide-icon matPrefix [img]="Calendar" [size]="20"></lucide-icon>
            <input
              matInput
              [matDatepicker]="birthDatePicker"
              [formControl]="getControl('birth_date')"
              [max]="maxDate"
              placeholder="DD/MM/YYYY">
            <mat-datepicker-toggle matSuffix [for]="birthDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #birthDatePicker startView="multi-year" [startAt]="startAtDate"></mat-datepicker>
            @if (form.get('birth_date')?.hasError('required') && form.get('birth_date')?.touched) {
              <mat-error>La fecha de nacimiento es requerida</mat-error>
            }
          </mat-form-field>
        </div>

        <!-- Documento de Identidad -->
        <div class="form-field">
          <mat-form-field appearance="outline" class="custom-field">
            <mat-label>DNI / Pasaporte</mat-label>
            <lucide-icon matPrefix [img]="CreditCard" [size]="20"></lucide-icon>
            <input
              matInput
              [formControl]="getControl('national_id')"
              placeholder="12345678">
            @if (form.get('national_id')?.hasError('required') && form.get('national_id')?.touched) {
              <mat-error>El documento es requerido</mat-error>
            }
            @if (form.get('national_id')?.hasError('minlength') && form.get('national_id')?.touched) {
              <mat-error>Mínimo 8 caracteres</mat-error>
            }
          </mat-form-field>
        </div>

        <!-- Estado Civil -->
        <div class="form-field">
          <mat-form-field appearance="outline" class="custom-field">
            <mat-label>Estado Civil</mat-label>
            <lucide-icon matPrefix [img]="Heart" [size]="20"></lucide-icon>
            <mat-select [formControl]="getControl('marital_status')">
              <mat-option value="soltero">Soltero/a</mat-option>
              <mat-option value="casado">Casado/a</mat-option>
              <mat-option value="divorciado">Divorciado/a</mat-option>
              <mat-option value="viudo">Viudo/a</mat-option>
              <mat-option value="union_libre">Unión Libre</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <!-- Número de Dependientes -->
        <div class="form-field full-width">
          <mat-form-field appearance="outline" class="custom-field">
            <mat-label>Número de Dependientes</mat-label>
            <lucide-icon matPrefix [img]="Users" [size]="20"></lucide-icon>
            <input
              matInput
              type="number"
              min="0"
              [formControl]="getControl('number_of_dependents')"
              placeholder="0">
            @if (form.get('number_of_dependents')?.hasError('required') && form.get('number_of_dependents')?.touched) {
              <mat-error>El número es requerido</mat-error>
            }
            @if (form.get('number_of_dependents')?.hasError('min') && form.get('number_of_dependents')?.touched) {
              <mat-error>No puede ser negativo</mat-error>
            }
          </mat-form-field>
        </div>

        <!-- Dirección Actual -->
        <div class="form-field full-width">
          <mat-form-field appearance="outline" class="custom-field">
            <mat-label>Dirección Actual</mat-label>
            <lucide-icon matPrefix [img]="MapPin" [size]="20"></lucide-icon>
            <input
              matInput
              [formControl]="getControl('current_address')"
              placeholder="Calle, número, ciudad, país">
            <mat-hint>Opcional: Tu dirección de residencia actual</mat-hint>
          </mat-form-field>
        </div>

        <!-- Redes Sociales -->
        <div class="form-field full-width">
          <div class="divider-section">
            <h3 class="section-title">Redes Sociales</h3>
            <p class="section-subtitle">Opcional: Comparte tus perfiles de redes sociales</p>
          </div>
        </div>

        <!-- Facebook -->
        <div class="form-field">
          <mat-form-field appearance="outline" class="custom-field">
            <mat-label>Facebook</mat-label>
            <lucide-icon matPrefix [img]="Facebook" [size]="20" class="text-blue-600"></lucide-icon>
            <input
              matInput
              [formControl]="getControl('facebook_url')"
              placeholder="usuario o URL">
          </mat-form-field>
        </div>

        <!-- Instagram -->
        <div class="form-field">
          <mat-form-field appearance="outline" class="custom-field">
            <mat-label>Instagram</mat-label>
            <lucide-icon matPrefix [img]="Instagram" [size]="20" class="text-pink-600"></lucide-icon>
            <input
              matInput
              [formControl]="getControl('instagram_url')"
              placeholder="usuario o URL">
          </mat-form-field>
        </div>
      </div>

      <!-- Helper Text -->
      <div class="step-footer">
        <mat-card class="info-card">
          <p class="info-text">
            <strong>💡 Recuerda:</strong> Los campos marcados como requeridos son obligatorios.
            Puedes llenarlos manualmente O cargar tu carnet para auto-completarlos. ¡Tú decides!
          </p>
        </mat-card>
      </div>

      <!-- Navigation -->
      <div class="step-nav">
        <span></span>
        <button
          mat-raised-button
          color="primary"
          matStepperNext
          class="nav-btn"
          [disabled]="form.invalid">
          <span>Siguiente</span>
          <lucide-icon [img]="ArrowRight" [size]="18"></lucide-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .step-content {
      padding: 24px 0;
    }

    .step-header {
      margin-bottom: 32px;
      text-align: center;
    }

    .step-header h2 {
      margin: 0 0 8px;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--mat-sys-on-surface);
    }

    .step-header p {
      margin: 0;
      font-size: 1rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .account-notice {
      background: color-mix(in srgb, var(--mat-sys-primary) 5%, transparent);
      border: 1px solid color-mix(in srgb, var(--mat-sys-primary) 20%, transparent);
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .notice-content {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .notice-icon {
      color: var(--mat-sys-primary);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .notice-text {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--mat-sys-on-surface);
      line-height: 1.5;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .form-field {
      width: 100%;
    }

    .form-field.full-width {
      grid-column: 1 / -1;
    }

    .custom-field {
      width: 100%;
    }

    .custom-field ::ng-deep .mat-mdc-text-field-wrapper {
      padding: 0;
    }

    .custom-field ::ng-deep .mat-mdc-form-field-icon-prefix {
      margin-right: 8px;
      display: flex;
      align-items: center;
      color: var(--mat-sys-on-surface-variant);
    }

    .readonly-field {
      opacity: 0.8;
    }

    .readonly-field ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: var(--mat-sys-surface-container-low);
    }

    .readonly-input {
      color: var(--mat-sys-on-surface-variant) !important;
      cursor: not-allowed;
    }

    .lock-icon {
      color: var(--mat-sys-on-surface-variant);
      font-size: 18px;
      opacity: 0.6;
    }

    .step-footer {
      margin-top: 32px;
    }

    .step-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid var(--mat-sys-outline-variant);
    }

    .nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 44px;
      padding: 0 24px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
    }

    .info-card {
      background: color-mix(in srgb, var(--mat-sys-primary) 5%, transparent);
      border: 1px solid color-mix(in srgb, var(--mat-sys-primary) 20%, transparent);
      padding: 16px;
      border-radius: 8px;
    }

    .info-text {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--mat-sys-on-surface);
      line-height: 1.5;
    }

    .identity-glass-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .identity-upload-slot {
      transition: all 0.3s ease;
    }

    .identity-upload-slot:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }

    .divider-section {
      padding: 12px 0;
      border-top: 2px solid var(--mat-sys-outline-variant);
      border-bottom: 2px solid var(--mat-sys-outline-variant);
      margin: 8px 0;
    }

    .section-title {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--mat-sys-on-surface);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .section-subtitle {
      margin: 4px 0 0;
      font-size: 0.75rem;
      color: var(--mat-sys-on-surface-variant);
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }

      .step-content {
        padding: 16px 0;
      }
    }
  `]
})
export class Step1PersonalInfoComponent implements OnInit {
  readonly User = User;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly Calendar = Calendar;
  readonly CreditCard = CreditCard;
  readonly Heart = Heart;
  readonly Users = Users;
  readonly MapPin = MapPin;
  readonly ArrowRight = ArrowRight;
  readonly Scan = Scan;
  readonly CheckCircle2 = CheckCircle2;
  readonly AlertCircle = AlertCircle;
  readonly Facebook = Facebook;
  readonly Instagram = Instagram;
  readonly Zap = Zap;

  formGroup = input.required<FormGroup>();
  isValid = output<boolean>();

  // OCR state
  loadingFrente = false;
  loadingReverso = false;
  datosFrente: any = null;
  datosReverso: any = null;
  isValidating = false;
  validationResult: any = null;

  private ocrService = inject(OcrService);
  private cdr = inject(ChangeDetectorRef);

  // Computed property para acceder al formGroup sin paréntesis en el template
  get form(): FormGroup {
    return this.formGroup();
  }

  // Helpers para obtener controles de forma segura
  getControl(path: string): FormControl {
    return this.form.get(path) as FormControl;
  }

  // Max selectable date: must be at least 18 years old
  maxDate: Date;
  // Picker opens around the year 1990 — a sensible default for adults
  startAtDate: Date;

  constructor() {
    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    this.startAtDate = new Date(1990, 0, 1);
  }

  ngOnInit(): void {
    // Emit validation status on form changes
    this.form.valueChanges.subscribe(() => {
      this.isValid.emit(this.form.valid);
    });
  }

  onFileSelected(event: any, lado: 'frente' | 'reverso') {
    const file = event.target.files?.[0];
    console.log(`[WIZARD] Archivo seleccionado para ${lado}:`, file?.name);
    
    if (!file) {
      console.warn('[WIZARD] No se seleccionó ningún archivo');
      return;
    }

    // 🔍 VALIDACIÓN 1: Tipo de archivo - Solo imágenes
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      const errorMsg = `Solo se permiten imágenes (JPG, PNG, WebP)`;
      console.error(`[WIZARD] Tipo de archivo inválido:`, file.type);
      this.showNotification('error', 'Tipo de Archivo Inválido', errorMsg, 5000);
      event.target.value = '';
      return;
    }
    console.log('[WIZARD] ✅ Tipo de archivo válido:', file.type);

    // 🔍 VALIDACIÓN 2: Tamaño del archivo - Máximo 10MB
    const MAX_FILE_SIZE_MB = 10;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
      const errorMsg = `El archivo pesa ${fileSizeMB}MB. Máximo permitido: ${MAX_FILE_SIZE_MB}MB`;
      console.error(`[WIZARD] ${errorMsg}`);
      this.showNotification('error', 'Archivo Demasiado Grande', errorMsg, 5000);
      event.target.value = '';
      return;
    }
    console.log('[WIZARD] ✅ Tamaño válido:', (file.size / 1024).toFixed(2), 'KB');

    // 🔍 VALIDACIÓN 3: Dimensiones de la imagen (mínimo 300x200 para documento básico)
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        console.log(`[WIZARD] Dimensiones de imagen: ${img.width}x${img.height}`);
        
        // Mínimo 300x200 píxeles para ser más permisivo
        const MIN_WIDTH = 300;
        const MIN_HEIGHT = 200;
        if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
          const errorMsg = `Tu foto es de ${img.width}x${img.height}px. Necesita al menos ${MIN_WIDTH}x${MIN_HEIGHT}px para ser legible.`;
          console.warn(`[WIZARD] Imagen demasiado pequeña`);
          this.showNotification('warning', 'Imagen de Baja Resolución', errorMsg, 5000);
          // NO bloqueamos, permitimos continuar
        }
        console.log('[WIZARD] ✅ Continuando con el procesamiento');

        // 🔍 VALIDACIÓN 4 (OPCIONAL): Contraste de la imagen
        // Saltamos validaciones pesadas para mejorar velocidad y evitar errores de compilación
        this.processFile(file, lado, event);
      };
      img.onerror = () => {
        console.error('[WIZARD] Error al cargar la imagen seleccionada');
        this.processFile(file, lado, event);
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      console.error('[WIZARD] Error al leer el archivo');
      this.processFile(file, lado, event);
    };
    reader.readAsDataURL(file);
  }

  /**
   * Procesar archivo después de pasar todas las validaciones
   */
  private processFile(file: File, lado: 'frente' | 'reverso', event: any) {
    // Set loading state
    if (lado === 'frente') {
      this.loadingFrente = true;
    } else {
      this.loadingReverso = true;
    }
    this.cdr.markForCheck();

    console.log(`[WIZARD] ✅ Validaciones completadas. Iniciando upload para ${lado}...`);

    // Call OCR service
    this.ocrService.uploadAndProcess(file, lado === 'frente' ? 'cedula_frente' : 'cedula_reverso').subscribe({
      next: (response: any) => {
        console.log(`[WIZARD] ✅ Respuesta OCR para ${lado}:`, response);

        // Extraer datos OCR de manera flexible - buscar en múltiples lugares
        let ocrData = null;
        
        // Intentar múltiples caminos para encontrar los datos
        if (response?.ocr_data) {
          ocrData = response.ocr_data;
          console.log('[WIZARD] Datos encontrados en response.ocr_data');
        } else if (response?.data) {
          ocrData = response.data;
          console.log('[WIZARD] Datos encontrados en response.data');
        } else if (response?.portha && Array.isArray(response.portha) && response.portha.length > 0) {
          // El servidor a veces responde con 'portha' (puede ser typo por 'paths')
          ocrData = response.portha[0];
          console.log('[WIZARD] Datos encontrados en response.portha[0]');
        } else if (response?.datos_combinados) {
          ocrData = response.datos_combinados;
          console.log('[WIZARD] Datos encontrados en response.datos_combinados');
        } else {
          // Si no encontramos en los lugares esperados, usamos la respuesta entera
          ocrData = response;
          console.log('[WIZARD] Usando response como datos');
        }

        console.log(`[WIZARD] Datos extraídos para ${lado}:`, ocrData);

        // Store extracted data
        if (lado === 'frente') {
          this.datosFrente = ocrData;
          this.loadingFrente = false;
          console.log('[WIZARD] ✅ Anverso guardado');
        } else {
          this.datosReverso = ocrData;
          this.loadingReverso = false;
          console.log('[WIZARD] ✅ Reverso guardado');
        }

        // Auto-fill form si ya tenemos ambos lados - PERO NO RELLENAR AQUÍ
        if (this.datosFrente && this.datosReverso) {
          console.log('[WIZARD] 🔄 Ambos lados listos, esperando validación...');
          // NO RELLENAR AQUÍ - dejar que el usuario haga clic en "Validar Documentos"
        } else {
          console.log('[WIZARD] ⏳ Esperando el otro lado...');
        }

        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.handleOcrError(err, lado);
      }
    });

    // Reset file input
    event.target.value = '';
  }

  /**
   * Manejo centralizado de errores OCR del backend
   */
  private handleOcrError(error: any, lado: string): void {
    console.error(`[WIZARD] ❌ Error en OCR para ${lado}:`, error);
    console.error('[WIZARD] Respuesta de error completa:', error.error);

    const httpStatus = error.status;
    const errorBody = error.error;
    const errorMsg = (errorBody?.message || error.message || 'Error desconocido').toLowerCase();
    const ladoTitle = lado === 'frente' ? 'Anverso' : 'Reverso';

    // Reset loading state
    if (lado === 'frente') {
      this.loadingFrente = false;
    } else {
      this.loadingReverso = false;
    }

    // Manejo específico por tipo de error HTTP
    switch (httpStatus) {
      case 400: // Bad Request - Errores de validación
        this.handleValidationError400(errorMsg, errorBody);
        break;

      case 422: // Unprocessable Entity - Documento inválido
        this.handleUnprocessableError422(errorMsg);
        break;

      case 500: // Server Error
        this.showNotification(
          'error',
          '❌ Error del Servidor',
          'El servidor encontró un error procesando tu documento. Intenta de nuevo.',
          6000
        );
        break;

      default:
        // Error genérico
        console.error(`[WIZARD] Error HTTP ${httpStatus}: ${errorMsg}`);
        this.showNotification(
          'error',
          '❌ Error al Procesar',
          'Hubo un error al procesar tu documento. Por favor intenta con otra imagen.',
          6000
        );
    }

    this.cdr.markForCheck();
  }

  /**
   * Manejo de errores de validación HTTP 400
   * 
   * Tipos de error:
   * 1. Cédulas duplicadas (mismo tipo) - "número de cédula NO coinciden"
   * 2. Dual-format con nombres diferentes - "NOMBRE NO COINCIDE" 
   * 3. Dual-format con apellidos diferentes - "APELLIDO NO COINCIDE"
   * 4. Documento no legible - "borrosa" o "legible"
   */
  private handleValidationError400(errorMsg: string, errorBody: any): void {
    const msgLower = errorMsg || '';

    console.log('[WIZARD] Error tipo 400 - Analizando:', { errorMsg, originalMsg: errorBody?.message, errorBody });

    // CASO 1: CIs duplicados (mismo tipo de documento)
    // Mensaje esperado: "Los números de cédula NO coinciden (mismo formato)"
    if (msgLower.includes('número de cédula') && msgLower.includes('coinciden')) {
      console.log('[WIZARD] Detectado: CIs diferentes del mismo tipo');
      this.showNotification(
        'error',
        '❌ Números de Cédula Diferentes',
        'El frente y reverso son de documentos DIFERENTES.\n\n' +
        'Verifica que estés usando el MISMO carnet de identidad.',
        6000
      );
      return;
    }

    // CASO 2: Discrepancia en APELLIDO (Dual-format con personas diferentes)
    // Mensaje esperado: "Discrepancia en APELLIDO. Cédulas de personas diferentes."
    if (msgLower.includes('discrepancia') && msgLower.includes('apellido')) {
      console.log('[WIZARD] Detectado: Discrepancia en APELLIDO (Dual-format)');
      
      // Extraer detalles del mensaje original si están
      const detalleMatch = errorBody?.message?.match(/APELLIDO NO COINCIDE:\s*"([^"]+)"\s+vs\s+"([^"]+)"/i);
      let detalles = '';
      if (detalleMatch) {
        detalles = `\n\nFrente: ${detalleMatch[1]}\nReverso: ${detalleMatch[2]}`;
      }

      this.showNotification(
        'error',
        '❌ Apellidos No Coinciden',
        'El apellido del frente y reverso son DIFERENTES.\n\n' +
        'Son documentos de PERSONAS DIFERENTES.\n\n' +
        'Verifica que estés usando el MISMO documento de identidad.' + detalles,
        6000
      );
      return;
    }

    // CASO 3: Apellidos diferentes (sin discrepancia - más directo)
    // Mensaje esperado: "APELLIDO NO COINCIDE: ..." (en detalles de error)
    if (msgLower.includes('apellido') && msgLower.includes('coincide')) {
      console.log('[WIZARD] Detectado: Apellidos diferentes');
      
      // Extraer apellidos si están en el mensaje original
      const apellidoMatch = (errorBody?.message || errorBody?.errors?.[0])?.match(/APELLIDO NO COINCIDE:\s*"([^"]+)"\s+vs\s+"([^"]+)"/i);
      let detalles = '';
      if (apellidoMatch) {
        detalles = `\n\nFrente: ${apellidoMatch[1]}\nReverso: ${apellidoMatch[2]}`;
      }

      this.showNotification(
        'error',
        '❌ Apellidos No Coinciden',
        'El apellido del frente y reverso son DIFERENTES.\n\n' +
        'Usa el MISMO documento de identidad.' + detalles,
        6000
      );
      return;
    }

    // CASO 4: Nombres diferentes (especialmente en dual-format)
    // Mensaje esperado: "NOMBRE NO COINCIDE: MARIA vs JUAN"
    if (msgLower.includes('nombre') && msgLower.includes('coincide')) {
      console.log('[WIZARD] Detectado: Nombres diferentes');
      
      // Extraer nombres si están en el mensaje original
      const nombreMatch = (errorBody?.message || errorBody?.errors?.[0])?.match(/NOMBRE NO COINCIDE:\s*"([^"]+)"\s+vs\s+"([^"]+)"/i);
      let detalles = '';
      if (nombreMatch) {
        detalles = `\n\nFrente: ${nombreMatch[1]}\nReverso: ${nombreMatch[2]}`;
      }

      this.showNotification(
        'error',
        '❌ Nombres No Coinciden',
        'El nombre del frente y reverso son DIFERENTES.\n\n' +
        'Son documentos de PERSONAS DIFERENTES.' + detalles,
        6000
      );
      return;
    }

    // CASO 5: Fecha de nacimiento no coincide
    if (msgLower.includes('fecha') && msgLower.includes('coincide')) {
      console.log('[WIZARD] Detectado: Fecha de nacimiento diferente');
      this.showNotification(
        'error',
        '❌ Fechas de Nacimiento No Coinciden',
        'La fecha de nacimiento del frente y reverso son DIFERENTES.\n\n' +
        'El documento podría estar adulterado. Verifica la validez del documento.',
        6000
      );
      return;
    }

    // CASO 6: Documento no legible (borroso, oscuro, etc)
    if (msgLower.includes('legible') || msgLower.includes('borrosa') || msgLower.includes('blur')) {
      console.log('[WIZARD] Detectado: Documento no legible');
      this.showNotification(
        'error',
        '❌ Documento No Legible',
        'La imagen está borrosa o muy poco clara.\n\n' +
        'Por favor, toma una foto más nítida y bien enfocada del documento.',
        6000
      );
      return;
    }

    // CASO 7: Error genérico de validación
    console.log('[WIZARD] Detectado: Error genérico de validación (400)');
    this.showNotification(
      'error',
      '❌ Validación Fallida',
      errorBody?.message || 'El documento no pudo ser validado. ' +
      'Verifica que la foto sea clara y los datos sean legibles.',
      6000
    );
  }

  /**
   * Manejo de errores 422 - Documento no procesable
   */
  private handleUnprocessableError422(errorMsg: string): void {
    console.log('[WIZARD] Error tipo 422 - Documento no procesable');
    this.showNotification(
      'error',
      '❌ Documento No Procesable',
      'El documento no puede ser procesado.\n\n' +
      'Asegúrate de que:\n' +
      '• La foto esté clara y bien iluminada\n' +
      '• Todo el documento sea visible\n' +
      '• El documento esté en buenas condiciones',
      6000
    );
  }

  validateConsistency() {
    this.isValidating = true;
    this.validationResult = null; // 🔄 Limpiar resultado anterior
    console.log('[WIZARD] Iniciando validación de consistencia...');

    this.ocrService.validateOcrData(this.datosFrente, this.datosReverso).subscribe({
      next: (res: any) => {
        console.log('[WIZARD] Respuesta de validación:', res);
        this.isValidating = false;

        // Determinar si la validación fue exitosa
        const isValid = res.valid === true || 
                        res.validation === true || 
                        res.message?.toLowerCase?.().includes('coinciden') ||
                        res.message?.toLowerCase?.().includes('válido');

        console.log('[WIZARD] ¿Validación exitosa?', isValid);

        if (isValid) {
          console.log('[WIZARD] ✅ Documentos válidos, combinando datos...');
          
          // PRIORIDAD AL ANVERSO: Reverso primero, luego Frente sobrescribe
          const combinedData = {
            ...this.datosReverso,
            ...this.datosFrente
          };
          
          console.log('[WIZARD] 🔀 Datos combinados (PRIORIDAD ANVERSO):', combinedData);
          this.validationResult = { 
            valid: true, 
            message: '✅ Documento válido - Los datos coinciden perfectamente' 
          };

          // Mostrar notificación de éxito
          this.showNotification(
            'success',
            '✅ Documento Validado',
            'Los datos del frente y reverso coinciden. Se pre-llenarán los campos automáticamente.',
            4000
          );

          this.patchForm(combinedData);
        } else {
          console.warn('[WIZARD] ⚠️ Validación falló:', res.message);
          this.validationResult = { 
            valid: false, 
            message: res.message || 'Los documentos no coinciden'
          };

          // Mostrar notificación de error
          this.showNotification(
            'error',
            '❌ Validación fallida',
            res.message || 'Los datos del frente y reverso no coinciden. Verifica que sea el mismo documento.',
            5000
          );
        }

        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error('[WIZARD] ❌ Error en validación:', err);
        
        const httpStatus = err.status;
        const errorBody = err.error;
        const errorMsg = ((errorBody?.message || '') + '').toLowerCase();

        this.isValidating = false;
        this.validationResult = { 
          valid: false, 
          message: errorBody?.message || 'Error en la validación'
        };

        // Manejo de errores específicos HTTP 400
        if (httpStatus === 400) {
          console.log('[WIZARD] Analizando error 400 (validateConsistency):', { errorMsg, errorBody });

          // CASO 1: CIs diferentes (mismo tipo)
          if (errorMsg.includes('número de cédula') && errorMsg.includes('coinciden')) {
            this.showNotification(
              'error',
              '❌ Números de Cédula Diferentes',
              'El frente y reverso son de documentos DIFERENTES.\n\n' +
              'Verifica que estés usando el MISMO carnet de identidad.',
              6000
            );
          }
          // CASO 2: Discrepancia en APELLIDO (Dual-format)
          else if (errorMsg.includes('discrepancia') && errorMsg.includes('apellido')) {
            const detalleMatch = errorBody?.message?.match(/APELLIDO NO COINCIDE:\s*"([^"]+)"\s+vs\s+"([^"]+)"/i);
            const detalles = detalleMatch ? `\n\nFrente: ${detalleMatch[1]}\nReverso: ${detalleMatch[2]}` : '';
            
            this.showNotification(
              'error',
              '❌ Apellidos No Coinciden',
              'El apellido del frente y reverso son DIFERENTES.\n\n' +
              'Son documentos de PERSONAS DIFERENTES.\n\n' +
              'Verifica que estés usando el MISMO documento de identidad.' + detalles,
              6000
            );
          }
          // CASO 3: Apellidos diferentes
          else if (errorMsg.includes('apellido') && errorMsg.includes('coincide')) {
            const apellidoMatch = (errorBody?.message || errorBody?.errors?.[0])?.match(/APELLIDO NO COINCIDE:\s*"([^"]+)"\s+vs\s+"([^"]+)"/i);
            const detalles = apellidoMatch ? `\n\nFrente: ${apellidoMatch[1]}\nReverso: ${apellidoMatch[2]}` : '';
            
            this.showNotification(
              'error',
              '❌ Apellidos No Coinciden',
              'El apellido del frente y reverso son DIFERENTES.\n\n' +
              'Usa el MISMO documento de identidad.' + detalles,
              6000
            );
          }
          // CASO 4: Nombres diferentes
          else if (errorMsg.includes('nombre') && errorMsg.includes('coincide')) {
            const nombreMatch = (errorBody?.message || errorBody?.errors?.[0])?.match(/NOMBRE NO COINCIDE:\s*"([^"]+)"\s+vs\s+"([^"]+)"/i);
            const detalles = nombreMatch ? `\n\nFrente: ${nombreMatch[1]}\nReverso: ${nombreMatch[2]}` : '';
            
            this.showNotification(
              'error',
              '❌ Nombres No Coinciden',
              'El nombre del frente y reverso son DIFERENTES.\n\n' +
              'Son documentos de PERSONAS DIFERENTES.' + detalles,
              6000
            );
          }
          // CASO 5: Fecha de nacimiento no coincide
          else if (errorMsg.includes('fecha') && errorMsg.includes('coincide')) {
            this.showNotification(
              'error',
              '❌ Fechas de Nacimiento No Coinciden',
              'La fecha de nacimiento del frente y reverso son DIFERENTES.\n\n' +
              'El documento podría estar adulterado. Verifica la validez del documento.',
              6000
            );
          }
          // CASO 6: Error genérico
          else {
            this.showNotification(
              'error',
              '❌ Validación Fallida',
              errorBody?.message || 'Los documentos no pudieron ser validados.',
              5000
            );
          }
        } 
        // HTTP 422: Documento no procesable
        else if (httpStatus === 422) {
          this.showNotification(
            'error',
            '❌ Documento No Procesable',
            'Asegúrate de que la foto esté clara, bien iluminada y el documento completo sea visible.',
            6000
          );
        }
        // HTTP 500: Error del servidor
        else if (httpStatus === 500) {
          this.showNotification(
            'error',
            '❌ Error del Servidor',
            'El servidor encontró un error. Por favor intenta de nuevo.',
            6000
          );
        }
        // Otros errores
        else {
          this.showNotification(
            'error',
            '❌ Error de Validación',
            errorBody?.message || 'No se pudieron validar los documentos. Intenta de nuevo.',
            5000
          );
        }

        this.cdr.markForCheck();
      }
    });
  }

  private patchForm(data: any) {
    if (!data) {
      console.warn('[WIZARD] ⚠️ Datos nulos, no se puede llenar formulario');
      return;
    }

    console.log('[WIZARD] 📝 Raw data recibido:', data);

    // Extraer los datos OCR - pueden estar en múltiples niveles
    let realData = data;
    if (data.ocr_data) {
      realData = data.ocr_data;
      console.log('[WIZARD] Datos extraídos de .ocr_data');
    } else if (data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
      realData = data.data;
      console.log('[WIZARD] Datos extraídos de .data');
    } else if (data.portha && Array.isArray(data.portha) && data.portha.length > 0) {
      realData = data.portha[0];
      console.log('[WIZARD] Datos extraídos de .portha[0]');
    } else if (data.datos_combinados && typeof data.datos_combinados === 'object' && !Array.isArray(data.datos_combinados)) {
      realData = data.datos_combinados;
      console.log('[WIZARD] Datos extraídos de .datos_combinados');
    }
    
    console.log('[WIZARD] 📝 Iniciando llenado de formulario con:', realData);

    let updated = false;

    // DNI / CÉDULA - Buscar en múltiples campos posibles
    const dni = realData.numero_cedula || 
                realData.numero_documento || 
                realData.dni || 
                realData.cedula || 
                realData.ci || 
                '';
    if (dni && String(dni).trim()) {
      const control = this.getControl('national_id');
      control.setValue(String(dni).trim().toUpperCase());
      control.setErrors(null);
      control.markAsDirty();
      console.log('[WIZARD] ✅ DNI actualizado:', dni);
      updated = true;
    } else {
      console.warn('[WIZARD] ⚠️ No se encontró DNI');
    }

    // FECHA DE NACIMIENTO
    const fecha = realData.fecha_nacimiento || 
                  realData.fecha_nac || 
                  realData.birth_date || 
                  '';
    if (fecha && String(fecha).trim()) {
      const parsedDate = this.parseOcrDate(String(fecha).trim());
      if (parsedDate) {
        const control = this.getControl('birth_date');
        control.setValue(parsedDate);
        control.setErrors(null);
        control.markAsDirty();
        console.log('[WIZARD] ✅ Fecha actualizada:', parsedDate);
        updated = true;
      } else {
        console.warn('[WIZARD] ⚠️ No se pudo parsear fecha:', fecha);
      }
    }

    // DIRECCIÓN / DOMICILIO
    const direccion = realData.domicilio || 
                      realData.direccion || 
                      realData.address || 
                      realData.current_address || 
                      '';
    if (direccion && String(direccion).trim()) {
      const addressControl = this.getControl('current_address');
      const addressValue = String(direccion).trim();
      addressControl.setValue(addressValue);
      addressControl.markAsDirty();
      console.log('[WIZARD] ✅ Dirección actualizada:', addressValue);
      updated = true;
    } else {
      console.warn('[WIZARD] ⚠️ No se encontró dirección en:', Object.keys(realData));
    }

    // ESTADO CIVIL
    const estado = realData.estado_civil || 
                   realData.marital_status || 
                   '';
    if (estado && String(estado).trim()) {
      const status = this.mapMaritalStatus(String(estado).trim());
      const statusControl = this.getControl('marital_status');
      if (statusControl) {
        statusControl.setValue(status);
        statusControl.markAsDirty();
        console.log('[WIZARD] ✅ Estado civil actualizado:', status);
        updated = true;
      }
    }

    // NOMBRE COMPLETO (puede venir como nombre_completo, primer_nombre + apellido_paterno, etc.)
    let fullName = realData.nombre_completo || 
                   realData.full_name || 
                   realData.nombre || 
                   '';
    
    // Si solo tenemos nombre y apellido, combinarlos
    if (!fullName && (realData.primer_nombre || realData.apellido_paterno)) {
      fullName = [realData.primer_nombre, realData.apellido_paterno]
        .filter(part => part && String(part).trim())
        .join(' ');
      console.log('[WIZARD] 🔀 Nombre combinado de primer_nombre + apellido_paterno:', fullName);
    }
    
    if (fullName && String(fullName).trim()) {
      const nameControl = this.getControl('full_name');
      nameControl.setValue(String(fullName).trim());
      nameControl.markAsDirty();
      console.log('[WIZARD] ✅ Nombre actualizado:', fullName);
      updated = true;
    }

    if (updated) {
      console.log('[WIZARD] ✅ Formulario actualizado exitosamente');
    } else {
      console.warn('[WIZARD] ⚠️ No se encontraron datos para llenar', {realData, keys: Object.keys(realData || {})});
    }

    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  /**
   * Mostrar notificación visual en lugar de alert()
   */
  private showNotification(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, duration = 4000): void {
    // Llamar función global si existe (desde NotificationToastComponent)
    if ((window as any).showNotification) {
      (window as any).showNotification(type, title, message, duration);
    } else {
      // Fallback a console si el componente no está inicializado
      console.warn(`[NOTIFICATION] ${type.toUpperCase()}: ${title} - ${message}`);
    }
  }

  private currentDate = new Date();

  private parseOcrDate(dateString: string): Date | null {
    if (!dateString || typeof dateString !== 'string') {
      console.warn('[WIZARD] Fecha inválida:', dateString);
      return null;
    }

    dateString = String(dateString).trim();

    // ISO format (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const date = new Date(dateString);
      console.log('[WIZARD] Fecha parseada (ISO):', dateString, '->', date);
      return date;
    }

    // Spanish format (DD/MM/YYYY)
    const spanishMatch = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (spanishMatch) {
      const [, day, month, year] = spanishMatch;
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      console.log('[WIZARD] Fecha parseada (ES):', dateString, '->', date);
      return date;
    }

    // Format DDMMYYYY or YYYYMMDD (sin separadores)
    const noSepMatch = dateString.match(/^(\d{8})$/);
    if (noSepMatch) {
      // Asumir YYYYMMDD
      if (dateString.substring(0, 4) > '1900' && dateString.substring(0, 4) < '2100') {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        console.log('[WIZARD] Fecha parseada (noSep):', dateString, '->', date);
        return date;
      }
    }

    console.warn('[WIZARD] ⚠️ Formato de fecha no reconocido:', dateString);
    return null;
  }

  private mapMaritalStatus(status: string): string {
    const normalized = String(status || '').toLowerCase().trim();
    
    const map: Record<string, string> = {
      'soltero': 'soltero',
      'soltera': 'soltero',
      'solteros': 'soltero',
      'single': 'soltero',
      'casado': 'casado',
      'casada': 'casado',
      'married': 'casado',
      'divorciado': 'divorciado',
      'divorciada': 'divorciado',
      'divorced': 'divorciado',
      'viudo': 'viudo',
      'viuda': 'viudo',
      'widowed': 'viudo',
      'union_libre': 'union_libre',
      'unión libre': 'union_libre',
      'without_status': 'soltero'
    };
    
    const result = map[normalized] || 'soltero';
    console.log('[WIZARD] Estado civil mapeado:', status, '->', result);
    return result;
  }
}
