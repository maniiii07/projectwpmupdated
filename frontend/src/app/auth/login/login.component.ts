import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.loginUser(this.loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful!', response);
        // This is the line that redirects the user to the '/items' page
        this.router.navigate(['/items']); 
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        alert('Login Failed: ' + (err.error.message || 'Unknown error'));
      }
    });
  }
}