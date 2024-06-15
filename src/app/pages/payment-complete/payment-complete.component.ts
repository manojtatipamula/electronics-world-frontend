import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-complete',
  standalone: true,
  imports: [],
  templateUrl: './payment-complete.component.html',
  styleUrl: './payment-complete.component.css'
})
export class PaymentCompleteComponent {
  ngAfterViewInit(){
    window.alert('Payment Success')
  }
}
