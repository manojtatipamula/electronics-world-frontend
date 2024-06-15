import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button'

import { MatDividerModule } from '@angular/material/divider'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs'
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

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
    RouterLink
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
