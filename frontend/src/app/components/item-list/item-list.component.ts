import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ClaimModalComponent } from '../claim-modal/claim-modal.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../src/environments/environment.prod'; // <-- 1. IMPORT ENVIRONMENT

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ClaimModalComponent, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  // 2. REPLACE THE OLD backendUrl WITH THIS
  imageUrlPrefix = environment.backendImageUrl; 
  
  currentUserId: string | null = null;
  isModalOpen = false;
  selectedItemForClaim: any = null;
  searchTerm: string = '';

  constructor(
    private itemService: ItemService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.searchItems(); 

    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUserId = payload.id;
    }
  }

  searchItems(): void {
    this.itemService.getItems(this.searchTerm).subscribe({
      next: (data) => { this.items = data; },
      error: (err) => { console.error('Failed to fetch items', err); }
    });
  }

  canClaim(item: any): boolean {
    return item.type === 'found' && item.status !== 'claimed' && item.postedBy._id !== this.currentUserId;
  }

  openClaimModal(item: any): void {
    this.selectedItemForClaim = item;
    this.isModalOpen = true;
  }

  closeClaimModal(): void {
    this.isModalOpen = false;
    this.selectedItemForClaim = null;
  }


  canContactOwner(item: any): boolean {
  // Show button if: item is 'lost', status is 'pending', and was NOT posted by the current user
  return item.type === 'lost' && item.status === 'pending' && item.postedBy._id !== this.currentUserId;
}
}