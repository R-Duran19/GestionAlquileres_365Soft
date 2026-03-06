import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../core/services/application.service';
import { AuthService } from '../../../core/services/auth.service';
import { SlugService } from '../../../core/services/slug.service';
import { OcrService } from '../../../core/services/ocr.service';
import {
  CreateApplicationDto,
  PersonalData,
  EmploymentData,
  RentalHistory,
  References,
  MaritalStatus,
  EmploymentType,
  DocumentType
} from '../../../core/models/application.model';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private applicationService = inject(ApplicationService);
  private authService = inject(AuthService);
  private slugService = inject(SlugService);
  private ocrService = inject(OcrService);
  private cdr = inject(ChangeDetectorRef);

  private readonly FORM_DATA_KEY = 'pending_application_form';

  propertyId: number = 0;
  submitting = false;
  submitSuccess = false;
  
  // OCR Multi-step states
  processingOcrFront = false;
  processingOcrBack = false;
  isValidating = false;
  
  datosFrente: any = null;
  datosReverso: any = null;
  validationResult: any = null;
  
  error: string | null = null;
  ocrMessage: string | null = null;

  // Options for selects
  maritalStatuses = Object.values(MaritalStatus);
  employmentTypes = Object.values(EmploymentType);
  documentTypes = Object.values(DocumentType);

  // Form data
  formData: CreateApplicationDto = {
    property_id: 0,
    personal_data: this.getEmptyPersonalData(),
    employment_data: this.getEmptyEmploymentData(),
    rental_history: [],
    references: {
      personal: [],
      professional: []
    },
    documents: [],
    additional_notes: ''
  };

  ngOnInit(): void {
    console.log('📝 ApplicationFormComponent - ngOnInit iniciado');
    console.log('📍 Ruta actual:', this.route.snapshot);

    // Check if returning from login with pending form data
    this.route.queryParamMap.subscribe(params => {
      const restoreForm = params.get('restoreForm');
      if (restoreForm === 'true') {
        console.log('🔄 Restaurando formulario después del login');
        this.restoreFormData();
      }
    });

    // Get property ID from route params or query params
    this.route.paramMap.subscribe(params => {
      const id = params.get('propertyId');
      console.log('🔍 PropertyId de params:', id);
      if (id) {
        this.propertyId = Number(id);
        this.formData.property_id = this.propertyId;
        console.log('✅ PropertyId establecido:', this.propertyId);
      }
    });

    this.route.queryParamMap.subscribe(params => {
      const id = params.get('propertyId');
      console.log('🔍 PropertyId de query params:', id);
      if (id && !this.propertyId) {
        this.propertyId = Number(id);
        this.formData.property_id = this.propertyId;
        console.log('✅ PropertyId establecido desde query:', this.propertyId);
      }
    });

    // If no property ID, redirect to properties list
    if (!this.propertyId) {
      console.warn('⚠️ No propertyId encontrado, redirigiendo a propiedades');
      this.router.navigate(['../../propiedades'], { relativeTo: this.route });
    } else {
      console.log('✅ Formulario listo con propertyId:', this.propertyId);
    }
  }

  // Personal Data Methods
  getEmptyPersonalData(): PersonalData {
    return {
      full_name: '',
      phone: '',
      email: '',
      birth_date: '',
      national_id: '',
      marital_status: MaritalStatus.SOLTERO,
      number_of_dependents: 0,
      social_media: {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
      }
    };
  }

  // Document Upload and OCR Methods
  onFileSelected(event: any, side: 'frente' | 'reverso'): void {
    const file = event.target.files[0];
    if (!file) return;

    this.error = null;
    this.processOcr(file, side);
  }

  processOcr(file: File, side: 'frente' | 'reverso'): void {
    if (side === 'frente') this.processingOcrFront = true;
    else this.processingOcrBack = true;
    
    this.error = null;
    this.validationResult = null;

    this.ocrService.uploadAndProcess(file, `cedula_${side}`).subscribe({
      next: (response) => {
        setTimeout(() => {
          if (side === 'frente') {
            this.processingOcrFront = false;
            this.datosFrente = response.ocr_data || response.datos_combinados;
            if (this.datosFrente) this.fillFormWithOcrData(this.datosFrente);
          } else {
            this.processingOcrBack = false;
            this.datosReverso = response.ocr_data || response.datos_combinados;
            if (this.datosReverso) this.fillFormWithReversoData(this.datosReverso);
          }

          // Guardamos el documento en el listado para enviar
          if (response.paths && response.paths.length > 0) {
            this.formData.documents?.push({
              type: side === 'frente' ? DocumentType.CEDULA_IDENTIDAD : DocumentType.OTRO,
              url: response.paths[0],
              ocr_data: response.ocr_data || response.datos_combinados,
              ocr_status: 'procesado'
            });
          }

          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => {
        setTimeout(() => {
          this.processingOcrFront = false;
          this.processingOcrBack = false;
          this.error = 'Error al procesar el OCR.';
          console.error('OCR Error:', err);
          this.cdr.detectChanges();
        }, 0);
      }
    });
  }

  validateConsistency(): void {
    if (!this.datosFrente || !this.datosReverso) return;
    
    this.isValidating = true;
    this.ocrService.validateOcrData(this.datosFrente, this.datosReverso).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.validationResult = res;
          this.isValidating = false;
          this.cdr.detectChanges();
        }, 0);
      },
      error: () => {
        this.isValidating = false;
        this.cdr.detectChanges();
      }
    });
  }

  fillFormWithOcrData(data: any): void {
    if (data.primer_nombre && data.apellido_paterno) {
      this.formData.personal_data.full_name = `${data.primer_nombre} ${data.apellido_paterno} ${data.apellido_materno || ''}`.trim();
    }
    if (data.numero_cedula) {
      this.formData.personal_data.national_id = data.numero_cedula;
    }
    if (data.fecha_nacimiento) {
      const parts = data.fecha_nacimiento.split('/');
      if (parts.length === 3) {
        this.formData.personal_data.birth_date = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
  }

  fillFormWithReversoData(data: any): void {
    if (data.estado_civil) {
      // Intentamos mapear estado civil
      const status = data.estado_civil.toLowerCase();
      if (status.includes('soltero')) this.formData.personal_data.marital_status = MaritalStatus.SOLTERO;
      else if (status.includes('casado')) this.formData.personal_data.marital_status = MaritalStatus.CASADO;
    }
    if (data.profesion) {
      this.formData.personal_data.profession = data.profesion;
    }
    if (data.domicilio) {
      this.formData.personal_data.current_residence = data.domicilio;
    }
  }

  // Employment Data Methods
  getEmptyEmploymentData(): EmploymentData {
    return {
      current_job: {
        company: '',
        position: '',
        salary: 0,
        currency: 'BOB',
        start_date: '',
        employment_type: EmploymentType.TIEMPO_COMPLETO,
        supervisor_name: '',
        supervisor_phone: ''
      }
    };
  }

  // Rental History Methods
  addRentalHistory(): void {
    this.formData.rental_history.push({
      property_address: '',
      landlord_name: '',
      landlord_phone: '',
      monthly_rent: 0,
      start_date: '',
      end_date: '',
      reason_for_leaving: ''
    });
  }

  removeRentalHistory(index: number): void {
    this.formData.rental_history.splice(index, 1);
  }

  // References Methods
  addPersonalReference(): void {
    this.formData.references.personal.push({
      name: '',
      relationship: '',
      phone: '',
      email: ''
    });
  }

  removePersonalReference(index: number): void {
    this.formData.references.personal.splice(index, 1);
  }

  addProfessionalReference(): void {
    this.formData.references.professional.push({
      name: '',
      company: '',
      position: '',
      phone: '',
      email: ''
    });
  }

  removeProfessionalReference(index: number): void {
    this.formData.references.professional.splice(index, 1);
  }

  // Getter for previous job to handle optional chaining in template
  get previousJob() {
    return this.formData.employment_data.previous_job || {
      company: '',
      position: '',
      salary: 0,
      end_date: ''
    };
  }

  // Submit
  onSubmit(): void {
    // Validate all sections
    if (!this.validatePersonalData() || !this.validateEmploymentData() || !this.validateReferences()) {
      return;
    }

    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      console.log('🔒 Usuario no autenticado, guardando formulario y redirigiendo a login');
      this.saveFormData();
      this.redirectToLogin();
      return;
    }

    this.submitting = true;
    this.error = null;

    this.applicationService.createApplication(this.formData).subscribe({
      next: (response) => {
        this.submitSuccess = true;
        this.submitting = false;

        // Clear saved form data
        this.clearSavedFormData();

        // Redirect to login/register after showing success message
        setTimeout(() => {
          this.router.navigate(['../../registro'], {
            relativeTo: this.route,
            queryParams: { application: 'success', applicationId: response.id }
          });
        }, 3000);
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Error al enviar la solicitud. Por favor intenta nuevamente.';
        this.submitting = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  cancel(): void {
    if (confirm('¿Estás seguro de cancelar? Se perderán todos los datos ingresados.')) {
      this.clearSavedFormData();
      this.router.navigate(['../../propiedades'], { relativeTo: this.route });
    }
  }

  // Save form data to localStorage
  private saveFormData(): void {
    try {
      const dataToSave = {
        formData: this.formData,
        propertyId: this.propertyId,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.FORM_DATA_KEY, JSON.stringify(dataToSave));
      console.log('💾 Datos del formulario guardados en localStorage');
    } catch (error) {
      console.error('Error al guardar formulario:', error);
    }
  }

  // Restore form data from localStorage
  private restoreFormData(): void {
    try {
      const savedData = localStorage.getItem(this.FORM_DATA_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        console.log('📥 Restaurando datos guardados:', parsed);

        this.formData = parsed.formData;
        this.propertyId = parsed.propertyId;

        // Clear after restoring
        this.clearSavedFormData();

        // Auto-submit after restoring
        console.log('🚀 Enviando formulario automáticamente después del login');
        setTimeout(() => {
          this.onSubmit();
        }, 500);
      }
    } catch (error) {
      console.error('Error al restaurar formulario:', error);
      this.clearSavedFormData();
    }
  }

  // Clear saved form data
  private clearSavedFormData(): void {
    try {
      localStorage.removeItem(this.FORM_DATA_KEY);
      console.log('🗑️ Datos guardados eliminados');
    } catch (error) {
      console.error('Error al limpiar formulario:', error);
    }
  }

  // Redirect to login with return URL
  private redirectToLogin(): void {
    const slug = this.slugService.getSlug();
    const currentUrl = this.router.url.split('?')[0]; // Remove query params

    // Build login URL with return URL
    const loginUrl = `/${slug}/login?returnUrl=${encodeURIComponent(currentUrl + '?restoreForm=true')}`;

    console.log('🔐 Redirigiendo a login:', loginUrl);
    this.router.navigateByUrl(loginUrl);
  }

  // Validation Methods
  validatePersonalData(): boolean {
    // Si hay datos de OCR o la intención es buena, no bloqueamos rígidamente
    const pd = this.formData.personal_data;
    if (!pd.full_name || !pd.national_id) {
      this.error = 'Por favor completa al menos Nombre y Cédula para continuar.';
      return false;
    }
    this.error = null;
    return true;
  }

  validateEmploymentData(): boolean {
    // Reducimos la rigidez para pruebas
    const cj = this.formData.employment_data.current_job;
    if (!cj.company || !cj.position) {
      this.error = 'Por favor completa la información básica de tu empleo.';
      return false;
    }
    this.error = null;
    return true;
  }

  validateReferences(): boolean {
    const refs = this.formData.references;
    if (refs.personal.length === 0 && refs.professional.length === 0) {
      this.error = 'Por favor agrega al menos una referencia (personal o profesional)';
      return false;
    }

    // Validate that all references have required fields
    for (const ref of refs.personal) {
      if (!ref.name || !ref.relationship || !ref.phone) {
        this.error = 'Por favor completa todos los campos de las referencias personales';
        return false;
      }
    }

    for (const ref of refs.professional) {
      if (!ref.name || !ref.company || !ref.position || !ref.phone) {
        this.error = 'Por favor completa todos los campos de las referencias profesionales';
        return false;
      }
    }

    this.error = null;
    return true;
  }
}
