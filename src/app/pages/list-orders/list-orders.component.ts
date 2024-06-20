import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartManagementService } from '../../core/services/cart-management.service';
import { MatTableModule } from '@angular/material/table';
import { OrderService } from '../../core/services/order.service';
import { HelperService } from '../../core/services/helper.service';
@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent  implements OnInit{
    cols = 3; // Adjust grid layout columns as ne
    orders:any = []
    private cartService = inject(CartManagementService)
    private orderService = inject(OrderService)
    private helperService = inject(HelperService)
    displayedColumns: string[] = ['orderId' , 'orderDate' , 'orderTotal' , 'paymentStatus'];
    constructor(){

    }
    ngOnInit(): void {
      this.getOrdersFromBackend()
    }

    getOrdersFromBackend(){
      this.orderService.getAllOrders().subscribe({
        next : (response:any)=>{
          console.log("Response from get all orders", response)
          this.orders = response.data.map((item:any)=>{
            return {
              orderId : item._id, 
              orderDate : new Date(item.placed_at),
              totalPrice : item.total_price,
              paymentStatus : item.payment_status
            }
          })
        },
        error:(error:any)=>{
          console.error('API error:', error);
          if (!error.status) {
            this.helperService.openSnackBar(`Internal Server Error!!`)
          }
          if (error && error.error && error.error.message) {
            this.helperService.openSnackBar(`${error.error.message}`)
          }
        },
        complete: ()=>{
        }
      })
    }
}
