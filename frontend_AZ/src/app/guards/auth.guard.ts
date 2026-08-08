import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usuario = sessionStorage.getItem('usuario');
  if(usuario){
    return true;
  }
  router.navigate(['/']);
  return false;
};