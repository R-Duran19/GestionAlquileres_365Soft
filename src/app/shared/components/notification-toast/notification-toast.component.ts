import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-angular';
import { trigger, transition, style, animate, state } from '@angular/animations';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="notification-container">
      <div
        *ngFor="let notify of notifications"
        [@slideIn]
        [class]="'toast toast-' + notify.type"
      >
        <div class="toast-content">
          <div class="toast-icon">
            <lucide-icon
              *ngIf="notify.type === 'success'"
              [img]="CheckCircle2"
              [size]="24"
              class="icon-success"
            ></lucide-icon>
            <lucide-icon
              *ngIf="notify.type === 'error'"
              [img]="AlertCircle"
              [size]="24"
              class="icon-error"
            ></lucide-icon>
            <lucide-icon
              *ngIf="notify.type === 'warning'"
              [img]="AlertTriangle"
              [size]="24"
              class="icon-warning"
            ></lucide-icon>
            <lucide-icon
              *ngIf="notify.type === 'info'"
              [img]="Info"
              [size]="24"
              class="icon-info"
            ></lucide-icon>
          </div>

          <div class="toast-text">
            <p class="toast-title">{{ notify.title }}</p>
            <p class="toast-message">{{ notify.message }}</p>
          </div>

          <button
            class="toast-close"
            (click)="removeNotification(notify.id)"
            aria-label="Cerrar notificación"
          >
            <lucide-icon [img]="X" [size]="18"></lucide-icon>
          </button>
        </div>

        <!-- Progress bar for auto-dismiss -->
        <div
          *ngIf="notify.duration && notify.duration > 0"
          class="toast-progress"
          [style.animation]="'progress ' + (notify.duration / 1000) + 's linear forwards'"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 450px;
      pointer-events: none;
    }

    .toast {
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.3s ease-out;
      pointer-events: auto;
      backdrop-filter: blur(10px);
    }

    .toast-content {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      min-height: 80px;
    }

    .toast-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
    }

    .icon-success {
      color: #22c55e;
    }

    .icon-error {
      color: #ef4444;
    }

    .icon-warning {
      color: #f97316;
    }

    .icon-info {
      color: #3b82f6;
    }

    .toast-text {
      flex: 1;
    }

    .toast-title {
      margin: 0 0 4px;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.2;
    }

    .toast-message {
      margin: 0;
      font-size: 13px;
      font-weight: 400;
      line-height: 1.4;
      opacity: 0.9;
    }

    .toast-close {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      transition: opacity 0.2s;
      color: inherit;
    }

    .toast-close:hover {
      opacity: 1;
    }

    .toast-progress {
      height: 3px;
      background: currentColor;
      opacity: 0.5;
    }

    /* Success Toast */
    .toast-success {
      background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
      color: white;
    }

    .toast-success .icon-success {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Error Toast */
    .toast-error {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
    }

    .toast-error .icon-error {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Warning Toast */
    .toast-warning {
      background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
      color: white;
    }

    .toast-warning .icon-warning {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Info Toast */
    .toast-info {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
    }

    .toast-info .icon-info {
      background: rgba(255, 255, 255, 0.2);
    }

    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    @keyframes progress {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }

    @media (max-width: 640px) {
      .notification-container {
        left: 12px;
        right: 12px;
        max-width: none;
        top: 12px;
      }
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(400px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(400px)', opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationToastComponent implements OnInit {
  readonly AlertCircle = AlertCircle;
  readonly CheckCircle2 = CheckCircle2;
  readonly AlertTriangle = AlertTriangle;
  readonly Info = Info;
  readonly X = X;

  notifications: ToastNotification[] = [];

  constructor() {
    // Inyectar servicio de notificaciones globalmente
    this.initializeGlobalNotificationService();
  }

  ngOnInit() {
    // Registrarse globalmente para recibir notificaciones
  }

  private initializeGlobalNotificationService() {
    // Hacer disponible en window para uso global
    (window as any).showNotification = (type: string, title: string, message: string, duration?: number) => {
      this.show(type as any, title, message, duration);
    };
  }

  show(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, duration = 4000) {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const notification: ToastNotification = { id, type, title, message, duration };

    this.notifications.push(notification);

    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, duration);
    }
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}
