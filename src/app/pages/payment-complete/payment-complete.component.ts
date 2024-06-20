import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { CartManagementService } from '../../core/services/cart-management.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-payment-complete',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './payment-complete.component.html',
  styleUrl: './payment-complete.component.css'
})
export class PaymentCompleteComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private orderService  = inject(OrderService)
  private cartService = inject(CartManagementService)
  sessionId:any
  orderId:any= null
  ngOnInit(): void {
    console.log("Payment COmplete , triffered")
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      if (this.sessionId) {
        this.updatePaymentStatus(this.sessionId);
      }
    });
  }

  updatePaymentStatus(sessionId: string) {
    // Replace with your actual backend API call
    const payload = { 
      "stripe_session_id" : sessionId
    }
    this.orderId = localStorage.getItem('orderId')
    this.orderService.updateOrder(this.orderId, payload).subscribe({
      next : (response:any)=>{
        console.log("Resposne from payment complete component" , response)
        localStorage.removeItem("orderId")
        this.cartService.clearLocalStorage()
        window.alert(`Payment Success`)
        this.router.navigate(['/orders']);
      },
      error:(error:any)=>{
        console.error('API error:', error);
        if (!error.status) {
        }
        if (error && error.error && error.error.message) {
        }
      },
      complete: ()=>{
      }
    })
  }
}
