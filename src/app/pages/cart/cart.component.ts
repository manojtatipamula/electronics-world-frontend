import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CartManagementService } from '../../core/services/cart-management.service';
import { MatTableModule } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AddressComponent } from '../address/address.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HelperService } from '../../core/services/helper.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    AddressComponent,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cols = 2; // Adjust grid layout columns as ne
  cartItems: any = []
  private cartService = inject(CartManagementService)
  private helperService = inject(HelperService)
  private orderService = inject(OrderService)

  subTotal = 0
  estimatedTax = 0
  grandTotal = 0
  estimatedTaxPercentage = 5

  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal'];
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.HandsetLandscape] || result.breakpoints[Breakpoints.TabletPortrait] || result.breakpoints[Breakpoints.TabletLandscape]) {
          this.cols = 2;
        } else {
          this.cols = 2;
        }
      }
    });
  }
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems()
    this.calculatePrices()
  }

  registerDependencies() {
    this.cartService.$cartItems.subscribe({
      next: (data: any) => {
        console.log("ListOrdersComponent:", data)
      }, error: (error) => {
        console.error("ListOrdersComponent: error", error)
      }, complete: () => {
        console.log("ListOrdersComponent: complete")
      }
    })
  }
  onQuantityChange(product: any, changeParam: any) {
    console.log("quantity change triffer", product)
    if (changeParam === -1) {
      if (product.selectedQuantity > 0) {
        product.selectedQuantity = product.selectedQuantity - 1
      } else {
        this.cartService.removeProductFromCart(product)
      }
    } else if (changeParam === 1) {
      product.selectedQuantity = product.selectedQuantity + 1
    }
    this.cartService.updateProductQuantity(product)
    this.cartItems = this.cartService.getCartItems()
    this.cartItems = this.cartItems.filter((item: any) => {
      if (item.selectedQuantity == 0) {
        this.cartService.removeProductFromCart(item)
      }
      return item.selectedQuantity > 0
    })
    this.calculatePrices()
  }
  calculateSubtotal() {
    this.subTotal = this.cartItems.reduce((sum: any, item: any) => {
      return sum + item.selectedQuantity * item.price
    }, 0);
  }
  calculateEstimatedTax() {
    this.estimatedTax = this.subTotal * (this.estimatedTaxPercentage / 100)
  }
  calculateGrandTotal() {
    this.grandTotal = this.subTotal + this.estimatedTax
  }
  calculatePrices() {
    this.calculateSubtotal()
    this.calculateEstimatedTax()
    this.calculateGrandTotal()
  }
  placeOrder() {
    if (this.grandTotal <= 0) {
      this.helperService.openSnackBar(`Grand Total is empty , please check cart`, 3000)
      return
    }
    this.callBackendOrderPlacement()
  }
  callBackendOrderPlacement() {
    const finalItems = this.cartItems.map((item: any) => {
      return {
        product_id: item.id,
        quantity: item.selectedQuantity
      }
    })
    console.log("Going to server now" , finalItems)
    this.orderService.createOrder({ items: finalItems}).subscribe({
      next : (response:any)=>{
        console.log("Response from order placement", response)
        const stripeResult = response.data.stripe_result
        const orderId = response.data.order_id
        localStorage.setItem('orderId' , orderId)
        window.location.href = (stripeResult).url;
        // this.cartService.clearLocalStorage()
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
        console.log("Order placing complete")
      }
    })
  }
}
