import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';

export const customHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const token = localStorage.getItem('token')
  if(token){
    const cloneReq = req.clone({
      setHeaders : {
        'Authorization' : `Bearer ${token}`
      }
    })
    return next(cloneReq).pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status === 401 && error.error.message.includes('TokenExpired')){
          router.navigateByUrl('/login')
        }
        return throwError(()=> error)
      })
    );
  }

  return next(req)

};
