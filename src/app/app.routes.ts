import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/features/shared/layouts/main-layotu';
import { DashboardPageComponent } from './core/features/dashboard/dashboard-page/dashboard-page';
import { PropiedadListaComponent } from './core/features/propiedades/propiedad-lista/propiedad-lista';
import { InquilinoListaComponent } from './core/features/inquilinos/inquilino-lista/inquilino-lista';
import { ContratoListaComponent } from './core/features/contratos/contrato-lista/contrato-lista';
import { PagoListaComponent } from './core/features/pagos/pago-lista/pago-lista';
import { MantenimientoListaComponent } from './core/features/mantenimiento/mantenimiento-lista/mantenimiento-lista';
import { InquilinoFormComponent } from './core/features/inquilinos/inquilino-form/inquilino-form';
import { ContratoFormComponent } from './core/features/contratos/contrato-form/contrato-form';
import { PagoFormComponent } from './core/features/pagos/pago-form/pago-form';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent,
          
      },
      {
        path: 'propiedades',
        component: PropiedadListaComponent,
          
      },
      {
        path: 'inquilinos',
        component: InquilinoListaComponent,
          
      },
      {
        path: 'inquilinos/nuevos',
        component: InquilinoFormComponent,
      },
      {
        path: 'inquilinos/editar',
        component: InquilinoFormComponent,
      },
      {
        path: 'contratos',
        component: ContratoListaComponent,
          
      },
      {
        path: 'contratos/nuevos',
        component: ContratoFormComponent
      },
      {
        path: 'pagos',
        component: PagoListaComponent,
          
      },
      {
        path: 'pagos/editar',
        component: PagoFormComponent
      },
      {
        path: 'pagos/nuevos',
        component: PagoFormComponent
      },
      {
        path: 'mantenimiento',
        component: MantenimientoListaComponent,
          
      },
      {
        path: 'mantenimiento/nuevos',
        component: MantenimientoListaComponent
      },
      {
        path: 'mantenimiento/editar',
        component: MantenimientoListaComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  // Aquí luego agregaremos las rutas de login/register
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];