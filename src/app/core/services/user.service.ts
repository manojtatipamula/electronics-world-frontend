import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { IloginPayload } from '../models/interfaces/userInterface';
import { environment } from '../../../environments/environment';
import { APIConstants } from '../constants/APIConstants';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiService = inject(ApiService)
  private router = inject(Router)
  private helperService = inject(HelperService)
  public loginURL = `${environment.API_HOST}/${APIConstants.ROUTES.USER_ROUTE_PREFIX}/login`
  public registerURL = `${environment.API_HOST}/${APIConstants.ROUTES.USER_ROUTE_PREFIX}/register`
  public getAllUsersURL = `${environment.API_HOST}/${APIConstants.ROUTES.USER_ROUTE_PREFIX}/getUsers`
  public refreshToken = new Subject<boolean>;

  constructor() {
    this.refreshToken.subscribe(({
      next: (response:any) =>{
        // this.refreshTokenFromBackend()
      }
    }))
   }


  login(payload: IloginPayload){
    return this.apiService.post(this.loginURL, payload)
  }
  register(payload:any){
    return this.apiService.post(this.registerURL, payload)

  }
  getAllUsers() {
    return this.apiService.get(this.getAllUsersURL)
  }

  refreshTokenFromBackend(){
    this.helperService.openSnackBar(`Your token is expired, Please login again` , 3000)
    this.router.navigateByUrl("/login")
  }

}
