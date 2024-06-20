import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HelperService } from '../../core/services/helper.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    CommonModule, RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router)
  private userService = inject(UserService)
  private helperService = inject(HelperService)
  private fb = inject(FormBuilder);
  showPassword: Boolean = false
  loginForm = this.fb.group({
    email : [null, Validators.compose([Validators.required, Validators.email])], 
    password: [null, Validators.required],
  })
  onSubmit(): void {
    this.login()
  }

  login() {
    const loginFormValues = this.loginForm.value
    if(this.loginForm.invalid){
      this.helperService.openSnackBar(`Please fill all required fields` , 2000)
      return
    }
    const postData: any = {
      "email": loginFormValues.email,
      "password": loginFormValues.password
    };
    this.userService.login(postData).subscribe({
      next: response => {
        this.helperService.openSnackBar(`Login Success: Welcome ${response.data.first_name} ${response.data.last_name}`)
        console.log('API response:', response);
        // Handle successful response (optional)
        if (response?.token) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('userData', JSON.stringify(response.data))
          if (this.router) {
            this.router.navigateByUrl('/home')
          }
        } else {
          this.helperService.openSnackBar('No token provided!')
        }

      },
      error: error => {
        console.error('API error:', error);
        // Handle API 
        if (!error.status) {
          this.helperService.openSnackBar(`Internal Server Error!!`)
        }
        if (error && error.error && error.error.message) {
          this.helperService.openSnackBar(`${error.error.message}`)
        }
      },
      complete: () => {
        console.log('API call completed'); // Optional: Handle completion
      },
    });
  }
  toggleShowPassword(){
    this.showPassword = !this.showPassword; 
  }

}
