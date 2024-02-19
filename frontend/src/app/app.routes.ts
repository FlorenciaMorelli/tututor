import { Routes } from '@angular/router';
import { InicioComponent } from './layouts/inicio/inicio.component';
import { DashboardAlumnosComponent } from './layouts/dashboard-alumnos/dashboard-alumnos.component';
import { DashboardProfesoresComponent } from './layouts/dashboard-profesores/dashboard-profesores.component';
import { DashboardAdminComponent } from './layouts/dashboard-admin/dashboard-admin.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path:'dashboardAlumnos', component: DashboardAlumnosComponent},
    {path:'dashboardProfesores', component: DashboardProfesoresComponent},
    {path:'dashboardAdmin', component: DashboardAdminComponent},
];