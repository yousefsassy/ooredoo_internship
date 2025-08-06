import { Component, OnInit } from '@angular/core';
import { Shop, User, UserService, Zone } from '../user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
   shops: Shop[] = [];
  filteredShops: Shop[] = [];

  users: User[] = [];
  zones: Zone[] = [];

  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.loadUsers();
  this.loadZones();

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token JWT manquant');
    return;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));

  const username = payload.sub || payload.Username;
  const role = payload.role;

  if (role === 'CHEFZONE') {
    this.loadShopsByChefZoneUsername(username);
  } else if (role === 'ADMIN') {
    this.loadAllShops();
  }
}

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (err) => console.error('Erreur de chargement des users:', err)
    });
  }

  loadZones(): void {
    this.userService.getAllZones().subscribe({
      next: (data: Zone[]) => {
        this.zones = data;
      },
      error: (err) => console.error('Erreur de chargement des zones:', err)
    });
  }

  loadShopsByChefZoneUsername(username: string): void {
    this.userService.getShopsByChefZoneUsername(username).subscribe({
      next: (data: Shop[]) => {
        this.shops = data;
        this.applyFilters();
      },
      error: (error) => console.error('Erreur de chargement des shops par username:', error)
    });
  }

  loadAllShops(): void {
    this.userService.getAllShops().subscribe({
      next: (data: Shop[]) => {
        this.shops = data;
        this.applyFilters();
      },
      error: (error) => console.error('Erreur de chargement des shops:', error)
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredShops = this.shops.filter(shop =>
      shop.nomShop.toLowerCase().includes(term)
    );
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  getAdminShopName(shop: Shop): string {
    if (!shop.adminShop) return 'N/A';
    const admin = this.users.find(u => u.id === shop.adminShop?.id);

    return admin ? admin.username : 'N/A';
  }

  

  onAddShop(): void {
    this.router.navigate(['/shop']);
  }

  onEditShop(id: number): void {
    this.router.navigate(['/shop/edit', id]);
  }

  onViewShop(id: number): void {
    this.router.navigate(['/shop/details', id]);
  }

  onArchiveShop(id: number): void {
    if (confirm('Are you sure you want to archive this shop?')) {
      this.userService.archiveShop(id).subscribe({
        next: () => {
          alert('Shop archived successfully!');
          this.reloadShops();
        },
        error: (err) => console.error('Error archiving shop', err)
      });
    }
  }

  onDeleteShop(id: number): void {
    if (confirm('Are you sure you want to delete this shop?')) {
      this.userService.deleteShop(id).subscribe({
        next: () => {
          alert('Shop deleted successfully!');
          this.reloadShops();
        },
        error: (err) => console.error('Error deleting shop', err)
      });
    }
  }

  reloadShops(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return;

    const currentUser = JSON.parse(storedUser);

    if (currentUser.role === 'CHEFZONE') {
      this.loadShopsByChefZoneUsername(currentUser.username);
    } else {
      this.loadAllShops();
    }
  }
}