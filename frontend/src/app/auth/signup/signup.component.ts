import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(): void {
    this.authService.signupUser(this.signupData).subscribe({
      next: (response: any) => {
        alert('Signup Successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Signup failed:', err);
        // The improved error message from the backend will show here
        alert('Signup Failed: ' + err.error.message);
      }
    });
  }
}