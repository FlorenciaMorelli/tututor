import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const hasRoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const router = inject(Router);
  const expectedRole = route.data['role'];
  const userRole = localStorage.getItem('ROL');

  if(expectedRole === userRole) {
    console.log("Acceso permitido al rol: ", expectedRole);
    return true;
  } else {
    router.navigate(['forbidden']);
    return false;
  }
};
