import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'login',
        component: LoginFormComponent
    }
];