import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isSetup } from '../helpers';

export const requireSetupGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (isSetup()) {
    return true;
  }

  router.navigate(['/game/setup']);
  return false;
};
