import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../services/helper.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const helperService = inject(HelperService)
  const token = localStorage.getItem('token')
  if(token !== null){
    return true
  }else {
    helperService.openSnackBar(`Unauthorized` , 2000)
    router.navigateByUrl('/login')
    return false
  }
};
