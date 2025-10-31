import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If the user is logged in, allow access to the page
  if (authService.isLoggedIn()) {
    return true;
  }

  // If not logged in, redirect them back to the login page
  router.navigate(['/login']);
  return false;
};