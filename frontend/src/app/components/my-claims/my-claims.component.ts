import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-my-claims',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-claims.component.html',
  styleUrls: ['./my-claims.component.css']
})
export class MyClaimsComponent implements OnInit {
  myClaims: any[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getMyClaims().subscribe({
      next: (data) => {
        this.myClaims = data;
      },
      error: (err) => {
        console.error('Failed to fetch claims', err);
      }
    });
  }
}