import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private userService: UserService) {}

ngOnInit(): void {
  this.userService.getUserProfile().subscribe({
    next: (data) => {
      console.log("--- USER DATA RECEIVED IN COMPONENT ---", data); // <-- ADD THIS LINE
      this.user = data;
    },
    error: (err) => {
      console.error('Failed to fetch user profile', err);
    }
  });
}
}