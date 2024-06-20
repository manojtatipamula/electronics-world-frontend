import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { APIConstants } from '../constants/APIConstants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiService = inject(ApiService)
  public createOrderURL = `${environment.API_HOST}/${APIConstants.ROUTES.ORDER_ROUTE_PREFIX}/createOrder`
  public getAllOrdersURL = `${environment.API_HOST}/${APIConstants.ROUTES.ORDER_ROUTE_PREFIX}/getAllOrders`
  public updateOrderURL = `${environment.API_HOST}/${APIConstants.ROUTES.ORDER_ROUTE_PREFIX}/updateOrder`

  constructor() { }

  createOrder(payload:any){
    return this.apiService.post(this.createOrderURL , payload)
  }
  getAllOrders (){
    return this.apiService.get(this.getAllOrdersURL)
  }
  updateOrder(orderId:any, payload:any){
    return this.apiService.put(`${this.updateOrderURL}/${orderId}` , payload)
  }
}
