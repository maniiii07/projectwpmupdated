import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-my-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {
  myItems: any[] = [];
  claims: any[] = [];
  selectedItemId: string | null = null;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadMyItems();
  }

  loadMyItems(): void {
    this.itemService.getMyItems().subscribe(data => {
      this.myItems = data;
    });
  }

  viewClaims(itemId: string): void {
    if (this.selectedItemId === itemId) {
      this.selectedItemId = null;
      this.claims = [];
    } else {
      this.selectedItemId = itemId;
      this.itemService.getClaimsForItem(itemId).subscribe(data => {
        this.claims = data;
      });
    }
  }

  handleClaim(claimId: string, status: 'accepted' | 'rejected'): void {
    this.itemService.updateClaimStatus(claimId, status).subscribe(() => {
      alert(`Claim has been ${status}`);
      this.selectedItemId = null;
      this.claims = [];
      this.loadMyItems();
    });
  }

  // ✅ NEW FUNCTION: Update item photo
  onPhotoSelected(event: any, itemId: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.itemService.updateItemPhoto(itemId, file).subscribe({
        next: (res) => {
          alert('Photo updated successfully!');
          // Find the item in the list and update its photo for instant UI refresh
          const itemIndex = this.myItems.findIndex(item => item._id === itemId);
          if (itemIndex > -1) {
            this.myItems[itemIndex].photo = res.item.photo;
          }
        },
        error: (err) => {
          console.error('Failed to update photo', err);
          alert('Error: ' + err.error.message);
        }
      });
    }
  }

  // ✅ EXISTING FUNCTION: Delete item
  deleteItem(itemId: string): void {
    if (confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      this.itemService.deleteItem(itemId).subscribe({
        next: () => {
          alert("Item deleted successfully!");
          this.myItems = this.myItems.filter(item => item._id !== itemId);
        },
        error: (err: any) => {
          console.error("--- FULL DELETE ERROR ---", err);
          alert("An error occurred. Please check the developer console (F12) for details.");
        }
      });
    }
  }
}
