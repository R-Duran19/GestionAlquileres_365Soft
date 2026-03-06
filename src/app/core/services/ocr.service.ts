import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentType } from '../models/application.model';

export interface OcrResponse {
  message: string;
  paths: string[];
  datos_combinados?: any;
  ocr_data?: any; // Añadido para compatibilidad con la integración del wizard
}

export interface OcrValidationResponse {
  valid: boolean;
  cedula_valida?: boolean;
  message?: string;
  errors?: string[];
  data?: any;
  datos_combinados?: any;
  validacion?: {
    valid: boolean;
    matches: {
      numero_cedula: boolean;
      fecha_nacimiento: boolean;
    };
    warnings: string[];
    errors: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private http = inject(HttpClient);
  private readonly BACKEND_URL = 'http://localhost:3000';

  /**
   * Upload documents and process them with OCR
   * Uses direct HttpClient to bypass the slug prefix issue
   */
  uploadAndProcess(file: File, type: 'cedula_frente' | 'cedula_reverso' | string): Observable<OcrResponse> {
    const formData = new FormData();
    // Ajustado según el error 400: El backend espera "archivos" como clave única para el archivo, no array.
    formData.append('archivos', file); 
    formData.append('tipo_documento', type);
    formData.append('terreno_id', '1'); 

    console.log('[OCR-SERVICE] Enviando petición POST a /documentos/store');
    console.log('[OCR-SERVICE] FormData enviada:', {
      clave_archivo: 'archivos',
      tipo: type,
      file: file.name
    });

    return this.http.post<OcrResponse>(
      `${this.BACKEND_URL}/documentos/store`, 
      formData
    );
  }

  /**
   * Validate front and back data consistency
   */
  validateOcrData(frontData: any, backData: any): Observable<OcrValidationResponse> {
    // Si el backend espera 'frente' y 'reverso' directamente como objetos de datos OCR
    const payload = { 
      frente: frontData, 
      reverso: backData 
    };
    
    console.log('[OCR-SERVICE] Enviando validación cruzada:', payload);

    return this.http.post<OcrValidationResponse>(
      `${this.BACKEND_URL}/documentos/validate`,
      payload
    );
  }

  /**
   * List documents for a specific entity
   */
  listByEntity(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.BACKEND_URL}/documentos/terreno/${id}`);
  }

  /**
   * Delete a document
   */
  deleteDocument(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.BACKEND_URL}/documentos/${id}`);
  }
}
