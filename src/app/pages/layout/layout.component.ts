import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { CartManagementService } from '../../core/services/cart-management.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    MatMenuModule,
    CommonModule,
    MatBadgeModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  private cartService = inject(CartManagementService)
  fullName: string = 'NA'
  cartTotalQuantity: Number = 0

  ngOnInit(): void {
    this.setFullName()
    this.cartService.$cartItems.subscribe({next : (data:any)=>{
      console.log("LayoutComponent: $cartItems emitted next" , data)
    }, error : (error)=>{
      console.error("LayoutComponent: $cartItems error" , error)
    }, complete : ()=>{
      console.log("LayoutComponent: $cartItems complete")
    }});
    this.cartService.$totalQuantity.subscribe({next : (data:any)=>{
      this.cartTotalQuantity = data
      console.log("LayoutComponent: $totalQuantity emitted next" , data)
    }, error : (error)=>{
      console.error("LayoutComponent: $totalQuantity error")
    }, complete : ()=>{
      console.log("LayoutComponent: $totalQuantity complete")
    }})
  }
  setFullName(){
    const userData = localStorage.getItem('userData')
    let parsedUser:any
    if(userData){
      parsedUser = JSON.parse(userData)
      this.fullName = `${parsedUser?.first_name} ${parsedUser?.last_name}`
    }
  }
}
