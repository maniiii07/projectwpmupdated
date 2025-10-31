import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordData = { oldPassword: '', newPassword: '' };

  constructor(private userService: UserService, private router: Router) {}

  changePassword(): void {
    this.userService.changePassword(this.passwordData).subscribe({
      next: () => {
        alert('Password changed successfully!');
        this.router.navigate(['/profile']);
      },
      error: (err) => alert('Error: ' + err.error.message)
    });
  }
}