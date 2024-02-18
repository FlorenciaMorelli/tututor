import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DashboardAlumnosComponent } from './pages/dashboard-alumnos/dashboard-alumnos.component';
import { DashboardProfesoresComponent } from './pages/dashboard-profesores/dashboard-profesores.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';
import { AdminAlumnosComponent } from './pages/admin-alumnos/admin-alumnos.component';
import { AdminProfesoresComponent } from './pages/admin-profesores/admin-profesores.component';
import { AdminMateriasComponent } from './pages/admin-materias/admin-materias.component';

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
    {
        path: 'buscar',
        component: SearchComponent
    },
    {
        path: 'adminUsuarios',
        component: AdminUsuariosComponent
    },
    {
        path: 'adminAlumnos',
        component: AdminAlumnosComponent
    },
    {
        path: 'adminProfesores',
        component: AdminProfesoresComponent
    },
    {
        path: 'adminMaterias',
        component: AdminMateriasComponent
    }
];