import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DashboardAlumnosComponent } from './pages/dashboard-alumnos/dashboard-alumnos.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'dashboardAlumno',
        component: DashboardAlumnosComponent
    },
    {
        path: 'buscar',
        component: SearchComponent
    }
];