import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
