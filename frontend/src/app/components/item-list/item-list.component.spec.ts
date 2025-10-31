import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = []; // This array will hold our items
  backendUrl = 'http://localhost:5000/uploads/'; // Path to your backend images

  constructor(private itemService: ItemService) {}

  // ngOnInit runs when the component is first loaded
  ngOnInit(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        console.log('Items fetched!', data);
      },
      error: (err) => {
        console.error('Failed to fetch items', err);
      }
    });
  }
}