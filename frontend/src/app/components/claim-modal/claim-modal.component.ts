import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-claim-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claim-modal.component.html',
  styleUrls: ['./claim-modal.component.css']
})
export class ClaimModalComponent {
  @Input() item: any; // Input to receive the item data from the parent
  @Output() close = new EventEmitter<void>(); // Output to tell the parent to close the modal

  claimMessage = '';

  constructor(private itemService: ItemService) {}

  submitClaim(): void {
    if (!this.claimMessage.trim()) {
      alert('Please enter a message to prove ownership.');
      return;
    }

    this.itemService.submitClaim(this.item._id, this.claimMessage).subscribe({
      next: (response) => {
        const successMessage = this.item.type === 'found' 
        ? 'Claim submitted successfully!' 
        : 'Message sent to the owner successfully!';
      alert(successMessage);
      this.close.emit();
    },
    error: (err) => {
      console.error('Failed to submit claim/message', err);
      alert('Error: ' + err.error.message);
      }
    });
  }

  closeModal(): void {
    this.close.emit(); // Tell the parent component to close the modal
  }
}