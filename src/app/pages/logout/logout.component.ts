import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  private router = inject(Router)
  ngOnInit(): void {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/')
  }
}
