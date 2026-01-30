import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule,  BaseChartDirective, RouterLink],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.scss']
})
export class DashboardPageComponent implements OnInit {
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Gráfico de Línea - Ingresos Mensuales
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [6500, 5900, 8000, 8100, 8600, 9250, 12450],
        label: 'Ingresos',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        borderColor: '#0d6efd',
        pointBackgroundColor: '#0d6efd',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0d6efd',
        fill: 'origin',
        tension: 0.4
      }
    ],
    labels: ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  };

  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context: any) {
            return 'Ingresos: $' + context.parsed?.y;
          }
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';

  // Gráfico de Dona - Estado de Propiedades
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Ocupadas', 'Disponibles', 'Mantenimiento'],
    datasets: [
      {
        data: [10, 3, 2],
        backgroundColor: [
          '#198754',
          '#0dcaf0',
          '#ffc107'
        ],
        hoverBackgroundColor: [
          '#157347',
          '#0bacd6',
          '#ffca2c'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      }
    }
  };

  public doughnutChartType: ChartType = 'doughnut';

  // Datos para Actividad Reciente
  actividadesRecientes = [
    {
      titulo: 'Pago recibido',
      descripcion: 'María González pagó el alquiler de Enero',
      detalle: 'Apartamento Centro - $450',
      fecha: 'Hace 2 horas',
      icon: 'bi bi-cash-coin',
      iconClass: 'bg-success text-white'
    },
    {
      titulo: 'Nuevo contrato',
      descripcion: 'Contrato firmado con Carlos Rodríguez',
      detalle: 'Casa Jardines - 12 meses',
      fecha: 'Ayer',
      icon: 'bi bi-file-earmark-text',
      iconClass: 'bg-primary text-white'
    },
    {
      titulo: 'Mantenimiento reportado',
      descripcion: 'Fuga de agua en Townhouse Moderno',
      detalle: 'Prioridad: ALTA - Asignado a Juan Pérez',
      fecha: 'Hace 2 días',
      icon: 'bi bi-tools',
      iconClass: 'bg-warning text-white'
    },
    {
      titulo: 'Propiedad disponible',
      descripcion: 'Oficina Corporativa ahora está disponible',
      detalle: 'Publicada en portales inmobiliarios',
      fecha: 'Hace 3 días',
      icon: 'bi bi-house',
      iconClass: 'bg-info text-white'
    },
    {
      titulo: 'Recordatorio de pago',
      descripcion: 'Enviado a inquilinos con pagos pendientes',
      detalle: '3 inquilinos notificados',
      fecha: 'Hace 4 días',
      icon: 'bi bi-bell',
      iconClass: 'bg-secondary text-white'
    }
  ];

  // Datos para Próximos Vencimientos
  vencimientosProximos = [
    {
      fecha: '15 Feb 2024',
      dias: 7,
      descripcion: 'Alquiler - Apartamento Centro',
      detalle: 'Juan Pérez',
      monto: 450,
      estado: 'Por vencer',
      estadoClass: 'badge bg-warning'
    },
    {
      fecha: '20 Feb 2024',
      dias: 12,
      descripcion: 'Contrato - Casa Jardines',
      detalle: 'Renovación automática',
      monto: 750,
      estado: 'Próximo',
      estadoClass: 'badge bg-info'
    },
    {
      fecha: '28 Feb 2024',
      dias: 20,
      descripcion: 'Impuesto municipal',
      detalle: 'Propiedad: Local Comercial',
      monto: 320,
      estado: 'Pendiente',
      estadoClass: 'badge bg-secondary'
    },
    {
      fecha: '5 Mar 2024',
      dias: 25,
      descripcion: 'Seguro de propiedad',
      detalle: 'Renovación anual',
      monto: 650,
      estado: 'Programado',
      estadoClass: 'badge bg-primary'
    }
  ];

  // Datos para Top Propiedades
  topPropiedades = [
    {
      nombre: 'Oficina Corporativa',
      direccion: 'Av. Empresarial 654',
      ingreso: 1800,
      ocupacion: 100,
      rendimiento: 15,
      rendimientoIcon: 'bi bi-arrow-up-right',
      rendimientoClass: 'text-success'
    },
    {
      nombre: 'Local Comercial Plaza',
      direccion: 'Av. Comercial 789',
      ingreso: 1200,
      ocupacion: 90,
      rendimiento: 8,
      rendimientoIcon: 'bi bi-arrow-up-right',
      rendimientoClass: 'text-success'
    },
    {
      nombre: 'Casa Jardines',
      direccion: 'Calle Flores 456',
      ingreso: 750,
      ocupacion: 85,
      rendimiento: 5,
      rendimientoIcon: 'bi bi-arrow-up-right',
      rendimientoClass: 'text-success'
    },
    {
      nombre: 'Townhouse Moderno',
      direccion: 'Calle Nueva 321',
      ingreso: 950,
      ocupacion: 70,
      rendimiento: -2,
      rendimientoIcon: 'bi bi-arrow-down-right',
      rendimientoClass: 'text-danger'
    }
  ];

  // Métricas de Performance
  metricasPerformance = [
    {
      titulo: 'Tasa de Ocupación',
      descripcion: 'Promedio mensual',
      valor: '85%',
      variacion: '+5.2%',
      icon: 'bi bi-house-door',
      iconClass: 'bg-primary bg-opacity-10 text-primary',
      tendenciaIcon: 'bi bi-arrow-up-right',
      tendenciaClass: 'text-success'
    },
    {
      titulo: 'Retraso en Pagos',
      descripcion: 'Promedio días',
      valor: '4.2',
      variacion: '-1.8',
      icon: 'bi bi-clock',
      iconClass: 'bg-danger bg-opacity-10 text-danger',
      tendenciaIcon: 'bi bi-arrow-down-right',
      tendenciaClass: 'text-success'
    },
    {
      titulo: 'Satisfacción',
      descripcion: 'Calificación inquilinos',
      valor: '4.7/5',
      variacion: '+0.3',
      icon: 'bi bi-star',
      iconClass: 'bg-warning bg-opacity-10 text-warning',
      tendenciaIcon: 'bi bi-arrow-up-right',
      tendenciaClass: 'text-success'
    },
    {
      titulo: 'Costo Mantenimiento',
      descripcion: 'Por propiedad/mes',
      valor: '$120',
      variacion: '+$15',
      icon: 'bi bi-tools',
      iconClass: 'bg-info bg-opacity-10 text-info',
      tendenciaIcon: 'bi bi-arrow-up-right',
      tendenciaClass: 'text-danger'
    }
  ];

  ngOnInit(): void {
    // Aquí podríamos cargar datos reales de una API
    console.log('Dashboard inicializado');
  }

  // Eventos de gráficos (opcional)
  public chartClicked({ event, active }: { event?: ChartEvent, active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: object[] }): void {
    console.log(event, active);
  }
}