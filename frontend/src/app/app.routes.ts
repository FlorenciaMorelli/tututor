import { Routes } from '@angular/router';
import { InicioComponent } from './layouts/inicio/inicio.component';
import { DashboardAlumnosComponent } from './layouts/dashboard-alumnos/dashboard-alumnos.component';
import { DashboardProfesoresComponent } from './layouts/dashboard-profesores/dashboard-profesores.component';
import { DashboardAdminComponent } from './layouts/dashboard-admin/dashboard-admin.component';
import { hasRoleGuard } from './guards/has-role.guard';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'dashboardAlumnos', component: DashboardAlumnosComponent, canActivate: [hasRoleGuard], data: { role: 'alumno' } },
    { path: 'dashboardProfesores', component: DashboardProfesoresComponent, canActivate: [hasRoleGuard], data: { role: 'profesor' } },
    { path: 'dashboardAdmin', component: DashboardAdminComponent, canActivate: [hasRoleGuard], data: { role: 'admin' } },
    { path: 'forbidden', component: ForbiddenComponent}
];