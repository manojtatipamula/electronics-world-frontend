import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { HttpClient, HttpClientModule } from '@angular/common/http';
// Import Router (optional) for navigation after successful API call
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatButtonModule , HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private http: HttpClient, private router?: Router){

  }
  callBackendApi() {
    const apiUrl = 'http://localhost:4000/api/v1/stripe/checkout/sessions'; // Replace with your actual API URL
    const postData = { // Data to send in the POST request body
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    this.http.post(apiUrl,postData).subscribe({
      next: response => {
        console.log('API response:', response);
        // Handle successful response (optional)
        if (this.router) {
          window.location.href = (response as any).stripe_url;
          // this.router.navigate(['/payment-complete']); // Redirect to success page (optional)
        }
      },
      error: error => {
        console.error('API error:', error);
        // Handle API errors
      },
      complete: () => {
        console.log('API call completed'); // Optional: Handle completion
      },
    });
  }
}
