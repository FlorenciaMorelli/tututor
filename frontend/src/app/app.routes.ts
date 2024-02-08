import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    /* {
        path: '',
        component: AppComponent
    }, */
    {
        path: 'login',
        component: LoginFormComponent
    }
];
