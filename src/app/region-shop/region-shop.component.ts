import { Component, OnInit } from '@angular/core';
import { Shop, UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region-shop',
  templateUrl: './region-shop.component.html',
  styleUrls: ['./region-shop.component.css']
})
export class RegionShopComponent implements OnInit {
  shops: Shop[] = [];
  filteredShops: Shop[] = [];
  searchTerm: string = '';
  errorMessage = '';

  constructor(private userService: UserService , private router: Router) {}

  ngOnInit(): void {
    this.loadShops();
  }

  loadShops() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Token not found.';
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const username = payload.sub;

    this.userService.getShopsByChefRegion(username).subscribe({
      next: (data) => {
        this.shops = data;
        this.filteredShops = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error loading shops in region.';
      }
    });
  }

  filterShops() {
    const term = this.searchTerm.toLowerCase();
    this.filteredShops = this.shops.filter(shop =>
      shop.nomShop?.toLowerCase().includes(term)
    );
  }

  viewShop(id: number | undefined): void {
  if (id !== undefined) {
    // rediriger ou afficher les détails
    this.router.navigate(['/shop-details', id]);
  }
}

reportShop(id: number | undefined): void {
  if (id !== undefined) {
    // ouvrir une modal ou faire autre action
    console.log('Reporting shop ID:', id);
  }
}

}