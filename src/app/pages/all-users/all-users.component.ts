import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../core/services/user.service';
import { HelperService } from '../../core/services/helper.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

let ELEMENT_DATA: any[] = [
  {
    firstName: "dummy",
    lastName: "dummy",
    email: "dummy@gmail.com"
  }
];


@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})



export class AllUsersComponent implements OnInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email'];
  dataSource = ELEMENT_DATA;
  private userService = inject(UserService)
  private helperService = inject(HelperService)
  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: (response : any)=>{
        this.dataSource = response?.data.map((item: any)=>{
          return {
            firstName : item.first_name,
            lastName: item.last_name,
            email: item.email
          }
        })
      },
      error : (error) => {
        console.error('API error:', error);
        // Handle API 
        if(!error.status){
          this.helperService.openSnackBar(`Internal Server Error!!`)
        }
        if(error && error.error && error.error.message){
          this.helperService.openSnackBar(`${error.error.message}`)
        }
      }
    })
  }
}
