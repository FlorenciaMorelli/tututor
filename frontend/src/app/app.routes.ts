import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DashboardAlumnosComponent } from './pages/dashboard-alumnos/dashboard-alumnos.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'dashboardAlumno',
        component: DashboardAlumnosComponent
    }
];