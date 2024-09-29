import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Importa el RouterModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Exámen tácnico Angular V1 - VELAIO';

}
