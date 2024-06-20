import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { APIConstants } from '../constants/APIConstants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiService = inject(ApiService)
  public getAllProductURL = `${environment.API_HOST}/${APIConstants.ROUTES.PRODUCT_ROUTE_PREFIX}/getProductInventory`

  constructor() { }

  getProductInventory(){
    return this.apiService.get(this.getAllProductURL)
  }
}
