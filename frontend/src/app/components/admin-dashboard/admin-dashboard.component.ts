import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  items: any[] = [];

  constructor(private adminService: AdminService, private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.adminService.getAllUsers().subscribe(data => this.users = data);
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  deleteItem(itemId: string): void {
    if (confirm('Are you sure you want to delete this item? This action is permanent.')) {
      this.adminService.deleteItem(itemId).subscribe(() => {
        alert('Item deleted by admin successfully.');
        this.loadAllData(); // Refresh the lists after deletion
      });
    }
  }
}