import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {
  itemData = {
    type: 'found',
    title: '',
    description: '',
    category: 'Other',
    location: ''
  };

  selectedFile: File | null = null;

  constructor(private itemService: ItemService, private router: Router) {}

  // This function is called when the user selects a file from the input
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  // This function is called when the form is submitted
  onSubmit(): void {
    const formData = new FormData();

    // Append all the text fields to the FormData object
    formData.append('type', this.itemData.type);
    formData.append('title', this.itemData.title);
    formData.append('description', this.itemData.description);
    formData.append('category', this.itemData.category);
    formData.append('location', this.itemData.location);

    // If a file was selected, append it too
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    // Call the service to send the data to the backend
    this.itemService.postItem(formData).subscribe({
      next: (response) => {
        alert('Item posted successfully!');
        this.router.navigate(['/items']); // Navigate back to the item list page
      },
      error: (err) => {
        console.error('Failed to post item', err);
        alert('Error posting item: ' + err.error.message);
      }
    });
  }
}