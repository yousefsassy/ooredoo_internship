import { Component, OnInit } from '@angular/core';
import { Region, UserService } from '../user.service';

@Component({
  selector: 'app-dashboard-region',
  templateUrl: './dashboard-region.component.html',
  styleUrls: ['./dashboard-region.component.css']
})
export class DashboardRegionComponent implements OnInit {
 stats = {
    totalShops: 0,
    totalReports: 0,
  };

  region!: Region;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Token not found';
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.sub || payload.Username;
      const role = payload.role;

      if (role === 'CHEFREGION') {
        // Charger les stats du dashboard
        this.userService.getDashboardStatsForChefRegion(username).subscribe({
          next: (data: { totalShops: number; totalReports: number; }) => this.stats = data,
          error: (err: any) => console.error('Failed to load dashboard stats', err)
        });

        // Charger les infos de la région
        this.userService.getRegionByChefUsername(username).subscribe({
          next: (regionData: Region) => this.region = regionData,
          error: (err: any) => {
            console.error('Error fetching region:', err);
            this.errorMessage = 'Failed to load your region.';
          }
        });
      } else {
        this.errorMessage = 'Unauthorized access. Only ChefRegion can view this.';
      }
    } catch (e) {
      console.error('Token decoding error:', e);
      this.errorMessage = 'Invalid token';
    }
  }
}
