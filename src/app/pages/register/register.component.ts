import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { HelperService } from '../../core/services/helper.service';

@Component({
  selector: 'app-register',
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
    CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private router = inject(Router)
  private userService = inject(UserService)
  private helperService = inject(HelperService)
  private fb = inject(FormBuilder);
  showPassword: Boolean = false
  registerForm = this.fb.group({
    firstName : [null, Validators.compose([Validators.required])], 
    lastName : [null, Validators.compose([Validators.required])], 
    email : [null, Validators.compose([Validators.required, Validators.email])], 
    password: [null, Validators.required],
    confirmPassword: [null, Validators.required],
  })
  toggleShowPassword(){
    this.showPassword = !this.showPassword; 
  }

  onSubmit(): void {
    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword){
      this.helperService.openSnackBar(`Please enter matching passwords`)
      return
    }
    this.register()
  }
  register(){
    if(this.registerForm.invalid){
      this.helperService.openSnackBar(`Please fill all required fields` , 2000)
      return
    }
    const registerFormValues = this.registerForm.value
    const payload = {
      email: registerFormValues.email,
      password: registerFormValues.password,
      first_name: registerFormValues.firstName,
      last_name: registerFormValues.lastName
    }
    this.userService.register(payload).subscribe({
      next: response => {
        this.helperService.openSnackBar(`Registration Success`)
        console.log('API response:', response);
        // Handle successful response (optional)
        this.backtoLoginPage()
      },
      error: error => {
        console.error('API error:', error);
        // Handle API 
        if (!error.status) {
          this.helperService.openSnackBar(`Internal Server Error!!`)
        }
        if (error && error.error && error.error.message) {
          if(error.error.message.includes("E11000 duplicate key error collection")){
            this.helperService.openSnackBar(`USER_ALREADY_EXISTS: Please register with another email` , 5000)
          }else {
            this.helperService.openSnackBar(`${error.error.message}`)
          }
        }
      },
      complete: () => {
        console.log('API call completed'); // Optional: Handle completion
      },
    })
  }
  backtoLoginPage(){
    this.router.navigateByUrl("/login")
  }
}
