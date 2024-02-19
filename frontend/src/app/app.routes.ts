import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DashboardAlumnosComponent } from './pages/dashboard-alumnos/dashboard-alumnos.component';
import { DashboardProfesoresComponent } from './pages/dashboard-profesores/dashboard-profesores.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { SearchAlumnosComponent } from './pages/search-alumnos/search-alumnos.component';
import { ResenasAlumnosComponent } from './pages/resenas-alumnos/resenas-alumnos.component';
import { PerfilAlumnosComponent } from './pages/perfil-alumnos/perfil-alumnos.component';
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
        path: 'buscarProfesores',
        component: SearchAlumnosComponent
    },
    {
        path: 'resenasAlumnos',
        component: ResenasAlumnosComponent
    },
    {
        path: 'perfilAlumnos',
        component: PerfilAlumnosComponent
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