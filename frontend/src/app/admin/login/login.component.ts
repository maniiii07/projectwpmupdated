import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent {
  loginData = { email: '', password: '' };

  constructor(
    private adminService: AdminService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject this to check if we're in a browser
  ) {}

  onLogin(): void {
    this.adminService.adminLogin(this.loginData).subscribe({
      next: (response: any) => { // <-- Fix for 'any' type
        if (response && response.token) {
          // This check prevents "localStorage is not defined" errors during Server-Side Rendering
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('auth_token', response.token);
          }
        }
        this.router.navigate(['/admin']);
      },
      error: (err: any) => { // <-- Fix for 'any' type
        console.error("--- FULL ADMIN LOGIN ERROR ---", err); 
        alert('Login Failed: ' + (err.error?.message || 'Check console for details'));
      }
    });
  }
}