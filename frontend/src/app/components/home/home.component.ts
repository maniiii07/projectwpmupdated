import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- IMPORT ROUTER MODULE

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- ADD IT TO IMPORTS
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}