import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DashboardAlumnosComponent } from './pages/dashboard-alumnos/dashboard-alumnos.component';
import { DashboardProfesoresComponent } from './pages/dashboard-profesores/dashboard-profesores.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path:'dashboardAlumnos',
        component: DashboardAlumnosComponent
    },
    {
        path:'dashboardProfesores',
        component: DashboardProfesoresComponent
    },
    {
        path:'dashboardAdmin',
        component: DashboardAdminComponent
    },
        path: 'buscar',
        component: SearchComponent
    }
];