import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
// Import Router (optional) for navigation after successful API call
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatButtonModule , HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private apiService = inject(ApiService)
  constructor(private http: HttpClient, private router?: Router){

  }
  callBackendApiV0() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Set appropriate content type
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibWt0LmJ6YUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJNS1QiLCJsYXN0X25hbWUiOiJCWkEifSwiaWF0IjoxNzE4MjM2NTExLCJleHAiOjE3MTgyNzk3MTF9.l93Wzs1qaAnFTLSnosxgRC38LqE9y68iPVMRqNMojPs'   // Example authorization header
    });
    
    const apiUrl = 'http://localhost:4000/api/v1/stripe/checkout/sessions'; // Replace with your actual API URL
    // const apiUrl = 'http://44.223.70.242:4000/api/v1/stripe/checkout/sessions'; // Replace with your actual API URL
    const postData = { // Data to send in the POST request body
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    this.http.post(apiUrl,postData, {headers}).subscribe({
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

  callBackendApi (){
    this.apiService.post(`http://localhost:4000/api/v1/stripe/checkout/sessions` , {}).subscribe({
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
