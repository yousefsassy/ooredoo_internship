import { Component, OnInit } from '@angular/core';
import { Shop, UserService } from '../user.service';

@Component({
  selector: 'app-dashboard-adminshop',
  templateUrl: './dashboard-adminshop.component.html',
  styleUrls: ['./dashboard-adminshop.component.css']
})
export class DashboardAdminshopComponent implements OnInit {
  shop: Shop | null = null;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'JWT token missing';
      return;
    }

    let payload: any;
    try {
      payload = JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      this.errorMessage = 'Invalid token format';
      return;
    }

    const username = payload.sub || payload.Username;
    const role = payload.role;

    if (role === 'ADMINSHOP') {
      this.userService.getShopByAdminUsername(username).subscribe({
        next: (data: Shop) => this.shop = data,
        error: () => this.errorMessage = 'Failed to load shop data'
      });
    } else {
      this.errorMessage = 'Unauthorized: You are not an AdminShop';
    }
  }
}